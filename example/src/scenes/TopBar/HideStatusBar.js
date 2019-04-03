import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { TYSdk, TopBar } from 'tuya-panel-kit';
import RatioUtils from 'tuya-panel-kit/src/utils/ratio'; // eslint-disable-line

const { statusBarHeight } = RatioUtils;

const Res = {
  back:
    Platform.OS === 'ios'
      ? require('./res/common_back_ios.png')
      : require('./res/common_back_android.png'),
};

export default class HideStatusBarScene extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <TopBar.Container
        style={{
          height: Platform.OS === 'ios' ? TopBar.height - statusBarHeight : TopBar.height,
        }}
        contentStyle={{ marginTop: 0 }}
        background="#000"
      >
        <TopBar.Action source={Res.back} onPress={TYSdk.Navigator.pop} />
        <TopBar.Content title="Title" subTitle="subTitle" position="left" />
      </TopBar.Container>
    );
  }
}
