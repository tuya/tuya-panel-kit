import React from 'react';
import { View } from 'react-native';
import { TYSdk, TopBar } from 'tuya-panel-kit';

const TYNative = TYSdk.native;

export default () => (
  <View>
    <TopBar
      theme={{
        background: '#ff0000',
        color: '#00ffff',
      }}
      // background="#333"
      title="Title"
      actions={[
        {
          name: 'pen',
          onPress: () => TYNative.showDeviceMenu(),
        },
      ]}
      onBack={TYSdk.Navigator.pop}
    />
  </View>
);
