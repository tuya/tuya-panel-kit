import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TopBar, NotificationLegacy } from 'tuya-panel-kit';

// import defaultSvg from 'tuya-panel-kit/src/components/iconfont/svg/defaultSvg';

export default class NotificationLegacyScene extends Component {
  state = {
    visible: true,
  };
  _handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
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
            message="警告提示框"
            onClose={this._handleClose}
          />
        )}
        {!this.state.visible && (
          <Button
            text="显示Notification"
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
