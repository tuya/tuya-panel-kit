/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';
import TYText from '../TYText';
import Footer from './footer';
import { StyledContainer, StyledContent, StyledTitle, StyledSubTitle } from './styled';
import withMotion from './withMotion';

const Alert = ({
  style,
  contentStyle,
  titleNumberOfLines,
  title,
  titleStyle,
  subTitle,
  subTitleStyle,
  footerWrapperStyle,
  confirmText,
  confirmTextStyle,
  confirmAccessibilityLabel,
  onConfirm,
}) => {
  return (
    <StyledContainer style={style}>
      <StyledContent style={contentStyle}>
        <StyledTitle
          style={[{ paddingVertical: subTitle ? 0 : 12 }, titleStyle]}
          numberOfLines={titleNumberOfLines}
        >
          {title}
        </StyledTitle>
        {!!subTitle && <StyledSubTitle style={subTitleStyle}>{subTitle}</StyledSubTitle>}
      </StyledContent>
      <Footer
        style={footerWrapperStyle}
        confirmTextStyle={confirmTextStyle}
        confirmText={confirmText}
        confirmAccessibilityLabel={confirmAccessibilityLabel}
        onConfirm={onConfirm}
      />
    </StyledContainer>
  );
};

Alert.propTypes = {
  /**
   * 容器样式
   */
  style: ViewPropTypes.style,
  /**
   * 内容样式
   */
  contentStyle: ViewPropTypes.style,
  /**
   * 标题超过多少行显示省略号
   */
  titleNumberOfLines: PropTypes.number,
  /**
   * 标题
   */
  title: PropTypes.string.isRequired,
  /**
   * 标题样式
   */
  titleStyle: TYText.propTypes.style,
  /**
   * 副标题
   */
  subTitle: PropTypes.string,
  /**
   * 副标题样式
   */
  subTitleStyle: TYText.propTypes.style,
  /**
   * footer容器样式
   */
  footerWrapperStyle: ViewPropTypes.style,
  /**
   * 确认文案
   */
  confirmText: PropTypes.string.isRequired,
  /**
   * 确认文案样式
   */
  confirmTextStyle: TYText.propTypes.style,
  /**
   * 测试标志
   */
  confirmAccessibilityLabel: PropTypes.string,
  /**
   * 确认回调
   */
  onConfirm: PropTypes.func,
};

Alert.defaultProps = {
  style: null,
  contentStyle: null,
  titleNumberOfLines: 2,
  titleStyle: null,
  subTitle: '',
  subTitleStyle: null,
  footerWrapperStyle: null,
  confirmTextStyle: null,
  confirmAccessibilityLabel: 'Dialog.Confirm',
  onConfirm: null,
};

export default withMotion(Alert);
