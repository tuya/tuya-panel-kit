import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';
import TYText from '../TYText';
import Footer from './footer';
import { StyledContainer, StyledContent, StyledTitle, StyledSubTitle } from './styled';

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
        <StyledTitle style={titleStyle} numberOfLines={titleNumberOfLines}>
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
  style: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
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

export default Confirm;
