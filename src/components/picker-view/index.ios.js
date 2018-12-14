import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Picker from './picker';

export default class PickerView extends Component {
  static propTypes = {
    ...Picker.propTypes,
  };

  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);

    this.state = {
      selectedValue: props.selectedValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedValue: nextProps.selectedValue });
  }

  onValueChange(selectedValue) {
    this.setState({ selectedValue });
    if (this.props.onValueChange) {
      this.props.onValueChange(selectedValue);
    }
  }

  render() {
    return (
      <Picker
        style={styles.container}
        {...this.props}
        selectedValue={this.state.selectedValue}
        onValueChange={this.onValueChange}
      />
    );
  }
}

PickerView.Item = Picker.Item;

const styles = StyleSheet.create({
  container: {
  },
});
