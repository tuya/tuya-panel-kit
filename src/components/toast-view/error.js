import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, StyleSheet } from 'react-native';
import iconfont from '../res/iconfont.json';
import Toast from './toast';
import IconFont from '../iconfont/svg';
import { RatioUtils } from '../../utils';
import { pick, omit } from '../TYLists/items/utils';

const { convertX: cx, convertY: cy } = RatioUtils;

class Error extends React.PureComponent {
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
    text: 'errorText',
    size: cx(40),
    d: iconfont.error,
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
      color,
      d,
      size,
      iconfontStyle,
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
        <IconFont
          {...iconProps}
          d={d}
          size={size}
          color={color}
          style={[{ marginBottom: cy(8) }, iconfontStyle]}
        />
      </Toast>
    );
  }
}
export default Error;

const styles = StyleSheet.create({
  contentStyle: {
    paddingVertical: cy(27),
    paddingHorizontal: cx(18),
    backgroundColor: 'rgba(0,0,0,.7)',
    borderRadius: cx(8),
    maxWidth: cx(122),
    minWidth: cx(120),
  },
});
