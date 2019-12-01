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
  static Group = Group;
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

  static propTypes = {
    type: PropTypes.oneOf(['primary', 'normal']),
    size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'normal', 'small']), PropTypes.number]),
    stretch: PropTypes.bool,
    backgroundType: PropTypes.oneOf(['alpha', 'pure']),
    backgroundColor: ColorPropType,
    hasBottomBorder: PropTypes.bool,
    style: ViewPropTypes.style,
    button: PropTypes.array.isRequired,
    wrapperStyle: ViewPropTypes.style,
  };

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
