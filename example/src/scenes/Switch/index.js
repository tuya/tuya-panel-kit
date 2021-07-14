import React from 'react';
import { View } from 'react-native';
import { TYText, SwitchButton } from 'tuya-panel-kit';
import iconfont from '../../res/iconfont.json';
import Strings from '../../i18n';

export default class extends React.Component {
  state = {
    value: true,
  };

  _handleValueChange = () => this.setState(prevState => ({ value: !prevState.value }));

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TYText text={Strings.getLang('switch_default_1')} style={{ marginBottom: 20 }} />
        <SwitchButton value={this.state.value} onValueChange={this._handleValueChange} />
        <TYText
          text={Strings.getLang('switch_default_2')}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
        <SwitchButton
          value={this.state.value}
          size={{ activeSize: 4, margin: 6 }}
          thumbStyle={{ width: 4, height: 12, borderRadius: 2 }}
          onValueChange={this._handleValueChange}
        />
        <TYText
          text={Strings.getLang('switch_default_3')}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
        <SwitchButton
          size={{ activeSize: 18, margin: 5, width: 52, height: 28, borderRadius: 10 }}
          theme={{ onTintColor: '#57BCFB', onThumbTintColor: '#FFF' }}
          thumbStyle={{ width: 18, height: 18, borderRadius: 6 }}
          value={this.state.value}
          onValueChange={this._handleValueChange}
          onText="ON"
          offText="OFF"
        />
        <TYText
          text={Strings.getLang('switch_default_4')}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
        <SwitchButton
          size={{ activeSize: 40, margin: 4, width: 92, height: 48, borderRadius: 10 }}
          theme={{ onTintColor: '#FFF', onThumbTintColor: '#57BCFB', thumbTintColor: '#57BCFB' }}
          thumbStyle={{ width: 40, height: 40, borderRadius: 9 }}
          value={this.state.value}
          onValueChange={this._handleValueChange}
          onText="ON"
          offText="OFF"
          onTextStyle={{ color: '#57BCFB', left: 15 }}
          d={iconfont.power}
          iconColor="#FFF"
          offTextStyle={{ right: 15 }}
        />
        <TYText
          text={Strings.getLang('switch_default_5')}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
        <SwitchButton
          size={{ activeSize: 34, margin: 3, width: 78, height: 40, borderRadius: 16 }}
          theme={{ onTintColor: '#57BCFB', onThumbTintColor: '#FFF' }}
          thumbStyle={{ width: 34, height: 34, borderRadius: 14 }}
          value={this.state.value}
          onValueChange={this._handleValueChange}
          switchType="thumbMore"
        />
        <TYText
          text={Strings.getLang('switch_default_linearWithoutText')}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
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
        <TYText text={Strings.getLang('switch_default_linearWithText')} style={{ marginTop: 20 }} />
        <SwitchButton
          value={this.state.value}
          onValueChange={this._handleValueChange}
          tintColor="#E5E5E5"
          onText="ON"
          offText="OFF"
          onTintColor={{
            '0%': '#FA709A',
            '100%': '#FEDD44',
          }}
        />
      </View>
    );
  }
}
