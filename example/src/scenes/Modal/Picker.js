import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal } from 'tuya-panel-kit';

export default class PickerModalScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
      visible: false,
    };
  }

  closeModal = () => {
    this.setState({ visible: false });
  };

  handleConfirm = value => {
    this.setState({ visible: false, value });
  };

  render() {
    const dataSource = [
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
    ];
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.setState({ visible: true })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Click Me</Text>
        </TouchableOpacity>
        <Modal.Picker
          visible={this.state.visible}
          dataSource={dataSource}
          value={this.state.value}
          label="haha"
          onMaskPress={this.closeModal}
          onCancel={this.closeModal}
          onConfirm={this.handleConfirm}
          onValueChange={value => console.log('onValueChange', value)}
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
