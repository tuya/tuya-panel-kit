/* eslint-disable react/no-array-index-key */
/* eslint-disable react-native/split-platform-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import { ScrollView, View, Platform, ViewPagerAndroid, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import defaultDot from './dot';

class Carousel extends React.Component {
  static propTypes = {
    bounces: PropTypes.bool,
    hasDots: PropTypes.bool,
    autoplay: PropTypes.bool,
    autoplayInterval: PropTypes.number,
    selectedIndex: PropTypes.number,
    dots: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    dotStyle: ViewPropTypes.style,
    dotActiveStyle: ViewPropTypes.style,
    useViewPagerOnAndroid: PropTypes.bool,
  };
  static defaultProps = {
    bounces: true,
    hasDots: true,
    autoplay: false,
    autoplayInterval: 2000,
    selectedIndex: 0,
    dots: defaultDot,
    dotStyle: {},
    dotActiveStyle: {},
    useViewPagerOnAndroid: true,
  };
  constructor(props) {
    super(props);
    const { children, selectedIndex } = this.props;
    this.count = children ? React.Children.count(children) : 0;
    const index = this.count > 1 ? Math.min(selectedIndex, this.count - 1) : 0;
    this.state = {
      width: 0,
      isScrolling: false,
      selectedIndex: index,
      offset: { x: 0, y: 0 },
      autoplayStop: false,
    };
  }
  componentDidMount() {
    this.autoplay();
  }
  componentWillReceiveProps(nextProps) {
    const { children, loop } = nextProps;
    if (children && React.Children.count(children) === this.count) return;
    this.count = React.Children.count(children) || 1;
    const { width } = this.state;
    const offset = width * (loop ? 1 : 0);
    this.setState({
      autoplayStop: false,
      isScrolling: false,
      selectedIndex: 0,
      offset: { x: offset, y: 0 },
    });
  }
  componentWillUnmount() {
    this.autoplayTimer && clearTimeout(this.autoplayTimer);
    this.androidScrollEndTimer && clearTimeout(this.androidScrollEndTimer);
    this.scrollEndTimter && clearTimeout(this.scrollEndTimter);
    this.firstScrollTimer && clearTimeout(this.firstScrollTimer);
    this.loopJumpTimer && clearTimeout(this.loopJumpTimer);
  }
  onScrollBegin = e => {
    this.setState(
      {
        isScrolling: true,
      },
      () => {
        if (this.props.onScrollBeginDrag) {
          this.props.onScrollBeginDrag(e, this.state);
        }
      }
    );
  };
  onScrollEnd = e => {
    this.setState({ isScrolling: false });
    // android hack
    if (!e.nativeEvent.contentOffset) {
      const { position } = e.nativeEvent;
      e.nativeEvent.contentOffset = {
        x: position * this.state.width,
        y: 0,
      };
    }
    this.updateIndex(e.nativeEvent.contentOffset);
    this.scrollEndTimter = setTimeout(() => {
      this.autoplay();
      this.loopJump();
      if (this.props.onMomentumScrollEnd) {
        this.props.onMomentumScrollEnd(e, this.state);
      }
    });
  };
  onScrollEndDrag = e => {
    const { offset, selectedIndex } = this.state;
    const previousOffset = offset.x;
    const newOffset = e.nativeEvent.contentOffset.x;
    if (previousOffset === newOffset && (selectedIndex === 0 || selectedIndex === this.count - 1)) {
      this.setState({
        isScrolling: false,
      });
    }
    if (this.props.onScrollEndDrag) {
      this.props.onScrollEndDrag(e, this.state);
    }
  };

  onLayout = e => {
    const { selectedIndex, loop, useViewPagerOnAndroid } = this.props;
    const scrollIndex = this.count > 1 ? Math.min(selectedIndex, this.count - 1) : 0;
    const { width } = e.nativeEvent.layout;
    const offset = width * (scrollIndex + loop ? 1 : 0);
    this.setState(
      {
        width,
        offset: { x: offset, y: 0 },
      },
      () => {
        if (Platform.OS === 'android' && !useViewPagerOnAndroid) {
          this.firstScrollTimer = setTimeout(() => {
            this.scrollview.scrollTo({ x: offset, y: 0, animated: false });
          }, 0);
        }
      }
    );
  };

  onPageScrollStateChanged = state => {
    if (state === 'dragging') this.onScrollBegin();
  };

  loopJump = () => {
    if (this.state.loopJump && Platform.OS === 'android') {
      const i = this.state.selectedIndex + (this.props.loop ? 1 : 0);
      if (this.props.useViewPagerOnAndroid) {
        this.loopJumpTimer = setTimeout(
          () =>
            this.scrollview.setPageWithoutAnimation && this.scrollview.setPageWithoutAnimation(i),
          50
        );
      } else {
        this.loopJumpTimer = setTimeout(() => {
          const x = this.state.width * i;
          this.scrollview.scrollTo({ x, y: 0 }, false);
        }, 0);
      }
    }
  };

  updateIndex = currentOffset => {
    const paramOffset = currentOffset;
    let { selectedIndex } = this.state;
    const { offset, width } = this.state;
    const diff = currentOffset.x - offset.x;
    if (!diff) return;
    selectedIndex += Math.round(diff / width);
    let loopJump = false;
    if (this.props.loop) {
      loopJump = true;
      if (selectedIndex <= -1) {
        selectedIndex = this.count - 1;
        paramOffset.x = width * this.count;
      } else if (selectedIndex >= this.count) {
        selectedIndex = 0;
        paramOffset.x = width;
      }
    }
    this.setState({
      selectedIndex,
      offset: paramOffset,
      loopJump,
    });
    if (this.props.carouselChange) {
      this.props.carouselChange(selectedIndex);
    }
  };

  scrollNextPage = () => {
    const { selectedIndex, isScrolling, width } = this.state;
    if (isScrolling || this.count < 2) return;
    const diff = selectedIndex + 1 + (this.props.loop ? 1 : 0);
    const offsetX = diff * width;
    if (Platform.OS === 'android' && this.props.useViewPagerOnAndroid) {
      this.scrollview && this.scrollview.setPageWithoutAnimation(diff);
    } else {
      this.scrollview && this.scrollview.scrollTo({ x: offsetX, y: 0 });
    }
    this.setState({
      isScrolling: true,
      autoplayStop: false,
    });
    if (Platform.OS === 'android') {
      this.androidScrollEndTimer = setTimeout(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff,
          },
        });
      }, 0);
    }
  };

  autoplay = () => {
    const { children, autoplay, autoplayInterval, loop } = this.props;
    const { isScrolling, autoplayStop, selectedIndex } = this.state;
    if (!Array.isArray(children) || !autoplay || isScrolling || autoplayStop) return;
    clearTimeout(this.autoplayTimer);
    this.autoplayTimer = setTimeout(() => {
      if (!loop && selectedIndex === this.count - 1) {
        this.setState({
          autoplayStop: true,
        });
        return;
      }
      this.scrollNextPage();
    }, autoplayInterval);
  };

  _renderSrcoll = pages => {
    if (Platform.OS === 'android' && this.props.useViewPagerOnAndroid) {
      return (
        <ViewPagerAndroid
          ref={ref => {
            this.scrollview = ref;
          }}
          {...this.props}
          initialPage={this.props.loop ? this.state.selectedIndex + 1 : this.state.selectedIndex}
          onPageScrollStateChanged={this.onPageScrollStateChanged}
          onPageSelected={this.onScrollEnd}
          key="$carousel"
          style={this.props.style}
        >
          {pages}
        </ViewPagerAndroid>
      );
    }
    return (
      <ScrollView
        {...this.props}
        horizontal={true}
        ref={ref => {
          this.scrollview = ref;
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        removeClippedSubviews={false}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        contentContainerStyle={this.props.style}
        contentOffset={this.state.offset}
        onScrollBeginDrag={this.onScrollBegin}
        onMomentumScrollEnd={this.onScrollEnd}
        onScrollEndDrag={this.onScrollEndDrag}
        bounces={!!this.props.bounces}
      >
        {pages}
      </ScrollView>
    );
  };
  _renderDots = () => {
    const { dotStyle, dotActiveStyle, dots, dotWrapperStyle } = this.props;
    return dots
      ? dots({
        dotStyle,
        dotWrapperStyle,
        dotActiveStyle,
        currentIndex: this.state.selectedIndex,
        count: this.count,
      })
      : null;
  };
  render() {
    const { children, hasDots, loop } = this.props;
    if (!children) return null;
    let pages;
    const pageWidth = { width: this.state.width };
    if (this.count > 1) {
      const childrenArray = React.Children.toArray(children);
      if (loop) {
        childrenArray.unshift(childrenArray[this.count - 1]);
        childrenArray.push(childrenArray[1]);
      }
      pages = childrenArray.map((child, index) => (
        <View key={`carousel_${index}`} style={pageWidth}>
          {child}
        </View>
      ));
    } else {
      pages = <View style={pageWidth}>{children}</View>;
    }
    return (
      <View onLayout={this.onLayout}>
        {this._renderSrcoll(pages)}
        {hasDots && this._renderDots()}
      </View>
    );
  }
}

export default Carousel;
