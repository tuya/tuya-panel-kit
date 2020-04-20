import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, GlobalToast } from 'tuya-panel-kit';

export default class GlobalToastScene extends Component {
  _handleClick = () => {
    GlobalToast.show({
      text: '设置成功',
      onFinish: () => {
        console.log('Toast结束');
        GlobalToast.hide();
      },
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={{ marginTop: 12 }}
          text="显示Success-挂在FullView"
          textStyle={{ marginTop: 12, fontSize: 24, color: '#000' }}
          onPress={this._handleClick}
        />
      </View>
    );
  }
}
