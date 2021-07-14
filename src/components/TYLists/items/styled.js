import { View } from 'react-native';
import styled from 'styled-components/native';
import { StyledValueText, StyledImage, StyledIconFont } from '../styled';
import { RatioUtils } from '../../../utils';

const { convertX: cx } = RatioUtils;

export const StyledPlaceholder = styled(View)`
  width: ${cx(40)}px;
  align-items: ${props => (props.alignLeft ? 'flex-start' : 'flex-end')};
`;

export const StyledSliderText = StyledValueText;

export const StyledSliderImage = StyledImage;

export const StyledSliderIconFont = StyledIconFont;
