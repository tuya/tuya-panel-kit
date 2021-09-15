/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { PanResponder, StyleSheet, View, Animated, Easing, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import NativeButton from './nativeButton';

const SwipeoutButton = props => {
  const swipeoutBtnStyle = [styles.swipeoutBtn];
  // type
  if (props.type === 'delete') {
    swipeoutBtnStyle.push(styles.colorDelete);
  }
  if (props.type === 'primary') {
    swipeoutBtnStyle.push(styles.colorPrimary);
  }
  if (props.type === 'secondary') {
    swipeoutBtnStyle.push(styles.colorSecondary);
  }
  // background
  if (props.backgroundColor) {
    swipeoutBtnStyle.push([{ backgroundColor: props.backgroundColor }]);
  }
  // height|width
  swipeoutBtnStyle.push([
    {
      height: props.height,
      width: props.width,
    },
  ]);

  const swipeoutBtnContentStyle = {
    height: props.height,
    width: props.width,
  };

  // textColor
  const swipeoutBtnTextStyle = [props.textStyle, styles.swipeoutBtnText];
  if (props.color) {
    swipeoutBtnTextStyle.push([{ color: props.color }]);
  }
  if (props.fontSize) {
    swipeoutBtnTextStyle.push([{ fontSize: props.fontSize }]);
  }
  return (
    <NativeButton
      onPress={props.onPress || null}
      disabled={props.disabled || false}
      style={[styles.swipeoutBtnWrapperStyle, swipeoutBtnStyle]}
      textStyle={swipeoutBtnTextStyle}
    >
      {props.content ? <View style={swipeoutBtnContentStyle}>{props.content}</View> : props.text}
    </NativeButton>
  );
};

class Swipeout extends React.Component {
  static defaultProps = {
    accessibilityLabel: 'Swipeout',
    disabled: false,
    rowID: -1,
    sectionID: -1,
    sensitivity: 50,
  };

  static propTypes = {
    /**
     * 测试标志
     */
    accessibilityLabel: PropTypes.string,
    /**
     * 是否禁用swipeout所提供的侧滑操作
     */
    disabled: PropTypes.bool,
    /**
     * 往左滑出现的按钮
     */
    left: PropTypes.array,
    /**
     * 往右滑出现的按钮
     */
    right: PropTypes.array,
    /**
     * 侧滑之后出现按钮的宽度
     */
    buttonWidth: PropTypes.number,
    /**
     * 任意一侧按钮全显示的回调
     */
    onOpen: PropTypes.func,
    /**
     * 任意一侧按钮全隐藏的回调
     */
    onClose: PropTypes.func,
    /**
     * 侧滑的距离
     */
    sensitivity: PropTypes.number,
    /**
     * 滑动回调函数
     */
    scroll: PropTypes.func,
    /**
     * 滑动结束函数
     */
    onScrollEnd: PropTypes.func,
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * 当close从false变为true时，会隐藏所有侧滑操作按钮。反过来true变为false无任何变化。
     */
    close: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      contentDot: new Animated.Value(0),
      contentDotNum: 0,
      btnWidth: 0,
      leftWidth: 0,
      rightWidth: 0,
      contentHeight: 0,
      contentWidth: 0,
      openedRight: false,
      openedLeft: false,
      swiping: false,
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => this.state.openedLeft || this.state.openedRight,
      onMoveShouldSetPanResponderCapture: (event, gestureState) =>
        Math.abs(gestureState.dx) > this.props.sensitivity &&
        Math.abs(gestureState.dy) <= this.props.sensitivity,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
      onShouldBlockNativeResponder: /* istanbul ignore next */ () => false,
      onPanResponderTerminationRequest: () => false,
    });
    this.state.contentDot.addListener(obj => {
      this.setState({
        contentDotNum: obj.value,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.close) this.onHide();
  }

  onLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      contentWidth: width,
      contentHeight: height,
    });
  };

  onOpen = () => {
    const { onOpen, sectionID, rowID } = this.props;
    if (onOpen && typeof onOpen === 'function') onOpen(sectionID, rowID);
  };

  onClose = () => {
    const { onClose, sectionID, rowID } = this.props;
    if (onClose && typeof onClose === 'function') onClose(sectionID, rowID);
  };

  onShow = (contentDot, direction, duration) => {
    const left = direction === 'left';
    this.onOpen();
    Animated.timing(this.state.contentDot, {
      duration,
      easing: Easing.linear,
      delay: 0,
      toValue: contentDot,
    }).start(() => {
      this.setState({
        openedLeft: left,
        openedRight: !left,
        swiping: false,
      });
    });
  };

  onHide = () => {
    const { sectionID, rowID, onClose } = this.props;
    const { openedLeft, openedRight } = this.state;
    if (onClose && (openedLeft || openedRight)) {
      const direction = openedRight ? 'right' : 'left';
      onClose(sectionID, rowID, direction);
    }
    Animated.timing(this.state.contentDot, {
      duration: 160,
      easing: Easing.linear,
      delay: 0,
      toValue: 0,
    }).start(() => {
      this.setState({
        openedRight: false,
        openedLeft: false,
        swiping: false,
      });
    });
  };

  grantMeasureCallback = (x, y, width) => {
    const { left, right, buttonWidth } = this.props;
    const btnWidth = buttonWidth || width / 5;
    this.setState({
      btnWidth,
      leftWidth: left ? left.length * btnWidth : 0,
      rightWidth: right ? right.length * btnWidth : 0,
      swiping: true,
    });
  };

  handlePanResponderGrant = () => {
    const { disabled } = this.props;
    if (disabled) return;
    const { openedLeft, openedRight } = this.state;
    if (!openedLeft && !openedRight) {
      this.onOpen();
    } else {
      this.onClose();
    }
    this.swipeoutContent.measure(this.grantMeasureCallback);
  };

  handlePanResponderMove = (e, gestureState) => {
    const { disabled } = this.props;
    const { openedLeft, openedRight, leftWidth, rightWidth } = this.state;
    if (disabled) return;
    let { dx } = gestureState;
    const { dy } = gestureState;
    if (openedRight) {
      dx -= rightWidth;
    } else if (openedLeft) {
      dx += leftWidth;
    }
    const moveHorizontal = Math.abs(dx) > Math.abs(dy);
    if (this.props.scroll) {
      if (moveHorizontal) {
        this.props.scroll(false);
      } else {
        this.props.scroll(true);
      }
    }
    if (!this.state.swiping) return;
    if (dx < 0 && this.props.right) {
      this.state.contentDot.setValue(dx);
    } else if (dx > 0 && this.props.left) {
      this.state.contentDot.setValue(dx);
    }
  };

  handlePanResponderEnd = (e, gestureState) => {
    const { disabled } = this.props;
    const {
      openedLeft,
      openedRight,
      leftWidth,
      rightWidth,
      contentDotNum,
      contentWidth,
      swiping,
    } = this.state;
    if (disabled) return;
    const { dx } = gestureState;
    const openX = contentWidth * 0.33;
    let openLeft = dx > openX || dx > leftWidth / 2;
    let openRight = dx < -openX || dx < -rightWidth / 2;
    if (openedRight) {
      openRight = dx - openX < -openX;
    }
    if (openedLeft) {
      openLeft = dx + openX > openX;
    }
    if (swiping) {
      if (openRight && contentDotNum < 0 && dx < 0) {
        this.onShow(-rightWidth, 'right', dx > openX ? 350 : 160);
      } else if (openLeft && contentDotNum > 0 && dx > 0) {
        this.onShow(leftWidth, 'left');
      } else {
        this.onHide();
      }
    }
    if (this.props.onScrollEnd) {
      this.props.onScrollEnd();
    }
  };

  autoClose = btn => {
    const { onPress } = btn;
    if (this.props.autoClose) this.onHide();
    if (onPress && typeof onPress === 'function') {
      onPress();
    }
  };

  renderButtons = (btnsArray, visible, style) => {
    const { accessibilityLabel } = this.props;
    if (btnsArray && visible) {
      return (
        <Animated.View style={style}>
          {btnsArray.map((btn, index) => (
            <SwipeoutButton
              backgroundColor={btn.backgroundColor}
              color={btn.color}
              disabled={btn.disabled}
              key={btn.key || index}
              accessibilityLabel={`${accessibilityLabel}_${btn.key || index}`}
              onPress={() => this.autoClose(btn)}
              text={btn.text}
              content={btn.content}
              type={btn.type}
              width={this.state.btnWidth}
              height={this.state.contentHeight}
              fontSize={btn.fontSize}
              textStyle={btn.textStyle}
            />
          ))}
        </Animated.View>
      );
    }
  };

  render() {
    const { accessibilityLabel } = this.props;
    const { contentDotNum, contentWidth } = this.state;
    const styleSwipeout = [styles.swipeout, this.props.style];
    if (this.props.backgroundColor) {
      styleSwipeout.push([{ backgroundColor: this.props.backgroundColor }]);
    }
    const styleLeft = [
      styles.swipeoutBtns,
      {
        left: 0,
        overflow: 'hidden',
        width: contentDotNum,
      },
    ];
    const styleRight = [
      styles.swipeoutBtns,
      {
        right: 0,
        left: Math.abs(contentWidth + contentDotNum),
      },
    ];
    const styleContent = [
      styles.swipeoutContent,
      {
        left: this.state.contentDot,
      },
    ];
    const isRightVisible = contentDotNum < 0;
    const isLeftVisible = contentDotNum > 0;
    return (
      <View style={styleSwipeout}>
        <Animated.View style={styleContent}>
          <View
            ref={ref => {
              this.swipeoutContent = ref;
            }}
            accessibilityLabel={accessibilityLabel}
            // style={styleContent}
            onLayout={this.onLayout}
            {...this.panResponder.panHandlers}
          >
            {this.props.children}
          </View>
        </Animated.View>
        {this.renderButtons(this.props.left, isLeftVisible, styleLeft)}
        {this.renderButtons(this.props.right, isRightVisible, styleRight)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  colorDelete: {
    backgroundColor: '#fb3d38',
  },
  colorPrimary: {
    backgroundColor: '#006fff',
  },
  colorSecondary: {
    backgroundColor: '#fd9427',
  },
  swipeout: {
    backgroundColor: '#dbddde',
    overflow: 'hidden',
  },
  swipeoutBtn: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  swipeoutBtnText: {
    color: '#fff',
    textAlign: 'center',
  },
  swipeoutBtnWrapperStyle: {
    flex: 1,
  },
  swipeoutBtns: {
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  swipeoutContent: {},
});

export default Swipeout;
