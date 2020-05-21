import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, ColorPropType, ViewPropTypes } from 'react-native';
import Slider from '../../slider';
import svgs from '../../iconfont/svg/defaultSvg';
import svgsART from '../../iconfont/art/defaultSvg';
import { CoreUtils, ThemeUtils } from '../../../utils';
import { StyledPlaceholder } from './styled';
import {
  StyledItem,
  StyledItemContent,
  StyledValueText,
  StyledImage,
  StyledIconFont,
} from '../styled';

const { isNil } = CoreUtils;
const { parseToStyle } = ThemeUtils;

export default class SliderItem extends Component {
  static propTypes = {
    ...Slider.propTypes,
    /**
     * 主题
     */
    theme: PropTypes.shape({
      iconColor: ColorPropType,
      descFontColor: ColorPropType,
      cellBg: ColorPropType,
      cellRadius: PropTypes.number,
      margin: PropTypes.array,
      padding: PropTypes.array,
      // 支持所有Slider的主题变量
    }),
    /**
     * 左侧 Icon 类型，默认为 `auto`，根据传递进来的 `Icon` 类型自动判断，
     */
    iconType: PropTypes.oneOf(['auto', 'image', 'iconfont', 'text']),
    /**
     * 右侧 Action 类型，默认为 `auto`，根据传递进来的 `Action` 类型自动判断，
     */
    actionType: PropTypes.oneOf(['auto', 'image', 'iconfont', 'text']),
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
     * 左侧图标栏尺寸
     */
    iconSize: PropTypes.number,
    /**
     * 左侧图标栏尺寸颜色
     */
    iconColor: ColorPropType,
    /**
     * 列表样式
     */
    style: ViewPropTypes.style,
    /**
     * 内容样式
     */
    contentStyle: ViewPropTypes.style,
    /**
     * 字体样式
     */
    textStyle: Text.propTypes.style,
    /**
     * 滑动条样式
     */
    sliderStyle: ViewPropTypes.style,
    /**
     * 图片的tintColor是否跟随iconColor，默认为`true`，
     * 可用于某些图片不需要改变底色的场景
     */
    imageFollowIconColor: PropTypes.bool,
    /**
     * 是否使用 ART 实现版本
     */
    useART: PropTypes.bool,
  };

  static defaultProps = {
    theme: {},
    iconType: 'auto',
    actionType: 'auto',
    Icon: null,
    Action: null,
    iconSize: 17,
    iconColor: null,
    style: null,
    contentStyle: null,
    textStyle: null,
    sliderStyle: null,
    imageFollowIconColor: true,
    useART: false,
  };

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
    const { theme, textStyle } = this.props;
    return (
      <StyledValueText style={[theme.descFontColor && { color: theme.descFontColor }, textStyle]}>
        {text}
      </StyledValueText>
    );
  }

  renderItem = isLeft => {
    const value = isLeft ? this.props.Icon : this.props.Action;
    const type = isLeft ? this.props.iconType : this.props.actionType;
    if (React.isValidElement(value)) {
      return value;
    }
    let itemComponent;
    if (type !== 'auto') {
      switch (type) {
        case 'image':
          itemComponent = this.getImageComponent(value);
          break;
        case 'iconfont':
          itemComponent = this.getIconComponent(value);
          break;
        case 'text':
        default:
          itemComponent = this.getTextComponent(value);
          break;
      }
      return (
        itemComponent && <StyledPlaceholder alignLeft={isLeft}>{itemComponent}</StyledPlaceholder>
      );
    }
    switch (typeof value) {
      case 'function':
        itemComponent = value();
        break;
      case 'string':
        itemComponent = isLeft ? this.getIconComponent(value) : this.getTextComponent(value);
        break;
      case 'number':
        itemComponent = this.getImageComponent(value);
        break;
      case 'object': {
        if (value && value.uri) {
          itemComponent = this.getImageComponent(value);
        } else {
          itemComponent = value;
        }
        break;
      }
      default:
        itemComponent = null;
        break;
    }
    return (
      itemComponent && <StyledPlaceholder alignLeft={isLeft}>{itemComponent}</StyledPlaceholder>
    );
  };

  renderSlider = () => {
    const {
      style,
      iconType,
      Icon,
      actionType,
      Action,
      iconSize,
      iconColor,
      textStyle,
      sliderStyle,
      ...sliderProps
    } = this.props;
    return <Slider style={[{ flex: 1, alignSelf: 'stretch' }, sliderStyle]} {...sliderProps} />;
  };

  render() {
    const { theme, style, contentStyle } = this.props;
    // cellRadius can be 0
    const radiusStyle = !isNil(theme.cellRadius) && { borderRadius: theme.cellRadius };
    const itemStyle = [
      radiusStyle,
      theme.margin && parseToStyle(theme.margin, 'margin'),
      theme.cellBg && { backgroundColor: theme.cellBg },
      style,
    ];
    const itemContentStyle = [
      radiusStyle,
      theme.padding && parseToStyle(theme.padding, 'padding'),
      contentStyle,
    ];
    return (
      <StyledItem style={itemStyle} disabled={true}>
        <StyledItemContent style={itemContentStyle}>
          {this.renderItem(true)}
          {this.renderSlider()}
          {this.renderItem(false)}
        </StyledItemContent>
      </StyledItem>
    );
  }
}
