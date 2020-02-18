import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, TextInput, ViewPropTypes } from 'react-native';
import IconFont from '../iconfont';
import TYText from '../TYText';
import Footer from './footer';
import {
  StyledContainer,
  StyledContent,
  StyledInputContainer,
  StyledInput,
  StyledTitle,
  StyledSubTitle,
} from './styled';
import withMotion from './withMotion';

class Prompt extends Component {
  static propTypes = {
    ...TextInput.propTypes,
    /**
     * 是否显示帮助图标
     */
    showHelp: PropTypes.bool,
    /**
     * 帮助图标点击回调
     */
    onHelpPress: PropTypes.func,
    /**
     * 输入框的容器样式
     */
    inputWrapperStyle: ViewPropTypes.style,
    /**
     * 输入框样式
     */
    inputStyle: TextInput.propTypes.style,
    style: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    titleNumberOfLines: PropTypes.number,
    title: PropTypes.string.isRequired,
    titleStyle: TYText.propTypes.style,
    subTitle: PropTypes.string,
    subTitleStyle: TYText.propTypes.style,
    footerWrapperStyle: ViewPropTypes.style,
    textContentType: PropTypes.string,
    cancelText: PropTypes.string.isRequired,
    cancelTextStyle: TYText.propTypes.style,
    cancelAccessibilityLabel: PropTypes.string,
    confirmText: PropTypes.string.isRequired,
    confirmTextStyle: TYText.propTypes.style,
    confirmAccessibilityLabel: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
  };

  static defaultProps = {
    showHelp: false,
    onHelpPress: null,
    style: null,
    contentStyle: null,
    titleNumberOfLines: 2,
    titleStyle: null,
    subTitle: '',
    subTitleStyle: null,
    inputWrapperStyle: null,
    inputStyle: null,
    footerWrapperStyle: null,
    cancelTextStyle: null,
    cancelAccessibilityLabel: 'Dialog.Cancel',
    confirmTextStyle: null,
    confirmAccessibilityLabel: 'Dialog.Confirm',
    textContentType: '',
    onCancel: null,
    onConfirm: null,
  };

  constructor(props) {
    super(props);
    this._value = props.defaultValue;
    this.state = {
      value: props.value,
      unControlledValue: props.defaultValue,
    };
  }

  _handleChangeText = text => {
    const { defaultValue, value, onChangeText } = this.props;
    if (typeof defaultValue !== 'undefined') {
      this._value = text;
      typeof onChangeText === 'function' && onChangeText(this._value);
      this.setState({ unControlledValue: this._value });
    } else if (typeof value !== 'undefined') {
      // 如果为受控组件且有返回值则在此处刷新内容
      const ret = typeof onChangeText === 'function' ? onChangeText(text) : undefined;
      typeof ret !== 'undefined' && this.setState({ value: ret });
    } else {
      this._value = text;
      this.setState({ unControlledValue: this._value });
      typeof onChangeText === 'function' && onChangeText(this._value);
    }
  };

  _handleConfirm = () => {
    const { defaultValue, value, onConfirm } = this.props;
    if (typeof onConfirm !== 'function') {
      return;
    }
    if (typeof defaultValue !== 'undefined') {
      onConfirm(this._value);
    } else if (typeof value !== 'undefined') {
      onConfirm(this.state.value);
    } else {
      onConfirm(this._value);
    }
  };

  render() {
    const {
      value,
      defaultValue,
      showHelp,
      onHelpPress,
      style,
      contentStyle,
      titleNumberOfLines,
      title,
      titleStyle,
      subTitle,
      subTitleStyle,
      inputWrapperStyle,
      inputStyle,
      footerWrapperStyle,
      confirmText,
      confirmTextStyle,
      confirmAccessibilityLabel,
      cancelText,
      cancelTextStyle,
      cancelAccessibilityLabel,
      onCancel,
      ...TextInputProps
    } = this.props;
    const confirmDisabled =
      (typeof value !== 'undefined' && this.state.value) ||
      (typeof defaultValue !== 'undefined' && this.state.unControlledValue);
    return (
      <StyledContainer style={style}>
        <StyledContent style={contentStyle}>
          <StyledTitle style={titleStyle} numberOfLines={titleNumberOfLines}>
            {title}
          </StyledTitle>
          {!!subTitle && <StyledSubTitle style={subTitleStyle}>{subTitle}</StyledSubTitle>}
          <StyledInputContainer style={inputWrapperStyle}>
            <StyledInput
              style={inputStyle}
              {...TextInputProps}
              value={typeof value !== 'undefined' ? this.state.value : undefined}
              defaultValue={
                typeof defaultValue !== 'undefined' ? this.state.unControlledValue : undefined
              }
              onChangeText={this._handleChangeText}
            />
            {showHelp && (
              <TouchableOpacity
                style={{ position: 'absolute', right: 12 }}
                activeOpacity={0.8}
                onPress={onHelpPress}
              >
                <IconFont name="help" size={17} color="#b5b5b5" />
              </TouchableOpacity>
            )}
          </StyledInputContainer>
        </StyledContent>
        <Footer
          style={footerWrapperStyle}
          cancelTextStyle={cancelTextStyle}
          confirmTextStyle={[{ opacity: confirmDisabled ? 1 : 0.4 }, confirmTextStyle]}
          cancelText={cancelText}
          confirmText={confirmText}
          cancelAccessibilityLabel={cancelAccessibilityLabel}
          confirmAccessibilityLabel={confirmAccessibilityLabel}
          onCancel={onCancel}
          onConfirm={this._handleConfirm}
          confirmDisabled={!confirmDisabled}
        />
      </StyledContainer>
    );
  }
}

export default withMotion(Prompt);
