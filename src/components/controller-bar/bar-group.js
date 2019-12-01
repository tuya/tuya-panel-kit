import PropTypes from 'prop-types';
import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import Swiper from '../carousel';

class BarGroup extends React.PureComponent {
  static defaultProps = {
    type: 'warp',
    size: 'normal',
    swiperConfig: {
      selectIndex: 0,
    },
    style: {},
    wrapperStyle: {},
  };

  static propTypes = {
    type: PropTypes.oneOf(['warp', 'swiper', 'divide']),
    size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'normal', 'small']), PropTypes.number]),
    swiperConfig: PropTypes.shape(Swiper.propTypes),
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
    style: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
  };

  getGroupChildren = () => {
    const { type, size, children, swiperConfig } = this.props;
    const finalChild = React.Children.map(children, (child, index) => {
      const addProps = {
        hasBottomBorder: type === 'divide' && index === 0,
        size: child.props.size || size,
      };
      return React.cloneElement(child, addProps);
    });
    if (type === 'swiper') {
      return <Swiper {...swiperConfig}>{finalChild}</Swiper>;
    }
    return finalChild;
  };

  render() {
    const { style, wrapperStyle } = this.props;
    return (
      <View style={style} wrapperStyle={wrapperStyle}>
        {this.getGroupChildren()}
      </View>
    );
  }
}

export default BarGroup;
