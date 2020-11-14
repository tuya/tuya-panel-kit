import React from 'react';
import { View } from 'react-native';
import { TYText, SwitchButton } from 'tuya-panel-kit';

export default class extends React.Component {
  state = {
    value: true,
  };

  _handleValueChange = () => this.setState(prevState => ({ value: !prevState.value }));

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TYText text="滑块样式(IOS、安卓自适应)" />
        <SwitchButton value={this.state.value} onValueChange={this._handleValueChange} />
        <TYText text="自定义滑块样式" />
        <SwitchButton
          value={this.state.value}
          tintColor="#ff0000"
          onTintColor="#fff"
          // 设置为黑色与阴影融合造成视觉误差
          // thumbTintColor="#000"
          onThumbTintColor="#fff"
          size={{ height: 60 }}
          theme={{ width: 120, thumbSize: 55 }}
          disabled={true}
          thumbStyle={{ elevation: 0 }}
          onValueChange={this._handleValueChange}
        />
        <TYText text="测试本地主题" />
        <SwitchButton
          theme={{ tintColor: '#00ffff', onThumbTintColor: '#ff0000' }}
          value={this.state.value}
          onValueChange={this._handleValueChange}
        />
        <TYText text="滑块样式(IOS、安卓自适应) ----  渐变（不带字体）" />
        <SwitchButton
          value={this.state.value}
          onValueChange={this._handleValueChange}
          tintColor="#E5E5E5"
          onText=""
          offText=""
          onTintColor={{
            '0%': '#FA709A',
            '100%': '#FEDD44',
          }}
        />
        <TYText text="滑块样式(IOS、安卓自适应) ----  渐变（带字体）" />
        <SwitchButton
          value={this.state.value}
          onValueChange={this._handleValueChange}
          tintColor="#E5E5E5"
          onTintColor={{
            '0%': '#FA709A',
            '100%': '#FEDD44',
          }}
        />
      </View>
    );
  }
}
