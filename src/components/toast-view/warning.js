import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, StyleSheet } from 'react-native';
import iconfont from '../res/iconfont.json';
import Toast from './toast';
import IconFont from '../iconfont/svg';
import { RatioUtils } from '../../utils';
import { pick, omit } from '../TYLists/items/utils';

const { convertX: cx, convertY: cy } = RatioUtils;

class Warning extends React.PureComponent {
  static propTypes = {
    /**
     * 提示文字
     */
    text: PropTypes.string,
    /**
     * 图标大小
     */
    size: PropTypes.number,
    /**
     * 图标路径
     */
    d: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    /**
     * 图标样式
     */
    iconfontStyle: ViewPropTypes.style,
    /**
     * 内容样式
     */
    contentStyle: ViewPropTypes.style,
    /**
     * 显示位置
     */
    showPosition: PropTypes.string,
    /**
     * 图标颜色
     */
    color: PropTypes.string,
  };

  static defaultProps = {
    text: 'warningText',
    size: cx(42),
    d: iconfont.warning,
    iconfontStyle: null,
    contentStyle: null,
    showPosition: 'center',
    color: '#fff',
  };

  render() {
    const {
      text,
      contentStyle,
      showPosition,
      d,
      size,
      iconfontStyle,
      color,
      ...props
    } = this.props;
    const toastPropNames = Object.keys(Toast.propTypes);
    const toastProps = pick(props, toastPropNames);
    const iconProps = omit(props, toastPropNames);
    return (
      <Toast
        {...toastProps}
        text={text}
        showPosition={showPosition}
        contentStyle={[styles.contentStyle, contentStyle]}
      >
        <IconFont {...iconProps} d={d} size={size} color={color} style={iconfontStyle} />
      </Toast>
    );
  }
}
export default Warning;

const styles = StyleSheet.create({
  contentStyle: {
    paddingVertical: cx(18),
    paddingHorizontal: cx(18),
    backgroundColor: 'rgba(0,0,0,.7)',
    borderRadius: cx(12),
    marginHorizontal: cx(66),
  },
});
