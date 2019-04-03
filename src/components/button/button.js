/* eslint-disable react/require-default-props */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ViewPropTypes,
  ColorPropType,
} from 'react-native';
import { RatioUtils } from '../../utils';
import Icon from '../iconfont';
import TYText from '../TYText';

const { convert } = RatioUtils;

const styles = StyleSheet.create({
  warpper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderStyle: {
    // borderColor: '#EEE',
    // borderWidth: StyleSheet.hairlineWidth
  },
  defaultBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 5,
  },
  normalSizeBtn: {
    width: convert(20),
    height: convert(20),
    borderRadius: convert(10),
  },
  smallSizeBtn: {
    width: convert(16),
    height: convert(16),
    borderRadius: convert(8),
    marginBottom: convert(2),
  },
  largeSizeBtn: {
    width: convert(24),
    height: convert(24),
    borderRadius: convert(12),
  },
  normalTypeBtn: {
    backgroundColor: '#fff',
  },
  primaryTypeBtn: {
    backgroundColor: '#FF5800',
  },
  textStyle: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  badge: {
    borderRadius: convert(8),
    paddingHorizontal: convert(8),
    paddingVertical: convert(2),
    position: 'absolute',
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
  },
});

class CircleBtn extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,

    size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'normal', 'small']), PropTypes.number]),
    type: PropTypes.oneOf(['primary', 'normal']),
    text: PropTypes.string,
    icon: PropTypes.string,
    iconPath: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: ColorPropType,
    image: Image.propTypes.source,
    imageColor: ColorPropType,
    badgeText: PropTypes.string,

    disabledOpacity: PropTypes.number,

    style: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    border: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    textStyle: Text.propTypes.style,
    badgeStyle: ViewPropTypes.style,
    badgeTextStyle: Text.propTypes.style,

    onPress: PropTypes.func,
    onLayout: PropTypes.func,

    textAccessibilityLabel: PropTypes.string,
    badgeAccessibilityLabel: PropTypes.string,
    badgeTextAccessibilityLabel: PropTypes.string,
  };
  static defaultProps = {
    border: true,
    size: 'normal',
    type: 'normal',
    text: '',
    icon: undefined,
    iconPath: null,
    iconSize: 16,
    iconColor: '#333',
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
    onPress: () => {},
    onLayout: () => {},
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

  getChild = (btnSizeStyle, customTextStyle) => {
    const {
      children,
      icon,
      image,
      text,
      iconPath,
      imageColor,
      iconSize,
      iconColor,
      textAccessibilityLabel,
      disabled,
      disabledOpacity,
      textStyle,
    } = this.props;
    const childCount = React.Children.count(children);
    let hasChild = true;
    let child = null;
    if (childCount > 1) {
      throw new Error('only contain one elements');
    } else if (childCount === 1) {
      child = children;
    } else if (icon || image || iconPath) {
      const { width, height, borderRadius } = StyleSheet.flatten(btnSizeStyle);
      const imageStyle = {
        width,
        height,
        borderRadius,
        resizeMode: 'stretch',
        tintColor: imageColor,
      };
      child = image ? (
        <Image source={image} style={imageStyle} />
      ) : (
        <Icon name={icon} d={iconPath} size={iconSize} color={iconColor} />
      );
    } else {
      hasChild = false;
      child = (
        <TYText style={[customTextStyle, textStyle]} accessibilityLabel={textAccessibilityLabel}>
          {text}
        </TYText>
      );
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
  renderButton = () => {
    const {
      type,
      text,
      size,
      disabled,
      badgeText,
      textStyle,
      badgeStyle,
      badgeTextStyle,
      style,
      textAccessibilityLabel,
      badgeAccessibilityLabel,
      badgeTextAccessibilityLabel,
      ...otherProps
    } = this.props;
    // borderWidth bug on Andiord, so borderWidth must be 0, keep smile
    // const customBorder = this.getBorderStyle();
    // content
    // Size
    const preSizeStyle =
      typeof size === 'number'
        ? { width: size, height: size, borderRadius: size / 2 }
        : styles[`${size}SizeBtn`];

    const btnSizeStyle = [preSizeStyle, style];
    // border
    const borderStyle = [
      styles.defaultBtn,
      styles[`${type}TypeBtn`],
      btnSizeStyle,
      // styles.borderStyle,
      // customBorder,
    ];
    // text
    const customTextStyle = [styles.textStyle, disabled && { opacity: 0.5 }];

    const { hasChild, child } = this.getChild(btnSizeStyle, customTextStyle);

    const finalTextStyle = [customTextStyle, hasChild && { marginTop: 5 }, textStyle];

    // badge
    if (
      !this.badgePosition &&
      this.state.iconLayout &&
      this.state.borderLayout &&
      this.state.badgeLayout
    ) {
      const { iconLayout, borderLayout } = this.state;
      this.badgePosition = {
        left: iconLayout.x + borderLayout.x + iconLayout.width - this.state.badgeLayout.width / 2,
        top: iconLayout.y + borderLayout.y - this.state.badgeLayout.height / 2,
      };
    }
    const customBadgeStyle = [
      styles.badge,
      this.badgePosition && { left: this.badgePosition.left, top: this.badgePosition.top },
      badgeStyle,
    ];
    return (
      <TouchableOpacity style={styles.warpper} disabled={disabled} {...otherProps}>
        <View style={borderStyle} onLayout={this.borderLayout}>
          <View onLayout={this.iconLayout} style={[style.warpper, { overflow: 'hidden' }]}>
            {child}
          </View>
        </View>
        {badgeText ? (
          <View
            style={customBadgeStyle}
            onLayout={this.badgeLayout}
            accessibilityLabel={badgeAccessibilityLabel}
          >
            <TYText
              style={[styles.badgeText, badgeTextStyle]}
              accessibilityLabel={badgeTextAccessibilityLabel}
            >
              {badgeText}
            </TYText>
          </View>
        ) : null}
        {hasChild && text ? (
          <TYText style={finalTextStyle} accessibilityLabel={textAccessibilityLabel}>
            {text}
          </TYText>
        ) : null}
      </TouchableOpacity>
    );
  };
  render() {
    const { onLayout, wrapperStyle } = this.props;
    return (
      <View style={[styles.warpper, wrapperStyle]} onLayout={onLayout}>
        {this.renderButton()}
      </View>
    );
  }
}

export default CircleBtn;
