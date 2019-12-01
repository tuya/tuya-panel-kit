import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { TYSdk, TopBar, Utils } from 'tuya-panel-kit';

const { statusBarHeight } = Utils.RatioUtils;

const Res = {
  back: require('./res/common_back_ios.png'),
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
        <TopBar.Action color="#fff" source={Res.back} onPress={TYSdk.Navigator.pop} />
        <TopBar.Content color="#fff" title="Title" subTitle="subTitle" position="left" />
      </TopBar.Container>
    );
  }
}
