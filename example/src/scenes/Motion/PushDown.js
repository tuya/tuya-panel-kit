import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Motion, Utils } from 'tuya-panel-kit';

const { winWidth } = Utils.RatioUtils;

class MotionScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPushDown: false,
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          text="Motion.PushDown"
          textStyle={styles.text}
          onPress={() => this.setState({ showPushDown: !this.state.showPushDown })}
        />
        <Motion.PushDown
          style={{ marginTop: 40 }}
          show={this.state.showPushDown}
          onHide={() => this.setState({ showPushDown: false })}
          dropHeight={200}
        >
          <View style={styles.content} />
        </Motion.PushDown>
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

  content: {
    width: 200,
    height: 40,
    backgroundColor: '#f0f',
  },
});

export default MotionScene;
