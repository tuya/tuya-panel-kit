import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Dialog, Utils } from 'tuya-panel-kit';
import Strings from '../../i18n';

const { winWidth } = Utils.RatioUtils;

class MotionDialogScene extends React.PureComponent {
  _openDialog = () => {
    Dialog.custom({
      motionType: 'ScalePullDown',
      title: 'Custom',
      cancelText: Strings.getLang('dialog_cancel'),
      confirmText: Strings.getLang('dialog_confirm'),
      content: (
        <View style={{ height: 300, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 32, color: '#000' }}>{Strings.getLang('dialog_custom_content')}</Text>
        </View>
      ),
      onConfirm: () => {
        Dialog.close();
      },
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          text={Strings.getLang('motion_custom')}
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
