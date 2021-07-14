import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';
import TYText from '../TYText';
import {
  StyledFooter,
  StyledCancelButton,
  StyledConfirmButton,
  StyledCancelText,
  StyledConfirmText,
} from './styled';

export class DialogFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressConfirmActive: false,
      pressCancelActive: false,
    };
  }

  _handlePressIn = isConfirm => {
    if (isConfirm) {
      this.setState({
        pressConfirmActive: true,
      });
    } else {
      this.setState({
        pressCancelActive: true,
      });
    }
  };

  _handlePressOut = isConfirm => {
    if (isConfirm) {
      this.setState({
        pressConfirmActive: false,
      });
    } else {
      this.setState({
        pressCancelActive: false,
      });
    }
  };

  render() {
    const {
      style,
      cancelText,
      cancelTextStyle,
      cancelAccessibilityLabel,
      confirmText,
      confirmTextStyle,
      confirmAccessibilityLabel,
      confirmDisabled,
      onCancel,
      onConfirm,
    } = this.props;
    const { pressConfirmActive, pressCancelActive } = this.state;
    return (
      <StyledFooter style={style}>
        {!!cancelText && (
          <StyledCancelButton
            bordered={!!cancelText && !!confirmText}
            accessibilityLabel={cancelAccessibilityLabel}
            onPressIn={() => this._handlePressIn(false)}
            onPressOut={() => this._handlePressOut(false)}
            onPress={onCancel}
            pressActive={pressCancelActive}
          >
            <StyledCancelText style={cancelTextStyle}>{cancelText}</StyledCancelText>
          </StyledCancelButton>
        )}
        {!!confirmText && (
          <StyledConfirmButton
            accessibilityLabel={confirmAccessibilityLabel}
            onPress={onConfirm}
            onPressIn={() => this._handlePressIn(true)}
            onPressOut={() => this._handlePressOut(true)}
            disabled={confirmDisabled}
            pressActive={pressConfirmActive}
          >
            <StyledConfirmText style={confirmTextStyle}>{confirmText}</StyledConfirmText>
          </StyledConfirmButton>
        )}
      </StyledFooter>
    );
  }
}

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
  confirmDisabled: PropTypes.bool,
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
  confirmDisabled: false,
};

export default DialogFooter;
