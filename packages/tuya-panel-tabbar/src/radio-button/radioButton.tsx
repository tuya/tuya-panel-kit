import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import TYText from 'tuya-panel-text';
import { IRadioButtonProps } from './interface';

const RadioButton = (props: IRadioButtonProps) => {
  const {
    title,
    onItemPress,
    style,
    isActive,
    textStyle,
    activeTextStyle,
    circleStyle,
    accessibilityLabel,
    textAccessibilityLabel,
    type,
  } = props;
  const customTextStyle = [
    styles.textStyle,
    textStyle && textStyle,
    isActive && styles.activeTextStyle,
    isActive && activeTextStyle && activeTextStyle,
  ];
  return (
    <TouchableOpacity
      onPress={onItemPress}
      style={[{ alignItems: 'center', justifyContent: 'center' }, style]}
      accessibilityLabel={accessibilityLabel}
    >
      {typeof title === 'string' || typeof title === 'number' ? (
        isActive || type === 'radio' ? (
          <TYText
            style={customTextStyle}
            numberOfLines={1}
            accessibilityLabel={textAccessibilityLabel}
          >
            {title}
          </TYText>
        ) : (
          <View style={[styles.circleStyle, circleStyle]} />
        )
      ) : (
        title
      )}
    </TouchableOpacity>
  );
};

RadioButton.defaultProps = {
  isActive: false,
  style: {},
  textStyle: {},
  activeTextStyle: {},
  type: 'radio',
  circleStyle: {},
};

export default RadioButton;

const styles = StyleSheet.create({
  activeTextStyle: {
    color: '#57BCFB',
    fontWeight: '500',
  },
  circleStyle: {
    backgroundColor: '#57BCFB',
    borderRadius: 2,
    height: 4,
    width: 4,
  },
  textStyle: {
    backgroundColor: 'transparent',
    color: '#9CA3A9',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
});
