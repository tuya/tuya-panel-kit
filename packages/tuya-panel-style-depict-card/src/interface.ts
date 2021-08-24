import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IDefaultProps = {
  backgroundColor: 'transparent',
  radius: cx(14),
  padding: [cx(16), cx(45), cx(18), cx(47)],
  width: cx(258),
  text: 'Current Temp',
  fontSize: cx(12),
  fontColor: 'rgba(80, 80, 80, 0.5)',
  fontWeight: 400,
  unit: '°C',
  unitSize: cx(18),
  unitColor: '#000',
  unitWeight: 400,
  value: '32',
  valueSize: cx(18),
  valueColor: '#505050',
  valueWeight: 600,
  isUnitInTop: true,
  isAlignCenter: true,
  marginBottom: cx(6),
  showIcon: false,
};

export interface IDepictCardProps extends Omit<IconBackgroundProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  unitStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  radius?: number;
  width?: number;
  padding?: number[];
  text?: string;
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  unit?: string;
  unitSize?: number;
  unitColor?: string;
  unitWeight?: number;
  value?: string;
  valueSize?: number;
  valueColor?: string;
  valueWeight?: number;
  isUnitInTop?: boolean;
  isAlignCenter?: boolean;
  marginBottom?: number;
}
