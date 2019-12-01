import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';
import TYText from '../TYText';
import { StyledFooter, StyledButton, StyledCancelText, StyledConfirmText } from './styled';

const DialogFooter = ({
  style,
  cancelText,
  cancelTextStyle,
  cancelAccessibilityLabel,
  confirmText,
  confirmTextStyle,
  confirmAccessibilityLabel,
  onCancel,
  onConfirm,
}) => {
  return (
    <StyledFooter style={style}>
      {!!cancelText && (
        <StyledButton
          bordered={!!cancelText && !!confirmText}
          accessibilityLabel={cancelAccessibilityLabel}
          onPress={onCancel}
        >
          <StyledCancelText style={cancelTextStyle}>{cancelText}</StyledCancelText>
        </StyledButton>
      )}
      {!!confirmText && (
        <StyledButton accessibilityLabel={confirmAccessibilityLabel} onPress={onConfirm}>
          <StyledConfirmText style={confirmTextStyle}>{confirmText}</StyledConfirmText>
        </StyledButton>
      )}
    </StyledFooter>
  );
};

DialogFooter.propTypes = {
  style: ViewPropTypes.style,
  cancelText: PropTypes.string,
  cancelTextStyle: TYText.propTypes.style,
  cancelAccessibilityLabel: PropTypes.string,
  confirmText: PropTypes.string,
  confirmTextStyle: TYText.propTypes.style,
  confirmAccessibilityLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

DialogFooter.defaultProps = {
  style: null,
  cancelText: '',
  cancelTextStyle: null,
  cancelAccessibilityLabel: 'Dialog.Cancel',
  confirmText: '',
  confirmTextStyle: null,
  confirmAccessibilityLabel: 'Dialog.Confirm',
  onCancel: null,
  onConfirm: null,
};

export default DialogFooter;
