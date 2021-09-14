import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { ISliderProps, defaultProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;

export const classicLargeSliderProps: Partial<ISliderProps> = {
  type: 'parcel',
  sliderBgColor: 'transparent', // 即使renderMinimumTrack传了 原本的值的区域也会渲染 所以这里设置为透明
  trackStyle: {
    height: cx(36),
    borderRadius: cx(36),
  },
  sliderProps: {
    thumbTouchSize: { width: cx(38), height: cx(38) },
  },
  thumbStyle: {
    width: cx(20),
    height: cx(20),
  },
  renderMinimumTrack: () => (
    <View
      style={{
        height: cx(30),
        borderRadius: cx(30),
        backgroundColor: defaultProps.sliderBgColor,
        marginHorizontal: cx(3),
      }}
    />
  ),
};

export const NorDicSliderCardProps: Partial<ISliderProps> = {
  padding: [cx(24), cx(24), cx(24), cx(24)],
  titleStyle: {
    marginBottom: cx(13),
  }, // title容器样式 优先级最高
  titleFontSize: cx(16),
  titleFontColor: 'rgba(0, 0, 0, 0.9)',
  valueFontColor: 'rgba(0, 0, 0, 0.9)',
  iconColor: '#158CFB',
  iconSize: cx(16),
  type: 'parcel',
  sliderBgColor: 'transparent', // 即使renderMinimumTrack传了 原本的值的区域也会渲染 所以这里设置为透明
  trackStyle: {
    height: cx(46),
    borderRadius: cx(12),
  },
  thumbStyle: {
    width: cx(3),
    height: cx(14),
  },
  sliderProps: {
    thumbTouchSize: { width: cx(46), height: cx(46) },
  },
  renderMinimumTrack: () => (
    <View
      style={{
        height: cx(38),
        borderRadius: cx(10),
        backgroundColor: defaultProps.sliderBgColor,
        marginHorizontal: cx(4),
      }}
    />
  ),
};

export const AcrylicSliderCardProps: Partial<ISliderProps> = {
  padding: [cx(21), cx(20), cx(21), cx(20)],
  iconSize: cx(20),
  iconColor: '#FE7862',
  sliderBgColor: '#FE7862', // 滑动条背景色
  sliderGrooveBgColor: 'rgba(0, 0, 0, 0.05)', // 滑动槽背景色
  sliderThumbColor: '#fff',
  sliderThumbSize: cx(24), // 滑块大小
  sliderThumbRadius: cx(24),
  titleFontSize: cx(16),
  titleFontColor: 'rgba(0, 0, 0, 0.87)',
  valueFontSize: cx(16),
  valueFontColor: 'rgba(0, 0, 0, 0.5)',
  thumbStyle: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 0.8,
  },
  bottomPromptTextFontSize: cx(12),
  bottomPromptTextFontColor: 'rgba(0, 0, 0, 0.45)',
  bottomPromptTextFontWeight: 'normal',

  // slider两边展示的图标
  // bothSideIcons: [string, string],
  bothSideIconSize: cx(12),
  bothSideIconColor: '#FE724C',
  radius: cx(16),
};
