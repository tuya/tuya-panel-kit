import React from 'react';
import { TextProps } from 'react-native';

export interface ITYTextProps extends TextProps {
  /**
   * @description.zh-CN 字体类型
   * @description Type of font
   * @default null
   */
  type?: 'heading' | 'title' | 'paragraph';
  /**
   * @description.zh-CN 字体尺寸
   * @description Size of font
   * @default null
   */
  size?: ('large' | 'normal' | 'small') | number;
  /**
   * @description.zh-CN 字体对齐方式
   * @description Font alignment
   * @default null
   */
  align?: 'left' | 'center' | 'right';
  /**
   * @description.zh-CN 字体粗细
   * @description Font weight
   * @default null
   */
  weight?: number | string;
  /**
   * @description.zh-CN 字体颜色
   * @description Font color
   * @default null
   */
  color?: string;
  /**
   * @description.zh-CN 文本
   * @description Text
   * @default null
   */
  text?: string;
  /**
   * @description.zh-CN 子节点
   * @description children
   * @default null
   */
  children?: any;
}

export interface ITextState {
  text: string | React.ReactElement;
}
