import React from 'react';
import Modal from '../modal';
import Countdown from './countdown';
import DatePicker from './date-picker';
import TimerPicker from './timer-picker';
import NumberSelector from './number-selector';
import List from './list';
import Picker from './picker';
import Custom from './custom';
import Notification from '../notification-legacy';
import Dropdown from './dropdown';
import Tips from '../tips';
import { RatioUtils } from '../../utils';

const { convertX: cx } = RatioUtils;

const commonProps = {
  onCancel: Modal.close,
  onConfirm: Modal.close,
};

const commonModalProps = {
  alignContainer: 'bottom',
  onMaskPress: Modal.close,
};

const Popup = {
  countdown: (props, modalOpts) => {
    const countdownProps = { ...commonProps, ...props };
    const modalProps = { ...commonModalProps, ...modalOpts };
    Modal.render(<Countdown {...countdownProps} />, modalProps);
  },

  datePicker: (props, modalOpts) => {
    const datePickerProps = { ...commonProps, ...props };
    const modalProps = { ...commonModalProps, ...modalOpts };
    Modal.render(<DatePicker {...datePickerProps} />, modalProps);
  },

  numberSelector: (props, modalOpts) => {
    const numberSelectorProps = { ...commonProps, ...props };
    const modalProps = { ...commonModalProps, ...modalOpts };
    Modal.render(<NumberSelector {...numberSelectorProps} />, modalProps);
  },

  list: (props, modalOpts) => {
    const listProps = { ...commonProps, ...props };
    const modalProps = { ...commonModalProps, ...modalOpts };
    Modal.render(<List {...listProps} />, modalProps);
  },

  picker: (props, modalOpts) => {
    const pickerProps = { ...commonProps, ...props };
    const modalProps = { ...commonModalProps, ...modalOpts };
    Modal.render(<Picker {...pickerProps} />, modalProps);
  },

  custom: (props, modalOpts) => {
    const customProps = { ...commonProps, ...props };
    const modalProps = { ...commonModalProps, ...modalOpts };
    Modal.render(<Custom {...customProps} />, modalProps);
  },

  timerPicker: (props, modalOpts) => {
    const timerPickerProps = { ...commonProps, ...props };
    const modalProps = { ...commonModalProps, ...modalOpts };
    Modal.render(<TimerPicker {...timerPickerProps} />, modalProps);
  },

  toast: (props, modalOpts) => {
    if (__DEV__) {
      console.warn('Popup.toast 已废弃，可能将会在后续版本中移除，请考虑使用 Notification.show');
    }
    const noticeProps = {
      onClose: Modal.close,
      ...props,
    };
    const modalProps = {
      alignContainer: 'top',
      mask: false,
      ...modalOpts,
    };
    Modal.render(<Notification {...noticeProps} />, modalProps);
  },

  tips: (props, modalOpts) => {
    const { contentStyle, modalChildStyle, maskStyle, alignContainer } = props;
    const maskWidth =
      contentStyle !== undefined && contentStyle.width ? contentStyle.width : cx(64);
    let modalStyle;
    if (modalChildStyle !== undefined && modalChildStyle.height) {
      const { height, ...rest } = modalChildStyle;
      modalStyle = rest;
    } else {
      modalStyle = modalChildStyle;
    }
    const modalProps = {
      ...modalOpts,
      maskStyle: [{ backgroundColor: 'rgba(0, 0, 0, 0.1)', alignItems: 'center' }, maskStyle],
      modalChildStyle: [modalStyle, { minWidth: maskWidth }],
      alignContainer: alignContainer || 'center',
    };
    Modal.render(<Tips {...props} />, modalProps);
  },

  dropdown: (props, modalOpts) => {
    const listProps = { ...commonProps, ...props };
    const {
      dropdownDirectionX,
      dropdownDirectionY,
      dropdownDirectionXValue,
      dropdownDirectionYValue,
    } = props;
    const maskStyle = {
      alignItems: dropdownDirectionX === 'left' ? 'flex-start' : 'flex-end',
      backgroundColor: 'transparent',
    };
    if (dropdownDirectionX === 'left') {
      maskStyle.left = dropdownDirectionXValue || 0;
    } else {
      maskStyle.right = dropdownDirectionXValue || 0;
    }

    if (dropdownDirectionY === 'bottom') {
      maskStyle.bottom = dropdownDirectionYValue || 0;
    } else {
      maskStyle.top = dropdownDirectionYValue || 0;
    }

    const modalProps = {
      ...commonModalProps,
      ...modalOpts,
      maskStyle,
      alignContainer: dropdownDirectionY || 'top',
    };
    Modal.render(<Dropdown {...listProps} />, modalProps);
  },
  close: Modal.close,
  render: Modal.render,
};

export default Popup;
