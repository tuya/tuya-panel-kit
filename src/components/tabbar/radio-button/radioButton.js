/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, Text, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TYText from '../../TYText';

const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  activeTextStyle: {
    color: '#5190F3',
  },
});

const RadioButton = props => {
  const {
    title,
    onItemPress,
    style,
    isActive,
    textStyle,
    activeTextStyle,
    accessibilityLabel,
    textAccessibilityLabel,
  } = props;
  const customTextStyle = [
    styles.textStyle,
    textStyle && textStyle,
    isActive && styles.activeTextStyle,
    isActive && activeTextStyle && activeTextStyle,
  ];
  return (
    <TouchableOpacity onPress={onItemPress} style={style} accessibilityLabel={accessibilityLabel}>
      {typeof title === 'string' || typeof title === 'number' ? (
        <TYText
          style={customTextStyle}
          numberOfLines={1}
          accessibilityLabel={textAccessibilityLabel}
        >
          {title}
        </TYText>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
};

RadioButton.propTypes = {
  title: PropTypes.node.isRequired,
  isActive: PropTypes.bool,

  accessibilityLabel: PropTypes.string,
  textAccessibilityLabel: PropTypes.string,

  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  activeTextStyle: Text.propTypes.style,

  onItemPress: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
  isActive: false,
  style: {},
  textStyle: {},
  activeTextStyle: {},
};

export default RadioButton;
