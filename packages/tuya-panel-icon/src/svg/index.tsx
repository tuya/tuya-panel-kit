import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import svgs from './defaultSvg';
import { SVGProps, svgDefault } from './interface';

export default class IconFont extends Component<SVGProps> {
  static defaultProps = svgDefault;

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
            width,
            height,
          },
          transform.length > 0 && { transform },
          style,
        ]}
      >
        <Svg width={width} height={height} viewBox={viewBox}>
          {paths.map((pathData, i) => {
            return (
              <Path key={`${pathData}`} {...pathProps} fill={fill} stroke={stroke} d={pathData} />
            );
          })}
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
