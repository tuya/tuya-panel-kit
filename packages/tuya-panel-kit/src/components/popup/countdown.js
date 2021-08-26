/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
import React from 'react';
import { I18nManager, ColorPropType, Text, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Picker from '../picker-view';
import { CoreUtils, NumberUtils, RatioUtils, ThemeUtils } from '../../utils';
import withSkeleton from './withSkeleton';
import {
  StyledCountdownContainer,
  StyledOverview,
  StyledPickerUnitText,
  StyledCountdownContent,
  StyledCountdownOnePickerContent
} from './styled';

const { toFixed } = CoreUtils;
const { range, inMaxMin } = NumberUtils;
const { isIos, width, convertX: cx } = RatioUtils;
const { getTheme, ThemeConsumer } = ThemeUtils;

class CountdownPopup extends React.Component {
  static propTypes = {
    /**
     * 外部样式
     */
    countdownWrapperStyle: ViewPropTypes.style,
    /**
     * 按钮开关值
     */
    switchValue: PropTypes.bool.isRequired,
    /**
     * 倒计时具体值
     */
    value: PropTypes.number.isRequired,
    /**
     * 是否只显示分钟
     */
    onlyone: PropTypes.bool,
    /**
     * 最大值
     */
    max: PropTypes.number,
    /**
     * 最小值
     */
    min: PropTypes.number,
    /**
     * 步长
     */
    step: PropTypes.number,
    /**
     * picker字体颜色
     */
    pickerFontColor: ColorPropType,
    /**
     * picker单位颜色
     */
    pickerUnitColor: ColorPropType,
    /**
     * 小时文案
     */
    hourText: PropTypes.string,
    /**
     * 分钟文案
     */
    minuteText: PropTypes.string,
    /**
     * 倒计时更改值回调
     */
    onValueChange: PropTypes.func,
    /**
     * 数据更改值回调
     */
    _onDataChange: PropTypes.func,
    /**
     * 小时picker样式
     */
    hourPickerStyle: ViewPropTypes.style,
    /**
     * 小时单位样式
     */
    hourUnitStyle: Text.propTypes.style,
    /**
     * 分钟picker样式
     */
    minutePickerStyle: ViewPropTypes.style,
    /**
     * 分钟单位样式
     */
    minuteUnitStyle: Text.propTypes.style,
  };

  static defaultProps = {
    countdownWrapperStyle: null,
    onlyone: false,
    max: 1440,
    min: 0,
    step: 1,
    pickerFontColor: null,
    pickerUnitColor: null,
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
      this.Minutes = range(props.min, props.max + 1, props.step);
    } else {
      const remainMinutes = props.max % 60;
      const shiftMinutes = props.min % 60;
      this.Hours = range(parseInt(props.min / 60, 10), parseInt(props.max / 60, 10) + 1);
      this.Minutes = range(0, 60, props.step);
      this.EqualMinutes = range(shiftMinutes, remainMinutes + 1, props.step); // 当最大小时与最小小时相等的分钟
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
      <ThemeConsumer>
        {globalTheme => {
          const countdownTheme = { ...this.props, theme: globalTheme };
          const countFontColor = pickerFontColor || getTheme(countdownTheme, 'popup.cellFontColor');
          const countUnitColor = pickerUnitColor || getTheme(countdownTheme, 'popup.cellFontColor');
          return (
            <StyledCountdownContainer
              style={[countdownWrapperStyle, !switchValue && { opacity: 0.6 }]}
              pointerEvents={!switchValue ? 'none' : 'auto'}
            >
              <StyledCountdownOnePickerContent>
                <StyledOverview style={{ flex: 1 }}>
                  <Picker
                    theme={{ fontColor: countFontColor }}
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
                    pickerUnitColor={countUnitColor}
                    text={minuteText}
                  />
                </StyledOverview>
              </StyledCountdownOnePickerContent>
            </StyledCountdownContainer>
          );
        }}
      </ThemeConsumer>
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
    let minuteValues;
    if (isMaxHour && isMinHour) {
      minuteValues = this.EqualMinutes;
    } else if (isMaxHour && !isMinHour) {
      minuteValues = this.RemainMinutes;
    } else if (isMinHour && !isMaxHour) {
      minuteValues = this.shiftMinutes;
    } else {
      minuteValues = this.Minutes;
    }
    return (
      <ThemeConsumer>
        {globalTheme => {
          const countdownTheme = { ...this.props, theme: globalTheme };
          const countFontColor = pickerFontColor || getTheme(countdownTheme, 'popup.cellFontColor');
          const countUnitColor = pickerUnitColor || getTheme(countdownTheme, 'popup.cellFontColor');
          return (
            <StyledCountdownContainer
              style={StyleSheet.flatten([countdownWrapperStyle, !switchValue && { opacity: 0.6 }])}
              pointerEvents={!switchValue ? 'none' : 'auto'}
            >
              <StyledCountdownContent>
                <StyledOverview
                  style={{
                    flex: isIos ? 1.1 : 1.2,
                    height: 240,
                  }}
                >
                  <Picker
                    theme={{ fontColor: countFontColor }}
                    accessibilityLabel="Popup_CountdownPicker_Hours"
                    style={StyleSheet.flatten([
                      {
                        width: isIos ? width * (7 / 10) - 60 : width * (1 / 2),
                        marginRight: isIos ? 0 : cx(20),
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
                      { marginLeft: isIos ? -(width * (7 / 10 / 2)) + 45 : -width * (1 / 4) },
                      hourUnitStyle,
                    ])}
                    pointerEvents="none"
                    pickerUnitColor={countUnitColor}
                    text={hourText}
                  />
                </StyledOverview>

                <StyledOverview style={{ flex: 1 }}>
                  <Picker
                    theme={{ fontColor: countFontColor }}
                    accessibilityLabel="Popup_CountdownPicker_Minutes"
                    selectedValue={this.state.minute}
                    onValueChange={this.handleMinuteChange}
                    itemAlign={isIos ? 'center' : I18nManager.isRTL ? 'flex-end' : 'flex-start'}
                    style={StyleSheet.flatten([
                      isIos
                        ? {
                            width: width * (8 / 10),
                            marginLeft: -(width * 3) / 10,
                          }
                        : {
                            width: width * (1 / 2),
                            marginRight: cx(40),
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
                      {
                        marginLeft: isIos ? -(width * (8 / 10 / 2)) + 15 : -width * (1 / 2),
                      },
                      minuteUnitStyle,
                    ])}
                    pointerEvents="none"
                    pickerUnitColor={countUnitColor}
                    text={minuteText}
                  />
                </StyledOverview>
              </StyledCountdownContent>
            </StyledCountdownContainer>
          );
        }}
      </ThemeConsumer>
    );
  }

  render() {
    const { onlyone } = this.props;
    return onlyone ? this.renderOnePicker() : this.renderTwoPicker();
  }
}

export const CountdownModal = withSkeleton(CountdownPopup, true);

export default withSkeleton(CountdownPopup);
