import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class DatePickerModalScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      visible: false,
    };
  }

  closeModal = () => {
    this.setState({ visible: false });
  };

  handleConfirm = date => {
    this.setState({ date });
    this.setState({ visible: false });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.setState({ visible: true })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Click Me</Text>
        </TouchableOpacity>
        <Modal.DatePicker
          visible={this.state.visible}
          onMaskPress={this.closeModal}
          onCancel={this.closeModal}
          onConfirm={this.handleConfirm}
          title={Strings.getLang('modal_birthday')}
          cancelText={Strings.getLang('dialog_cancel')}
          confirmText={Strings.getLang('dialog_confirm')}
          hourText={Strings.getLang('modal_hour')}
          minuteText={Strings.getLang('modal_minute')}
          defaultDate={this.state.date}
          mode="datetime"
          minDate={new Date(1918, 0, 1, 0, 0, 0)}
          maxDate={new Date(2018, 11, 31, 23, 59, 59)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
  },

  textStyle: {
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});
