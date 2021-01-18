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
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * 内容样式
     */
    contentStyle: ViewPropTypes.style,
    /**
     * 标题
     */
    title: PropTypes.string.isRequired,
    /**
     * 标题样式
     */
    titleStyle: TYText.propTypes.style,
    /**
     * footer容器样式
     */
    footerWrapperStyle: ViewPropTypes.style,
    /**
     * 取消文案
     */
    cancelText: PropTypes.string.isRequired,
    /**
     * 取消文案样式
     */
    cancelTextStyle: TYText.propTypes.style,
    /**
     * 取消按钮测试标示
     */
    cancelAccessibilityLabel: PropTypes.string,
    /**
     * 确认文案
     */
    confirmText: PropTypes.string.isRequired,
    /**
     * 确认文案样式
     */
    confirmTextStyle: TYText.propTypes.style,
    /**
     * 确认按钮测试标示
     */
    confirmAccessibilityLabel: PropTypes.string,
    /**
     * 取消回调函数
     */
    onCancel: PropTypes.func,
    /**
     * 确认回调函数
     */
    onConfirm: PropTypes.func,
  };

  static defaultProps = {
    showHelp: false,
    onHelpPress: null,
    style: null,
    contentStyle: null,
    titleStyle: null,
    inputWrapperStyle: null,
    inputStyle: null,
    footerWrapperStyle: null,
    cancelTextStyle: null,
    cancelAccessibilityLabel: 'Dialog.Cancel',
    confirmTextStyle: null,
    confirmAccessibilityLabel: 'Dialog.Confirm',
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
      title,
      titleStyle,
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
        <StyledContent
          style={[
            { paddingLeft: 16, paddingRight: 16, paddingTop: 28, paddingBottom: 24 },
            contentStyle,
          ]}
        >
          <StyledTitle style={titleStyle}>{title}</StyledTitle>
          <StyledInputContainer style={inputWrapperStyle}>
            <StyledInput
              style={inputStyle}
              autoFocus={true}
              selectionColor="#FF4800"
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
          confirmTextStyle={[{ opacity: confirmDisabled ? 1 : 0.3 }, confirmTextStyle]}
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
