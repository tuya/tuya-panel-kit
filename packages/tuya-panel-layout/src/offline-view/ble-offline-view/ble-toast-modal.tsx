import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import TopBar from 'tuya-panel-topbar';
import BleToast, { IBleToastProps } from './ble-toast';
import { IBleOfflineModalProps } from './ble-tip-modal';

export interface IBleOfflineModalState {
  value: Animated.Value;
}

export interface IBleOfflineModal extends IBleOfflineModalProps, IBleToastProps {}
export default class BleOfflineModal extends PureComponent<
  IBleOfflineModal,
  IBleOfflineModalState
> {
  static defaultProps = {
    disabled: false,
    maskColor: 'rgba(0, 0, 0, 0.4)',
    onClose: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.show();
  }

  show = () => {
    Animated.spring(this.state.value, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  hide = () => {
    Animated.spring(this.state.value, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      typeof this.props.onClose === 'function' && this.props.onClose();
    });
  };

  render() {
    const { disabled, maskColor, ...toastProps } = this.props;
    const { value } = this.state;
    return (
      <TouchableOpacity
        style={styles.modal}
        activeOpacity={1}
        disabled={disabled}
        onPress={this.hide}
      >
        <Animated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }]}
        />
        <BleToast {...toastProps} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: TopBar.height,
  },
});
