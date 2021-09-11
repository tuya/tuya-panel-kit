import React from 'react';
import { ViewStyle, Image, StyleProp } from 'react-native';
import { IconFont } from 'tuya-panel-kit';
import { Utils } from 'tuya-panel-utils';
import Background, { BackgroundType } from './background';

export { default as Background } from './background';
export * from './background';

export interface IconBackgroundProps {
  /**
   * @description.en icon svg path
   * @description.zh 图标 svg path
   */
  icon?: string;
  /**
   * @description.en image url，icon has a higher priority
   * @description.zh 图片地址，图标的优先级更高
   */
  image?: string;
  /**
   * @description.en icon size
   * @description.zh 图标尺寸
   * @default cx(24)
   */
  iconSize?: number;
  /**
   * @description.en icon background size
   * @description.zh 组件背景尺寸
   * @default cx(50)
   */
  iconBgSize?: number;
  /**
   * @description.en Whether to display icon
   * @description.zh 是否显示图标
   * @default true
   */
  showIcon?: boolean;
  /**
   * @description.en Whether to display icon background
   * @description.zh 是否显示图标背景
   * @default true
   */
  showIconBg?: boolean;
  /**
   * @description.en icon color
   * @description.zh 图标颜色
   * @default #fff
   */
  iconColor?: string;
  /**
   * @description.en icon background color, only rgb、rgba or hex
   * @description.zh 图标背景颜色 只能设置 rgb、rgba 或者 hex
   * @default #158CFB
   */
  iconBgColor?: BackgroundType;
  /**
   * @description.en icon background radius
   * @description.zh 图标背景圆角
   * @default cx(50)
   */
  iconBgRadius?: number;
  /**
   * @description.en image radius
   * @description.zh 图片圆角
   * @default 0
   */
  imageRadius?: number;
  /**
   * @description.en component content styles
   * @description.zh 组件容器样式
   * @default null
   */
  style?: StyleProp<ViewStyle>;
}

const { convertX: cx } = Utils.RatioUtils;

const defaultProps = {
  icon: '',
  iconBgSize: cx(50),
  iconBgRadius: cx(50),
  iconSize: cx(24),
  iconColor: '#fff',
  iconBgColor: '#158CFB',
  showIcon: true,
  showIconBg: true,
  style: {},
  imageRadius: 0,
};

export const ClassicIconBackground: React.FC<IconBackgroundProps> = props => {
  const renderIcon = () => {
    if (props.icon) {
      return <IconFont d={props.icon} color={props.iconColor} size={props.iconSize} />;
    }
    if (props.image) {
      return (
        <Image
          source={{ uri: props.image }}
          style={{ width: props.iconSize, height: props.iconSize, borderRadius: props.imageRadius }}
        />
      );
    }
    return null;
  };

  if (!props.showIcon) {
    return null;
  }
  if (!props.showIconBg) {
    return renderIcon();
  }
  return (
    <Background
      width={props.iconBgSize}
      height={props.iconBgSize}
      background={props.iconBgColor}
      style={[
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: props.iconBgSize,
          height: props.iconBgSize,
          overflow: 'hidden',
          borderRadius: props.iconBgRadius,
        },
        props.style,
      ]}
      contentStyle={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {renderIcon()}
    </Background>
  );
};

ClassicIconBackground.defaultProps = defaultProps;
