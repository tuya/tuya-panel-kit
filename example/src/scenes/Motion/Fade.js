import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Motion, Utils } from 'tuya-panel-kit';

const { winWidth } = Utils.RatioUtils;

class MotionScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showFade: false,
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          text="Motion.Fade"
          textStyle={styles.text}
          onPress={() => this.setState({ showFade: !this.state.showFade })}
        />
        <Motion.Fade show={this.state.showFade} onHide={() => this.setState({ showFade: false })}>
          <View style={styles.content} />
        </Motion.Fade>
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
