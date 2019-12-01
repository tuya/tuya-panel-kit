import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal } from 'tuya-panel-kit';
import ManyModal from './manyModal';

export default class CustomModalScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // modalVisible: false,
      modalText: 'I am a Portal111!!!',
    };
  }

  changeText = string => {
    this.setState({
      modalText: string || 'Ho~Ho~Ho!',
    });
  };

  tap = () => {
    Modal.render(
      <View>
        <Text style={styles.textStyle}>{this.state.modalText}</Text>
        <TouchableOpacity onPress={() => Modal.close()} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Change Text!</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.tap()} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Click Me!</Text>
        </TouchableOpacity>
        {/* <Modal
          visible={this.state.modalVisible}
          onMaskPress={() => this.setState({ modalVisible: false })}
        >

        </Modal> */}
        <ManyModal text={this.state.modalText} changeText={this.changeText} />
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
