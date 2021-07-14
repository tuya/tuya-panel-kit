import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class TYFlatListWithValueScene extends Component {
  state = {
    boolValue: true,
    strValue: Strings.getLang('tyflatlist_boolean_value'),
  };

  get data() {
    return [
      {
        key: 1,
        title: Strings.getLang('tyflatlist_boolean_value'),
        value: this.state.boolValue,
        onValueChange: boolValue => this.setState({ boolValue }),
      },
      {
        key: 2,
        title: Strings.getLang('tyflatlist_character_value'),
        value: this.state.strValue,
        onPress: () =>
          this.setState({
            strValue: `${Strings.getLang('tyflatlist_random_number')}${Math.random().toFixed(2) * 100}`,
          }),
      },
      {
        key: 3,
        title: Strings.getLang('tyflatlist_custom_switchButton'),
        value: this.state.boolValue,
        onValueChange: boolValue => this.setState({ boolValue }),
        SwitchButtonProps: {
          onTintColor: '#007AFF',
        },
      },
      {
        key: 4,
        title: Strings.getLang('tyflatlist_norender'),
        disabled: true,
        value: this.state.strValue,
        onPress: () =>
          this.setState({
            strValue: `${Strings.getLang('tyflatlist_random_number')}${Math.random().toFixed(2) * 100}`,
          }),
        needUpdate: false,
      },
    ];
  }

  render() {
    return (
      <TYFlatList
        style={{ alignSelf: 'stretch' }}
        contentContainStyle={{ paddingTop: 16 }}
        data={this.data}
      />
    );
  }
}
