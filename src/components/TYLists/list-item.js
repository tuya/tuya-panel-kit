/* eslint-disable new-cap */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ColorPropType,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';
import TYText from '../TYText';
import IconFont from '../iconfont';
import defaultSvg from '../iconfont/defaultSvg';

const DEFAULT_ICON_FONT_SIZE = 28;
const DEFAULT_ICON_FONT_COLOR = '#8E8E93';

export default class TYListItem extends Component {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    styles: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        container: ViewPropTypes.style,
        content: ViewPropTypes.style,
        contentLeft: ViewPropTypes.style,
        contentCenter: ViewPropTypes.style,
        contentRight: ViewPropTypes.style,
        title: Text.propTypes.style,
        subTitle: Text.propTypes.style,
      }),
    ]),
    /**
     * 是否在右边栏显示 arrow 图标
     */
    arrow: PropTypes.bool,
    /**
     * arrow 图标颜色
     */
    arrowColor: ColorPropType,
    /**
     * 是否禁用列表点击事件，注意: Action点击事件不被此影响
     */
    disabled: PropTypes.bool,
    /**
     * 是否禁用 `Action` 点击事件
     */
    actionDisabled: PropTypes.bool,
    /**
     * 标题
     */
    title: PropTypes.string,
    /**
     * 副标题
     */
    subTitle: PropTypes.string,
    /**
     * 子元素
     */
    children: PropTypes.element,
    /**
     * 左侧 Icon 类型，默认为 `auto`，根据传递进来的 `Icon` 类型自动判断，
     */
    iconType: PropTypes.oneOf(['auto', 'image', 'iconfont', 'text']),
    /**
     * 右侧 Action 类型，默认为 `auto`，根据传递进来的 `Action` 类型自动判断，
     */
    actionType: PropTypes.oneOf(['auto', 'image', 'iconfont', 'text']),
    /**
     * 图标尺寸，默认为 null，
     * 若为 Image 图片大小跟随原尺寸
     * 若为 IconFont 则拥有默认尺寸 `36`
     */
    iconSize: PropTypes.number,
    /**
     * 图标颜色，默认为 null，
     * 若为 Image 只有指定了 iconColor 才会给图片上色
     * 若为 IconFont 则拥有默认颜色 `#8E8E93`
     *
     */
    iconColor: ColorPropType,
    /**
     * 左侧 Icon 具体值，当类型为 `string`时，默认使用 `IconFont`，
     */
    Icon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
    ]),
    /**
     * 右侧 Action 具体值，当类型为 `string`时，默认使用 `TYText`
     */
    Action: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
    ]),
    /**
     * 是否需要重新渲染
     */
    needUpdate: PropTypes.bool,
    /**
     * 列表项点击回调
     */
    onPress: PropTypes.func,
  };

  static defaultProps = {
    styles: {},
    arrow: false,
    arrowColor: '#C8C8C8',
    disabled: false,
    actionDisabled: false,
    title: null,
    subTitle: null,
    children: null,
    iconSize: null,
    iconColor: null,
    iconType: 'auto',
    actionType: 'auto',
    Icon: null,
    Action: null,
    needUpdate: true,
    onPress: null,
  };

  constructor(props) {
    super(props);
    this._styles = [
      'container',
      'content',
      'contentLeft',
      'contentCenter',
      'contentRight',
      'title',
      'subTitle',
      'valueText',
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.needUpdate) {
      return false;
    }
    return shallowCompare(this, nextProps, nextState);
  }

  // merge style
  getStyle(key) {
    const { styles } = this.props;
    const defaultStyle = defaultStyles[key];
    const style = styles && styles[key];
    return [defaultStyle, style];
  }

  renderIcon({ contentLeftStyle, valueTextStyle }) {
    const { iconSize, iconType, iconColor, Icon } = this.props;
    if (!Icon) return null;
    let iconComp;
    if (iconType !== 'auto') {
      switch (iconType) {
        case 'image':
          iconComp = (
            <Image
              style={[
                iconSize && { width: iconSize, height: iconSize },
                iconColor && { tintColor: iconColor },
              ]}
              source={Icon}
            />
          );
          break;
        case 'iconfont':
          iconComp = (
            <IconFont
              size={iconSize || DEFAULT_ICON_FONT_SIZE}
              name={defaultSvg[Icon] ? Icon : undefined} // 若 name 为undefined，则会使用d
              d={Icon}
              color={iconColor || DEFAULT_ICON_FONT_COLOR}
            />
          );
          break;
        case 'text':
        default:
          iconComp = <TYText style={valueTextStyle}>{Icon}</TYText>;
          break;
      }
      return <View style={contentLeftStyle}>{iconComp}</View>;
    }
    switch (typeof Icon) {
      case 'function':
        iconComp = Icon();
        break;
      case 'string':
        iconComp = (
          <IconFont
            size={iconSize || DEFAULT_ICON_FONT_SIZE}
            name={defaultSvg[Icon] ? Icon : undefined} // 若 name 为undefined，则会使用d
            d={Icon}
            color={iconColor || DEFAULT_ICON_FONT_COLOR}
          />
        );
        break;
      case 'number':
        iconComp = (
          <Image
            style={[
              iconSize && { width: iconSize, height: iconSize },
              iconColor && { tintColor: iconColor },
            ]}
            source={Icon}
          />
        );
        break;
      case 'object': {
        if (Icon && Icon.uri) {
          iconComp = (
            <Image
              style={[
                iconSize && { width: iconSize, height: iconSize },
                iconColor && { tintColor: iconColor },
              ]}
              source={Icon}
            />
          );
        } else {
          iconComp = Icon;
        }
        break;
      }
      default:
        iconComp = Icon;
        break;
    }
    return <View style={contentLeftStyle}>{iconComp}</View>;
  }

  renderAction({ valueTextStyle }) {
    const { iconSize, actionType, iconColor, Action } = this.props;
    if (!Action) return null;
    let actionComp;
    if (actionType !== 'auto') {
      switch (actionType) {
        case 'image':
          actionComp = (
            <Image
              style={[
                iconSize && { width: iconSize, height: iconSize },
                iconColor && { tintColor: iconColor },
              ]}
              source={Action}
            />
          );
          break;
        case 'iconfont':
          actionComp = (
            <IconFont
              size={iconSize || DEFAULT_ICON_FONT_SIZE}
              name={defaultSvg[Action] ? Action : undefined}
              d={Action}
              color={iconColor || DEFAULT_ICON_FONT_COLOR}
            />
          );
          break;
        case 'text':
        default:
          actionComp = <TYText style={valueTextStyle}>{Action}</TYText>;
          break;
      }
      return actionComp;
    }
    switch (typeof Action) {
      case 'function':
        actionComp = Action();
        break;
      case 'string':
        actionComp = <TYText style={valueTextStyle}>{Action}</TYText>;
        break;
      case 'number':
        actionComp = (
          <Image
            style={[
              iconSize && { width: iconSize, height: iconSize },
              iconColor && { tintColor: iconColor },
            ]}
            source={Action}
          />
        );
        break;
      case 'object': {
        if (Action && Action.uri) {
          actionComp = (
            <Image
              style={[
                iconSize && { width: iconSize, height: iconSize },
                iconColor && { tintColor: iconColor },
              ]}
              source={Action}
            />
          );
        } else {
          actionComp = Action;
        }
        break;
      }
      default:
        actionComp = Action;
        break;
    }
    return actionComp;
  }

  render() {
    const {
      styles, // eslint-disable-line no-unused-vars
      arrow,
      arrowColor,
      disabled,
      actionDisabled,
      title,
      subTitle,
      children,
      onPress,
      onActionPress,
      ...touchProps
    } = this.props;
    const [
      containerStyle,
      contentStyle,
      contentLeftStyle,
      contentCenterStyle,
      contentRightStyle,
      titleStyle,
      subTitleStyle,
      valueTextStyle,
    ] = this._styles.map(key => this.getStyle(key));
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={containerStyle}
        disabled={disabled}
        onPress={onPress}
        {...touchProps}
      >
        <View style={contentStyle}>
          {this.renderIcon({ contentLeftStyle, valueTextStyle })}
          <View style={contentCenterStyle}>
            {!!title && (
              <Text numberOfLines={1} style={titleStyle}>
                {title}
              </Text>
            )}
            {!!subTitle && <Text style={subTitleStyle}>{subTitle}</Text>}
            {children}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={contentRightStyle}
            disabled={actionDisabled}
            onPress={onActionPress || onPress}
          >
            {this.renderAction({ valueTextStyle })}
            {arrow && <IconFont style={{ marginLeft: 6 }} name="arrow" color={arrowColor} />}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

/* eslint-disable react-native/no-unused-styles */
const defaultStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    minHeight: 48,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },

  contentLeft: {
    justifyContent: 'center',
    marginRight: 10,
  },

  contentCenter: {
    flex: 1,
    justifyContent: 'center',
  },

  contentRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },

  title: {
    fontSize: 14,
    color: '#22242C',
  },

  subTitle: {
    fontSize: 12,
    color: '#A2A3AA',
  },

  valueText: {
    fontSize: 14,
    color: '#999',
  },
});
