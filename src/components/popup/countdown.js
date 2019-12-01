/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
import React from 'react';
import { I18nManager, ColorPropType, Text, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Picker from '../picker-view';
import { CoreUtils, NumberUtils, RatioUtils } from '../../utils';
import withSkeleton from './withSkeleton';
import { StyledCountdownContainer, StyledOverview, StyledPickerUnitText } from './styled';

const { toFixed } = CoreUtils;
const { range, inMaxMin } = NumberUtils;
const { isIos, width } = RatioUtils;

class CountdownPopup extends React.Component {
  static propTypes = {
    countdownWrapperStyle: ViewPropTypes.style,
    switchValue: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    onlyone: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    pickerFontColor: ColorPropType,
    pickerUnitColor: ColorPropType,
    hourText: PropTypes.string,
    minuteText: PropTypes.string,
    onValueChange: PropTypes.func,
    _onDataChange: PropTypes.func,
    hourPickerStyle: ViewPropTypes.style,
    hourUnitStyle: Text.propTypes.style,
    minutePickerStyle: ViewPropTypes.style,
    minuteUnitStyle: Text.propTypes.style,
  };

  static defaultProps = {
    countdownWrapperStyle: null,
    onlyone: false,
    max: 1440,
    min: 0,
    step: 1,
    pickerFontColor: '#333',
    pickerUnitColor: '#333',
    hourText: 'Hour',
    minuteText: 'Minute',
    onValueChange: () => {},
    _onDataChange: () => {},
    hourPickerStyle: null,
    hourUnitStyle: null,
    minutePickerStyle: null,
    minuteUnitStyle: null,
  };

  constructor(props) {
    super(props);
    if (props.onlyone) {
      this.Hours = [];
      this.Minutes = range(0, props.max, props.step);
    } else {
      const remainMinutes = props.max % 60;
      const shiftMinutes = props.min % 60;
      this.Hours = range(parseInt(props.min / 60, 10), parseInt(props.max / 60, 10) + 1);
      this.Minutes = range(0, 60, props.step);
      this.RemainMinutes = range(0, remainMinutes + 1, props.step); // 选中最大小时时剩余的分钟
      this.shiftMinutes = range(shiftMinutes, 60, props.step); // 选中最小小时时剩余的分钟
    }
    this.state = {
      hour: this.getHour(props),
      minute: this.getMinute(props),
    };
    props._onDataChange({
      ...this.state,
      value: this.state.hour * 60 + this.state.minute,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        hour: this.getHour(nextProps),
        minute: this.getMinute(nextProps),
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.switchValue !== this.props.switchValue) {
      const data = this.props.switchValue
        ? { ...this.state, value: this.state.hour * 60 + this.state.minute }
        : { hour: 0, minute: 0, value: 0 };
      this.props._onDataChange(data);
    }
  }

  getHour(props) {
    const { onlyone, value, max } = props;
    const v = inMaxMin(0, max, value);
    return onlyone ? 0 : parseInt(v / 60, 10);
  }

  getMinute(props) {
    const { onlyone, value, max } = props;
    const v = inMaxMin(0, max, value);
    return onlyone ? parseInt(v, 10) : parseInt(v - this.getHour(props) * 60, 10);
  }

  handleHourChange = hour => {
    const { min, max, onValueChange, _onDataChange } = this.props;
    const isMaxHour = hour === parseInt(max / 60, 10);
    const isMinHour = hour === parseInt(min / 60, 10);
    // const isMinHour = hour === parseInt(min / 60, 10);
    let minute = this.state.minute;
    // 如果此前选择的分钟在选中最大小时情况下的剩余分钟中不存在，则把分钟置为0
    if (isMaxHour && this.RemainMinutes.indexOf(minute) === -1) {
      minute = this.RemainMinutes[0];
    }
    // 如果此前选择的分钟在选中最小时情况下的剩余分钟中不存在，则把分钟置为最初值中的最小值
    if (isMinHour && this.shiftMinutes.indexOf(minute) === -1) {
      minute = this.shiftMinutes[0];
    }
    this.setState({ hour, minute });
    const data = { hour, minute, value: hour * 60 + minute };
    onValueChange && onValueChange(data);
    _onDataChange && _onDataChange(data);
  };

  handleMinuteChange = minute => {
    const { onValueChange, _onDataChange } = this.props;
    this.setState({ minute });
    const data = {
      ...this.state,
      minute,
      value: this.state.hour * 60 + minute,
    };
    onValueChange && onValueChange(data);
    _onDataChange && _onDataChange(data);
  };

  renderOnePicker() {
    const {
      switchValue,
      countdownWrapperStyle,
      pickerFontColor,
      pickerUnitColor,
      minuteText,
      minutePickerStyle,
      minuteUnitStyle,
    } = this.props;
    return (
      <StyledCountdownContainer
        style={[countdownWrapperStyle, !switchValue && { opacity: 0.6 }]}
        pointerEvents={!switchValue ? 'none' : 'auto'}
      >
        <StyledOverview style={{ flex: 1 }}>
          <Picker
            theme={{ fontColor: pickerFontColor }}
            accessibilityLabel="Popup_CountdownPicker_Minutes"
            style={StyleSheet.flatten([{ width, height: 220 }, minutePickerStyle])}
            selectedValue={this.state.minute}
            onValueChange={this.handleMinuteChange}
          >
            {this.Minutes.map(k => (
              <Picker.Item key={k} label={`${k}`} value={k} />
            ))}
          </Picker>
          <StyledPickerUnitText
            style={StyleSheet.flatten([{ marginLeft: -(width / 2) + 20 }, minuteUnitStyle])}
            pointerEvents="none"
            pickerUnitColor={pickerUnitColor}
            text={minuteText}
          />
        </StyledOverview>
      </StyledCountdownContainer>
    );
  }

  renderTwoPicker() {
    const {
      min,
      max,
      switchValue,
      countdownWrapperStyle,
      pickerFontColor,
      pickerUnitColor,
      hourText,
      minuteText,
      hourPickerStyle,
      hourUnitStyle,
      minutePickerStyle,
      minuteUnitStyle,
    } = this.props;
    const isMaxHour = this.state.hour === parseInt(max / 60, 10);
    const isMinHour = this.state.hour === parseInt(min / 60, 10);
    const minuteValues = isMaxHour
      ? this.RemainMinutes
      : isMinHour
        ? this.shiftMinutes
        : this.Minutes;
    return (
      <StyledCountdownContainer
        style={StyleSheet.flatten([countdownWrapperStyle, !switchValue && { opacity: 0.6 }])}
        pointerEvents={!switchValue ? 'none' : 'auto'}
      >
        <StyledOverview
          style={{
            flex: 1.1,
            height: 240,
          }}
        >
          <Picker
            theme={{ fontColor: pickerFontColor }}
            accessibilityLabel="Popup_CountdownPicker_Hours"
            style={StyleSheet.flatten([
              {
                width: width * (7 / 10),
                marginRight: isIos ? 0 : 20,
              },
              hourPickerStyle,
            ])}
            selectedValue={this.state.hour}
            onValueChange={this.handleHourChange}
          >
            {this.Hours.map(k => (
              <Picker.Item key={k} label={toFixed(k, 2)} value={k} />
            ))}
          </Picker>
          <StyledPickerUnitText
            style={StyleSheet.flatten([
              { marginLeft: -(width * (7 / 10 / 2)) + (isIos ? 15 : 0) },
              hourUnitStyle,
            ])}
            pointerEvents="none"
            pickerUnitColor={pickerUnitColor}
            text={hourText}
          />
        </StyledOverview>

        <StyledOverview style={{ flex: 1 }}>
          <Picker
            theme={{ fontColor: pickerFontColor }}
            accessibilityLabel="Popup_CountdownPicker_Minutes"
            selectedValue={this.state.minute}
            onValueChange={this.handleMinuteChange}
            itemAlign={I18nManager.isRTL ? 'flex-end' : 'flex-start'}
            style={StyleSheet.flatten([
              isIos
                ? {
                  width: width * (8 / 10),
                  marginLeft: -(width * 3) / 10,
                }
                : {
                  width: width * (7 / 10),
                  marginLeft: 20,
                },
              minutePickerStyle,
            ])}
          >
            {minuteValues.map(k => (
              <Picker.Item key={k} label={toFixed(k, 2)} value={k} />
            ))}
          </Picker>

          <StyledPickerUnitText
            style={StyleSheet.flatten([
              { marginLeft: isIos ? -(width * (8 / 10 / 2)) + 15 : -(width * (7 / 10)) + 28 },
              minuteUnitStyle,
            ])}
            pointerEvents="none"
            pickerUnitColor={pickerUnitColor}
            text={minuteText}
          />
        </StyledOverview>
      </StyledCountdownContainer>
    );
  }

  render() {
    const { onlyone } = this.props;
    return onlyone ? this.renderOnePicker() : this.renderTwoPicker();
  }
}

export const CountdownModal = withSkeleton(CountdownPopup, true);

export default withSkeleton(CountdownPopup);
