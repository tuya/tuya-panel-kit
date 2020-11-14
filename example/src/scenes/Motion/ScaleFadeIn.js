import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Motion, Utils } from 'tuya-panel-kit';

const { winWidth } = Utils.RatioUtils;

class MotionScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showScaleFadeIn: false,
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          text="Motion.ScaleFadeIn"
          textStyle={styles.text}
          onPress={() => this.setState({ showScaleFadeIn: !this.state.showScaleFadeIn })}
        />
        <Motion.ScaleFadeIn
          style={{ marginTop: 40 }}
          show={this.state.showScaleFadeIn}
          onHide={() => this.setState({ showScaleFadeIn: false })}
        >
          <View style={styles.content} />
        </Motion.ScaleFadeIn>
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
