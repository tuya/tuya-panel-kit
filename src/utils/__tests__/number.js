import NumberUtils from '../number';


describe('NumberUtils toFixedString', () => {
  it('111, 5', () => {
    const result = NumberUtils.toFixedString(111, 5);
    expect(result).toBe('00111');
  });

  it('222222222222, 5', () => {
    const result = NumberUtils.toFixedString(222222222222, 5);
    expect(result).toBe('22222');
  });
});


describe('NumberUtils toFilledString', () => {
  it('111, 5', () => {
    const result = NumberUtils.toFilledString(111, 5);
    expect(result).toBe('00111');
  });

  it('222222222222, 5', () => {
    const result = NumberUtils.toFilledString(222222222222, 5);
    expect(result).toBe('222222222222');
  });

  it('-1111111, 5', () => {
    const result = NumberUtils.toFilledString(-1111111, 5);
    expect(result).toBe('-1111111');
  });
});


describe('NumberUtils getBitValue', () => {
  it('111, 5', () => {
    // 1101111
    const result = NumberUtils.getBitValue(111, 5);
    expect(result).toBe(1);
  });

  it('2222222, 5', () => {
    // 1000011110100010001110
    const result = NumberUtils.getBitValue(2222222, 5);
    expect(result).toBe(0);
  });
});


describe('NumberUtils changeBitValue', () => {
  it('changeBitValue 1234 7', () => {
    // 10011010010
    // 10001010010
    const result = NumberUtils.changeBitValue(1234, 7);
    expect(result).toBe(1106);
  });

  it('changeBitValue 12345678 30', () => {
    //        101111000110000101001110
    // 1000000101111000110000101001110
    const result = NumberUtils.changeBitValue(12345678, 30);
    expect(result).toBe(1086087502);
  });

  it('changeBitValue 17 4', () => {
    const result = NumberUtils.changeBitValue(17, 4);
    expect(result).toBe(1);
  });
});


describe('NumberUtils setBitValueWithOne', () => {
  it('setBitValueWithOne 1234 7', () => {
    // 10011010010
    // 10011010010
    const result = NumberUtils.setBitValueWithOne(1234, 7);
    expect(result).toBe(1234);
  });


  it('setBitValueWithOne 1234 22', () => {
    //             10011010010
    // 10000000000010011010010
    const result = NumberUtils.setBitValueWithOne(1234, 22);
    expect(result).toBe(4195538);
  });
});


describe('NumberUtils setBitValueWithZero', () => {
  it('setBitValueWithZero 1234 7', () => {
    // 10011010010
    // 10001010010
    const result = NumberUtils.setBitValueWithZero(1234, 7);
    expect(result).toBe(1106);
  });


  it('setBitValueWithZero 1234 22', () => {
    //             10011010010
    // 00000000000010011010010
    const result = NumberUtils.setBitValueWithZero(1234, 22);
    expect(result).toBe(1234);
  });
});


describe('NumberUtils bytesToHexString', () => {
  it('bytesToHexString 11 22', () => {
    const result = NumberUtils.bytesToHexString([11, 22]);
    expect(result).toBe('0b16');
  });


  it('bytesToHexString 234 22', () => {
    const result = NumberUtils.bytesToHexString([234, 22]);
    expect(result).toBe('ea16');
  });
});


describe('NumberUtils numToHexString', () => {
  it('numToHexString 11', () => {
    const result = NumberUtils.numToHexString(11);
    expect(result).toBe('0b');
  });


  it('numToHexString 234', () => {
    const result = NumberUtils.numToHexString(234);
    expect(result).toBe('ea');
  });
});


describe('NumberUtils numToByteNumbers', () => {
  it('numToByteNumbers(123) = [0, 123]', () => {
    const result = NumberUtils.numToByteNumbers(123);
    expect(result).toEqual([0, 123]);
  });


  it('numToByteNumbers(1234567) = [18, 214, 135]', () => {
    // 18 * 256 * 256 + 214 * 256 + 135 = 1234567
    const result = NumberUtils.numToByteNumbers(1234567);
    expect(result).toEqual([18, 214, 135]);
  });
});


describe('NumberUtils highLowToInt', () => {
  it('highLowToInt(123, 45) = 31533', () => {
    const result = NumberUtils.highLowToInt(123, 45);
    expect(result).toEqual(31533);
  });


  it('highLowToInt(0, 89) = 89', () => {
    const result = NumberUtils.highLowToInt(0, 89);
    expect(result).toEqual(89);
  });
});


describe('NumberUtils intToHighLow', () => {
  it('intToHighLow(123) = [0, 123]', () => {
    const result = NumberUtils.intToHighLow(123);
    expect(result).toEqual([0, 123]);
  });

  it('intToHighLow(1234567) = [4822, 135]', () => {
    const result = NumberUtils.intToHighLow(1234567);
    expect(result).toEqual([4822, 135]);
  });
});


describe('NumberUtils inMaxMin', () => {
  it('inMaxMin(1, -44, 22) = 1', () => {
    const result = NumberUtils.inMaxMin(1, -44, 22);
    expect(result).toEqual(1);
  });

  it('inMaxMin(1, 234, 55) = 55', () => {
    const result = NumberUtils.inMaxMin(1, 234, 55);
    expect(result).toEqual(55);
  });
});


describe('NumberUtils scaleNumber', () => {
  it('scaleNumber(2, 12345) = "123.45"', () => {
    const result = NumberUtils.scaleNumber(2, 12345);
    expect(result).toEqual('123.45');
  });

  it('scaleNumber(1, 34) = "3.4"', () => {
    const result = NumberUtils.scaleNumber(1, 34);
    expect(result).toEqual('3.4');
  });
});


describe('NumberUtils range', () => {
  it('range(0, 50) = [0,...,49]', () => {
    const result = NumberUtils.range(0, 50);
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]);
  });

  it('range(50, 3, -7) = [50, 43, 36, 29, 22, 15, 8]', () => {
    const result = NumberUtils.range(50, 3, -7);
    expect(result).toEqual([50, 43, 36, 29, 22, 15, 8]);
  });
});

describe('NumberUtils calcPosition', () => {
  it('calcPosition(50, 0, 100, -100, 0) = -50', () => {
    const result = NumberUtils.calcPosition(50, 0, 100, -100, 0);
    expect(result).toEqual(-50);
  });

  it('calcPosition(255, 0, 255, 0, 100) = 100', () => {
    const result = NumberUtils.calcPosition(255, 0, 255, 0, 100);
    expect(result).toEqual(100);
  });

  it('calcPosition(-255, 0, 255, 0, 100) = -100', () => {
    const result = NumberUtils.calcPosition(-255, 0, 255, 0, 100);
    expect(result).toEqual(-100);
  });
});

describe('NumberUtils calcPercent', () => {
  it('calcPercent(25, 255, 25) = 0', () => {
    const result = NumberUtils.calcPercent(25, 255, 25);
    expect(result).toEqual(0);
  });

  it('calcPercent(25, 255, 0) = 0', () => {
    const result = NumberUtils.calcPercent(25, 255, 0);
    expect(result).toEqual(0);
  });

  it('calcPercent(25, 255, 300) = 1', () => {
    const result = NumberUtils.calcPercent(25, 255, 300);
    expect(result).toEqual(1);
  });

  it('calcPercent(25, 255, 25, 0.1) = 0.1', () => {
    const result = NumberUtils.calcPercent(25, 255, 25, 0.1);
    expect(result).toEqual(0.1);
  });

  it('calcPercent(0, 200, 50) = 0.25', () => {
    const result = NumberUtils.calcPercent(0, 200, 50);
    expect(result).toEqual(0.25);
  });
});
