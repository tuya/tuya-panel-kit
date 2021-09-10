import React from 'react';
import { StyleProp, ViewStyle, ImageBackground, View } from 'react-native';
import { LinearGradient, RadialGradient } from 'tuya-panel-kit';
import { Rect } from 'react-native-svg';
import { getCoords, checkIsColor } from './utils';

export type PureColor = string;

export type LinearGradientBg = {
  deg: number;
  stops: Record<string, PureColor>;
};

export type RadialGradientBg = {
  cx: string;
  cy: string;
  fx: string;
  fy: string;
  rx: string;
  ry: string;
  stops: Array<{
    offset: string;
    stopColor: PureColor;
    stopOpacity: string;
  }>;
};
export type BackgroundType = PureColor | LinearGradientBg | RadialGradientBg;
export interface IBackgroundProps {
  /**
   * @description.en background Pure color、Linear gradient、Radial gradient
   * @description.zh 背景 纯颜色、线性渐变或者径向渐变
   * @default
   */
  background: BackgroundType;
  /**
   * @description.en width
   * @description.zh 宽度
   * @default
   */
  width: number;
  /**
   * @description.en height
   * @description.zh 高度
   * @default
   */
  height: number;
  /**
   * @description.en Outer container Style
   * @description.zh 外层容器样式
   * @default
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en Content container Style
   * @description.zh 内容容器样式
   * @default
   */
  contentStyle?: StyleProp<ViewStyle>;
}

const Background: React.FC<IBackgroundProps> = ({
  background,
  width,
  height,
  style,
  children,
  contentStyle,
}) => {
  if (typeof background === 'string') {
    if (checkIsColor(background)) {
      return (
        <View style={[{ width, height, backgroundColor: background }, style]}>{children}</View>
      );
    }
    return (
      <ImageBackground style={[{ width, height }, style]} source={{ uri: background }}>
        {children}
      </ImageBackground>
    );
  }
  /* eslint-disable */
  // @ts-ignore
  if (background.deg) {
    return (
      <View style={[{ width, height }, style]}>
        <LinearGradient
          style={{ width, height }}
          gradientId="base-background"
          // @ts-ignore
          {...getCoords(background.deg)}
          stops={background.stops}
        >
          <Rect width={width} height={height} />
        </LinearGradient>
        <View style={[{ flex: 1, zIndex: 2 }, contentStyle]}>{children}</View>
      </View>
    );
  }
  // @ts-ignore
  if (background.cx) {
    return (
      <View style={[{ width, height }, style]}>
        {/* @ts-ignore */}
        <RadialGradient
          style={{ width, height }}
          gradientId="base-background"
          // @ts-ignore
          {...background}
        />
        <View style={[{ flex: 1, zIndex: 2 }, contentStyle]}>{children}</View>
      </View>
    );
  }
  return null;
};

export default Background;
