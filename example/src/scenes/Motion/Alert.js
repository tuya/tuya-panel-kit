import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Utils } from 'tuya-panel-kit';
import Strings from '../../i18n';

const { winWidth } = Utils.RatioUtils;

class MotionDialogScene extends React.PureComponent {
  _openDialog = () => {
    Dialog.alert(
      {
        title: Strings.getLang('dialog_title'),
        subTitle: Strings.getLang('dialog_sub_title'),
        confirmText: Strings.getLang('dialog_confirm'),
        motionType: 'ScaleFadeIn',
        motionConfig: {
          fadeOpacity: 1,
          dropHeight: 300,
        },
      },
      {
        onShow: () => console.log('onShow'),
        onHide: () => console.log('onHide'),
        onDismiss: () => console.log('onDismiss'),
      }
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          text={Strings.getLang('motion_alert')}
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

export default MotionDialogScene;
