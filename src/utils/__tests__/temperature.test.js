import TemperatureUtils from '../temperature';

describe('TemperatureUtils c2f', () => {
  it('TemperatureUtils.c2f(100) = 212', () => {
    const result = TemperatureUtils.c2f(100);
    expect(result).toEqual(212);
  });

  it('TemperatureUtils.c2f(-77) = -107', () => {
    const result = TemperatureUtils.c2f(-77);
    expect(result).toEqual(-107);
  });
});

describe('TemperatureUtils f2c', () => {
  it('TemperatureUtils.f2c(212) = 100', () => {
    const result = TemperatureUtils.f2c(212);
    expect(result).toEqual(100);
  });

  it('TemperatureUtils.f2c(-107) = -77', () => {
    const result = TemperatureUtils.f2c(-107);
    expect(result).toEqual(-77);
  });
});
