import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TopBar, NotificationLegacy } from 'tuya-panel-kit';
import Strings from '../../i18n';
// import defaultSvg from 'tuya-panel-kit/src/components/iconfont/svg/defaultSvg';

export default class NotificationLegacyScene extends Component {
  state = {
    visible: true,
  };
  _handleClose = () => {
    this.setState({ visible: false });
  };

  render() {

    t = Strings.getLang('show') + 'Notification';

    return (
      <View style={styles.container}>
        {this.state.visible && (
          <NotificationLegacy
            style={styles.notification}
            theme={{
              // iconColor: 'blue',
              successIcon: 'red',
              errorIcon: 'yellow',
              warningIcon: 'black',
            }}
            // icon={defaultSvg.close}
            // variant="warning"
            message={Strings.getLang('notification_warning_box')}
            onClose={this._handleClose}
            onPress={() => console.log('kkkk')}
          />
        )}
        {!this.state.visible && (
          <Button
            text={Strings.getLang('notification_show')}
            textStyle={{ marginTop: 12, fontSize: 24, color: '#000' }}
            onPress={() => this.setState({ visible: true })}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999,
  },

  notification: {
    position: 'absolute',
    top: -TopBar.height,
    left: 0,
    right: 0,
  },
});
