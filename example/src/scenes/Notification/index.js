import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Notification } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class NotificationScene extends Component {
  state = {
    visible: false,
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextState.visible) {
      Notification.show({
        message: Strings.getLang('notification_warning_box'),
        onClose: this._handleClose,
        theme: {
          // iconColor: 'blue',
          successIcon: 'red',
          errorIcon: 'yellow',
          warningIcon: 'black',
        },
        // icon: defaultSvg.close,
        // variant: 'warning',
      });
    } else {
      Notification.hide();
    }
  }

  _handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {!this.state.visible && (
          <Button
            style={{ marginTop: 12 }}
            text={Strings.getLang('notification_show')}
            textStyle={{ marginTop: 12, fontSize: 24, color: '#000' }}
            onPress={() => this.setState({ visible: true })}
          />
        )}
      </View>
    );
  }
}
