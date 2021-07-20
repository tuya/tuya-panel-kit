import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import TYText from '../TYText';
import IconFont from '../iconfont';
import { defaultTheme } from '../theme';
import { RatioUtils, ThemeUtils } from '../../utils';

const { convertX: cx } = RatioUtils;
const { getTheme } = ThemeUtils;

const DEFAULT_THEME = defaultTheme.checkbox.light;

export const StyledCheckbox = styled(TouchableOpacity)`
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
`;

export const StyledIcon = styled(IconFont).attrs({
  size: props => props.size || getTheme(props, 'checkbox.size', DEFAULT_THEME.size),
  color: props => {
    let color;
    if (props.disabled) {
      color =
        props.disabledColor ||
        getTheme(props, 'checkbox.disabledColor', DEFAULT_THEME.disabledColor);
    } else {
      color =
        props.activeColor || getTheme(props, 'checkbox.activeColor', DEFAULT_THEME.activeColor);
    }
    return color;
  },
})``;

export const StyledText = styled(TYText).attrs({
  type: 'title',
  size: 'small',
})`
  margin-left: ${cx(6)}px;
  color: ${props => getTheme(props, 'checkbox.fontColor', DEFAULT_THEME.fontColor)};
`;
