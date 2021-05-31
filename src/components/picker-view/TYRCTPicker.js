/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ViewPropTypes, ColorPropType } from 'react-native';
import Picker from './picker/index.ios';
import { RatioUtils } from '../../utils';

const { viewWidth } = RatioUtils;

const MAX_ITEM_NUM = 1260;

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
     * 文本上下边界
     */
    itemPadding: PropTypes.number,
    /**
     * 文本布局
     */
    itemAlign: PropTypes.string,
    /**
     * 字体大小
     */
    textSize: PropTypes.number,
    /**
     * 字体宽度
     */
    fontWeight: PropTypes.string,
    /**
     * 字体
     */
    fontFamily: PropTypes.string,
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
    /**
     * 内容样式
     */
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    accessibilityLabel: 'PickerView',
    loop: false,
    itemTextColor: '#cccccc',
    selectedItemTextColor: 'black',
    dividerColor: '#cccccc',
    itemAlign: 'center',
    itemPadding: 14,
    textSize: 22,
    fontWeight: 'normal',
    fontFamily: 'DIN Alternate',
    style: null,
  };

  constructor(props) {
    super(props);
    const { children, loop } = props;

    this._loopTimes =
      children && children.length > 0 ? (loop ? Math.round(MAX_ITEM_NUM / children.length) : 1) : 0;
    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this._stateFromProps(nextProps);
  }

  _stateFromProps = props => {
    let selectedIndex = 0;
    let pickerItems = [];
    const childArray = React.Children.toArray(props.children);
    pickerItems = new Array(this._loopTimes).fill(1).reduce(acc => {
      const current = childArray.map((child, index) => {
        if (child.props.value === props.selectedValue) {
          selectedIndex = index + Math.floor(this._loopTimes / 2) * childArray.length;
        }
        return {
          value: child.props.value,
          label: child.props.label,
        };
      });
      return [...acc, ...current];
    }, []);
    return { selectedIndex, items: pickerItems };
  };

  _onChange = event => {
    const { onValueChange, children } = this.props;
    const { newIndex } = event.nativeEvent;
    const childArray = React.Children.toArray(children);
    onValueChange && onValueChange(this.state.items[newIndex].value, newIndex % childArray.length);
    this.setState({
      selectedIndex: newIndex,
    });
  };

  render() {
    const { accessibilityLabel, style, ...rest } = this.props;
    const { items, selectedIndex } = this.state;

    return (
      <Picker
        {...rest}
        style={[{ width: viewWidth, height: 216 }, style]}
        accessibilityLabel={accessibilityLabel}
        items={items}
        selectedIndex={selectedIndex}
        onChange={this._onChange}
      />
    );
  }
}

PickerView.Item = Item;

export default PickerView;
