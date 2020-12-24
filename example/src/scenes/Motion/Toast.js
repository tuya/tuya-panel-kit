import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Motion, Utils } from 'tuya-panel-kit';

const { winWidth } = Utils.RatioUtils;

class MotionScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          text="Motion.Toast"
          textStyle={styles.text}
          onPress={() => this.setState({ show: true })}
        />
        <Motion.Toast
          style={{ marginTop: 40 }}
          show={this.state.show}
          onFinish={() => this.setState({ show: false })}
        >
          <View style={{ width: 200, height: 200, backgroundColor: '#f0f' }} />
        </Motion.Toast>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    width: winWidth,
    height: 44,
    backgroundColor: '#666',
  },

  text: {
    color: '#fff',
  },
});

export default MotionScene;
