import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Motion, Utils } from 'tuya-panel-kit';

const { winWidth } = Utils.RatioUtils;

class MotionScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showScalePullDown: false,
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          text="Motion.ScalePullDown"
          textStyle={styles.text}
          onPress={() => this.setState({ showScalePullDown: !this.state.showScalePullDown })}
        />
        <Motion.ScalePullDown
          style={{ marginTop: 40 }}
          show={this.state.showScalePullDown}
          onHide={() => this.setState({ showScalePullDown: false })}
        >
          <View style={styles.content} />
        </Motion.ScalePullDown>
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
    height: 200,
    backgroundColor: '#f0f',
  },
});

export default MotionScene;
