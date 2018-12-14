import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Animated } from 'react-native';
import Utils from './utils';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class TabContent extends React.Component {
  static defaultProps = {
    distanceToChangeTab: 0.3,
    onScrollValueChange: () => {},
    onChange: () => {},
    animated: true,
    swipeable: true,
  }
  static propTypes = {
    distanceToChangeTab: PropTypes.number,
    containerWidth: PropTypes.number.isRequired,
    onScrollValueChange: PropTypes.func,
    onChange: PropTypes.func,
    panels: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    animated: PropTypes.bool,
    swipeable: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    const activeIndex = Utils.getActiveIndex(props.panels, props.activeKey);
    const width = props.containerWidth;
    this.state = {
      scrollX: new Animated.Value((activeIndex !== -1 ? activeIndex : 0) * width),
      activeIndex,
    };
    this.nextTab = activeIndex;
  }

  componentDidMount() {
    this.state.scrollX.addListener(({ value }) => {
      const scrollValue = value / this.props.containerWidth;
      this.props.onScrollValueChange(scrollValue);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { panels, activeKey } = nextProps;
    if (this.props.activeKey !== activeKey && activeKey !== undefined) {
      this.goToTab(Utils.getActiveIndex(panels, activeKey), true);
    }
  }

  onScroll = e => {
    if (e) {
      Animated.event([{
        nativeEvent: { contentOffset: { x: this.state.scrollX } }
      }])(e);
    }
  }

  onMomentumScrollEnd = e => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = this.getOffsetIndex(offsetX, this.props.containerWidth);
    if (this.state.activeIndex !== page) {
      this.goToTab(page, false);
    }
  }

  setScrollView = scrollView => {
    this.scrollView = scrollView;
  }

  getTabPanes = () => {
    const { panels, activeKey } = this.props;
    return React.Children.map(panels, child => {
      if (!child) return;
      const isActive = activeKey === child.key;
      return React.cloneElement(child, {
        isActive,
        children: child.props.children,
        style: { width: this.props.containerWidth }
      });
    });
  }

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
  }
  goToTab = (index, force) => {
    if (!force && this.nextTab === index) return;
    this.nextTab = index;
    const { panels, onChange } = this.props;
    if (index >= 0 && index < panels.length) {
      if (!force) {
        onChange && onChange(index);
        if (this.props.activeKey !== undefined) return;
      }
      this.setState({
        activeIndex: index,
      }, () => {
        this.scrollTo(this.state.activeIndex, this.props.animated);
      });
    }
  }
  scrollTo = (index, animated = true) => {
    const { containerWidth } = this.props;
    if (containerWidth) {
      const offset = index * containerWidth;
      // eslint-disable-next-line max-len
      if (this.scrollView && this.scrollView._component && this.scrollView._component.scrollTo) {
        this.scrollView._component.scrollTo({ x: offset, animated });
      }
    }
  }
  render() {
    return (
      <AnimatedScrollView
        ref={this.setScrollView}
        key="scrollContent"
        horizontal={true}
        onScroll={this.onScroll}
        automaticallyAdjustContentInsets={false}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        scrollEventThrottle={16}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={this.props.swipeable}
        directionalLockEnabled={true}
        keyboardDismissMode="on-drag"
        pagingEnabled={true}
      >
        { this.getTabPanes() }
      </AnimatedScrollView>
    );
  }
}

export default TabContent;
