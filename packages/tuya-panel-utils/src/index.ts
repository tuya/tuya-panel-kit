import ColorUtils, { Color } from './color';
import CoreUtils from './core';
import JsonUtils from './json';
import NumberUtils from './number';
import RatioUtils from './ratio';
import StringUtils from './string';
import TemperatureUtils from './temperature';
import TimeUtils from './time';
import ThemeUtils from './theme';

export const Utils = {
  ColorUtils: { ...ColorUtils, color: new Color() },
  CoreUtils,
  JsonUtils,
  NumberUtils,
  RatioUtils,
  StringUtils,
  TemperatureUtils,
  TimeUtils,
  ThemeUtils,
};
