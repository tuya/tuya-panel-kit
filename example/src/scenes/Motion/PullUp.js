import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Motion, Utils } from 'tuya-panel-kit';

const { winWidth } = Utils.RatioUtils;

class MotionScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPullUp: false,
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          text="Motion.PullUp"
          textStyle={styles.text}
          onPress={() => this.setState({ showPullUp: !this.state.showPullUp })}
        />
        <Motion.PullUp
          style={{ position: 'absolute', bottom: 0 }}
          dropHeight={200}
          show={this.state.showPullUp}
          onHide={() => this.setState({ showPullUp: false })}
        >
          <View style={[styles.content, { bottom: 0 }]} />
        </Motion.PullUp>
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
    width: winWidth,
    height: 200,
    backgroundColor: '#f0f',
  },
});

export default MotionScene;
