import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ViewPropTypes } from 'react-native';
import Svg, { RadialGradient as Gradient, Defs, Stop, Rect } from 'react-native-svg';

const Window = Dimensions.get('window');

// eslint-disable-next-line react/prefer-stateless-function
export default class RadialGradient extends Component {
  static propTypes = {
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * 渐变 id
     */
    gradientId: PropTypes.string,
    /**
     * 最外侧圆的x轴坐标点
     */
    cx: PropTypes.string,
    /**
     * 最外侧圆的y轴坐标点
     */
    cy: PropTypes.string,
    /**
     * 最内侧圆的x轴坐标点(渐变中心点)
     */
    fx: PropTypes.string,
    /**
     * 最内侧圆的y轴坐标点(渐变中心点)
     */
    fy: PropTypes.string,
    /**
     * 最内侧圆水平方向的半径(渐变长度)
     */
    rx: PropTypes.string,
    /**
     * 最内侧圆垂直方向的半径(渐变高度)
     */
    ry: PropTypes.string,
    /**
     * 渐变梯度停点
     */
    stops: PropTypes.arrayOf(
      PropTypes.shape({
        offset: PropTypes.string.isRequired,
        stopColor: PropTypes.string.isRequired,
        stopOpacity: PropTypes.string.isRequired,
      })
    ),
  };

  static defaultProps = {
    style: null,
    gradientId: 'radial-gradient',
    cx: '50%',
    cy: '50%',
    rx: '50%',
    ry: '50%',
    fx: '50%',
    fy: '50%',
    stops: [
      {
        offset: '0%',
        stopColor: '#ff0',
        stopOpacity: '1',
      },
      {
        offset: '100%',
        stopColor: '#00f',
        stopOpacity: '1',
      },
    ],
  };

  constructor(props) {
    super(props);
    this._gradientId = Math.random().toString(36).substring(7);
  }

  get gradientId() {
    return this.props.gradientId || this._gradientId;
  }

  render() {
    const { gradientId } = this;
    const { style, cx, cy, rx, ry, fx, fy, stops } = this.props;
    const { height, width } = StyleSheet.flatten([styles.container, style]);
    return (
      <View style={[styles.container, style]}>
        <Svg height={height} style={style} width={width}>
          <Defs>
            <Gradient id={gradientId} cx={cx} cy={cy} fx={fx} fy={fy} rx={rx} ry={ry}>
              {stops.map(x => (
                <Stop key={x.offset} {...x} />
              ))}
            </Gradient>
          </Defs>
          <Rect fill={`url(#${gradientId})`} height={height} width={width} x="0" y="0" />
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    width: Window.width,
    height: Window.height,
  },
});
