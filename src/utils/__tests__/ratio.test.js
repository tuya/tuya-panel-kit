import { Platform } from 'react-native';
import RatioUtils, { convertX, convertY, convert } from '../ratio';

jest.mock('Dimensions', () => {
  return {
    get: jest.fn(() => {
      return {
        width: 375,
        height: 812,
      };
    }),
  };
});
describe('RatioUtils', () => {
  it('RatioUtils.isIos = true', () => {
    const result = RatioUtils.isIos;
    expect(result).toEqual(true);
  });

  it('RatioUtils.isWeb = undefined', () => {
    Platform.OS = 'web';
    const result = RatioUtils.isWeb;
    expect(result).toEqual(undefined);
  });

  it('RatioUtils.isIphoneX = true', () => {
    const result = RatioUtils.isIphoneX;
    expect(result).toEqual(true);
  });

  it('RatioUtils.winWidth = 375', () => {
    const result = RatioUtils.winWidth;
    expect(result).toEqual(375);
  });

  it('RatioUtils.winHeight = 812', () => {
    const result = RatioUtils.winHeight;
    expect(result).toEqual(812);
  });

  it('RatioUtils.HRatio = undefined', () => {
    const result = RatioUtils.HRatio;
    expect(result).toEqual(undefined);
  });

  it('RatioUtils.VRatio = undefined', () => {
    const result = RatioUtils.VRatio;
    expect(result).toEqual(undefined);
  });

  it('RatioUtils.ratio = 1', () => {
    const result = RatioUtils.ratio;
    expect(result).toEqual(1);
  });

  it('RatioUtils.hRatio = 1', () => {
    const result = RatioUtils.hRatio;
    expect(result).toEqual(1);
  });

  it('RatioUtils.vRatio = 1.2173913043478262', () => {
    const result = RatioUtils.vRatio;
    expect(result).toEqual(1.2173913043478262);
  });

  it('RatioUtils.width = 375', () => {
    const result = RatioUtils.width;
    expect(result).toEqual(375);
  });

  it('RatioUtils.height = 812', () => {
    const result = RatioUtils.height;
    expect(result).toEqual(812);
  });

  it('RatioUtils.viewWidth = 375', () => {
    const result = RatioUtils.viewWidth;
    expect(result).toEqual(375);
  });

  it('RatioUtils.viewHeight = 724', () => {
    const result = RatioUtils.viewHeight;
    expect(result).toEqual(724);
  });

  it('RatioUtils.convertX(375) = 375', () => {
    const result = RatioUtils.convertX(375);
    expect(result).toEqual(375);
  });

  it('RatioUtils.convertY(667) = 1334', () => {
    const result = RatioUtils.convertY(667);
    expect(result).toEqual(812);
  });

  it('RatioUtils.convert(667) = 667', () => {
    const result = RatioUtils.convert(667);
    expect(result).toEqual(667);
  });

  it('RatioUtils.topBarHeight = 88', () => {
    const result = RatioUtils.topBarHeight;
    expect(result).toEqual(88);
  });

  it('RatioUtils.statusBarHeight = 44', () => {
    const result = RatioUtils.statusBarHeight;
    expect(result).toEqual(44);
  });

  it('RatioUtils.isSmallW = false', () => {
    const result = RatioUtils.isSmallW;
    expect(result).toEqual(false);
  });

  it('RatioUtils.isSmallH = false', () => {
    const result = RatioUtils.isSmallH;
    expect(result).toEqual(false);
  });
  it('convertX(375) = 375', () => {
    const result = convertX(375);
    expect(result).toEqual(375);
  });
  it('convertY(1334) = 1334', () => {
    const result = convertY(1334);
    expect(result).toEqual(1624);
  });
  it('convert(1334) = 1334', () => {
    const result = convert(1334);
    expect(result).toEqual(1334);
  });
});
