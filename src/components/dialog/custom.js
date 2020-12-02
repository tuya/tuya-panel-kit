import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ViewPropTypes } from 'react-native';
import TYText from '../TYText';
import Footer from './footer';
import { StyledContainer, StyledHeader, StyledTitle, StyledSubTitle } from './styled';
import withMotion from './withMotion';

class CustomDialog extends Component {
  static propTypes = {
    /**
     * 自定义 Dialog Content
     */
    content: PropTypes.any.isRequired,
    /**
     * 自定义 Dialog Header
     */
    header: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * 自定义 Dialog Footer
     */
    footer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * 头部样式
     */
    headerStyle: ViewPropTypes.style,
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

  static defaultProps = {
    style: null,
    header: null,
    footer: null,
    headerStyle: null,
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

  _handleConfirm = () => {
    const { onConfirm } = this.props;
    onConfirm && onConfirm();
  };

  renderHeader = () => {
    const {
      header,
      headerStyle,
      titleNumberOfLines,
      title,
      titleStyle,
      subTitle,
      subTitleStyle,
    } = this.props;
    if (React.isValidElement(header)) return header;
    else if (typeof header === 'function') return header();
    return (
      <StyledHeader style={headerStyle}>
        <StyledTitle style={titleStyle} numberOfLines={titleNumberOfLines}>
          {title}
        </StyledTitle>
        {!!subTitle && <StyledSubTitle style={subTitleStyle}>{subTitle}</StyledSubTitle>}
      </StyledHeader>
    );
  };

  renderFooter = () => {
    const {
      footer,
      confirmText,
      confirmTextStyle,
      confirmAccessibilityLabel,
      footerWrapperStyle,
      cancelText,
      cancelTextStyle,
      cancelAccessibilityLabel,
      onCancel,
    } = this.props;
    if (React.isValidElement(footer)) return footer;
    else if (typeof footer === 'function') return footer();
    return (
      <Footer
        style={footerWrapperStyle}
        cancelTextStyle={cancelTextStyle}
        confirmTextStyle={confirmTextStyle}
        cancelText={cancelText}
        confirmText={confirmText}
        cancelAccessibilityLabel={cancelAccessibilityLabel}
        confirmAccessibilityLabel={confirmAccessibilityLabel}
        onCancel={onCancel}
        onConfirm={this._handleConfirm}
      />
    );
  };

  render() {
    const { style, content } = this.props;
    return (
      <StyledContainer style={style}>
        {this.renderHeader()}
        {content}
        {this.renderFooter()}
      </StyledContainer>
    );
  }
}

export default withMotion(CustomDialog);
