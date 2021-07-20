/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Animated,
  ActivityIndicator,
  Easing,
  PanResponder,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import { RatioUtils } from '../../utils';
import { AnimatedView } from './styled';
import { FRICTION_LEVEL } from './constant';
import { getSiblingIndex, getNearestIndexByDeltaX } from './utils';
import TabPanel from './tab-panel';

const { winWidth } = RatioUtils;

export default class TabContent extends Component {
  static propTypes = {
    /**
     * 测试标识
     */
    accessibilityLabel: PropTypes.string,
    /**
     * TabContent样式
     */
    style: ViewPropTypes.style,
    /**
     * 当前激活所处的索引
     */
    activeIndex: PropTypes.number.isRequired,
    /**
     * 是否禁用 TabContent
     */
    disabled: PropTypes.bool,
    /**
     * TabContent 是否需要预加载
     */
    preload: PropTypes.bool,
    /**
     * TabContent 预加载延时时间
     */
    preloadTimeout: PropTypes.number,
    /**
     * 加速度阈值，滑动速率超过该阈值直接判断为下一页
     */
    velocityThreshold: PropTypes.number,
    /**
     * TabContent 滑动回调
     */
    onMove: PropTypes.func,
    /**
     * TabContent 滑动结束时回调
     */
    onRelease: PropTypes.func,
    /**
     * 自定义渲染预加载中的占位容器
     */
    renderPlaceholder: PropTypes.func,
    /**
     * 嵌套子元素
     */
    children: PropTypes.array.isRequired,
    /**
     * 动画配置
     */
    animationConfig: PropTypes.shape({
      duration: PropTypes.number,
      easing: PropTypes.func,
      delay: PropTypes.number,
      isInteraction: PropTypes.bool,
      useNativeDriver: PropTypes.bool,
    }),
  };

  static defaultProps = {
    accessibilityLabel: 'TabContent',
    style: null,
    disabled: false,
    preload: true,
    preloadTimeout: 375,
    velocityThreshold: 0.5,
    onMove: undefined,
    onRelease: undefined,
    renderPlaceholder: () => <ActivityIndicator />,
    animationConfig: {
      duration: 200,
      easing: Easing.linear,
      delay: 0,
      isInteraction: true,
      useNativeDriver: true,
    },
  };

  constructor(props) {
    super(props);
    const { activeIndex, children } = props;
    const x = -activeIndex * this.contentWidth;
    const cachedChildren = Array.isArray(children) ? new Array(children.length).fill(0) : [];
    cachedChildren[activeIndex] = children[activeIndex];
    this.state = {
      scrollX: new Animated.Value(x),
      cachedChildren,
    };
    this._bounds = [0, -this.contentWidth * children.length + this.contentWidth]; // x轴左右边界坐标
    this._curDeltaX = x; // 当前的x轴偏移量
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !this.props.disabled,
      onStartShouldSetPanResponderCapture: () => false, // 不捕获grant，否则内部的点击事件会被截断
      onMoveShouldSetPanResponder: gestureState => {
        if (this.props.disabled) return false;
        return this.isHorizontalSwipe(gestureState);
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        if (this.props.disabled) return false;
        return this.isHorizontalSwipe(gestureState); // 如果是水平滚动则捕获内部手势，用于兼容内部是ScrollView的情况
      },
      onPanResponderTerminationRequest: () => false, // 上层的responder是否能中断当前的responder
      onPanResponderGrant: this._handleGrant,
      onPanResponderMove: this._handleMove,
      onPanResponderRelease: this._handleRelease,
      // onPanResponderTerminate: this._handleRelease,
    });
  }

  componentDidMount() {
    this.preloadSibling();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.scrollToIndex(this.props.activeIndex, this.preloadSibling);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timerId);
    this.state.scrollX.stopAnimation();
  }

  get contentWidth() {
    const styleObj = StyleSheet.flatten([this.props.style]);
    return styleObj.width || winWidth;
  }

  /**
   * @param {Number} index - 滚动到哪个索引的位置
   * @param {Function} cb - 滚动完毕回调
   */
  scrollToIndex = (index, cb) => {
    const { animationConfig } = this.props;
    const toValue = -this.contentWidth * index;
    this.state.scrollX.stopAnimation();
    this._curDeltaX = toValue;
    Animated.timing(this.state.scrollX, {
      toValue,
      ...animationConfig,
    }).start(cb);
  };

  /**
   * @desc 预加载当前索引邻近的元素
   */
  preloadSibling = () => {
    const { preload, preloadTimeout, activeIndex, children } = this.props;
    if (!preload) {
      return;
    }
    const newCachedChildren = [...this.state.cachedChildren];
    if (newCachedChildren.every(child => React.isValidElement(child))) {
      return;
    }
    this._timerId = setTimeout(() => {
      const siblingIndexes = getSiblingIndex(activeIndex, 0, children.length - 1);
      [activeIndex, ...siblingIndexes].forEach(idx => {
        newCachedChildren[idx] = children[idx];
      });
      this.setState({ cachedChildren: newCachedChildren });
    }, preloadTimeout);
  };

  isHorizontalSwipe = gestureState => {
    return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3);
  };

  _moveTo(dx) {
    let deltaX = this._curDeltaX + dx;
    const [leftBound, rightBound] = this._bounds;
    if (dx > 0 && deltaX >= leftBound) {
      // console.log('超出左边界');
      deltaX = leftBound + (deltaX - leftBound) * FRICTION_LEVEL;
    } else if (dx < 0 && deltaX <= rightBound) {
      // console.log('超出右边界');
      deltaX = rightBound + (deltaX - rightBound) * FRICTION_LEVEL;
    }
    this.state.scrollX.setValue(deltaX);
    return deltaX;
  }

  _handleGrant = () => {};

  _handleMove = (e, gestureState) => {
    const { onMove } = this.props;
    const { dx } = gestureState;
    const deltaX = this._moveTo(dx);
    if (typeof onMove === 'function') {
      const index = getNearestIndexByDeltaX(deltaX, this.contentWidth);
      const ratio = Math.abs(deltaX) / this.contentWidth;
      const percent = ratio - index > 0 ? ratio - index : 1 - (index - ratio);
      onMove(gestureState, index, percent);
    }
  };

  _handleRelease = (e, gestureState) => {
    const { velocityThreshold, children, onRelease } = this.props;
    const { dx, vx } = gestureState;
    const deltaX = this._moveTo(dx);
    let extraDeltaX = deltaX;
    if (Math.abs(vx) > velocityThreshold) {
      // 避免滑动超出最后一项
      const maxDeltaX = (children.length - 1) * -this.contentWidth;
      extraDeltaX = Math.max(
        deltaX + (dx > 0 ? this.contentWidth : -this.contentWidth) * 0.5,
        maxDeltaX
      );
    }
    const index = getNearestIndexByDeltaX(extraDeltaX, this.contentWidth);
    this.scrollToIndex(index);
    if (typeof onRelease === 'function') {
      const ratio = Math.abs(deltaX) / this.contentWidth;
      const percent = ratio - index > 0 ? ratio - index : 1 - (index - ratio);
      onRelease(gestureState, index, percent);
    }
  };

  /**
   * @desc 在对应children未渲染完毕时渲染placeholder
   */
  _renderChildren = () => {
    const { accessibilityLabel, activeIndex, preload, children, renderPlaceholder } = this.props;
    if (!preload) {
      return children;
    }
    return this.state.cachedChildren.map((child, idx) => {
      if (React.isValidElement(child)) return children[idx];
      return (
        <TabPanel key={idx} accessibilityLabel={`${accessibilityLabel}_Placeholder_${idx}`}>
          {renderPlaceholder(activeIndex, children[idx])}
        </TabPanel>
      );
    });
  };

  render() {
    const { style, children } = this.props;
    return (
      <AnimatedView
        style={[
          style,
          {
            width: this.contentWidth * children.length,
            flex: 1,
            transform: [
              {
                translateX: this.state.scrollX,
              },
            ],
          },
        ]}
        {...this._panResponder.panHandlers}
      >
        {this._renderChildren()}
      </AnimatedView>
    );
  }
}
