import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class CountdownModalScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 0,
      visible: false,
      step: 1,
    };
  }

  closeModal = () => {
    this.setState({ visible: false });
  };

  handleConfirm = data => {
    this.setState({ countdown: data.value });
    this.setState({ visible: false });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.setState({ step: 1 })} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Set Step 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ step: 5 })} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Set Step 5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ step: 30 })} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Set Step 30</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({ visible: true })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>
            {`Click Me, current Step:${this.state.step}, current Countdown:${this.state.countdown}`}
          </Text>
        </TouchableOpacity>
        <Modal.Countdown
          visible={this.state.visible}
          step={this.state.step}
          value={this.state.countdown}
          onMaskPress={this.closeModal}
          onShow={() => console.log('show')}
          onHide={() => console.log('hide')}
          onDismiss={() => console.log('dismiss')}
          onCancel={this.closeModal}
          onConfirm={this.handleConfirm}
          title={Strings.getLang('modal_countdown')}
          cancelText={Strings.getLang('dialog_cancel')}
          confirmText={Strings.getLang('dialog_confirm')}
          hourText={Strings.getLang('modal_hour')}
          minuteText={Strings.getLang('modal_minute')}
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
