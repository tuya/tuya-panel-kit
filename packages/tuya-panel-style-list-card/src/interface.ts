import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IStyleListCardDefaultProps = {
  width: cx(327),
  padding: [cx(24), cx(16), cx(24), cx(16)],
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
  activeIconColor: '#FFF',
  activeIconBgColor: '#1082FE',
  activeTextColor: 'rgba(0, 0, 0, 0.9)',
};

export interface IStyleListCardProps extends Omit<IconBackgroundProps, 'style'> {
  style?: StyleProp<ViewStyle>;
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
  value: string;
  activeIconColor?: string;
  activeIconBgColor?: string;
  activeTextColor?: string;
  dataSource: IDataSource[];
  onPress: (value: string) => void;
}

export interface IDataSource extends Omit<IconBackgroundProps, 'style'> {
  iconStyle?: StyleProp<ViewStyle>;
  text: string;
  textSize?: number;
  textColor?: string;
  textWeight?: number | string;
  textStyle?: StyleProp<TextStyle>;
  activeBgColor?: string;
  bgColor?: string;
  disabled?: boolean;
  value: string;
}
