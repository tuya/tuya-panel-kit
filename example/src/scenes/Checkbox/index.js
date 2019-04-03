import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'tuya-panel-kit';

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
          style={styles.checkbox}
          checked={this.state.checked}
          disabled={this.state.disabled}
          onChange={checked => this.setState({ checked })}
        >
          点击选中
        </Checkbox>
        <Checkbox
          style={styles.checkbox}
          color="red"
          checked={this.state.disabled}
          hideOnUnselect={true}
          onChange={disabled => this.setState({ disabled })}
        >
          点击禁用上面那个
        </Checkbox>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: '#fff',
  },
});
