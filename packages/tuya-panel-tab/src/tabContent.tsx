import React from 'react';
import { ScrollView, Animated, Platform, ViewPagerAndroid, View } from 'react-native';
import Utils from './utils';
import { TabContentProps, TabContentState } from './interface';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class TabContent extends React.Component<TabContentProps, TabContentState> {
  static defaultProps = {
    distanceToChangeTab: 0.3,
    swipeable: true,
    animated: true,
    useViewPagerOnAndroid: true,
  };

  constructor(props) {
    super(props);
    const activeIndex = Utils.getActiveIndex(props.panels, props.activeKey);
    const width = props.containerWidth;
    this.state = {
      scrollX: new Animated.Value((activeIndex !== -1 ? activeIndex : 0) * width),
      activeIndex,
    };
    this.nextTab = activeIndex;
    this.distance = 0;
  }

  componentDidMount() {
    this.prevTab = this.state.activeIndex;
    this.state.scrollX.addListener(({ value }) => {
      const scrollValue = value / this.props.containerWidth;
      this.props.onScrollValueChange(scrollValue);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeKey !== nextProps.activeKey && nextProps.activeKey !== undefined) {
      this.goToTab(Utils.getActiveIndex(nextProps.panels, nextProps.activeKey), true);
    }
  }

  componentDidUpdate() {
    this.prevTab = this.state.activeIndex;
  }

  onScroll = e => {
    if (e) {
      if (Platform.OS === 'android') {
        const { position, offset } = e.nativeEvent;
        requestAnimationFrame(() => {
          this.state.scrollX.setValue((position + offset) * this.props.containerWidth);
        });
      }
    }
  };

  onMomentumScrollEnd = e => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = this.getOffsetIndex(offsetX, this.props.containerWidth);
    if (this.state.activeIndex !== page) {
      this.goToTab(page, false);
    }
  };

  onPageSelected = e => {
    const index = e.nativeEvent.position;
    this.setState(
      {
        activeIndex: index,
      },
      () => {
        this.props.onChange && this.props.onChange(index);
      }
    );
    this.nextTab = index;
  };

  setScrollView = scrollView => {
    this.scrollView = scrollView;
    this.scrollTo(this.state.activeIndex);
  };

  getTabPanes = () => {
    const { panels, activeKey } = this.props;
    return React.Children.map(panels, (child, index) => {
      if (!child) return;
      const isActive = activeKey === child.key;
      const pane = React.cloneElement(child, {
        isActive,
        children: child.props.children,
        style: [child.props.style, { width: this.props.containerWidth }],
      });
      /* eslint-disable consistent-return */
      return <View key={child.key || `tab_${index}`}>{pane}</View>;
    });
  };

  getOffsetIndex = (current, width, threshold = this.props.distanceToChangeTab) => {
    const ratio = Math.abs(current / width);
    const direction = ratio > this.state.activeIndex ? 'right' : 'left';
    const index = Math.floor(ratio);
    switch (direction) {
      case 'right':
        return ratio - index > threshold ? index + 1 : index;
      case 'left':
        return 1 - ratio + index > threshold ? index : index + 1;
      default:
        return Math.round(ratio);
    }
  };

  nextTab: number;
  distance: number;
  prevTab: number;
  scrollView: any;
  viewPager: { setPage: (index: number) => void; setPageWithoutAnimation: (index: number) => void };

  goToTab = (index, force) => {
    if (!force && this.nextTab === index) return;
    this.nextTab = index;
    const { panels, onChange } = this.props;
    if (index >= 0 && index < panels.length) {
      if (!force) {
        onChange && onChange(index);
      }
      this.setState(
        {
          activeIndex: index,
        },
        () => {
          requestAnimationFrame(() => {
            this.scrollTo(this.state.activeIndex, this.props.animated);
          });
        }
      );
    }
  };

  scrollTo = (index, animated = true) => {
    if (Platform.OS === 'android' && this.props.useViewPagerOnAndroid) {
      if (this.viewPager) {
        if (animated) {
          this.viewPager.setPage(index);
        } else {
          this.viewPager.setPageWithoutAnimation(index);
        }
        return;
      }
    }
    const { containerWidth } = this.props;
    if (containerWidth) {
      const offset = index * containerWidth;
      if (this.scrollView && this.scrollView._component && this.scrollView._component.scrollTo) {
        this.scrollView._component.scrollTo({ x: offset, animated });
      }
    }
  };

  render() {
    const { swipeable, style, useViewPagerOnAndroid } = this.props;
    if (Platform.OS === 'android' && useViewPagerOnAndroid) {
      return (
        <ViewPagerAndroid
          key="$content"
          keyboardDismissMode="on-drag"
          initialPage={this.state.activeIndex}
          scrollEnabled={swipeable}
          onPageScroll={this.onScroll}
          style={[{ flex: 1 }, style]}
          onPageSelected={this.onPageSelected}
          ref={ref => {
            this.viewPager = ref;
          }}
        >
          {this.getTabPanes()}
        </ViewPagerAndroid>
      );
    }
    return (
      <AnimatedScrollView
        ref={this.setScrollView}
        key="scrollContent"
        horizontal
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }], {
          useNativeDriver: true,
        })}
        automaticallyAdjustContentInsets={false}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        scrollEventThrottle={5}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={swipeable}
        alwaysBounceVertical={false}
        directionalLockEnabled
        keyboardDismissMode="on-drag"
        pagingEnabled
        contentContainerStyle={style}
      >
        {this.getTabPanes()}
      </AnimatedScrollView>
    );
  }
}
export default TabContent;
