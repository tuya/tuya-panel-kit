import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TimerPicker from '../timer-picker';
import withSkeleton from './withSkeleton';
import { StyledTimerPicker } from './styled';

class TimerPickerPopup extends React.Component {
  static propTypes = {
    ...TimerPicker.propTypes,
    /**
     * 按钮值
     */
    switchValue: PropTypes.bool.isRequired,
    /**
     * 时间段开始文案
     */
    startTitle: PropTypes.string,
    /**
     * 时间段结束文案
     */
    endTitle: PropTypes.string,
    /**
     * 数据更改回调
     */
    _onDataChange: PropTypes.func,
  };

  static defaultProps = {
    _onDataChange: () => {},
    startTitle: null,
    endTitle: null,
  };

  constructor(props) {
    super(props);
    props._onDataChange({ startTime: props.startTime, endTime: props.endTime });
  }

  handleTimerChange = (startTime, endTime) => {
    const { onTimerChange, _onDataChange } = this.props;
    onTimerChange && onTimerChange(startTime, endTime);
    _onDataChange && _onDataChange({ startTime, endTime });
  };

  render() {
    const { style, switchValue, startTitle, endTitle, ...props } = this.props;
    return (
      <StyledTimerPicker
        style={StyleSheet.flatten([!switchValue && { opacity: 0.6 }, style])}
        disabled={!switchValue}
        onTimerChange={this.handleTimerChange}
        startTitle={startTitle}
        endTitle={endTitle}
        {...props}
      />
    );
  }
}

export const TimerPickerModal = withSkeleton(TimerPickerPopup, true);

export default withSkeleton(TimerPickerPopup);
