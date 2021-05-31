import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, processColor, ViewPropTypes } from 'react-native';

const TYRCTPicker = requireNativeComponent('TYRCTPicker');

export default class TYRCTNewPicker extends PureComponent {
  static propTypes = {
    /**
     * 内容样式
     */
    items: PropTypes.array,
    /**
     * 选中项
     */
    selectedIndex: PropTypes.number,
    /**
     * 字体颜色
     */
    itemTextColor: PropTypes.string,
    /**
     * 分割线颜色
     */
    dividerColor: PropTypes.string,
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
    onChange: PropTypes.func,
    /**
     * 内容样式
     */
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    items: [],
    selectedIndex: 0,
    itemTextColor: '#000',
    itemPadding: 14,
    itemAlign: 'center',
    textSize: 21,
    fontWeight: 'normal',
    dividerColor: '#828486',
    fontFamily: 'DIN Alternate',
    onChange: () => {},
    style: null,
  };

  onItemSelected = event => {
    if (!this.props.onChange) {
      return;
    }
    this.props.onChange(event);
    this.viewRef && this.viewRef.setNativeProps(this.props.selectedIndex);
  };

  getTextStatus = () => {
    const { itemAlign } = this.props;

    if (itemAlign === 'center') {
      return 1;
    } else if (itemAlign === 'right') {
      return 2;
    }
    return 0;
  };

  render() {
    const {
      items,
      selectedIndex,
      itemTextColor,
      dividerColor,
      fontWeight,
      fontFamily,
      itemPadding,
      textSize,
      style,
    } = this.props;
    return (
      <TYRCTPicker
        ref={component => (this.viewRef = component)}
        style={style}
        items={items}
        itemPadding={itemPadding}
        selectedIndex={selectedIndex}
        separatorColor={processColor(dividerColor)}
        color={processColor(itemTextColor)}
        textAlign={this.getTextStatus()}
        fontSize={textSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        onChange={this.onItemSelected}
      />
    );
  }
}
