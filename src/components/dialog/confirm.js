import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';
import TYText from '../TYText';
import Footer from './footer';
import { StyledContainer, StyledContent, StyledTitle, StyledSubTitle } from './styled';
import withMotion from './withMotion';

const Confirm = ({
  style,
  contentStyle,
  titleNumberOfLines,
  title,
  titleStyle,
  subTitle,
  subTitleStyle,
  confirmText,
  confirmTextStyle,
  confirmAccessibilityLabel,
  footerWrapperStyle,
  cancelText,
  cancelTextStyle,
  cancelAccessibilityLabel,
  onConfirm,
  onCancel,
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
        cancelTextStyle={cancelTextStyle}
        confirmTextStyle={confirmTextStyle}
        cancelText={cancelText}
        confirmText={confirmText}
        cancelAccessibilityLabel={cancelAccessibilityLabel}
        confirmAccessibilityLabel={confirmAccessibilityLabel}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </StyledContainer>
  );
};

Confirm.propTypes = {
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
   * 取消文案
   */
  cancelText: PropTypes.string.isRequired,
  /**
   * 取消文案样式
   */
  cancelTextStyle: TYText.propTypes.style,
  /**
   * 取消按钮测试标示
   */
  cancelAccessibilityLabel: PropTypes.string,
  /**
   * 确认文案
   */
  confirmText: PropTypes.string.isRequired,
  /**
   * 确认文案样式
   */
  confirmTextStyle: TYText.propTypes.style,
  /**
   * 确认按钮测试标示
   */
  confirmAccessibilityLabel: PropTypes.string,
  /**
   * 取消回调函数
   */
  onCancel: PropTypes.func,
  /**
   * 确认回调函数
   */
  onConfirm: PropTypes.func,
};

Confirm.defaultProps = {
  style: null,
  contentStyle: null,
  titleNumberOfLines: 2,
  titleStyle: null,
  subTitle: '',
  subTitleStyle: null,
  footerWrapperStyle: null,
  cancelTextStyle: null,
  cancelAccessibilityLabel: 'Dialog.Cancel',
  confirmTextStyle: null,
  confirmAccessibilityLabel: 'Dialog.Confirm',
  onCancel: null,
  onConfirm: null,
};

export default withMotion(Confirm);
