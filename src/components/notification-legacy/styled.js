import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { RatioUtils } from '../../utils';
import TopBar from '../layout/topbar';
import TYText from '../TYText';

const { convertX: cx } = RatioUtils;

export const StyledNotification = styled(View)`
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
`;

export const StyledNotificationContent = styled(View)`
  width: ${cx(351)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${`${TopBar.height + 12}px 0px 0px`};
  padding: ${`6px ${cx(16)}px`};
  min-height: 56px;
  border-radius: 28;
  background-color: ${props => props.background};
`;

export const StyledTitle = styled(TYText)`
  flex: 1;
  font-size: 14;
  line-height: 20;
  color: ${props => props.color};
  margin: ${`2px ${cx(8)}px`};
`;

export const StyledButton = styled(TouchableOpacity)`
  width: ${cx(24)}px;
  height: ${cx(24)}px;
  align-items: center;
  justify-content: center;
`;
