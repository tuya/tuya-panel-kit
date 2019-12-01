import React from 'react';
import { ColorPropType, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { CoreUtils, RatioUtils } from '../../utils';
import Picker from '../picker-view';
import withSkeleton from './withSkeleton';
import { StyledPickerContainer, StyledPickerUnit, StyledPickerUnitText } from './styled';

const { get } = CoreUtils;

class PickerPopup extends React.PureComponent {
  static propTypes = {
    switchValue: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    spacing: PropTypes.number,
    labelOffset: PropTypes.number,
    pickerWrapperStyle: ViewPropTypes.style,
    pickerStyle: ViewPropTypes.style,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
    ]),
    dataSource: PropTypes.array,
    singlePicker: PropTypes.bool, // 是否只需要一个picker
    pickerFontColor: ColorPropType,
    pickerUnitColor: ColorPropType,
    onValueChange: PropTypes.func,
    _onDataChange: PropTypes.func,
  };
  static defaultProps = {
    label: '',
    spacing: 0,
    labelOffset: 22,
    pickerWrapperStyle: null,
    pickerStyle: null,
    value: '',
    dataSource: [],
    singlePicker: true,
    pickerFontColor: '#333',
    pickerUnitColor: '#333',
    onValueChange: () => {},
    _onDataChange: () => {},
  };

  constructor(props) {
    super(props);
    const hasValue = typeof props.value !== 'undefined';
    let value;
    if (this.props.singlePicker) {
      value = hasValue ? props.value : get(props, 'dataSource[0].value');
    } else {
      value = hasValue ? props.value : props.dataSource.map(data => data[0].value);
    }
    this.state = {
      value,
      width: 0,
      height: 0,
    };
    props._onDataChange(this.state.value, 0);
  }

  onLayout = e => {
    this.setState({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  onValueChange = (v, idx) => {
    const { singlePicker, onValueChange, _onDataChange } = this.props;
    let newValue = v;
    if (!singlePicker) {
      newValue = [...this.state.value];
      newValue.splice(idx, 1, v);
      this.setState({ value: newValue });
    }
    onValueChange && onValueChange(newValue, idx);
    _onDataChange && _onDataChange(newValue, idx);
  };

  renderLabel = (data, idx, allDatas) => {
    const { label, labelOffset, pickerUnitColor } = this.props;
    const { height, width } = this.state;
    if (!label) return null;
    if (!height || !width) return null;
    const realLabel = Array.isArray(label) ? label[idx] : label;
    const left = width / (2 * allDatas.length) + labelOffset;
    return (
      <StyledPickerUnit style={{ height, left }}>
        <StyledPickerUnitText pickerUnitColor={pickerUnitColor}>{realLabel}</StyledPickerUnitText>
      </StyledPickerUnit>
    );
  };

  renderPickerItem = data => {
    return data.map(item => {
      const { value, label } = item;
      return <Picker.Item key={value} label={label || value} value={value} />;
    });
  };

  renderPickers = () => {
    const {
      spacing,
      dataSource,
      singlePicker,
      pickerWrapperStyle,
      pickerStyle,
      pickerFontColor,
      ...props
    } = this.props;
    const pickerDatas = singlePicker ? [dataSource] : dataSource;
    return pickerDatas.map((data, idx) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <StyledPickerContainer style={pickerWrapperStyle} key={idx}>
          {this.renderLabel(data, idx, pickerDatas)}
          <Picker
            {...props}
            theme={{ fontColor: pickerFontColor }}
            selectedValue={singlePicker ? this.state.value : this.state.value[idx]}
            onValueChange={v => this.onValueChange(v, idx)}
            style={StyleSheet.flatten([
              pickerStyle,
              { width: (RatioUtils.winWidth - spacing) / pickerDatas.length },
            ])}
          >
            {this.renderPickerItem(data, idx, pickerDatas)}
          </Picker>
        </StyledPickerContainer>
      );
    });
  };

  render() {
    const { switchValue, pickerWrapperStyle } = this.props;
    return (
      <StyledPickerContainer
        style={pickerWrapperStyle}
        onLayout={this.onLayout}
        disabled={!switchValue}
        pointerEvents={!switchValue ? 'none' : 'auto'}
      >
        {this.renderPickers()}
      </StyledPickerContainer>
    );
  }
}

export const PickerModal = withSkeleton(PickerPopup, true);

export default withSkeleton(PickerPopup);
