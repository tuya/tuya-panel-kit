import _ from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from 'tuya-panel-kit';
import ExplorerLayout from '../../components/ExplorerLayout';
import ControlBoolean from '../../components/ControlBoolean';
import ControlNumber from '../../components/ControlNumber';

export default class PickerViewScene extends Component {
  constructor(props) {
    super(props);
    this.hours = _.times(12, n => _.padStart(n === 0 ? 12 : n, 2, '0'));
    this.minutes = _.times(60, n => _.padStart(n, 2, '0'));
    this.state = {
      loop: false,
      amPm: 'AM',
      hour: '12',
      minute: '00',
    };
  }

  _handleChange = key => value => {
    const v = typeof value === 'number' ? _.padStart(value, 2, '0') : value;
    this.setState({ [key]: v });
  };

  _handleBoolChange = key => value => {
    this.setState({ [key]: value });
  };

  renderContent = () => {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          style={[styles.picker, styles.pickerLeft]}
          itemStyle={styles.pickerItem}
          loop={this.state.loop}
          selectedValue={this.state.amPm}
          onValueChange={this._handleChange('amPm')}
        >
          {['AM', 'PM'].map(value => (
            <Picker.Item key={value} value={value} label={value} />
          ))}
        </Picker>
        <Picker
          style={[styles.picker, styles.pickerMiddle]}
          itemStyle={styles.pickerItem}
          loop={this.state.loop}
          selectedValue={this.state.hour}
          onValueChange={this._handleChange('hour')}
        >
          {this.hours.map(value => (
            <Picker.Item key={value} value={value} label={value} />
          ))}
        </Picker>
        <Picker
          style={[styles.picker, styles.pickerRight]}
          itemStyle={styles.pickerItem}
          loop={this.state.loop}
          selectedValue={this.state.minute}
          onValueChange={this._handleChange('minute')}
        >
          {this.minutes.map(value => (
            <Picker.Item key={value} value={value} label={value} />
          ))}
        </Picker>
      </View>
    );
  };

  renderPlayground = () => {
    return (
      <View>
        <ControlBoolean
          title="Toggle Loop"
          value={this.state.loop}
          onValueChange={this._handleBoolChange('loop')}
        />
        <ControlNumber
          min={1}
          max={12}
          title="hour"
          value={+this.state.hour}
          stepValue={1}
          onChange={this._handleChange('hour')}
          onComplete={this._handleChange('hour')}
        />
        <ControlNumber
          min={0}
          max={59}
          title="minute"
          value={+this.state.minute}
          stepValue={1}
          onChange={this._handleChange('minute')}
          onComplete={this._handleChange('minute')}
        />
      </View>
    );
  };

  render() {
    return (
      <ExplorerLayout renderContent={this.renderContent} renderPlayground={this.renderPlayground} />
    );
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    height: 188,
    marginVertical: 24,
  },

  picker: {
    marginVertical: 0,
    height: 188,
  },

  pickerLeft: {
    flex: 2,
  },

  pickerMiddle: {
    flex: 1,
  },

  pickerRight: {
    flex: 2,
  },

  pickerItem: {
    marginTop: -30,
  },
});
