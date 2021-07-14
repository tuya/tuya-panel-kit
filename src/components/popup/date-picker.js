import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import DatePicker from '../date-picker';
import withSkeleton from './withSkeleton';
import { StyledDatePicker } from './styled';

class DatePickerPopup extends React.Component {
  static propTypes = {
    ...DatePicker.propTypes,
    /**
     * 按钮开关值
     */
    switchValue: PropTypes.bool.isRequired,
    /**
     * 日期更改回调
     */
    onDateChange: PropTypes.func,
    /**
     * 数据更改回调
     */
    _onDataChange: PropTypes.func,
  };

  static defaultProps = {
    onDateChange: () => {},
    _onDataChange: () => {},
  };

  constructor(props) {
    super(props);
    const defaultData = props.date || props.defaultDate;
    props._onDataChange(defaultData || props.minDate || new Date(2000, 0, 1, 0, 0, 0));
  }

  handleDateChange = date => {
    const { onDateChange, _onDataChange } = this.props;
    onDateChange && onDateChange(date);
    _onDataChange && _onDataChange(date);
  };

  render() {
    const {
      switchValue,
      onDateChange, // eslint-disable-line no-unused-vars
      ...datePickerProps
    } = this.props;
    return (
      <View style={!switchValue && { opacity: 0.6 }} pointerEvents={!switchValue ? 'none' : 'auto'}>
        <StyledDatePicker onDateChange={this.handleDateChange} {...datePickerProps} />
      </View>
    );
  }
}

export const DatePickerModal = withSkeleton(DatePickerPopup, true);

export default withSkeleton(DatePickerPopup);
