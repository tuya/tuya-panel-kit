import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, GlobalToast } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class GlobalToastScene extends Component {
  _handleClick = () => {
    GlobalToast.show({
      text: Strings.getLang('globalToast_suggest'),
      showIcon: false,
      contentStyle: {},
      showPosition: 'bottom',
      onFinish: () => {
        console.log(Strings.getLang('globalToast_end_toast'));
        GlobalToast.hide();
      },
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={{ marginTop: 12 }}
          text= {Strings.getLang('globalToast_show_toast')}
          textStyle={{ marginTop: 12, fontSize: 24, color: '#000' }}
          onPress={this._handleClick}
        />
      </View>
    );
  }
}
