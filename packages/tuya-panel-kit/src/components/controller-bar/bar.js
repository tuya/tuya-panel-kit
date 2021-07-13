/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, StyleSheet, ColorPropType, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { RatioUtils } from '../../utils';
import Button from '../button';
import Group from './bar-group';

const { convertX: cx } = RatioUtils;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  wrapper: {
    paddingVertical: 8,
    marginHorizontal: cx(16),
  },
  controllerBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  bottomBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF3',
  },
});

class ControllerBar extends React.PureComponent {
  static propTypes = {
    /**
     * 按钮背景类型
     */
    type: PropTypes.oneOf(['primary', 'normal']),
    /**
     * 按钮大小
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'normal', 'small']), PropTypes.number]),
    /**
     * 按钮是否拉伸，跟随父容器
     */
    stretch: PropTypes.bool,
    /**
     * 背景是否为半透明
     */
    backgroundType: PropTypes.oneOf(['alpha', 'pure']),
    /**
     * 背景颜色
     */
    backgroundColor: ColorPropType,
    /**
     * 底部是否有边框
     */
    hasBottomBorder: PropTypes.bool,
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * controllerBar 内的按钮
     */
    button: PropTypes.array.isRequired,
    /**
     * 按钮样式
     */
    wrapperStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    type: 'normal',
    size: 'normal',
    stretch: true,
    backgroundType: 'pure',
    backgroundColor: '#fff',
    hasBottomBorder: false,
    style: {},
    wrapperStyle: {},
  };

  static Group = Group;

  renderControllerBar = () => {
    const { stretch, button, type, size } = this.props;
    return (
      <View style={styles.controllerBar}>
        {button.map((btn, index) => {
          return (
            <Button
              wrapperStyle={{ flex: 1 }}
              type={type}
              size={size}
              stretch={stretch}
              {...btn}
              key={`cupcakeBtn_${index}`}
            />
          );
        })}
      </View>
    );
  };

  render() {
    const {
      type,
      size,
      stretch,
      button,
      style,
      backgroundType,
      backgroundColor,
      hasBottomBorder,
      wrapperStyle,
      ...rest
    } = this.props;
    const backgroundStyle = {
      backgroundColor: backgroundColor || '#fff',
    };
    if (backgroundType === 'alpha') {
      backgroundStyle.backgroundColor = 'rgba(255, 255, 255, 0.08)';
    }
    const containerStyle = [styles.container, backgroundStyle, style];
    const cWrapperStyle = [styles.wrapper, hasBottomBorder && styles.bottomBorder, wrapperStyle];
    return (
      <View {...rest} style={containerStyle}>
        <View style={cWrapperStyle}>{this.renderControllerBar()}</View>
      </View>
    );
  }
}

export default ControllerBar;
