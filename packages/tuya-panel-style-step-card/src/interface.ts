import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IStudioDefaultProps = {
  buttonIconColor: '#158CFB',
  buttonIconSize: cx(32),
  buttonWidth: cx(140),
  buttonHeight: cx(48),
  buttonRadius: cx(24),
  buttonBgColor: '#FFF',
  minusDisabled: false,
  plusDisabled: false,
  value: 10,
  min: 0,
  max: 99,
  stepValue: 1,
  milliseconds: 1000,
};

export interface IStudioStepCardProps {
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonWidth?: number;
  buttonHeight?: number;
  buttonRadius?: number;
  buttonBgColor?: string;
  minusIcon?: string;
  buttonIconColor?: string;
  plusIcon?: string;
  buttonIconSize?: number;
  minusDisabled?: boolean;
  plusDisabled?: boolean;
  value?: number;
  min?: number;
  max?: number;
  stepValue?: number;
  milliseconds?: number;
  onValueChange?: (value: number) => void;
}

export const INordicDefaultProps = {
  width: cx(327),
  padding: [cx(24), cx(20), cx(24), cx(20)],
  radius: cx(16),
  backgroundColor: '#FFF',
  showIconBg: false,
  iconSize: cx(16),
  iconColor: '#1082FE',
  text: 'Temp',
  fontSize: cx(16),
  fontWeight: 400,
  showIcon: true,
  fontColor: 'rgba(0, 0, 0, 0.9)',
  buttonIconColor: '#158CFB',
  buttonIconSize: cx(16),
  buttonWidth: cx(66),
  buttonHeight: cx(40),
  buttonRadius: cx(6.4),
  buttonBgColor: '#F7F7F7',
  minusDisabled: false,
  plusDisabled: false,
  value: 10,
  min: 0,
  max: 99,
  stepValue: 1,
  milliseconds: 250,
  valueSize: cx(24),
  valueColor: '#000',
  valueWeight: 500,
  unit: '%',
};

export interface INordicStepCardProps
  extends IStudioStepCardProps,
    Omit<IconBackgroundProps, 'style'> {
  iconStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  width?: number;
  padding?: number[];
  radius?: number;
  backgroundColor?: string;
  iconSize?: number;
  iconColor?: string;
  text?: string;
  fontColor?: string;
  fontSize?: number;
  fontWeight?: number | string;
  valueSize?: number;
  valueColor?: string;
  valueWeight?: number | string;
  unit?: string;
}

export interface IStudioStepCardState {
  val: number;
}
