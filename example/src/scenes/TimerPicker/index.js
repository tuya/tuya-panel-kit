import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TimerPicker } from 'tuya-panel-kit';

export default class TimerPickerScene extends Component {
  state = {
    startTime: 0,
    endTime: 0,
  };

  _handleTimerChange = (startTime, endTime) => {
    this.setState({ startTime, endTime });
  };

  render() {
    return (
      <View style={styles.container}>
        <TimerPicker
          title="时间段选择"
          cancelText="取消"
          confirmText="确认"
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          is12Hours={true}
          onTimerChange={this._handleTimerChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
