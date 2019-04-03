import React from 'react';
import { View, Platform } from 'react-native';
import { TYSdk, TopBar } from 'tuya-panel-kit';

const backIcon = Platform.OS === 'ios' ? 'backIos' : 'backAndroid';

const linearBackground = {
  stops: {
    '0%': 'red',
    '100%': 'yellow',
  },
};

const radialBackground = {
  stops: [
    {
      offset: '0%',
      stopColor: '#ff0',
      stopOpacity: '1',
    },
    {
      offset: '100%',
      stopColor: '#00f',
      stopOpacity: '1',
    },
  ],
};

export default () => (
  <View>
    {/* 拆分版 */}
    <TopBar.Container background={linearBackground}>
      <TopBar.Action name={backIcon} onPress={TYSdk.Navigator.pop} />
      <TopBar.Content title="Title" />
    </TopBar.Container>

    {/* 封装版 */}
    <TopBar
      style={{ marginTop: 24 }}
      background={radialBackground}
      title="Title"
      onBack={TYSdk.Navigator.pop}
    />
  </View>
);
