import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ColorPropType, ViewPropTypes } from 'react-native';
import { StyledCheckbox, StyledIcon, StyledText } from './styled';
import svgs from '../iconfont/svg/defaultSvg';

export default class Checkbox extends Component {
  static propTypes = {
    accessibilityLabel: PropTypes.string,
    /**
     * CheckBox 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * Checkbox 图标大小
     */
    size: PropTypes.number,
    /**
     * 是否禁用
     */
    disabled: PropTypes.bool,
    /**
     * 未选中时的图标颜色
     */
    disabledColor: ColorPropType,
    /**
     * 是否选中状态
     */
    checked: PropTypes.bool,
    /**
     * 选中状态图标Path
     */
    checkedIcon: PropTypes.string,
    /**
     * 未选中状态图标Path
     */
    unCheckedIcon: PropTypes.string,
    /**
     * 是否翻转图标和子元素位置
     */
    reverse: PropTypes.bool,
    /**
     * 是否在非选中状态隐藏图标
     */
    hideOnUnselect: PropTypes.bool,
    /**
     * Checkbox 图标颜色
     */
    color: ColorPropType,
    /**
     * 变更事件回调
     */
    onChange: PropTypes.func,
    /**
     * 子元素，一般为 Text
     */
    children: PropTypes.any,
  };

  static defaultProps = {
    accessibilityLabel: 'Checkbox',
    style: null,
    size: 17,
    disabled: false,
    disabledColor: null,
    checked: false,
    checkedIcon: null,
    unCheckedIcon: null,
    reverse: false,
    hideOnUnselect: false,
    color: null,
    onChange: null,
    children: null,
  };

  _handleToggleCheck = () => {
    const { checked, onChange } = this.props;
    onChange && onChange(!checked);
  };

  render() {
    const {
      accessibilityLabel,
      style,
      size,
      disabled,
      disabledColor,
      checked,
      checkedIcon,
      unCheckedIcon,
      reverse,
      hideOnUnselect,
      color,
      children,
    } = this.props;
    let iconPath;
    if (checked) {
      iconPath = checkedIcon || svgs.selected;
    } else {
      iconPath = unCheckedIcon || svgs.unselected;
    }
    const elements = [
      <StyledIcon
        key="checkIcon"
        style={!checked && hideOnUnselect && { opacity: 0 }}
        d={iconPath}
        activeColor={color}
        disabledColor={disabledColor}
        disabled={disabled}
        size={size}
      />,
      typeof children === 'string' ? (
        <StyledText key="checkText" disabled={disabled}>
          {children}
        </StyledText>
      ) : (
        children
      ),
    ];
    if (reverse) {
      elements.reverse();
    }
    return (
      <StyledCheckbox
        accessibilityLabel={accessibilityLabel}
        style={style}
        activeOpacity={0.8}
        onPress={this._handleToggleCheck}
        disabled={disabled}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', opacity: disabled ? 0.3 : 1 }}>
          {elements}
        </View>
      </StyledCheckbox>
    );
  }
}
