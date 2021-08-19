import { Utils } from 'tuya-panel-utils';
import { IButtonCardProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;

export const NordicDefaultProps: Partial<IButtonCardProps> = {
  padding: [24, 20, 24, 20],
  iconColor: '#1082FE',
  iconSize: cx(16),
  titleFontColor: 'rgba(0, 0, 0, 0.9)',
  // 按钮样式
  buttonHeight: cx(56),
  buttonBgColor: 'rgba(16, 130, 254, 0.05)',
  buttonBgRadius: cx(12),
  buttonFontSize: cx(14),
  buttonFontColor: 'rgba(0, 0, 0, 0.5)',
  buttonOffset: cx(20),
  // 按钮选中样式
  activeButtonBgColor: '#1082FE',
  activeButtonFontSize: cx(14),
  activeButtonFontColor: '#fff',
  activeButtonFontWeight: 'normal',
  titleStyle: {
    marginLeft: cx(8),
  },
};
