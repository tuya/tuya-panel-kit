import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;

export const IDefaultProps = {
  disabled: false,
  width: cx(120),
  height: cx(92),
  padding: [12, 0, 12, 0],
  radius: cx(14),
  backgroundColor: '#FFF',
  iconBgColor: 'transparent',
  iconBgSize: cx(48),
  iconBgRadius: cx(24),
  fontColor: 'rgba(61, 61, 61, 0.5)',
  fontSize: cx(10),
  iconSize: cx(48),
  fontWeight: '400',
  overlayColor: 'transparent',
  milliseconds: 200,
  showIconBg: true,
  showIcon: true,
};

export type IButtonProps = {
  style?: StyleProp<ViewStyle>;
  iconBgStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: string;
  activeOpacity?: number;
  iconColor?: string;
  text?: string;
  theme?: any;
  onPress?: () => void;
  onLongPress?: () => void;
} & Partial<typeof IDefaultProps>;
