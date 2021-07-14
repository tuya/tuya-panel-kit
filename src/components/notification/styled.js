import { View, TouchableOpacity, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { RatioUtils } from '../../utils';
import TYText from '../TYText';
import IconFont from '../iconfont';

const { viewWidth, convertX: cx } = RatioUtils;

export const StyledNotification = styled(TouchableOpacity)`
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
`;

export const StyledNotificationContent = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${`${12}px 0px ${2}px 0px`};
  border-radius: 22;
  background-color: ${props => props.background};
`;

export const StyledNotificationContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${`10px ${cx(16)}px`};
  min-height: 10;
  background-color: ${props => props.background};
`;

export const StyledTitle = styled(TYText)`
  min-width: ${cx(44)}px;
  max-width: ${viewWidth - 142}px;
  font-size: 14;
  color: ${props => props.color};
  margin: ${`0px ${cx(30)}px 0px ${cx(32)}px`};
`;

export const StyledIconFont = styled(IconFont)`
  position: absolute;
  top: ${cx(3)}px;
`;

export const StyledImage = styled(Image)`
  position: absolute;
  top: ${cx(2)}px;
  height: ${cx(21)}px;
  width: ${cx(24)}px;
`;
