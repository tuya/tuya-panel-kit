import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;

export const StudioItemDefaultProps = {
  backgroundColor: '#FFF',
  padding: [cx(19), cx(24), cx(20), cx(25)],
  width: cx(310),
  radius: cx(14),
  text: 'List Card',
  fontColor: '#3D3D3D',
  fontSize: cx(15),
  subFontColor: 'rgba(61, 61, 61, 0.5)',
  subFontSize: cx(14),
  showIcon: true,
  value: 'attitude',
  valueColor: '#505050',
  valueSize: cx(22),
  valueFontWeight: 600,
};

export const StudioArrowDefaultProps = {
  backgroundColor: '#FFF',
  padding: [cx(19), cx(24), cx(20), cx(25)],
  width: cx(310),
  radius: cx(14),
  text: 'List Card',
  fontColor: '#3D3D3D',
  fontSize: cx(15),
  subFontColor: 'rgba(61, 61, 61, 0.5)',
  subFontSize: cx(14),
  showIcon: true,
  value: '45%',
  valueColor: 'rgba(0, 0, 0, 0.5)',
  valueSize: cx(14),
  valueFontWeight: 400,
  arrowSize: cx(12),
  arrowColor: 'rgba(0, 0, 0, 0.5)',
  type: 'arrow',
  valueStyle: { lineHeight: cx(24) },
  disabled: false,
};

export const NordicDefaultProps = {
  showIcon: false,
  width: cx(278),
  radius: cx(16),
  fontSize: cx(16),
  fontColor: '#000',
  switchSize: {
    activeSize: cx(18),
    margin: cx(4),
    width: cx(46),
    height: cx(25),
  },
  textStyle: {
    lineHeight: cx(22),
    marginLeft: cx(8),
  },
};

export const NordicItemDefaultProps = {
  backgroundColor: '#FFF',
  padding: [cx(19), cx(24), cx(20), cx(25)],
  width: cx(310),
  radius: cx(14),
  text: 'List Card',
  fontColor: '#3D3D3D',
  fontSize: cx(16),
  showIcon: true,
  iconSize: cx(14),
  showIconBg: true,
  iconBgSize: cx(36),
  iconBgRadius: cx(8),
  iconBgColor: '#1082FE',
  value: '26%',
  valueColor: 'rgba(0, 0, 0, 0.5)',
  valueSize: cx(16),
  valueFontWeight: 400,
  textStyle: {
    lineHeight: cx(22),
    marginLeft: cx(8),
  },
};

export const NordicArrowDefaultProps = {
  backgroundColor: '#FFF',
  padding: [cx(19), cx(24), cx(20), cx(25)],
  width: cx(310),
  radius: cx(14),
  text: 'List Card',
  fontColor: '#3D3D3D',
  fontSize: cx(16),
  showIcon: true,
  iconSize: cx(14),
  showIconBg: true,
  iconBgSize: cx(36),
  iconBgRadius: cx(8),
  iconBgColor: '#1082FE',
  value: 'Power off',
  valueColor: 'rgba(0, 0, 0, 0.5)',
  valueSize: cx(12),
  valueFontWeight: 400,
  valueStyle: {
    lineHeight: cx(16),
  },
  type: 'arrow',
  arrowSize: cx(12),
  arrowColor: 'rgba(0, 0, 0, 0.5)',
  textStyle: {
    lineHeight: cx(22),
    marginLeft: cx(8),
  },
  disabled: false,
};

export const AcrylicDefaultProps = {
  iconSize: cx(40),
  onTintColor: '#FE7862',
  switchType: 'thumbMore',
  width: cx(278),
  radius: cx(16),
  fontSize: cx(16),
  fontColor: 'rgba(0, 0, 0, 0.87)',
  subFontColor: 'rgba(0, 0, 0, 0.35)',
  subTextStyle: {
    lineHeight: cx(19),
  },
  thumbStyle: { width: cx(24), height: cx(24), borderRadius: cx(8.8) },
  smallThumbStyle: {
    width: cx(1),
    height: cx(6),
    borderRadius: cx(0.5),
  },
  switchSize: {
    activeSize: cx(24),
    margin: cx(1.5),
    width: cx(52),
    height: cx(27),
    borderRadius: cx(10),
  },
};

export const AcrylicItemDefaultProps = {
  backgroundColor: '#FFF',
  padding: [cx(19), cx(24), cx(20), cx(25)],
  width: cx(310),
  radius: cx(14),
  text: 'List Card',
  fontColor: '#3D3D3D',
  fontSize: cx(16),
  showIcon: true,
  iconSize: cx(32),
  value: '26',
  valueColor: 'rgba(0, 0, 0, 0.87)',
  valueSize: cx(20),
  valueFontWeight: 500,
  unit: '°C',
  unitSize: cx(12),
  unitColor: 'rgba(0, 0, 0, 0.5)',
  unitWeight: 400,
  valueStyle: { lineHeight: cx(27) },
  unitStyle: { marginTop: cx(5) },
  textStyle: {
    lineHeight: cx(22),
  },
};

export const AcrylicArrowDefaultProps = {
  backgroundColor: '#FFF',
  padding: [cx(19), cx(24), cx(20), cx(25)],
  width: cx(310),
  radius: cx(14),
  text: 'List Card',
  textStyle: {
    lineHeight: cx(22),
  },
  fontColor: 'rgba(0, 0, 0, 0.87)',
  fontSize: cx(16),
  showIcon: true,
  iconSize: cx(32),
  subText: '200L',
  subFontColor: 'rgba(0, 0, 0, 0.35)',
  subTextStyle: {
    lineHeight: cx(19),
  },
  type: 'arrow',
  arrowSize: cx(12),
  arrowColor: 'rgba(0, 0, 0, 0.25)',
  disabled: false,
};

export const PaintDefaultProps = {
  iconSize: cx(22),
  width: cx(294),
  fontColor: '#000',
  onTintColor: '#76A6E4',
  thumbStyle: { width: cx(4), height: cx(12), borderRadius: cx(2) },
  switchSize: { activeSize: 4, margin: 6 },
};
