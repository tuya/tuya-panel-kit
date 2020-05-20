/* eslint-disable react-native/split-platform-components */
/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Animated,
  Platform,
  ViewPagerAndroid,
  View,
  ViewPropTypes,
} from 'react-native';
import Utils from './utils';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class TabContent extends React.Component {
  static defaultProps = {
    distanceToChangeTab: 0.3,
    swipeable: true,
    animated: true,
    useViewPagerOnAndroid: true,
  };
  static propTypes = {
    /**
     * 切换tab的距离
     */
    distanceToChangeTab: PropTypes.number,
    /**
     * 内容宽度
     */
    containerWidth: PropTypes.number,
    /**
     * 滚动改变回调函数
     */
    onScrollValueChange: PropTypes.func,
    /**
     * 切换视图的回调
     */
    onChange: PropTypes.func,
    /**
     * 是否可滑动视图
     */
    swipeable: PropTypes.bool,
    /**
     * 所激活视图的key
     */
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * tab内容源
     */
    panels: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    /**
     * 切换视图是否有动画
     */
    animated: PropTypes.bool,
    /**
     * 是否在安卓上使用viewPager
     */
    useViewPagerOnAndroid: PropTypes.bool,
    /**
     * 包裹tab的容器样式
     */
    style: ViewPropTypes.style,
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
        horizontal={true}
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
        directionalLockEnabled={true}
        keyboardDismissMode="on-drag"
        pagingEnabled={true}
        contentContainerStyle={style}
      >
        {this.getTabPanes()}
      </AnimatedScrollView>
    );
  }
}
export default TabContent;
