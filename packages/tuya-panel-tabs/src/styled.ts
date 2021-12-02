import { Animated, View } from 'react-native';
import styled from 'styled-components/native';
import { CoreTheme } from 'tuya-panel-theme';
import TYText from 'tuya-panel-text';

const { getBrandColor, getTypedFontColor } = CoreTheme;

export const StyledTab = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
  min-height: 36px;
  background-color: #fff;
  overflow: hidden;
`;

export const Center = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const StyledTabBtn = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const StyledTabText = styled(TYText).attrs({
  numberOfLines: 1,
})`
  font-size: 14px;
  color: ${(props: { color: string; isActive: boolean }) => {
    if (typeof props.color !== 'undefined') {
      return props.isActive ? props.color : getTypedFontColor(props);
    }
    return props.isActive ? getBrandColor(props) : getTypedFontColor(props);
  }};
`;

export const AnimatedView = styled(Animated.View)`
  flex-direction: row;
  background-color: transparent;
`;

export const AnimatedUnderline = styled(Animated.View)`
  position: absolute;
  height: 3;
  border-radius: 1.5;
  bottom: 0;
  background-color: ${(props: { color: any }) => props.color || getBrandColor(props)};
  shadow-color: ${props => props.color || getBrandColor(props)};
  shadow-opacity: 0.3;
  shadow-radius: 4;
  shadow-offset: 0px 1px;
`;
