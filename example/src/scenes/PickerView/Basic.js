import _ from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from 'tuya-panel-kit';
import ExplorerLayout from '../../components/ExplorerLayout';

export default class PickerViewScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: ['clojure', 'elixir', 'haskell', 'scala'],
      value: 'elixir',
    };
  }

  _handleChange = value => {
    this.setState({ value });
    console.log(value);
  };

  renderContent = () => {
    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.tip}>Please Choose Your Favorite Language:</Text>
        <Picker
          style={[styles.picker]}
          itemStyle={styles.pickerItem}
          selectedValue={this.state.value}
          onValueChange={this._handleChange}
        >
          {this.state.languages.map(value => (
            <Picker.Item key={value} value={value} label={value} />
          ))}
        </Picker>
      </View>
    );
  };

  renderPlayground = () => {
    return <View />;
  };

  render() {
    return (
      <ExplorerLayout renderContent={this.renderContent} renderPlayground={this.renderPlayground} />
    );
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    // height: 188,
    flex: 1,
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tip: {
    fontSize: 15,
    color: 'black',
  },

  picker: {
    marginVertical: 0,
    height: 188,
    width: 100,
  },

  pickerItem: {},
});
