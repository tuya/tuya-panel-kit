import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ViewPropTypes } from 'react-native';
import { NumberUtils } from '../../utils';
import withSkeleton from './withSkeleton';
import {
  StyledSliderContent,
  StyledSliderContainer,
  StyledSlider,
  StyledSliderBtn,
  StyledDisplayText,
} from './styled';

const { scaleNumber, inMaxMin } = NumberUtils;

class NumberSelectorPopup extends Component {
  static propTypes = {
    /**
     * numberSelector弹框样式
     */
    numberSelectorWrapperStyle: ViewPropTypes.style,
    /**
     * 按钮值
     */
    switchValue: PropTypes.bool.isRequired,
    /**
     * 数值选择弹出层类型
     */
    type: PropTypes.oneOf(['basic', 'slider']),
    /**
     * 具体值
     */
    value: PropTypes.number.isRequired,
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
     * 倍数
     */
    scale: PropTypes.number,
    /**
     * 值变更事件
     */
    onValueChange: PropTypes.func,
    /**
     * 数据更改回调
     */
    _onDataChange: PropTypes.func,
    /**
     * 长按 + - 时每隔多久改变一次值（单位 ms）
     * @version 3.4.11
     */
    valueChangeTime: PropTypes.number,
    /**
     * 是否匀速加减值
     * @version 3.4.11
     */
    isValueChangeUniform: PropTypes.bool,
  };

  static defaultProps = {
    numberSelectorWrapperStyle: null,
    type: 'basic',
    max: 100,
    min: 0,
    step: 1,
    scale: 0,
    onValueChange: () => {},
    _onDataChange: () => {},
    valueChangeTime: 250,
    isValueChangeUniform: false,
  };

  constructor(props) {
    super(props);
    this._interval = null;
    this._stepLevel = 1;
    this._pressInTime = null;
    this.state = {
      value: props.value,
    };
    props._onDataChange(this.state.value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: +nextProps.value });
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  clearInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  _handleValueChange = value => {
    const { onValueChange, _onDataChange } = this.props;
    onValueChange && onValueChange(value);
    _onDataChange && _onDataChange(value);
    this.setState({ value });
  };

  _handleReduce = () => {
    const { min, step, onValueChange, _onDataChange } = this.props;
    this.setState(({ value }) => {
      const newValue = +value - step * this._stepLevel;
      const realValue = newValue >= min ? newValue : min;
      if (realValue === value) {
        return;
      }
      onValueChange && onValueChange(realValue);
      _onDataChange && _onDataChange(realValue);
      return {
        value: realValue,
      };
    });
  };

  _handleAdd = () => {
    const { max, step, onValueChange, _onDataChange } = this.props;
    this.setState(({ value }) => {
      const newValue = +value + step * this._stepLevel;
      const realValue = newValue <= max ? newValue : max;
      if (realValue === value) {
        return;
      }
      onValueChange && onValueChange(realValue);
      _onDataChange && _onDataChange(realValue);
      return {
        value: realValue,
      };
    });
  };

  _handlePressIn = isAdd => () => {
    const { valueChangeTime, isValueChangeUniform } = this.props;
    const runner = () => {
      if (isAdd) {
        this._handleAdd();
      } else {
        this._handleReduce();
      }
    };
    runner();
    this.clearInterval();
    this._interval = setInterval(() => {
      const now = Date.now();
      if (!this._pressInTime) {
        this._pressInTime = now;
      } else {
        let level = Math.floor((now - this._pressInTime) / 100);
        level = inMaxMin(1, 20, level);
        this._stepLevel = isValueChangeUniform ? 1 : level;
      }
      runner();
    }, valueChangeTime);
  };

  _handlePressOut = () => {
    this._stepLevel = 1;
    this._pressInTime = null;
    this.clearInterval();
  };

  renderMinusBtn(props) {
    const { min, switchValue } = this.props;
    const disabled = !switchValue || this.state.value === min;
    return (
      <StyledSliderBtn
        icon="minus"
        disabled={disabled}
        {...props}
        onPressIn={this._handlePressIn(false)}
        onPressOut={this._handlePressOut}
      />
    );
  }

  renderPlusBtn(props) {
    const { max, switchValue } = this.props;
    const disabled = !switchValue || this.state.value === max;
    return (
      <StyledSliderBtn
        icon="plus"
        disabled={disabled}
        {...props}
        onPressIn={this._handlePressIn(true)}
        onPressOut={this._handlePressOut}
      />
    );
  }

  renderContent() {
    const {
      switchValue,
      numberSelectorWrapperStyle,
      type,
      scale,
      min,
      max,
      step,
      value,
      onValueChange,
      _onDataChange,
      ...sliderProps
    } = this.props;
    const opacityStyle = { opacity: switchValue ? 1 : 0.6 };
    let content;
    switch (type) {
      case 'slider':
        {
          const sliderBtnProps = {
            iconSize: 18,
            disabled: false,
            onPressIn: () => {},
            onPressOut: () => {},
          };
          content = (
            <StyledSliderContent
              style={[{ flexDirection: 'column' }, numberSelectorWrapperStyle]}
              flexDirection="column"
            >
              <StyledDisplayText style={opacityStyle}>
                {`${scaleNumber(scale, this.state.value)}`}
              </StyledDisplayText>
              <StyledSliderContainer>
                {this.renderMinusBtn(sliderBtnProps)}
                <StyledSlider
                  style={opacityStyle}
                  value={this.state.value}
                  stepValue={step}
                  minimumValue={min}
                  maximumValue={max}
                  {...sliderProps}
                  onValueChange={this._handleValueChange}
                  onSlidingComplete={this._handleValueChange}
                />
                {this.renderPlusBtn(sliderBtnProps)}
              </StyledSliderContainer>
            </StyledSliderContent>
          );
        }
        break;
      default:
        content = (
          <StyledSliderContent style={numberSelectorWrapperStyle}>
            {this.renderMinusBtn()}
            <StyledDisplayText style={opacityStyle}>
              {`${scaleNumber(scale, this.state.value)}`}
            </StyledDisplayText>
            {this.renderPlusBtn()}
          </StyledSliderContent>
        );
        break;
    }
    return content;
  }

  render() {
    const disabled = !this.props.switchValue;
    return <View pointerEvents={disabled ? 'none' : 'auto'}>{this.renderContent()}</View>;
  }
}

export const NumberSelectorModal = withSkeleton(NumberSelectorPopup, true);

export default withSkeleton(NumberSelectorPopup);
