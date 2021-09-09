import { Text } from 'react-native';
import styled from 'styled-components/native';
import TYText from 'tuya-panel-text';
import { getDefaultTheme } from 'tuya-panel-theme';

const { titleFontColor, confirmFontColor, confirmFontSize } = getDefaultTheme.dialog;

export const StyledTitle = styled(Text)`
  text-align: center;
  color: ${titleFontColor};
`;

export const StyledCancelText = styled(TYText)`
  text-align: center;
  color: ${confirmFontColor};
  font-size: ${confirmFontSize}px;
`;
