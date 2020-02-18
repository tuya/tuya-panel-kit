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
    style: ViewPropTypes.style,
    headerStyle: ViewPropTypes.style,
    titleNumberOfLines: PropTypes.number,
    title: PropTypes.string.isRequired,
    titleStyle: TYText.propTypes.style,
    subTitle: PropTypes.string,
    subTitleStyle: TYText.propTypes.style,
    footerWrapperStyle: ViewPropTypes.style,
    cancelText: PropTypes.string.isRequired,
    cancelTextStyle: TYText.propTypes.style,
    cancelAccessibilityLabel: PropTypes.string,
    confirmText: PropTypes.string.isRequired,
    confirmTextStyle: TYText.propTypes.style,
    confirmAccessibilityLabel: PropTypes.string,
    onCancel: PropTypes.func,
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
