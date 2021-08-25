import { StyleProp, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { SwitchButtonProps } from 'tuya-panel-kit';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IStudioDefaultProps = {
  backgroundColor: '#FFF',
  padding: [cx(22), cx(20), cx(20), cx(24)],
  width: cx(175),
  radius: cx(14),
  text: 'Block Card',
  fontColor: '#3D3D3D',
  fontSize: cx(15),
  fontWeight: 400,
  showIcon: true,
  switchSize: { width: cx(40), height: cx(24), activeSize: cx(20), margin: cx(2) },
};

export const INordicDefaultProps = {
  backgroundColor: '#FFF',
  padding: [cx(24), cx(20), cx(24), cx(20)],
  width: cx(184),
  radius: cx(16),
  text: 'Block Card',
  fontColor: '#000',
  fontSize: cx(16),
  switchSize: { width: cx(52), height: cx(28), activeSize: cx(20.8), margin: cx(4.3) },
};

export const IAcrylicDefaultProps = {
  backgroundColor: '#FFF',
  padding: [cx(20), cx(20), cx(27), cx(20)],
  width: cx(150),
  radius: cx(16),
  text: 'Block Card',
  fontColor: '#000',
  fontSize: cx(14),
  fontWeight: 500,
  switchType: 'thumbMore',
  thumbStyle: { width: cx(23), height: cx(23), borderRadius: cx(8.5) },
  smallThumbStyle: {
    width: cx(1),
    height: cx(6),
    borderRadius: cx(0.5),
  },
  switchSize: {
    activeSize: cx(23),
    margin: cx(1.5),
    width: cx(50),
    height: cx(26),
    borderRadius: cx(10),
  },
};

export interface IStudioCardProps
  extends Omit<IconBackgroundProps, 'style'>,
    Omit<SwitchButtonProps, 'style' | 'iconSize' | 'iconColor' | 'size'> {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  padding?: number[];
  width?: number;
  radius?: number;
  text: string;
  fontWeight?: string | number;
  fontColor?: string;
  fontSize?: number;
  textStyle?: StyleProp<ViewStyle>;
  switchSize?: { width?: number; height?: number; activeSize?: number; margin?: number };
  switchIconSize?: number;
  switchIconColor?: string;
  switchStyle?: StyleProp<ViewStyle>;
  iconStyle: StyleProp<ViewStyle>;
}

export interface INordicCardProps
  extends Omit<SwitchButtonProps, 'style' | 'iconSize' | 'iconColor' | 'size'> {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  padding?: number[];
  width?: number;
  radius?: number;
  text: string;
  fontColor?: string;
  fontSize?: number;
  textStyle?: StyleProp<ViewStyle>;
  switchSize?: { width?: number; height?: number; activeSize?: number; margin?: number };
  switchIconSize?: number;
  switchIconColor?: string;
  switchStyle?: StyleProp<ViewStyle>;
}
