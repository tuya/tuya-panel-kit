import CoreUtils from '../core';

describe('CoreUtils toFixedString', () => {
  it('CoreUtils.toFixed("111", 5) = "00111"', () => {
    const result = CoreUtils.toFixed('111', 5);
    expect(result).toEqual('00111');
  });

  it('CoreUtils.toFixed("222222222", 5) = "22222"', () => {
    const result = CoreUtils.toFixed('222222222', 5);
    expect(result).toEqual('22222');
  });
});

describe('CoreUtils toFilled', () => {
  it('CoreUtils.toFilled("111", 5) = "00111"', () => {
    const result = CoreUtils.toFilled('111', 5);
    expect(result).toEqual('00111');
  });

  it('CoreUtils.toFilled("222222222", 5) = "222222222"', () => {
    const result = CoreUtils.toFilled('222222222', 5);
    expect(result).toEqual('222222222');
  });
});

describe('CoreUtils partition', () => {
  it('CoreUtils.partition("111", 5) = ["111"]', () => {
    const result = CoreUtils.partition('111', 5);
    expect(result).toEqual(['111']);
  });

  it('CoreUtils.partition("222222222", 5) = ["22222", "2222"]', () => {
    const result = CoreUtils.partition('222222222', 5);
    expect(result).toEqual(['22222', '2222']);
  });
});

describe('CoreUtils isObject', () => {
  it('CoreUtils.isObject({}) = true', () => {
    const result = CoreUtils.isObject({});
    expect(result).toEqual(true);
  });

  it('CoreUtils.isObject(new Date()) = true', () => {
    const result = CoreUtils.isObject(new Date());
    expect(result).toEqual(true);
  });

  it('CoreUtils.isObject([1, 2, 3, 4]) = true', () => {
    const result = CoreUtils.isObject([1, 2, 3, 4]);
    expect(result).toEqual(true);
  });
});
