import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes, Image } from 'react-native';
import IconFont from '../iconfont';
import TYText from '../TYText';
import Footer from './footer';
import { StyledContainer, StyledContent, StyledTitle, StyledSubTitle } from './styled';
import withMotion from './withMotion';

const Confirm = ({
  style,
  contentStyle,
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
  imageSource,
  imageStyle,
  iconPath,
  iconSize,
}) => {
  return (
    <StyledContainer style={style}>
      <StyledContent style={contentStyle}>
        {imageSource && (
          <Image
            source={imageSource}
            style={[{ width: 100, height: 100, marginBottom: 16 }, imageStyle]}
          />
        )}
        {!!iconPath && (
          <IconFont d={iconPath} size={iconSize} style={[{ marginBottom: 16 }, imageStyle]} />
        )}
        <StyledTitle style={[!!subTitle && { fontSize: 16, marginBottom: 14 }, titleStyle]}>
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
  /**
   * 图片资源
   */
  imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  /**
   * 图片样式
   */
  imageStyle: ViewPropTypes.style,
  /**
   * 图标路径
   */
  iconPath: PropTypes.string,
  /**
   * 图标尺寸
   */
  iconSize: PropTypes.number,
};

Confirm.defaultProps = {
  style: null,
  contentStyle: null,
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
  imageSource: null,
  imageStyle: {},
  iconPath: null,
  iconSize: 100,
};

export default withMotion(Confirm);
