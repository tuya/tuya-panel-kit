import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IStudioDefaultProps = {
  backgroundColor: '#fff',
  radius: cx(14),
  width: cx(175),
  padding: [cx(16), cx(21), cx(21), cx(16)],
  text: 'Temp',
  fontWeight: 400,
  fontSize: cx(16),
  fontColor: '#3D3D3D',
  value: '42%',
  valueWeight: 600,
  valueSize: cx(24),
  valueColor: '#505050',
};

export const INordicDefaultProps = {
  backgroundColor: '#fff',
  radius: cx(16),
  width: cx(155),
  padding: [cx(24), cx(20), cx(18), cx(20)],
  text: 'Temp',
  fontWeight: 400,
  fontSize: cx(16),
  fontColor: 'rgba(0, 0, 0, 0.9)',
  value: '42%',
  valueWeight: 400,
  valueSize: cx(28),
  valueColor: 'rgba(0, 0, 0, 0.5)',
  arrowSize: cx(10),
  arrowColor: 'rgba(0, 0, 0, 0.2)',
  hasArrow: false,
  showIcon: true,
};

export const IAcrylicDefaultProps = {
  backgroundColor: '#fff',
  radius: cx(16),
  width: cx(150),
  padding: [cx(20), cx(20), cx(27), cx(20)],
  text: 'Temp',
  fontWeight: 500,
  fontSize: cx(14),
  fontColor: 'rgba(0, 0, 0, 0.5)',
  value: '42',
  unit: '°C',
  valueWeight: 600,
  valueSize: cx(32),
  valueColor: 'rgba(0, 0, 0, 0.9)',
  unitWeight: 400,
  unitColor: 'rgba(0, 0, 0, 0.5)',
  unitSize: cx(16),
};

export interface IStudioIconCardProps extends Omit<IconBackgroundProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  unitStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  radius?: number;
  width?: number;
  padding?: number[];
  text?: string;
  fontWeight?: number;
  fontSize?: number;
  fontColor?: string;
  value?: string;
  unit?: string;
  valueWeight?: number;
  valueColor?: string;
  valueSize?: number;
  unitWeight?: number;
  unitColor?: string;
  unitSize?: number;
}

export interface INordicIconCardProps extends IStudioIconCardProps {
  arrowSize?: number;
  arrowColor?: string;
  hasArrow?: boolean;
}
