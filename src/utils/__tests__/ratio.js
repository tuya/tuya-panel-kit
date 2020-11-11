import RatioUtils from '../ratio';

describe('RatioUtils', () => {
  it('RatioUtils.ratio = 2', () => {
    const result = RatioUtils.ratio;
    expect(result).toEqual(2);
  });

  it('RatioUtils.hRatio = 2', () => {
    const result = RatioUtils.hRatio;
    expect(result).toEqual(2);
  });

  it('RatioUtils.vRatio = 2', () => {
    const result = RatioUtils.vRatio;
    expect(result).toEqual(2);
  });

  it('RatioUtils.width = 750', () => {
    const result = RatioUtils.width;
    expect(result).toEqual(750);
  });

  it('RatioUtils.height = 1334', () => {
    const result = RatioUtils.height;
    expect(result).toEqual(1334);
  });

  it('RatioUtils.viewWidth = 750', () => {
    const result = RatioUtils.viewWidth;
    expect(result).toEqual(750);
  });

  it('RatioUtils.viewHeight = 1270', () => {
    const result = RatioUtils.viewHeight;
    expect(result).toEqual(1270);
  });

  it('RatioUtils.convertX(375) = 750', () => {
    const result = RatioUtils.convertX(375);
    expect(result).toEqual(750);
  });

  it('RatioUtils.convertY(667) = 1334', () => {
    const result = RatioUtils.convertY(667);
    expect(result).toEqual(1334);
  });

  it('RatioUtils.convert(667) = 1334', () => {
    const result = RatioUtils.convert(667);
    expect(result).toEqual(1334);
  });

  it('RatioUtils.isIos = true', () => {
    const result = RatioUtils.isIos;
    expect(result).toEqual(true);
  });

  it('RatioUtils.topBarHeight = 64', () => {
    const result = RatioUtils.topBarHeight;
    expect(result).toEqual(64);
  });
});
