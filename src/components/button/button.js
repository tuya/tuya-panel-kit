/* eslint-disable no-bitwise */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ViewPropTypes, ColorPropType, StyleSheet } from 'react-native';
import { Rect } from 'react-native-svg';
import LinearGradient from '../gradient/linear-gradient';
import RadialGradient from '../gradient/radial-gradient';
import {
  SIZE_MAP,
  StyledBtnWrapper,
  StyledBtnContainer,
  StyledBtn,
  StyledBtnText,
  StyledBadge,
  StyledBadgeText,
  StyledIconFont,
} from './styled';
import { RatioUtils } from '../../utils';

const { convertX: cx } = RatioUtils;

class CircleBtn extends React.PureComponent {
  static propTypes = {
    /**
     * 按钮是否拉伸，跟随父容器
     */
    stretch: PropTypes.bool,
    /**
     * 按钮是否禁用
     */
    disabled: PropTypes.bool,
    /**
     * 按钮背景尺寸，默认为`noSet`，即默认不设置，
     * large -> 48,
     * normal -> 40,
     * small -> 32,
     */
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['large', 'normal', 'small', 'noSet']),
      PropTypes.number,
    ]),
    /**
     * 按钮背景类型，默认为`normal`，即默认背景色为`transparent`，
     * 若为`primary`，则跟随主色
     */
    type: PropTypes.oneOf(['primary', 'normal']),
    /**
     * 按钮背景，默认为`null`，可为颜色值或渐变值
     */
    background: PropTypes.oneOfType([ColorPropType, PropTypes.object]),
    /**
     * 按钮内的文字内容
     */
    text: PropTypes.string,
    /**
     * 按钮内的文字是否只显示一行，即超出显示省略号，默认为`true`
     */
    textSingleLine: PropTypes.bool,
    /**
     * 按钮内的文字排列方向，默认放置文字位于按钮底部
     */
    textDirection: PropTypes.oneOf(['left', 'top', 'right', 'bottom', 'center']),
    /**
     * 按钮内的 IconFont`名称`
     */
    icon: PropTypes.string,
    /**
     * 按钮内的 IconFont `path`
     */
    iconPath: PropTypes.string,
    /**
     * 按钮内的 IconFont 尺寸
     */
    iconSize: PropTypes.number,
    /**
     * 按钮内的 IconFont 颜色
     */
    iconColor: ColorPropType,
    /**
     * 按钮内的 image 图片资源路径
     */
    image: Image.propTypes.source,
    /**
     * 按钮内的 image 图片颜色
     */
    imageColor: ColorPropType,
    /**
     * 按钮内的 image 样式
     */
    imageStyle: ViewPropTypes.style,
    /**
     * 徽标字体内容，即按钮右上角徽标
     */
    badgeText: PropTypes.string,
    /**
     * 按钮内容的禁用透明度比例
     */
    disabledOpacity: PropTypes.number,
    /**
     * 按钮的样式
     */
    style: ViewPropTypes.style,
    /**
     * 最外层容器的样式
     */
    wrapperStyle: ViewPropTypes.style,
    /**
     * 按钮背景的边框值，安卓有瑕疵，暂时不用
     */
    border: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    /**
     * 按钮内字体样式
     */
    textStyle: Text.propTypes.style,
    /**
     * 按钮内徽标容器的样式
     */
    badgeStyle: ViewPropTypes.style,
    /**
     * 按钮内徽标字体的样式
     */
    badgeTextStyle: Text.propTypes.style,
    /**
     * 按钮点击回调
     */
    onPress: PropTypes.func,
    /**
     * 按钮布局完毕回调
     */
    onLayout: PropTypes.func,
    /**
     * 是否使用 ART 实现版本
     */
    useART: PropTypes.bool,
    /**
     * 测试标志
     */
    textAccessibilityLabel: PropTypes.string,
    /**
     * 测试标志
     */
    badgeAccessibilityLabel: PropTypes.string,
    /**
     * 测试标志
     */
    badgeTextAccessibilityLabel: PropTypes.string,
  };

  static defaultProps = {
    stretch: false,
    border: true,
    size: 'noSet',
    type: 'normal',
    background: null,
    text: '',
    textSingleLine: true,
    textDirection: 'bottom',
    icon: undefined,
    iconPath: null,
    iconSize: null,
    iconColor: null,
    image: null,
    badgeText: '',
    style: {},
    wrapperStyle: {},
    textStyle: {},
    badgeStyle: {},
    badgeTextStyle: {},
    disabled: false,
    disabledOpacity: 0.2,
    imageColor: null,
    imageStyle: null,
    onPress: () => {},
    onLayout: () => {},
    useART: false,
    textAccessibilityLabel: 'Button_Text',
    badgeAccessibilityLabel: 'Button_Badge',
    badgeTextAccessibilityLabel: 'Button_Badge_Text',
  };

  constructor(props) {
    super(props);
    this.state = {
      borderLayout: null,
      iconLayout: null,
    };
    this.badgePosition = null;
  }

  getBorderStyle = () => {
    const { border } = this.props;
    if (!border) {
      // border: false; border: 0; border: ''; border: undefined, mean no border
      return { borderWidth: 0 };
    }
    if (this.state.borderLayout && this.state.badgeLayout) {
      const { x, y, width } = this.state.borderLayout;
      this.badgePosition = {
        left: x + width - this.state.badgeLayout.width / 2,
        top: y,
      };
    }
    if (typeof border === 'boolean') {
      // border: true, use default
      return null;
    } else if (typeof border === 'number') {
      // border: numer, set width
      return { borderWidth: border };
    }
    // border: string
    const borderParamsArray = border.split(' ');
    if (borderParamsArray.length === 1) {
      // only set width
      return { borderWidth: parseFloat(border) };
    }
    if (borderParamsArray.length === 2) {
      // set width and style
      return {
        borderWidth: parseFloat(borderParamsArray[0]),
        borderStyle: borderParamsArray[1],
      };
    }
    if (borderParamsArray.length === 3) {
      // set all params
      return {
        borderWidth: parseFloat(borderParamsArray[0]),
        borderStyle: borderParamsArray[1],
        borderColor: borderParamsArray[2],
      };
    }
  };

  getChild = () => {
    const {
      type,
      children,
      icon,
      image,
      iconPath,
      imageColor,
      iconSize,
      iconColor,
      disabled,
      disabledOpacity,
      imageStyle,
      size,
      useART,
    } = this.props;
    const childCount = React.Children.count(children);
    let hasChild = true;
    let child = null;
    if (childCount > 1) {
      throw new Error('only contain one elements');
    } else if (childCount === 1) {
      child = children;
    } else if (icon || image || iconPath) {
      const cImageStyle = {
        resizeMode: 'stretch',
        tintColor: imageColor,
      };
      let customIconSize = cx(40);
      if (SIZE_MAP[size]) {
        customIconSize = cx(SIZE_MAP[size]);
      } else if (typeof size === 'number') {
        customIconSize = size;
      }
      if (iconSize) {
        customIconSize = iconSize;
      }
      child = image ? (
        <Image source={image} style={[cImageStyle, imageStyle]} />
      ) : (
        <StyledIconFont
          type={type}
          name={icon}
          d={iconPath}
          size={customIconSize}
          color={iconColor}
          useART={useART}
        />
      );
    } else {
      hasChild = false;
      child = this.renderText();
    }

    child = React.cloneElement(child, {
      style: [child.props.style, { opacity: disabled ? disabledOpacity : 1 }],
    });
    return { hasChild, child };
  };

  borderLayout = e => {
    this.setState({
      borderLayout: e.nativeEvent.layout,
    });
  };

  iconLayout = e => {
    this.setState({
      iconLayout: e.nativeEvent.layout,
    });
  };

  badgeLayout = e => {
    this.setState({
      badgeLayout: e.nativeEvent.layout,
    });
  };

  renderBackground = () => {
    const { size, background } = this.props;
    if (typeof background === 'string') {
      return <View style={[StyleSheet.absoluteFill, { backgroundColor: background }]} />;
    } else if (background && typeof background === 'object' && background.stops) {
      const { width, height } = StyleSheet.flatten([style]);
      const dimension = typeof size === 'number' ? size : SIZE_MAP[size];
      const style = { width: width || dimension, height: height || dimension };
      const { x1 = '0%', y1 = '0%', x2 = '0%', y2 = '100%', stops } = background;
      if (Array.isArray(stops)) {
        return <RadialGradient style={style} stops={stops} />;
      }
      return (
        <LinearGradient style={style} stops={stops} x1={x1} y1={y1} x2={x2} y2={y2}>
          <Rect x="0" y="0" {...style} />
        </LinearGradient>
      );
    }
    return null;
  };

  renderText = textDirection => {
    const { disabled, text, textAccessibilityLabel, textSingleLine, textStyle } = this.props;
    return (
      <StyledBtnText
        style={textStyle}
        disabled={disabled}
        accessibilityLabel={textAccessibilityLabel}
        numberOfLines={textSingleLine ? 1 : null}
        textDirection={textDirection}
      >
        {text}
      </StyledBtnText>
    );
  };

  renderButton = () => {
    const {
      stretch,
      type,
      size,
      disabled,
      badgeText,
      text,
      badgeStyle,
      badgeTextStyle,
      style,
      textDirection,
      badgeAccessibilityLabel,
      badgeTextAccessibilityLabel,
      ...otherProps
    } = this.props;
    // borderWidth bug on Andiord, so borderWidth must be 0, keep smile
    // const customBorder = this.getBorderStyle();
    // badge
    if (
      !this.badgePosition &&
      this.state.iconLayout &&
      // this.state.borderLayout &&
      this.state.badgeLayout
    ) {
      const { iconLayout } = this.state;
      this.badgePosition = {
        left: iconLayout.x + iconLayout.width - this.state.badgeLayout.width / 2,
        top: iconLayout.y - this.state.badgeLayout.height / 2,
      };
    }
    const customBadgeStyle = [
      this.badgePosition && { left: this.badgePosition.left, top: this.badgePosition.top },
      badgeStyle,
    ];
    // text
    const { hasChild, child } = this.getChild();
    const direction =
      !!text && (textDirection === 'left' || textDirection === 'right') ? 'row' : 'column';
    const isTextBefore = ~['left', 'top'].indexOf(textDirection);
    return (
      <StyledBtnContainer
        style={{ flexDirection: direction }}
        disabled={disabled}
        activeOpacity={0.6}
        stretch={stretch}
        {...otherProps}
      >
        {hasChild && !!text && isTextBefore ? this.renderText(textDirection) : null}
        <StyledBtn type={type} size={size} onLayout={this.iconLayout} style={style}>
          {this.renderBackground()}
          {child}
        </StyledBtn>
        {badgeText ? (
          <StyledBadge
            style={customBadgeStyle}
            onLayout={this.badgeLayout}
            accessibilityLabel={badgeAccessibilityLabel}
          >
            <StyledBadgeText
              style={badgeTextStyle}
              accessibilityLabel={badgeTextAccessibilityLabel}
            >
              {badgeText}
            </StyledBadgeText>
          </StyledBadge>
        ) : null}
        {hasChild && !!text && !isTextBefore ? this.renderText(textDirection) : null}
      </StyledBtnContainer>
    );
  };

  render() {
    const { stretch, onLayout, wrapperStyle, wrapperProps = {} } = this.props;
    return (
      <StyledBtnWrapper
        {...wrapperProps}
        style={wrapperStyle}
        onLayout={onLayout}
        stretch={stretch}
      >
        {this.renderButton()}
      </StyledBtnWrapper>
    );
  }
}

export default CircleBtn;
