import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';
import TYText from '../TYText';
import Footer from './footer';
import { StyledContainer, StyledContent, StyledTitle, StyledSubTitle } from './styled';

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
        <StyledTitle style={titleStyle} numberOfLines={titleNumberOfLines}>
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
  style: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
  titleNumberOfLines: PropTypes.number,
  title: PropTypes.string.isRequired,
  titleStyle: TYText.propTypes.style,
  subTitle: PropTypes.string,
  subTitleStyle: TYText.propTypes.style,
  footerWrapperStyle: ViewPropTypes.style,
  confirmText: PropTypes.string.isRequired,
  confirmTextStyle: TYText.propTypes.style,
  confirmAccessibilityLabel: PropTypes.string,
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

export default Alert;
