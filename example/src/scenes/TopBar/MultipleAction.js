import React from 'react';
import { View, Platform } from 'react-native';
import { TYSdk, TopBar } from 'tuya-panel-kit';

const TYNative = TYSdk.native;

const backIcon = Platform.OS === 'ios' ? 'backIos' : 'backAndroid';

export default () => (
  <View>
    {/* 拆分版 */}
    <TopBar.Container background="blue">
      <TopBar.Action name={backIcon} onPress={TYSdk.Navigator.pop} />
      <TopBar.Action
        source="定时"
        color="red"
        onPress={() => {
          TYNative.simpleTipDialog('click 定时', () => {});
        }}
      />
      <TopBar.Content
        title="Very Very Very Very Very Long Title"
        subTitle="SubTitle"
        onPress={() => {
          TYNative.simpleTipDialog('click title', () => {});
        }}
      />
      <TopBar.Action source="测试AAA" />
      {['warning', 'edit'].map(v => (
        <TopBar.Action
          key={v}
          name={v}
          onPress={() => {
            TYNative.simpleTipDialog(`click ${v}`, () => {});
          }}
        />
      ))}
    </TopBar.Container>

    {/* 封装版 */}
    <TopBar
      style={{ marginTop: 24 }}
      background="blue"
      title="Very Very Very Very Very Long Title"
      subTitle="SubTitle"
      onPress={() => TYNative.simpleTipDialog('click title', () => {})}
      leftActions={[
        {
          name: backIcon,
          onPress: TYSdk.Navigator.pop,
        },
        {
          source: '定时',
          color: 'red',
          onPress: () => TYNative.simpleTipDialog('click 定时', () => {}),
        },
      ]}
      actions={['plus', 'warning', 'edit'].map(v => ({
        name: v,
        onPress: () => TYNative.simpleTipDialog(`click ${v}`, () => {}),
      }))}
    />
  </View>
);
