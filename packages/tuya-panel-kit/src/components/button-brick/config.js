import { RatioUtils } from '../../utils';

const { convertX: cx } = RatioUtils;
export const BASERADIUS = 24;

export const BASELAYOUT = {
  height: 48,
  smallHeight: 28,
  largeWidth: cx(343),
  normalWidth: cx(150),
  smallWidth: cx(56),
  border: {
    borderRadius: BASERADIUS,
  },
  textStyle: {
    fontSize: cx(16),
    color: '#fff',
    flexShrink: 1,
    zIndex: 99,
  },
};

export const DEFAULTSTYLE = {
  textStyle: BASELAYOUT.textStyle,
  textDisabledColor: '#999999',
  backgroundColorTouched: '#e54000',
  backgroundColorDisabled: '#e5e5e5',
};

export const STYLES = {
  primary: {
    style: {
      width: BASELAYOUT.largeWidth,
      height: BASELAYOUT.height,
      backgroundColor: '#FF4800',
      paddingHorizontal: cx(8),
      ...BASELAYOUT.border,
    },
    ...DEFAULTSTYLE,
  },
  primaryGradient: {
    style: {
      width: BASELAYOUT.largeWidth,
      height: BASELAYOUT.height,
      backgroundColor: '#FF4800',
      paddingHorizontal: cx(8),
      ...BASELAYOUT.border,
    },
    ...DEFAULTSTYLE,
  },
  primaryBorder: {
    style: {
      width: BASELAYOUT.largeWidth,
      height: BASELAYOUT.height,
      backgroundColor: 'transparent',
      paddingHorizontal: cx(8),
      ...BASELAYOUT.border,
      borderWidth: cx(1),
      borderColor: '#FF4800',
    },
    ...DEFAULTSTYLE,
    textStyle: {
      ...DEFAULTSTYLE.textStyle,
      color: '#FF4800',
    },
    borderColorDisabled: '#E5E5E5',
    backgroundColorTouched: '#ffece5',
    backgroundColorDisabled: 'transparent',
  },
  normal: {
    style: {
      width: BASELAYOUT.normalWidth,
      height: BASELAYOUT.height,
      ...BASELAYOUT.border,
      backgroundColor: '#FF4800',
      paddingHorizontal: cx(8),
    },
    ...DEFAULTSTYLE,
    textStyle: {
      ...DEFAULTSTYLE.textStyle,
      fontSize: cx(12),
    },
  },
  small: {
    style: {
      width: BASELAYOUT.smallWidth,
      height: BASELAYOUT.smallHeight,
      ...BASELAYOUT.border,
      backgroundColor: '#FF4800',
      paddingHorizontal: cx(8),
    },
    ...DEFAULTSTYLE,
    textStyle: {
      ...DEFAULTSTYLE.textStyle,
      fontSize: cx(12),
      paddingHorizontal: cx(4),
    },
  },
  smallLoadingSize: cx(20),
  largeLoadingSize: cx(36),
};

export const ACTIVEOPACITY = 0.4;

export const ACTIONS = [
  'onPressIn',
  'onPressOut',
  'onLongPress',
  'onShowUnderlay',
  'onHideUnderlay',
];

export const LOADINGSIZE = {
  large: cx(22),
  small: cx(14),
};

export const mergeActions = (events = [], target = () => {}) =>
  events.reduce(
    (pre, cur) => ({
      ...pre,
      [cur]: (...args) => target(cur, ...args),
    }),
    {}
  );
