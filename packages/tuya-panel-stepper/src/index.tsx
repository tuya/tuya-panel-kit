import React, { PureComponent } from 'react';
import { NativeModules } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import {
  BigButton,
  TouchableOpacityView,
  StyledIconFont,
  StyledInput,
  RightView,
  TouchableThreeView,
} from './styled';
import { IStepperProps, IStepperState, IDefaultStepperProps } from './interface';

const { inMaxMin, add, subtract } = Utils.NumberUtils;

export default class Stepper extends PureComponent<IStepperProps, IStepperState> {
  static defaultProps = IDefaultStepperProps;

  constructor(props) {
    super(props);
    this.state = {
      value: inMaxMin(props.min, props.max, props.value),
    };
  }

  componentDidMount() {
    const { getTextInputRef } = this.props;
    getTextInputRef && getTextInputRef(this.TextInputRef);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  TextInputRef: any;
  timer: number;

  clearInterval() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  _handleMath = isMinus => {
    const { min, max, onValueChange, stepValue } = this.props;
    const { value } = this.state;
    if (isMinus) {
      if (value > min) {
        const step = Math.min(stepValue, subtract(value, min));
        onValueChange && onValueChange(subtract(value, step));
        this.setState({
          value: subtract(value, step),
        });
      }
    } else if (value <= max) {
      const step = Math.min(stepValue, subtract(max, value));
      onValueChange && onValueChange(add(value, step));
      this.setState({
        value: add(value, step),
      });
    }
  };

  _handlePressOut = () => {
    this.clearInterval();
  };

  _handlePressIn = isMinus => () => {
    const { milliseconds, isVibration } = this.props;
    if (NativeModules.TYRCTHapticsManager && isVibration) {
      NativeModules.TYRCTHapticsManager.impact('Light');
    }
    this._handleMath(isMinus);
    this.clearInterval();

    this.timer = setInterval(() => {
      this._handleMath(isMinus);
    }, milliseconds);
  };

  _handleChangeText = newValue => {
    const { max, min } = this.props;
    const idx = newValue.indexOf('.');
    if (!idx) return;
    if (idx === -1) {
      if (
        Number(newValue) > max ||
        Number(newValue) < min ||
        (newValue.length === 2 && !newValue.indexOf('0') && newValue[1] !== '.')
      ) {
        return;
      }
      this.setState({
        value: newValue,
      });
    } else {
      if (
        Number(newValue.substr(0, idx)) >= max ||
        Number(newValue.substr(0, idx)) < min ||
        newValue.length > idx + 2
      ) {
        return;
      }
      this.setState({
        value: newValue,
      });
    }
  };

  _handleEndText = () => {
    const { min, onValueChange } = this.props;
    const { value } = this.state;
    const newValue = Number(value);
    if (typeof value === 'string' && value === '') {
      onValueChange && onValueChange(min);
      this.setState({
        value: min,
      });
    } else {
      this.setState({
        value: newValue,
      });
      onValueChange && onValueChange(newValue);
    }
  };

  renderEllipse = () => {
    const {
      min,
      max,
      style,
      buttonStyle,
      ellipseIconColor,
      selectionColor,
      inputStyle,
      editable,
      disabled,
      ...textInputProps
    } = this.props;
    const { value } = this.state;
    return (
      <BigButton style={style}>
        <TouchableOpacityView
          style={[buttonStyle, (disabled || value === min) && { opacity: 0.4 }]}
          disabled={disabled || value === min}
          onPressOut={this._handlePressOut}
          onPressIn={this._handlePressIn(true)}
        >
          <StyledIconFont
            fill={ellipseIconColor}
            // @ts-ignore
            fillOpacity={disabled || value === min ? 0.4 : 1}
            name="minus"
          />
        </TouchableOpacityView>
        <StyledInput
          ref={ref => {
            this.TextInputRef = ref;
          }}
          maxLength={4}
          {...textInputProps}
          style={[disabled && { color: 'rgba(51,51,51,.4)' }, inputStyle]}
          onEndEditing={this._handleEndText}
          value={value.toString()}
          onChangeText={this._handleChangeText}
          keyboardType="numeric"
          selectionColor={selectionColor}
          enablesReturnKeyAutomatically
          editable={!disabled && editable}
        />
        <TouchableOpacityView
          style={[buttonStyle, (disabled || value === max) && { opacity: 0.4 }]}
          disabled={disabled || value === max}
          onPressOut={this._handlePressOut}
          onPressIn={this._handlePressIn(false)}
        >
          <StyledIconFont
            fill={ellipseIconColor}
            // @ts-ignore
            fillOpacity={disabled || value === max ? 0.4 : 1}
            name="plus"
          />
        </TouchableOpacityView>
      </BigButton>
    );
  };

  renderTriangle = () => {
    const {
      min,
      max,
      style,
      buttonStyle,
      triangleIconColor,
      selectionColor,
      iconMinusPath,
      iconPlusPath,
      inputStyle,
      editable,
      disabled,
      ...textInputProps
    } = this.props;
    const { value } = this.state;
    return (
      <RightView style={style}>
        <TouchableThreeView
          style={[buttonStyle, (disabled || value === min) && { opacity: 0.4 }]}
          disabled={disabled || value === min}
          onPressOut={this._handlePressOut}
          onPressIn={this._handlePressIn(true)}
        >
          <StyledIconFont
            fill={triangleIconColor}
            // @ts-ignore
            fillOpacity={disabled || value === min ? 0.4 : 1}
            d={iconMinusPath}
          />
        </TouchableThreeView>
        <StyledInput
          ref={ref => {
            this.TextInputRef = ref;
          }}
          maxLength={4}
          {...textInputProps}
          editable={!disabled && editable}
          style={[disabled && { color: 'rgba(51,51,51,.4)' }, inputStyle]}
          onEndEditing={this._handleEndText}
          value={value.toString()}
          onChangeText={this._handleChangeText}
          keyboardType="numeric"
          selectionColor={selectionColor}
          enablesReturnKeyAutomatically
        />
        <TouchableThreeView
          style={[buttonStyle, (disabled || value === max) && { opacity: 0.4 }]}
          disabled={disabled || value === max}
          onPressOut={this._handlePressOut}
          onPressIn={this._handlePressIn(false)}
        >
          <StyledIconFont
            fill={triangleIconColor}
            // @ts-ignore
            fillOpacity={disabled || value === max ? 0.4 : 1}
            d={iconPlusPath}
          />
        </TouchableThreeView>
      </RightView>
    );
  };

  render() {
    const { buttonType } = this.props;
    return buttonType === 'ellipse' ? this.renderEllipse() : this.renderTriangle();
  }
}
