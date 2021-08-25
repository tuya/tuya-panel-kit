import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;

export const NordicDefaultProps = {
  width: cx(120),
  height: cx(92),
  radius: cx(14),
  backgroundColor: 'transparent',
  iconBgColor: '#1082FE',
  iconBgSize: cx(64),
  iconBgRadius: cx(12),
  fontColor: 'rgba(0, 0, 0, 0.3)',
  fontSize: cx(14),
  iconSize: cx(20),
};

export const AcrylicDefaultProps = {
  width: cx(120),
  height: cx(92),
  radius: cx(14),
  backgroundColor: 'transparent',
  iconBgColor: '#FE7862',
  iconBgSize: cx(64),
  iconBgRadius: cx(32),
  fontColor: 'rgba(0, 0, 0, 0.85)',
  fontSize: cx(12),
  iconSize: cx(19),
};

export const PaintDefaultProps = {
  width: cx(164),
  height: cx(108),
  radius: cx(12),
  backgroundColor: '#FFF',
  iconBgColor: '#76A6E4',
  iconBgSize: cx(48),
  iconBgRadius: cx(12),
  fontColor: '#162236',
  fontSize: cx(12),
  iconSize: cx(20),
};
