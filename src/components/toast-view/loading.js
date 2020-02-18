import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, ColorPropType } from 'react-native';
import Toast from './toast';
import { RatioUtils } from '../../utils';
import LoadingCircle from '../button-brick/loading';

const { convertX: cx, convertY: cy } = RatioUtils;

class Loading extends React.PureComponent {
  static propTypes = {
    contentStyle: ViewPropTypes.style,
    color: ColorPropType,
    showPosition: PropTypes.string,
    size: PropTypes.number,
    loading: PropTypes.bool,
    strokeWidth: PropTypes.number,
    loadingStyle: ViewPropTypes.style,
    loadingBackgroundColor: ColorPropType,
  };

  static defaultProps = {
    contentStyle: {
      width: cx(120),
      height: cx(120),
      backgroundColor: 'rgba(0,0,0,.7)',
      borderRadius: cx(8),
    },
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
        contentStyle={[{ paddingVertical: cy(27) }, contentStyle]}
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
