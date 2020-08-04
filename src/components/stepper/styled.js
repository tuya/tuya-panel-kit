import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import IconFont from '../iconfont';
import { RatioUtils } from '../../utils';

const { convertX: cx } = RatioUtils;

export const dPlus =
  'M563.20064 196.288l448 597.312A64 64 0 0 1 960.00064 896H64.00064a64 64 0 0 1-51.2-102.4l448-597.312a64 64 0 0 1 102.4 0z';

export const dMinus =
  'M563.20064 827.712l448-597.312A64 64 0 0 0 960.00064 128H64.00064a64 64 0 0 0-51.2 102.4l448 597.312a64 64 0 0 0 102.4 0z';

export const BigButton = styled(View)`
  width: ${cx(153)};
  padding: ${`${cx(2)}px ${cx(2)}px ${cx(2)}px ${cx(2)}px`};
  background-color: #f5f5f5;
  border-radius: ${cx(16)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RightView = styled(View)`
  width: ${cx(104)};
  background-color: transparent;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TouchableOpacityView = styled(TouchableOpacity).attrs({
  activeOpacity: 0.6,
})`
  width: ${cx(52)};
  height: ${cx(28)};
  background-color: #fff;
  border-radius: ${cx(14)};
  align-items: center;
  justify-content: center;
  border-width: ${StyleSheet.hairlineWidth};
  border-color: rgba(51, 51, 51, 0.2);
`;

export const TouchableThreeView = styled(TouchableOpacity).attrs({
  activeOpacity: 0.6,
})`
  width: ${cx(18)};
  height: ${cx(12)};
  background-color: transparent;
  border-radius: ${cx(1)};
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled(TextInput).attrs({
  underlineColorAndroid: 'transparent',
})`
  font-size: 16;
  color: #000;
  width: ${cx(22)};
  height: ${cx(22)};
  align-items: center;
  justify-content: center;
  padding: 0px;
  text-align: center;
`;

export const StyledIconFont = styled(IconFont).attrs({
  size: cx(16),
})``;
