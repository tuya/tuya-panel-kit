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
  width: cx(155),
  radius: cx(16),
  fontWeight: 400,
  text: 'Block Card',
  fontColor: '#000',
  fontSize: cx(16),
  switchSize: { width: cx(52), height: cx(28), activeSize: cx(20), margin: cx(4) },
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
  /**
   * @description.en Outermost container style
   * @description.zh 最外层容器样式
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en
   * @description.zh
   * @default
   */
  backgroundColor?: string;
  /**
   * @description.en Container padding
   * @description.zh 容器内边距
   * @default [cx(22), cx(20), cx(20), cx(24)]
   */
  padding?: number[];
  /**
   * @description.en Container width
   * @description.zh 容器宽度
   * @default cx(175)
   */
  width?: number;
  /**
   * @description.en The container with rounded corners
   * @description.zh 容器圆角
   * @default cx(14)
   */
  radius?: number;
  /**
   * @description.en Title
   * @description.zh 标题
   * @default 'Block Card'
   */
  text: string;
  /**
   * @description.en Title weight
   * @description.zh 标题字重
   * @default 500
   */
  fontWeight?: string | number;
  /**
   * @description.en Title Color
   * @description.zh 标题颜色
   * @default '#3D3D3D'
   */
  fontColor?: string;
  /**
   * @description.en Title size
   * @description.zh 标题大小
   * @default cx(15)
   */
  fontSize?: number;
  /**
   * @description.en Title style
   * @description.zh 标题样式
   * @default null
   */
  textStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Switch size configuration
   * @description.zh 开关尺寸配置
   * @default { width: cx(40), height: cx(24), activeSize: cx(20), margin: cx(2) }
   */
  switchSize?: { width?: number; height?: number; activeSize?: number; margin?: number };
  /**
   * @description.en Icon size on switch
   * @description.zh 开关上图标大小
   * @default null
   */
  switchIconSize?: number;
  /**
   * @description.en Icon color on switch
   * @description.zh 开关上图标颜色
   * @default null
   */
  switchIconColor?: string;
  /**
   * @description.en Switch the style
   * @description.zh 开关样式
   * @default null
   */
  switchStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Icon Style
   * @description.zh 图标样式
   * @default null
   */
  iconStyle: StyleProp<ViewStyle>;
}

export interface INordicCardProps
  extends Omit<SwitchButtonProps, 'style' | 'iconSize' | 'iconColor' | 'size'> {
  /**
   * @description.en Outermost container style
   * @description.zh 最外层容器样式
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en
   * @description.zh
   * @default
   */
  backgroundColor?: string;
  /**
   * @description.en Container padding
   * @description.zh 容器内边距
   * @default [cx(24), cx(20), cx(24), cx(20)]
   */
  padding?: number[];
  /**
   * @description.en Container width
   * @description.zh 容器宽度
   * @default cx(155)
   */
  width?: number;
  /**
   * @description.en The container with rounded corners
   * @description.zh 容器圆角
   * @default cx(16)
   */
  radius?: number;
  /**
   * @description.en Title
   * @description.zh 标题
   * @default 'Block Card'
   */
  text: string;
  /**
   * @description.en Title weight
   * @description.zh 标题字重
   * @default 400
   */
  fontWeight?: string | number;
  /**
   * @description.en Title Color
   * @description.zh 标题颜色
   * @default '#3D3D3D'
   */
  fontColor?: string;
  /**
   * @description.en Title size
   * @description.zh 标题大小
   * @default cx(16)
   */
  fontSize?: number;
  /**
   * @description.en Title style
   * @description.zh 标题样式
   * @default null
   */
  textStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Switch size configuration
   * @description.zh 开关尺寸配置
   * @default { width: cx(52), height: cx(28), activeSize: cx(20), margin: cx(4) }
   */
  switchSize?: { width?: number; height?: number; activeSize?: number; margin?: number };
  /**
   * @description.en Icon size on switch
   * @description.zh 开关上图标大小
   * @default null
   */
  switchIconSize?: number;
  /**
   * @description.en Icon color on switch
   * @description.zh 开关上图标颜色
   * @default null
   */
  switchIconColor?: string;
  /**
   * @description.en Switch the style
   * @description.zh 开关样式
   * @default null
   */
  switchStyle?: StyleProp<ViewStyle>;
}
