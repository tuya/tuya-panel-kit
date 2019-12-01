import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, DatePicker, TYText } from 'tuya-panel-kit';

class DatePickerScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'date',
      use12Hours: false,
      isAmpmFirst: false,
      isTimeFirst: false,
    };
  }

  renderModeSelect = () => {
    const modeArr = ['datetime', 'date', 'time', 'month', 'year'];
    const activeColor = {
      backgroundColor: 'orange',
    };
    const activeTextColor = {
      color: '#fff',
    };
    const modeView = modeArr.map(mode => (
      <TouchableOpacity
        onPress={() => this.setState({ mode })}
        style={[styles.modeStyle, mode === this.state.mode && activeColor]}
        key={mode}
      >
        <TYText style={[styles.modeTextStyle, mode === this.state.mode && activeTextColor]}>
          {mode}
        </TYText>
      </TouchableOpacity>
    ));
    return <View style={styles.modeWrapperStyle}>{modeView}</View>;
  };

  render() {
    return (
      <View>
        <DatePicker
          use12Hours={this.state.use12Hours}
          isAmpmFirst={this.state.isAmpmFirst}
          isTimeFirst={this.state.isTimeFirst}
          mode={this.state.mode}
          dateSortKeys={['month', 'day', 'year']}
        />
        {this.renderModeSelect()}
        <Button
          size="large"
          text="use12Hours"
          textStyle={{ color: '#000' }}
          onPress={() => this.setState({ use12Hours: !this.state.use12Hours })}
        />
        <Button
          size="large"
          text="isAmpmFirst"
          textStyle={{ color: '#000' }}
          onPress={() => this.setState({ isAmpmFirst: !this.state.isAmpmFirst })}
        />
        <Button
          size="large"
          text="isTimeFirst"
          textStyle={{ color: '#000' }}
          onPress={() => this.setState({ isTimeFirst: !this.state.isTimeFirst })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modeTextStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  modeStyle: {
    flex: 1,
    borderColor: '#d0d0d0',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 5,
    marginLeft: 5,
    backgroundColor: '#fff',
  },
  modeWrapperStyle: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});

export default DatePickerScene;
