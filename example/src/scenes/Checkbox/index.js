import React, { Component } from 'react';
import { View } from 'react-native';
import { Checkbox } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class CheckboxScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      disabled: false,
    };
  }

  _handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    return (
      <View>
        <Checkbox
          checked={this.state.checked}
          disabled={this.state.disabled}
          onChange={checked => this.setState({ checked })}
        >
          {Strings.getLang('checkbox_select')}
        </Checkbox>
        <Checkbox
          color="red"
          checked={this.state.disabled}
          hideOnUnselect={true}
          onChange={disabled => this.setState({ disabled })}
        >
          {Strings.getLang('checkbox_disable')}
        </Checkbox>
      </View>
    );
  }
}
