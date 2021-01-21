/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ViewPropTypes, StyleSheet, ColorPropType } from 'react-native';
import { Svg, Path } from 'svgs';
import svgs from './defaultSvg';

export default class IconFont extends Component {
  static propTypes = {
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * svg 视口
     */
    viewBox: PropTypes.string,
    /**
     * 图标id，会从组件库默认图标里取，优先级小于 d
     */
    name: PropTypes.string,
    /**
     * Color 颜色，fill 和 stroke 的缩写
     */
    color: ColorPropType,
    /**
     * Icon 尺寸，width / height 的缩写
     */
    size: PropTypes.number,
    /**
     * 水平翻转
     */
    hFlip: PropTypes.bool,
    /**
     * 垂直翻转
     */
    vFlip: PropTypes.bool,
    /**
     * 图标 path，svg 的 path
     */
    d: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    /**
     * 图标宽度，默认为 size 的值
     */
    width: PropTypes.number,
    /**
     * 图标高度，默认为 size 的值
     */
    height: PropTypes.number,
    /**
     * 填充色，若传递该值 color 会被忽略
     */
    fill: ColorPropType,
    /**
     * 描边色
     */
    stroke: ColorPropType,
    /**
     * 描边宽度
     */
    strokeWidth: PropTypes.number,
    /**
     * 连接处形状
     */
    strokeJoin: PropTypes.oneOf(['round', 'miter', 'bevel']),
    /**
     * 首尾端形状：
     */
    strokeCap: PropTypes.oneOf(['round', 'butt', 'square']),
    /**
     * 实虚线，数组内第一个元素为一段虚线的长度，第二个为间距
     */
    strokeDash: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    style: null,
    viewBox: '0 0 1024 1024',
    name: null,
    color: '#000',
    size: 12,
    hFlip: false,
    vFlip: false,
    d: '',
    height: null,
    width: null,
    fill: null,
    stroke: null,
    strokeWidth: 1,
    strokeJoin: 'round',
    strokeCap: 'round',
    strokeDash: [0, 0],
  };

  render() {
    const { viewBox, style, name, color, size, hFlip, vFlip, ...pathProps } = this.props;
    let path = pathProps.d;
    if (!!name && typeof name === 'string') {
      const hasName = Object.prototype.hasOwnProperty.call(svgs, name);
      path = hasName ? svgs[name] : undefined;
    }
    const fill = this.props.fill || color;
    const stroke = this.props.stroke || color;
    const width = this.props.width || size;
    const height = this.props.height || size;

    if (!path) {
      return null;
    }

    let paths = [];
    if (typeof path === 'string') {
      paths = [path];
    } else {
      paths = path;
    }
    const count = paths.length;

    if (count === 0) {
      return null;
    }

    const transform = [];
    if (hFlip) {
      transform.push({ rotateY: '180deg' });
    }
    if (vFlip) {
      transform.push({ rotateX: '180deg' });
    }
    return (
      <View
        style={[
          styles.row,
          {
            width: width * count,
            height,
          },
          transform.length > 0 && { transform },
          style,
        ]}
      >
        {paths.map((pathData, i) => {
          return (
            <Svg key={i} width={width} height={height} viewBox={viewBox}>
              <Path {...pathProps} fill={fill} stroke={stroke} d={pathData} />
            </Svg>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
