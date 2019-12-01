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
          thumbTintColor="#000"
          onThumbTintColor="#fff"
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
      </View>
    );
  }
}
