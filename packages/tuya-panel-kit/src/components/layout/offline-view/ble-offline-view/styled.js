/* eslint-disable import/prefer-default-export */
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { dialog } from '../../../theme/theme-get';
import TYText from '../../../TYText';

const { titleFontColor, confirmFontColor, confirmFontSize } = dialog;

export const StyledTitle = styled(Text)`
  text-align: center;
  color: ${titleFontColor};
`;

export const StyledCancelText = styled(TYText)`
  text-align: center;
  color: ${confirmFontColor};
  font-size: ${confirmFontSize}px;
`;
