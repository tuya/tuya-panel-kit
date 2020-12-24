import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Dialog, Utils } from 'tuya-panel-kit';

const { winWidth } = Utils.RatioUtils;

class MotionDialogScene extends React.PureComponent {
  _openDialog = () => {
    Dialog.custom({
      motionType: 'ScalePullDown',
      title: 'Custom',
      cancelText: '取消',
      confirmText: '确认',
      content: (
        <View style={{ height: 300, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 32, color: '#000' }}>自定义内容</Text>
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
          text="Motion.ScalePullDown 应用于 Dialog"
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
