import { Utils } from 'tuya-panel-utils';
import { IEnumCardProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;

export const NordicDefaultProps: Partial<IEnumCardProps> = {
  padding: [24, 20, 24, 20],
  iconBgSize: cx(52),
  iconBgRadius: cx(12),
  iconBgColor: 'rgba(16, 130, 254, 0.1)',
  activeIconBgColor: '#1082FE',
  iconSize: cx(24),
  iconColor: '#fff',
  activeIconColor: '#fff',
  textColor: 'rgba(0, 0, 0, 0.3)',
  activeTextColor: '#1082FE',
  textFontSize: cx(14),
  textStyle: {
    marginTop: cx(11),
  },
  carouselPageContent: {
    paddingBottom: cx(12),
  },
};

export const AcrylicDefaultProps: Partial<IEnumCardProps> = {
  padding: [20, 20, 20, 20],
  titleColor: 'rgba(0, 0, 0, 0.87)',
  titleFontSize: cx(16),
  titleFontWeight: '500',
  iconBgSize: cx(60),
  iconBgRadius: cx(60),
  activeIconBgColor: {
    deg: 135,
    stops: {
      '0%': 'rgba(255, 137, 118, 1)',
      '100%': 'rgba(254, 120, 98, 1)',
    },
  },
  iconBgColor: {
    deg: 135,
    stops: {
      '0%': 'rgba(255, 137, 118, 0.1)',
      '100%': 'rgba(254, 120, 98, 0.1)',
    },
  },
  iconSize: cx(20),
  iconColor: '#FF8976',
  textFontSize: cx(10),
  activeTextColor: 'rgba(0, 0, 0, 0.85)',
  textColor: 'rgba(0, 0, 0, 0.4)',
  activeDotColor: '#FE724C',
  dotColor: 'rgba(0, 0, 0, 0.05)',
  textStyle: {
    marginTop: cx(10),
  },
  titleContentStyle: {
    marginBottom: cx(20),
  },
  carouselPageContent: {
    paddingBottom: cx(16),
  },
};
