import React from 'react';
import { Modal, Motion } from 'tuya-panel-kit';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

class ManyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ modalVisible: true })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Click Me!</Text>
        </TouchableOpacity>
        <Modal
          mask={true}
          visible={this.state.modalVisible}
          onMaskPress={() => this.setState({ modalVisible: false })}
        >
          {/* <Text style={styles.textStyle}>{`${this.props.text}222`}</Text> */}
          <Motion.PullUp show={true}>
            <TouchableOpacity
              onPress={() => this.props.changeText('hahaha')}
              style={styles.buttonStyle}
            >
              <Text style={styles.textStyle}>Change Text!</Text>
            </TouchableOpacity>
          </Motion.PullUp>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  buttonStyle: {
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default ManyModal;
