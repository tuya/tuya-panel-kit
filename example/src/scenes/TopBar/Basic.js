import React from 'react';
import { View, Platform } from 'react-native';
import { TYSdk, TopBar } from 'tuya-panel-kit';

const TYNative = TYSdk.native;

const backIcon = Platform.OS === 'ios' ? 'backIos' : 'backAndroid';

export default () => (
  <View>
    {/* 拆分版 */}
    <TopBar.Container background="#000">
      <TopBar.Action name={backIcon} color="red" onPress={TYSdk.Navigator.pop} />
      <TopBar.Content title="Title" color="red" />
      <TopBar.Action name="pen" color="yellow" onPress={() => TYNative.showDeviceMenu()} />
    </TopBar.Container>

    {/* 抽象版 */}
    <TopBar
      style={{ marginTop: 24 }}
      background="#000"
      title="Title"
      color="red"
      actions={[
        {
          name: 'pen',
          color: 'yellow',
          onPress: () => TYNative.showDeviceMenu(),
        },
      ]}
      onBack={TYSdk.Navigator.pop}
    />
  </View>
);
