import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, ColorPropType, StyleSheet } from 'react-native';
import Toast from './toast';
import { RatioUtils } from '../../utils';
import LoadingCircle from '../button-brick/loading';

const { convertX: cx, convertY: cy } = RatioUtils;

class Loading extends React.PureComponent {
  static propTypes = {
    /**
     * 内容样式
     */
    contentStyle: ViewPropTypes.style,
    /**
     * 图标颜色
     */
    color: ColorPropType,
    /**
     * 显示位置
     */
    showPosition: PropTypes.string,
    /**
     * 图标大小
     */
    size: PropTypes.number,
    /**
     * 图标是否转动
     */
    loading: PropTypes.bool,
    /**
     * 图标填充宽度
     */
    strokeWidth: PropTypes.number,
    /**
     * loading图标样式
     */
    loadingStyle: ViewPropTypes.style,
    /**
     * loading背景颜色
     */
    loadingBackgroundColor: ColorPropType,
  };

  static defaultProps = {
    contentStyle: null,
    showPosition: 'center',
    size: cx(28),
    color: '#FFF',
    loading: true,
    loadingStyle: null,
    strokeWidth: cx(4),
    loadingBackgroundColor: 'rgba(255,255,255,.1)',
  };

  render() {
    const {
      contentStyle,
      showPosition,
      size,
      color,
      loading,
      strokeWidth,
      loadingStyle,
      loadingBackgroundColor,
      ...toastProps
    } = this.props;
    return (
      <Toast
        {...toastProps}
        showPosition={showPosition}
        contentStyle={[styles.contentStyle, contentStyle]}
      >
        <LoadingCircle
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          loading={loading}
          backgroundColor={loadingBackgroundColor}
          style={loadingStyle}
        />
      </Toast>
    );
  }
}
export default Loading;

const styles = StyleSheet.create({
  contentStyle: {
    paddingVertical: cy(27),
    width: cx(120),
    height: cx(120),
    backgroundColor: 'rgba(0,0,0,.7)',
    borderRadius: cx(8),
  },
});
