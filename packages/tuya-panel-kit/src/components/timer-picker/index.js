import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import { CoreUtils, TimeUtils, RatioUtils } from '../../utils';
import Picker from '../picker-view';
import { getHourSelections, getMinsSelections, getTimePrefixSelections, getPrefix } from './utils';
import { StyledTimerPickerContainer, StyledTimerPickerRow } from '../popup/styled';

const { omit } = CoreUtils;
const { parseTimer } = TimeUtils;
const { convertX: cx } = RatioUtils;

const TIME_PICKER_PROPS = [
  'style',
  'startTime',
  'endTime',
  'onTimerChange',
  'is12Hours',
  'singlePicker',
  'prefixPosition',
];

export default class TimerPicker extends Component {
  static propTypes = {
    /**
     * 测试标志
     */
    accessibilityLabel: PropTypes.string,
    /**
     * 内容样式
     */
    style: ViewPropTypes.style,
    /**
     * picker 是否支持手势
     */
    disabled: PropTypes.bool,
    /**
     * 开始时间,minutes(0 - 1440)
     */
    startTime: PropTypes.number,
    /**
     * 结束时间,minutes(0 - 1440)
     */
    endTime: PropTypes.number,
    /**
     * 时间段更改回调
     */
    onTimerChange: PropTypes.func,
    /**
     * 是否为 12 小时制
     */
    is12Hours: PropTypes.bool,
    /**
     * 是否只需要一个picker
     */
    singlePicker: PropTypes.bool,
    /**
     * 前缀位置（即 AMPM 位置）
     */
    prefixPosition: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['left', 'right'])]),
    /**
     * picker 字体颜色
     */
    pickerFontColor: PropTypes.string,
    /**
     * picker 字体大小
     */
    pickerFontSize: PropTypes.number,
    /**
     * 前缀字符
     */
    symbol: PropTypes.string,
    /**
     * 是否支持 picker 循环滚动
     */
    loop: PropTypes.bool,
  };

  static defaultProps = {
    accessibilityLabel: 'TimerPicker',
    style: {},
    disabled: false,
    startTime: 480,
    endTime: 840,
    onTimerChange: null,
    is12Hours: true,
    singlePicker: false,
    prefixPosition: ['left', 'right'],
    pickerFontColor: '#333',
    symbol: '—',
    pickerFontSize: 22,
    loop: true,
  };

  constructor(props) {
    super(props);
    const hours = getHourSelections(props.is12Hours);
    this.minutes = getMinsSelections();
    this.prefixs = getTimePrefixSelections();
    const [startHour, startMin] = parseTimer(props.startTime * 60)
      .split(':')
      .map(v => +v);
    const [endHour, endMin] = parseTimer(props.endTime * 60)
      .split(':')
      .map(v => +v);

    this.state = {
      startHour,
      startMin,
      endHour,
      endMin,
      hours,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startTime !== this.props.startTime || nextProps.endTime !== this.props.endTime) {
      this.parseTimer(nextProps.startTime, nextProps.endTime);
    }
    if (nextProps.is12Hours !== this.props.is12Hours) {
      const hours = getHourSelections(nextProps.is12Hours);
      this.setState({ hours });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { onTimerChange } = nextProps;
    if (nextState !== this.state) {
      const startTime = parseInt(nextState.startHour, 10) * 60 + parseInt(nextState.startMin, 10);
      const endTime = parseInt(nextState.endHour, 10) * 60 + parseInt(nextState.endMin, 10);

      typeof onTimerChange === 'function' && onTimerChange(startTime, endTime);
    }
  }

  onStartHourChange = startHour => {
    this.setState({ startHour });
  };

  onStartMinChange = startMin => {
    this.setState({ startMin });
  };

  onEndHourChange = endHour => {
    this.setState({ endHour });
  };

  onEndMinChange = endMin => {
    this.setState({ endMin });
  };

  onStartPrefixChange = startPrefix => {
    const start = this.state.startHour;
    if (startPrefix === 'AM' && start >= 12) {
      this.setState({
        startHour: start - 12,
      });
    }
    if (startPrefix === 'PM' && start < 12) {
      this.setState({
        startHour: start + 12,
      });
    }
  };

  onEndPrefixChange = endPrefix => {
    const end = this.state.endHour;
    if (endPrefix === 'AM' && end >= 12) {
      this.setState({
        endHour: end - 12,
      });
    }
    if (endPrefix === 'PM' && end < 12) {
      this.setState({
        endHour: end + 12,
      });
    }
  };

  parseTimer(startTime, endTime) {
    const [startHour, startMin] = parseTimer(startTime * 60)
      .split(':')
      .map(v => +v);
    const [endHour, endMin] = parseTimer(endTime * 60)
      .split(':')
      .map(v => +v);
    this.setState({
      startHour,
      startMin,
      endHour,
      endMin,
    });
  }

  renderPickView(values, value, onValueChange, loop, key) {
    const { accessibilityLabel, pickerFontColor, pickerFontSize } = this.props;
    const pickerProps = omit(this.props, TIME_PICKER_PROPS);
    const style = StyleSheet.flatten([this.props.style]);
    return (
      <Picker
        {...pickerProps}
        accessibilityLabel={`${accessibilityLabel}_${key}`}
        theme={{ fontColor: pickerFontColor, fontSize: pickerFontSize }}
        selectedValue={value}
        onValueChange={onValueChange}
        contentContainerStyle={{ flex: 1 }}
        style={[
          {
            flex: key === 'symbol' ? 0 : 1,
            height: style.height || 200,
            justifyContent: 'center',
          },
          key === 'symbol' && {
            width: cx(48),
          },
        ]}
        loop={loop}
      >
        {values.map((d, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Picker.Item key={idx} value={d.value} label={d.label} />
        ))}
      </Picker>
    );
  }

  render() {
    const { style, disabled, is12Hours, singlePicker, prefixPosition, symbol, loop } = this.props;
    const { startHour, startMin, endHour, endMin, hours } = this.state;
    const startPrefix = getPrefix(startHour);
    const endPrefix = getPrefix(endHour);
    let prefixPositionStart = prefixPosition;
    let prefixPositionEnd = prefixPosition;
    if (Array.isArray(prefixPosition)) {
      [prefixPositionStart, prefixPositionEnd] = prefixPosition;
    }
    return (
      <StyledTimerPickerContainer style={style} pointerEvents={disabled ? 'none' : 'auto'}>
        <StyledTimerPickerRow>
          {is12Hours &&
            prefixPositionStart === 'left' &&
            this.renderPickView(
              this.prefixs,
              startPrefix,
              this.onStartPrefixChange,
              false,
              'StartAmpm'
            )}
          {this.renderPickView(hours, startHour, this.onStartHourChange, loop, 'StartHour')}
          {this.renderPickView(this.minutes, startMin, this.onStartMinChange, loop, 'StartMinute')}
          {is12Hours &&
            prefixPositionStart === 'right' &&
            this.renderPickView(
              this.prefixs,
              startPrefix,
              this.onStartPrefixChange,
              false,
              'StartAmpm'
            )}
        </StyledTimerPickerRow>
        {!!symbol &&
          this.renderPickView(
            [{ value: symbol, label: symbol }],
            symbol,
            () => {},
            false,
            'symbol'
          )}
        {!singlePicker && (
          <StyledTimerPickerRow>
            {is12Hours &&
              prefixPositionEnd === 'left' &&
              this.renderPickView(
                this.prefixs,
                endPrefix,
                this.onEndPrefixChange,
                false,
                'EndAmpm'
              )}
            {this.renderPickView(hours, endHour, this.onEndHourChange, loop, 'EndHour')}
            {this.renderPickView(this.minutes, endMin, this.onEndMinChange, loop, 'EndMinute')}
            {is12Hours &&
              prefixPositionEnd === 'right' &&
              this.renderPickView(
                this.prefixs,
                endPrefix,
                this.onEndPrefixChange,
                false,
                'EndAmpm'
              )}
          </StyledTimerPickerRow>
        )}
      </StyledTimerPickerContainer>
    );
  }
}
