import parseColor from 'color';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { StyledTopBarContent, StyledTopBarTitle, StyledTopBarSubTitle } from './styled';
import { ITopBarContentProps } from './interface';

const TopBarContent: React.FC<ITopBarContentProps> = ({
  style,
  color,
  title,
  titleStyle,
  subTitle,
  subTitleStyle,
  position,
  children,
  onPress,
}) => {
  const titleColor = color;
  const subTitleColor =
    titleColor &&
    parseColor(color)
      .alpha(0.6)
      .rgbString();
  return (
    <TouchableWithoutFeedback accessibilityLabel="TopBar_Btn_Title" onPress={onPress}>
      <StyledTopBarContent style={style} align={position}>
        {!!title && (
          <StyledTopBarTitle style={titleStyle} color={color} numberOfLines={1}>
            {title}
          </StyledTopBarTitle>
        )}
        {!!subTitle && (
          <StyledTopBarSubTitle style={subTitleStyle} color={subTitleColor} numberOfLines={1}>
            {subTitle}
          </StyledTopBarSubTitle>
        )}
        {children}
      </StyledTopBarContent>
    </TouchableWithoutFeedback>
  );
};

TopBarContent.displayName = 'TopBar.Content';

TopBarContent.defaultProps = {
  style: null,
  color: null,
  title: '',
  titleStyle: null,
  subTitle: '',
  subTitleStyle: null,
  position: 'center',
  children: null,
  onPress: null,
};

export default TopBarContent;
