/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  ColorPropType,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import color from 'color';
import PropTypes from 'prop-types';
import Svg, { Rect } from 'react-native-svg';
import { ACTIVEOPACITY, STYLES, mergeActions, LOADINGSIZE, ACTIONS, BASERADIUS } from './config';
import TYText from '../TYText';
import Loading from './loading';
import LinearGradient from '../gradient/linear-gradient';
import { RatioUtils } from '../../utils';

const { convertX: cx } = RatioUtils;

const styles = StyleSheet.create({
  loading: {
    marginRight: cx(8),
  },

  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default class BrickButton extends React.PureComponent {
  static propTypes = {
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * 点击事件
     */
    onPress: PropTypes.func,
    /**
     * 事件监听
     */
    onChange: PropTypes.func,
    /**
     * loading状态
     */
    loading: PropTypes.bool,
    /**
     * 按钮文字
     */
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    /**
     * 按钮文字样式
     */
    textStyle: Text.propTypes.style,
    /**
     * 按钮类型
     */
    type: PropTypes.oneOf(['primary', 'primaryGradient', 'primaryBorder', 'normal', 'small']),
    /**
     * 按钮内部包裹内容样式
     */
    wrapperStyle: ViewPropTypes.style,
    /**
     * 按下背景色
     */
    backgroundColorTouched: ColorPropType,
    /**
     * 是否可以点击
     */
    disabled: PropTypes.bool,
    /**
     * 按钮点按时的颜色
     */
    underlayColor: ColorPropType,
    /**
     * 按钮按下透明度
     */
    activeOpacity: PropTypes.number,
    /**
     * 是否显示按钮点击时的颜色
     */
    showUnderlay: PropTypes.bool,
    /**
     * loading组件主颜色
     */
    loadingColor: ColorPropType,
    /**
     * loading背景颜色
     */
    loadingBackground: ColorPropType,
    /**
     * loading大小
     */
    loadingSize: PropTypes.oneOfType([PropTypes.oneOf(['small', 'large']), PropTypes.number]),
    /**
     * loading样式
     */
    loadingStyle: ViewPropTypes.style,
    /**
     * loading外边框粗细
     */
    loadingStrokeWidth: PropTypes.number,
    /**
     * 渐变背景
     */
    background: PropTypes.object,
  };

  static defaultProps = {
    style: {},
    onPress: () => {},
    onChange: () => {},
    loading: false,
    text: '',
    type: 'primary',
    wrapperStyle: {},
    textStyle: {},
    disabled: false,
    underlayColor: 'transparent',
    activeOpacity: 1,
    showUnderlay: false,
    backgroundColorTouched: null,
    loadingColor: '#fff',
    loadingBackground: 'rgba(0,0,0,.1)',
    loadingStyle: {},
    loadingSize: 'small',
    loadingStrokeWidth: cx(2),
    background: {
      x1: '0%',
      y1: '0%',
      x2: '0%',
      y2: '100%',
      stops: {
        '0%': 'red',
        '30%': 'blue',
        '100%': 'yellow',
      },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      init: false,
      showUnderlay: props.showUnderlay,
      layout: {
        width: 0,
        height: 0,
        textWidth: 0,
      },
      // isTextOverFlow: false
    };
  }

  onPress = (...args) => {
    const { onPress } = this.props;
    onPress && onPress(...args);
  };

  /**
   * @description Unified external exposure of the event
   * @param {string} [eventName='']
   * @param {*} args
   */
  onChange = (eventName = '', ...args) => {
    const { onChange } = this.props;
    switch (eventName) {
      case 'onShowUnderlay':
        this.setState({ showUnderlay: true });
        break;
      case 'onHideUnderlay':
        this.setState({ showUnderlay: false });
        break;
      default:
        break;
    }
    onChange && onChange(eventName, ...args);
  };

  onLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }) => {
    if(this.state.init) return;
    // this.measureText();
    this.setState({
      layout: { ...this.state.layout, width, height },
      init: true,
    });
  };

  getLayoutStyle = () => {
    const { type, wrapperStyle, disabled, textStyle } = this.props;
    const wrapper = StyleSheet.flatten([
      styles.wrapper,
      STYLES[`${type}`].style,
      wrapperStyle,
      disabled && { backgroundColor: STYLES[`${type}`].backgroundColorDisabled },
    ]);
    const contentTextStyle = StyleSheet.flatten([
      STYLES[`${type}`].textStyle,
      textStyle,
      disabled && { color: STYLES[`${type}`].textDisabledColor },
    ]);
    const { borderColor } = StyleSheet.flatten([
      wrapper,
      type === 'primaryBorder' &&
        disabled && {
        borderColor: STYLES[`${type}`].borderColorDisabled,
      },
    ]);
    const textColor = contentTextStyle.color;
    const backgroundColor =
      type === 'primaryGradient' && !disabled ? 'transparent' : wrapper.backgroundColor;
    return { wrapper, contentTextStyle, borderColor, textColor, backgroundColor };
  };

  measureIsTextSizeToSmall = () => {
    const { width: w } = this.state.layout;
    const minWidth = STYLES.small.style.width;
    return w <= minWidth;
  };

  renderLinearGradient = radius => {
    const { init, layout } = this.state;
    const { background } = this.props;
    const { width, height } = layout;
    if (!init) return;
    return (
      <View
        style={{
          width,
          height,
          position: 'absolute',
        }}
      >
        <LinearGradient {...background}>
          <Rect x="0" y="0" rx={radius} ry={radius} width={width} height={height} />
        </LinearGradient>
      </View>
    );
  };

  renderMaskView = (width, height, radius, fill) => {
    if (!width && !height) return;
    return (
      <View
        style={{
          width,
          height,
          position: 'absolute',
        }}
      >
        <Svg width={width} height={height}>
          <Rect x="0" y="0" rx={radius} ry={radius} width={width} height={height} fill={fill} />
        </Svg>
      </View>
    );
  };

  renderLoadingView = () => {
    const {
      loadingColor,
      loadingStyle,
      text,
      type,
      loadingSize,
      loading,
      loadingBackground,
      loadingStrokeWidth,
    } = this.props;
    if (!loading) return;
    const isWrapperSmall = this.measureIsTextSizeToSmall();
    const size = typeof loadingSize === 'string' ? LOADINGSIZE[loadingSize] : loadingSize;
    return (
      <Loading
        size={size}
        style={[text && type !== 'small' && !isWrapperSmall && styles.loading, loadingStyle]}
        color={loadingColor}
        loading={loading}
        backgroundColor={loadingBackground}
        strokeWidth={loadingStrokeWidth}
      />
    );
  };

  renderContentTextView = (textStyle = {}) => {
    const { text, loading, type } = this.props;
    const str = Array.isArray(text) ? text.join('') : text;
    const isWrapperSmall = this.measureIsTextSizeToSmall();
    if (loading && (type === 'small' || isWrapperSmall)) return;
    return (
      <TYText ref={ref => (this._text = ref)} text={str} style={textStyle} numberOfLines={1} />
    );
  };

  render() {
    const { type, style, loading, disabled, underlayColor, activeOpacity } = this.props;
    const { layout, showUnderlay } = this.state;
    const {
      wrapper,
      contentTextStyle,
      borderColor,
      textColor,
      backgroundColor,
    } = this.getLayoutStyle();
    const { width, height } = layout;
    const radius = typeof wrapper.borderRadius !== 'undefined' ? wrapper.borderRadius : BASERADIUS;
    const events = mergeActions(ACTIONS, this.onChange);
    const fill =
      type === 'primaryBorder'
        ? color(wrapper.borderColor)
          .alpha(0.1)
          .rgbString()
        : 'rgba(0,0,0,.1)';
    return (
      <TouchableHighlight
        onPress={this.onPress}
        activeOpacity={activeOpacity || ACTIVEOPACITY}
        disabled={disabled}
        underlayColor={underlayColor}
        {...events}
        style={[style, layout.width && layout.height && { width: layout.width, height: layout.height }]}
      >
        <View style={[wrapper, { backgroundColor, borderColor }]} onLayout={this.onLayout}>
          {type === 'primaryGradient' && !disabled && this.renderLinearGradient(radius)}
          {this.renderLoadingView()}
          {this.renderContentTextView(
            [
              contentTextStyle,
              loading && {
                color: color(textColor)
                  .alpha(0.7)
                  .rgbString(),
              },
            ],
            wrapper
          )}
          {showUnderlay && this.renderMaskView(width, height, radius, fill)}
        </View>
      </TouchableHighlight>
    );
  }
}
