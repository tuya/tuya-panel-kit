import React from 'react';
import { View } from 'react-native';
import { TYSdk, TopBar } from 'tuya-panel-kit';

const TYNative = TYSdk.native;

export default () => (
  <View>
    {/* 拆分版 */}
    <TopBar.Container background="#000">
      <TopBar.Action name="backIos" color="red" onPress={TYSdk.Navigator.pop} />
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

    {/* 文字版Action */}
    <TopBar
      style={{ marginTop: 24 }}
      title="产品文案"
      leftActions={[
        {
          name: 'close',
          onPress: TYSdk.Navigator.pop,
        },
      ]}
      actions={[
        {
          source: '最多字符',
          onPress: () => {},
        },
      ]}
      onBack={TYSdk.Navigator.pop}
    />

    {/* 纯文字版Action */}
    <TopBar
      style={{ marginTop: 24 }}
      title="产品文案"
      leftActions={[
        {
          source: '最多字符',
          onPress: () => {},
        },
      ]}
      actions={[
        {
          source: '最多字符',
          onPress: () => {},
        },
      ]}
      onBack={TYSdk.Navigator.pop}
    />
  </View>
);
