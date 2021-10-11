import React from 'react';
import { ColorPropType, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { CoreUtils, RatioUtils, ThemeUtils } from '../../utils';
import Picker from '../picker-view';
import withSkeleton from './withSkeleton';
import { StyledPickerContainer, StyledPickerUnit, StyledPickerUnitText } from './styled';

const { get } = CoreUtils;
const { getTheme, ThemeConsumer } = ThemeUtils;
const { convertX: cx, isIos } = RatioUtils;

class PickerPopup extends React.PureComponent {
  static propTypes = {
    /**
     * 按钮值
     */
    switchValue: PropTypes.bool.isRequired,
    /**
     * 单位标志
     */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    /**
     * picker弹框边距
     */
    spacing: PropTypes.number,
    /**
     * 单位标志相对位置
     */
    labelOffset: PropTypes.number,
    /**
     * picker弹框样式
     */
    pickerWrapperStyle: ViewPropTypes.style,
    /**
     * picker内容样式
     */
    pickerStyle: ViewPropTypes.style,
    /**
     * 具体值
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
    ]),
    /**
     * 数据源
     */
    dataSource: PropTypes.array,
    /**
     * 是否只需要一个picker
     */
    singlePicker: PropTypes.bool,
    /**
     * picker字体颜色
     */
    pickerFontColor: ColorPropType,
    /**
     * picker单位颜色
     */
    pickerUnitColor: ColorPropType,
    /**
     * 值更改回调
     */
    onValueChange: PropTypes.func,
    /**
     * 数据更改回调
     */
    _onDataChange: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    spacing: 60,
    labelOffset: 22,
    pickerWrapperStyle: null,
    pickerStyle: null,
    value: '',
    dataSource: [],
    singlePicker: true,
    pickerFontColor: null,
    pickerUnitColor: null,
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
    const left = (width - 60) / (2 * allDatas.length) + labelOffset;
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
    let pickerFontSize = cx(30);
    if (pickerDatas.length < 3) {
      pickerFontSize = cx(30);
    } else if (pickerDatas.length === 3) {
      pickerFontSize = cx(27);
    } else {
      pickerFontSize = cx(24);
    }
    return (
      <ThemeConsumer>
        {globalTheme => {
          const pickerTheme = { ...this.props, theme: globalTheme };
          const pickerColor = pickerFontColor || getTheme(pickerTheme, 'popup.cellFontColor');
          return pickerDatas.map((data, idx) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <StyledPickerContainer
                style={[
                  !isIos && { height: cx(254), paddingTop: cx(32), paddingBottom: cx(32) },
                  pickerWrapperStyle,
                ]}
                key={idx}
              >
                {this.renderLabel(data, idx, pickerDatas)}
                <Picker
                  theme={{ fontColor: pickerColor, fontSize: pickerFontSize }}
                  {...props}
                  selectedValue={singlePicker ? this.state.value : this.state.value[idx]}
                  onValueChange={v => this.onValueChange(v, idx)}
                  style={StyleSheet.flatten([
                    pickerStyle,
                    {
                      width: (RatioUtils.winWidth - spacing) / pickerDatas.length,
                      backgroundColor: getTheme(pickerTheme, 'popup.cellBg') || '#fff',
                    },
                  ])}
                >
                  {this.renderPickerItem(data, idx, pickerDatas)}
                </Picker>
              </StyledPickerContainer>
            );
          });
        }}
      </ThemeConsumer>
    );
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
