import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import iconfont from '../res/iconfont.json';
import Toast from './toast';
import IconFont from '../iconfont/svg';
import { RatioUtils } from '../../utils';
import { pick, omit } from '../TYLists/items/utils';

const { convertX: cx, convertY: cy } = RatioUtils;

class Success extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    size: PropTypes.number,
    d: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    iconfontStyle: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    showPosition: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    text: '成功文案',
    size: cx(40),
    d: iconfont.correct,
    iconfontStyle: null,
    contentStyle: {
      width: cx(120),
      height: cx(120),
      backgroundColor: 'rgba(0,0,0,.7)',
      borderRadius: cx(8),
    },
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
        contentStyle={[{ paddingVertical: cy(27) }, contentStyle]}
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
export default Success;
