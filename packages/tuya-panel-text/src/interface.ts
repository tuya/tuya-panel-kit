import React from 'react';
import { TextProps } from 'react-native';

export interface ITYTextProps extends TextProps {
  /**
   * @description.zh 字体类型
   * @description.en Type of font
   * @default null
   */
  type?: 'heading' | 'title' | 'paragraph';
  /**
   * @description.zh 字体尺寸
   * @description.en Size of font
   * @default null
   */
  size?: ('large' | 'normal' | 'small') | number;
  /**
   * @description.zh 字体对齐方式
   * @description.en Font alignment
   * @default null
   */
  align?: 'left' | 'center' | 'right';
  /**
   * @description.zh 字体粗细
   * @description.en Font weight
   * @default null
   */
  weight?: number | string;
  /**
   * @description.zh 字体颜色
   * @description.en Font color
   * @default null
   */
  color?: string;
  /**
   * @description.zh 文本
   * @description.en Text
   * @default null
   */
  text?: string;
  /**
   * @description.zh 子节点
   * @description.en children
   * @default null
   */
  children?: any;
}

export interface ITextState {
  text: string | React.ReactElement;
}
