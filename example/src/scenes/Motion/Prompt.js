import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Utils } from 'tuya-panel-kit';

const { winWidth } = Utils.RatioUtils;

class MotionPromptScene extends React.PureComponent {
  state = {
    promptUnControlled: '',
  };

  _openDialog = () => {
    Dialog.prompt({
      title: '非受控输入框',
      cancelText: '取消',
      confirmText: '确认',
      defaultValue: this.state.promptUnControlled,
      placeholder: 'Password',
      onConfirm: text => {
        console.log('uncontrolled text :', text);
        this.setState({ promptUnControlled: text });
        Dialog.close();
      },
      motionType: 'ScaleFadeIn',
      motionConfig: {
        initScale: 0.5,
        finalScale: 1,
        showDuration: 100,
        hideDuration: 300,
      },
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          text="Motion.ScaleFadeIn 应用于 Dialog"
          textStyle={styles.text}
          onPress={this._openDialog}
        />
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

export default MotionPromptScene;
