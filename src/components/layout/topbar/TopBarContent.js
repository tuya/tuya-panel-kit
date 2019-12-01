import parseColor from 'color';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableWithoutFeedback, ViewPropTypes } from 'react-native';
import { StyledTopBarContent, StyledTopBarTitle, StyledTopBarSubTitle } from './styled';

const TopBarContent = ({
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

TopBarContent.propTypes = {
  style: ViewPropTypes.style,
  color: PropTypes.string,
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  subTitle: PropTypes.string,
  subTitleStyle: Text.propTypes.style,
  position: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.any,
  onPress: PropTypes.func,
};

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
