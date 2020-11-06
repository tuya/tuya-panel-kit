/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, ViewPropTypes, ColorPropType } from 'react-native';
import Picker from './picker';
import { ThemeUtils } from '../../utils';

const { getTheme, ThemeConsumer } = ThemeUtils;

const height = 216;

class Item extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]), // only support num or string for now
    label: PropTypes.string,
  };

  render() {
    return null;
  }
}

export class PickerView extends Component {
  static propTypes = {
    ...ViewPropTypes,
    /**
     * 测试标示
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Picker选项的文字颜色
     */
    itemTextColor: ColorPropType,
    /**
     * Picker选项选中的文字颜色
     */
    selectedItemTextColor: ColorPropType,
    /**
     * Picker选项分割线颜色
     */
    dividerColor: ColorPropType,
    /**
     * Picker可视区域项目个数
     */
    visibleItemCount: PropTypes.number,
    /**
     * 数值改变回调
     */
    onValueChange: PropTypes.func,
    /**
     * 选中的数值
     */
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    /**
     * 自定义内容
     */
    children: PropTypes.node.isRequired,
    /**
     * Picker是否循环滚动
     */
    loop: PropTypes.bool,
  };

  static defaultProps = {
    accessibilityLabel: 'PickerView',
    loop: false,
    itemTextColor: '#cccccc',
    selectedItemTextColor: 'black',
    dividerColor: '#cccccc',
    visibleItemCount: 8,
    itemAlign: 'center',
    textSize: 20,
  };

  constructor(props) {
    super(props);

    this.stateFromProps = this._stateFromProps.bind(this);
    this._onChange = this._onChange.bind(this);

    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  _stateFromProps(props) {
    let selectedIndex = 0;
    const items = [];
    React.Children.toArray(props.children).forEach((child, index) => {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }
      items.push({
        value: child.props.value,
        label: child.props.label,
      });
    });
    return { selectedIndex, items };
  }

  _onChange(event) {
    const { newIndex } = event.nativeEvent;
    if (this.props.onValueChange) {
      this.props.onValueChange(this.state.items[newIndex].value, newIndex);
    }

    if (this._picker && this.state.selectedIndex !== newIndex) {
      this._picker.setNativeProps({
        selectedIndex: this.state.selectedIndex,
      });
    }
  }

  render() {
    const style = StyleSheet.flatten(this.props.style);
    const { loop } = this.props;

    return (
      <Picker
        style={[
          {
            height,
          },
          style,
        ]}
        accessibilityLabel={this.props.accessibilityLabel}
        items={this.state.items}
        itemTextColor={this.props.itemTextColor}
        selectedItemTextColor={this.props.selectedItemTextColor}
        dividerColor={this.props.dividerColor}
        visibleItemCount={this.props.visibleItemCount}
        itemAlign={this.props.itemAlign}
        selectedValue={this.state.selectedIndex}
        textSize={this.props.textSize}
        loop={loop}
        onValueChange={this._onChange}
      />
    );
  }
}

PickerView.Item = Item;
PickerView.height = height;

const ThemedPickerView = props => {
  const { theme: localTheme, itemStyle, ...rest } = props;
  return (
    <ThemeConsumer>
      {fullTheme => {
        const theme = {
          ...fullTheme,
          picker: { ...fullTheme.picker, ...localTheme },
        };
        const propsWithTheme = { theme, ...rest };
        const textSize = getTheme(propsWithTheme, 'picker.fontSize');
        const itemTextColor = getTheme(propsWithTheme, 'picker.fontColor');
        const dividerColor = getTheme(propsWithTheme, 'picker.dividerColor');
        return (
          <PickerView
            textSize={textSize}
            itemTextColor={itemTextColor}
            selectedItemTextColor={itemTextColor}
            dividerColor={dividerColor}
            {...rest}
          />
        );
      }}
    </ThemeConsumer>
  );
};

ThemedPickerView.Item = Item;

ThemedPickerView.propTypes = {
  theme: PropTypes.shape({
    fontSize: PropTypes.number,
    fontColor: ColorPropType,
    dividerColor: ColorPropType,
  }),
};

ThemedPickerView.defaultProps = {
  theme: {},
};

export default ThemedPickerView;
