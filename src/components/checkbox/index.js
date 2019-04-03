import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ColorPropType, ViewPropTypes } from 'react-native';
import TYText from '../TYText';
import IconFont from '../iconfont';

export default class CheckBox extends Component {
  static propTypes = {
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
     * 是否选中状态
     */
    checked: PropTypes.bool,
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
    style: null,
    size: 28,
    disabled: false,
    checked: false,
    reverse: false,
    hideOnUnselect: false,
    color: '#44DB5E',
    onChange: null,
    children: null,
  };

  _handleToggleCheck = () => {
    const { checked, onChange } = this.props;
    onChange && onChange(!checked);
  };

  render() {
    const { style, size, disabled, checked, reverse, hideOnUnselect, color, children } = this.props;
    const elements = [
      <IconFont
        key="checkIcon"
        style={[disabled && { opacity: 0.3 }, !checked && hideOnUnselect && { opacity: 0 }]}
        name={checked ? 'selected-sharp' : 'unselected-sharp'}
        color={color}
        size={size}
      />,
      typeof children === 'string' ? (
        <TYText key="checkText" style={[styles.text, disabled && { opacity: 0.3 }]}>
          {children}
        </TYText>
      ) : (
        children
      ),
    ];
    if (reverse) {
      elements.reverse();
    }
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        activeOpacity={0.8}
        onPress={this._handleToggleCheck}
        disabled={disabled}
      >
        {elements}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },

  text: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
});
