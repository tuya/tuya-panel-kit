import { View, TouchableOpacity, Image } from 'react-native';
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
  padding: ${`10px ${cx(16)}px`};
  min-height: 24;
  border-radius: 22;
  background-color: ${props => props.background};
`;

export const StyledTitle = styled(TYText)`
  min-width: ${cx(44)}px;
  max-width: ${viewWidth - 142}px;
  font-size: 14;
  line-height: 22;
  color: ${props => props.color};
  margin: ${props =>
    props.backIconCenter ? `0px ${cx(30)}px 0px ${cx(32)}px` : `0px ${cx(54)}px 0px ${cx(32)}px`};
`;

export const StyledButton = styled(TouchableOpacity)`
  width: ${cx(24)}px;
  height: 24;
  justify-content: center;
`;

export const StyledIconFont = styled(IconFont)`
  position: absolute;
  top: ${cx(10)}px;
  left: ${cx(16)}px;
`;

export const StyledImage = styled(Image)`
  position: absolute;
  top: ${cx(10)}px;
  left: ${cx(16)}px;
  height: ${cx(21)}px;
  width: ${cx(24)}px;
`;
