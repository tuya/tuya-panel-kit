import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Utils } from 'tuya-panel-kit';

const { winWidth } = Utils.RatioUtils;

class MotionDialogScene extends React.PureComponent {
  _openDialog = () => {
    Dialog.alert(
      {
        title: '标题',
        subTitle: '副标题',
        confirmText: '确认',
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

export default MotionDialogScene;
