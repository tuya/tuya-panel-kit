import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Utils } from 'tuya-panel-kit';
import Strings from '../../i18n';

const { winWidth } = Utils.RatioUtils;

class MotionPromptScene extends React.PureComponent {
  state = {
    promptUnControlled: '',
  };

  _openDialog = () => {
    Dialog.prompt({
      title: Strings.getLang('dialog_uncontrolled_input_box'),
      cancelText: Strings.getLang('dialog_cancel'),
      confirmText: Strings.getLang('dialog_confirm'),
      defaultValue: this.state.promptUnControlled,
      placeholder: 'Password',
      onConfirm: (text, { close }) => {
        console.log('uncontrolled text :', text);
        this.setState({ promptUnControlled: text });
        close();
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
          text={Strings.getLang('motion_prompt')}
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
