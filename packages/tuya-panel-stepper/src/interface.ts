import React from 'react';
import { TextInputProps, StyleProp, ViewStyle, TextInput } from 'react-native';
import { dPlus, dMinus } from './styled';

export interface IStepperProps extends Omit<TextInputProps, 'value'> {
  /**
   * @description.zh 内容样式
   * @description.en Container Style
   * @default {}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 加减按钮样式
   * @description.en Button Style
   * @default {}
   */
  buttonStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 输入框样式
   * @description.en Input style
   * @default {}
   */
  inputStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 按钮类型
   * @description.en Button type
   * @default 'ellipse'
   */
  buttonType?: 'ellipse' | 'triangle';
  /**
   * @description.zh 最小值
   * @description.en Min
   * @default 0
   */
  min?: number;
  /**
   * @description.zh 最大值
   * @description.en Max
   * @default 99
   */
  max?: number;
  /**
   * @description.zh 具体值
   * @description.en Value
   * @default 20
   */
  value?: number;
  /**
   * @description.zh 步长
   * @description.en StepValue
   * @default 1
   */
  stepValue?: number;
  /**
   * @description.zh 是否支持手动编辑
   * @description.en Do you support manual editing
   * @default true
   */
  editable?: boolean;
  /**
   * @description.zh 按钮类型为 ellipse 时按钮激活状态下的颜色
   * @description.en The color of the button when the button type is ellipse
   * @default "#333"
   */
  ellipseIconColor?: string;
  /**
   * @description.zh 按钮类型为 triangle 时激活状态下的颜色
   * @description.en The color in the active state when the button type is triangle
   * @default "#FF4800"
   */
  triangleIconColor?: string;
  /**
   * @description.zh 文本输入的高亮和光标颜色
   * @description.en Highlight and cursor color for text input
   * @default "#FF4800"
   */
  selectionColor?: string;
  /**
   * @description.zh 按钮类型为 triangle 时的减法按钮路径
   * @description.en Subtraction button path when button type is triangle
   * @default <a target="_blank" href="https://github.com/tuya/tuya-panel-kit/blob/master/src/components/stepper/styled.js#L11">dPlus</a>
   */
  iconMinusPath?: string;
  /**
   * @description.zh 按钮类型为 triangle 时的加法按钮路径
   * @description.en Add button path when button type is triangle
   * @default <a target="_blank" href="https://github.com/tuya/tuya-panel-kit/blob/master/src/components/stepper/styled.js#L8">dPlus</a>
   */
  iconPlusPath?: string;
  /**
   * @description.zh 短按值回调
   * @description.en Short press value callback
   * @default null
   */
  onValueChange?: (value: number) => void;
  /**
   * @description.zh 是否禁用
   * @description.en Disable stepper button
   * @default false
   */
  disabled?: boolean;
  /**
   * @description.en Hold down the interval
   * @description.zh 长按间隔时长
   * @default 250
   */
  milliseconds?: number;
  /**
   * @description.en Whether to support click vibration
   * @description.zh 是否支持点按震动
   * @default true
   */
  isVibration?: boolean;
  /**
   * @description.zh 获取 TextInput 实例
   * @description.en Gets an instance of textinput
   * @default null
   */
  getTextInputRef?: (TextInputRef: React.RefObject<TextInput>) => void;
}

export const IDefaultStepperProps = {
  editable: true,
  min: 0,
  value: 20,
  max: 99,
  stepValue: 1,
  ellipseIconColor: '#333',
  selectionColor: '#FF4800',
  buttonType: 'ellipse',
  iconMinusPath: dMinus,
  iconPlusPath: dPlus,
  triangleIconColor: '#FF4800',
  disabled: false,
  milliseconds: 500,
  isVibration: true,
};

export interface IStepperState {
  value: number;
}
