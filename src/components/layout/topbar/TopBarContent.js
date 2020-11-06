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
  /**
   * TopBar.Content的样式。
   */
  style: ViewPropTypes.style,
  /**
   * TopBar.Content标题及副标题颜色，副标题颜色为该颜色加0.6透明度
   */
  color: PropTypes.string,
  /**
   * TopBar.Content的标题
   */
  title: PropTypes.string,
  /**
   * TopBar.Content的标题样式
   */
  titleStyle: Text.propTypes.style,
  /**
   * TopBar.Content的副标题
   */
  subTitle: PropTypes.string,
  /**
   * TopBar.Content的副标题样式
   */
  subTitleStyle: Text.propTypes.style,
  /**
   * TopBar.Content的位置，可为左对齐、居中对齐和右对齐
   */
  position: PropTypes.oneOf(['left', 'center', 'right']),
  /**
   * TopBar.Content的子元素
   */
  children: PropTypes.any,
  /**
   * 点击事件
   */
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
