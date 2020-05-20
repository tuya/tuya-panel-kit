/* eslint-disable new-cap */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity, ColorPropType, ViewPropTypes } from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';
import svgs from '../iconfont/svg/defaultSvg';
import svgsART from '../iconfont/art/defaultSvg';
import { CoreUtils, ThemeUtils } from '../../utils';
import {
  StyledItem,
  StyledItemContent,
  StyledItemLeft,
  StyledItemCenter,
  StyledItemRight,
  StyledTitle,
  StyledSubTitle,
  StyledValueText,
  StyledIconFont,
  StyledImage,
  StyledArrowImage,
} from './styled';

const { isNil } = CoreUtils;
const { parseToStyle } = ThemeUtils;

export default class TYListItem extends Component {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    /**
     * 你可以通过该props定义_Item_的所有样式
     */
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
     * 主题
     */
    theme: PropTypes.shape({
      boardBg: ColorPropType,
      fontColor: ColorPropType,
      subFontColor: ColorPropType,
      descFontColor: ColorPropType,
      cellLine: ColorPropType,
      cellBg: ColorPropType,
      cellRadius: PropTypes.number,
      margin: PropTypes.array,
      padding: PropTypes.array,
    }),
    /**
     * 是否在右边栏显示 arrow 图标
     */
    arrow: PropTypes.bool,
    /**
     * arrow 图标颜色
     */
    arrowColor: ColorPropType,
    /**
     * arrow 是否使用 IconFont 渲染，
     * 目前 ART 在安卓上若渲染数量过多会导致崩溃，暂时默认不使用 IconFont渲染，
     * 待后续迁移至 svg 实现可切换。
     */
    arrowUseIcon: PropTypes.bool,
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
     * 图片的tintColor是否跟随iconColor，默认为`true`，
     * 可用于某些图片不需要改变底色的场景
     */
    imageFollowIconColor: PropTypes.bool,
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
     * 是否使用 ART 实现版本
     */
    useART: PropTypes.bool,
    /**
     * 列表项点击回调
     */
    onPress: PropTypes.func,
  };

  static defaultProps = {
    styles: {},
    theme: {},
    arrow: false,
    arrowColor: null,
    arrowUseIcon: false,
    disabled: false,
    actionDisabled: false,
    title: null,
    subTitle: null,
    children: null,
    imageFollowIconColor: true,
    iconSize: null,
    iconColor: null,
    iconType: 'auto',
    actionType: 'auto',
    Icon: null,
    Action: null,
    needUpdate: true,
    useART: false,
    onPress: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.needUpdate) {
      return false;
    }
    return shallowCompare(this, nextProps, nextState);
  }

  getImageComponent(source) {
    const { theme, imageFollowIconColor, iconSize, iconColor } = this.props;
    return (
      <StyledImage
        size={iconSize}
        iconColor={iconColor || theme.iconColor}
        source={source}
        imageFollowIconColor={imageFollowIconColor}
      />
    );
  }

  getIconComponent(data) {
    const { theme, iconSize, iconColor, useART } = this.props;
    const svgMap = useART ? svgsART : svgs;
    return (
      <StyledIconFont
        size={iconSize}
        name={svgMap[data] ? data : undefined} // 若 name 为undefined，则会使用d
        d={data}
        color={iconColor || theme.iconColor}
        useART={useART}
      />
    );
  }

  getTextComponent(text) {
    const { styles, theme } = this.props;
    return (
      <StyledValueText
        style={[theme.descFontColor && { color: theme.descFontColor }, styles.valueText]}
      >
        {text}
      </StyledValueText>
    );
  }

  renderIcon() {
    const { styles, iconType, Icon } = this.props;
    if (!Icon) return null;
    let iconComp;
    if (iconType !== 'auto') {
      switch (iconType) {
        case 'image':
          iconComp = this.getImageComponent(Icon);
          break;
        case 'iconfont':
          iconComp = this.getIconComponent(Icon);
          break;
        case 'text':
        default:
          iconComp = this.getTextComponent(Icon);
          break;
      }
      return <StyledItemLeft style={styles.contentLeft}>{iconComp}</StyledItemLeft>;
    }
    switch (typeof Icon) {
      case 'function':
        iconComp = Icon();
        break;
      case 'string':
        iconComp = this.getIconComponent(Icon);
        break;
      case 'number':
        iconComp = this.getImageComponent(Icon);
        break;
      case 'object': {
        if (Icon && Icon.uri) {
          iconComp = this.getImageComponent(Icon);
        } else {
          iconComp = Icon;
        }
        break;
      }
      default:
        iconComp = Icon;
        break;
    }
    return <StyledItemLeft style={styles.contentLeft}>{iconComp}</StyledItemLeft>;
  }

  renderAction() {
    const { actionType, Action } = this.props;
    if (!Action) return null;
    let actionComp;
    if (actionType !== 'auto') {
      switch (actionType) {
        case 'image':
          actionComp = this.getImageComponent(Action);
          break;
        case 'iconfont':
          actionComp = this.getIconComponent(Action);
          break;
        case 'text':
        default:
          actionComp = this.getTextComponent(Action);
          break;
      }
      return actionComp;
    }
    switch (typeof Action) {
      case 'function':
        actionComp = Action();
        break;
      case 'string':
        actionComp = this.getTextComponent(Action);
        break;
      case 'number':
        actionComp = this.getImageComponent(Action);
        break;
      case 'object': {
        if (Action && Action.uri) {
          actionComp = this.getImageComponent(Action);
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

  renderArrow = () => {
    const { theme, arrow, arrowColor, arrowUseIcon } = this.props;
    if (!arrow) return null;
    if (arrowUseIcon) {
      return <StyledIconFont size={14} name="arrow" color={arrowColor || theme.arrowColor} />;
    }
    return <StyledArrowImage color={arrowColor || theme.arrowColor} />;
  };

  render() {
    const {
      styles,
      theme,
      disabled,
      actionDisabled,
      title,
      subTitle,
      children,
      onPress,
      onActionPress,
      ...touchProps
    } = this.props;
    // cellRadius can be 0
    const radiusStyle = !isNil(theme.cellRadius) && { borderRadius: theme.cellRadius };
    const itemStyle = [
      radiusStyle,
      theme.margin && parseToStyle(theme.margin, 'margin'),
      theme.cellBg && { backgroundColor: theme.cellBg },
      styles.container,
    ];
    const contentStyle = [
      radiusStyle,
      theme.padding && parseToStyle(theme.padding, 'padding'),
      styles.content,
    ];
    const titleStyle = [theme.fontColor && { color: theme.fontColor }, styles.title];
    const subTitleStyle = [theme.subFontColor && { color: theme.subFontColor }, styles.subTitle];
    return (
      <StyledItem
        activeOpacity={0.8}
        style={itemStyle}
        disabled={disabled}
        onPress={onPress}
        {...touchProps}
      >
        <StyledItemContent style={contentStyle} disabled={disabled}>
          {this.renderIcon()}
          <StyledItemCenter style={styles.contentCenter}>
            {!!title && <StyledTitle style={titleStyle}>{title}</StyledTitle>}
            {!!subTitle && <StyledSubTitle style={subTitleStyle}>{subTitle}</StyledSubTitle>}
            {children}
          </StyledItemCenter>
          <StyledItemRight
            activeOpacity={0.8}
            style={styles.contentRight}
            disabled={actionDisabled}
            onPress={onActionPress || onPress}
          >
            {this.renderAction()}
            {this.renderArrow()}
          </StyledItemRight>
        </StyledItemContent>
      </StyledItem>
    );
  }
}
