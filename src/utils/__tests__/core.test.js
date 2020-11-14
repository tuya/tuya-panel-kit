import CoreUtils from '../core';

describe('CoreUtils get', () => {
  it('CoreUtils.get({ a: [{ b: { c: 3 } }] }, a[0].b.c) = 3', () => {
    const result = CoreUtils.get({ a: [{ b: { c: 3 } }] }, 'a.b.c', 'default');
    expect(result).toEqual('default');
  });

  it('CoreUtils.get({}, a.b.c) = undefined', () => {
    const result = CoreUtils.get({}, 'a.b.c');
    expect(result).toEqual(undefined);
  });
});

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

describe('CoreUtils isArray', () => {
  it('CoreUtils.isArray([]) = true', () => {
    const result = CoreUtils.isArray([]);
    expect(result).toEqual(true);
  });

  it('CoreUtils.isArray(new Date()) = false', () => {
    const result = CoreUtils.isArray(new Date());
    expect(result).toEqual(false);
  });

  it('CoreUtils.isArray([1, 2, 3, 4]) = true', () => {
    const result = CoreUtils.isArray([1, 2, 3, 4]);
    expect(result).toEqual(true);
  });
});

describe('CoreUtils isDate', () => {
  it('CoreUtils.isDate([]) = false', () => {
    const result = CoreUtils.isDate([]);
    expect(result).toEqual(false);
  });

  it('CoreUtils.isDate(new Date()) = true', () => {
    const result = CoreUtils.isDate(new Date());
    expect(result).toEqual(true);
  });
});

describe('CoreUtils isRegExp', () => {
  it('CoreUtils.isRegExp([]) = true', () => {
    const result = CoreUtils.isRegExp(/[0-9]{1,2}/);
    expect(result).toEqual(true);
  });

  it('CoreUtils.isRegExp(11) = false', () => {
    const result = CoreUtils.isRegExp(11);
    expect(result).toEqual(false);
  });
});

describe('CoreUtils isBoolean', () => {
  it('CoreUtils.isBoolean(true) = true', () => {
    const result = CoreUtils.isBoolean(true);
    expect(result).toEqual(true);
  });

  it('CoreUtils.isBoolean(11) = false', () => {
    const result = CoreUtils.isBoolean(11);
    expect(result).toEqual(false);
  });
});

describe('CoreUtils isNumerical', () => {
  it('CoreUtils.isNumerical(true) = false', () => {
    const result = CoreUtils.isNumerical(true);
    expect(result).toEqual(false);
  });

  it('CoreUtils.isNumerical(11) = true', () => {
    const result = CoreUtils.isNumerical(11);
    expect(result).toEqual(true);
  });
});

describe('CoreUtils isUndefined', () => {
  it('CoreUtils.isUndefined(true) = false', () => {
    const result = CoreUtils.isUndefined(true);
    expect(result).toEqual(false);
  });

  it('CoreUtils.isUndefined() = true', () => {
    const result = CoreUtils.isUndefined();
    expect(result).toEqual(true);
  });
});

describe('CoreUtils isNil', () => {
  it('CoreUtils.isNil(true) = false', () => {
    const result = CoreUtils.isNil(true);
    expect(result).toEqual(false);
  });

  it('CoreUtils.isNil(undefined) = true', () => {
    const result = CoreUtils.isNil(undefined);
    expect(result).toEqual(true);
  });
});

describe('CoreUtils pick', () => {
  it('CoreUtils.pick({a: 4,b: 5, c: 6}, [a]) = { a: 4 }', () => {
    const result = CoreUtils.pick({ a: 4, b: 5, c: 6 }, ['a']);
    expect(result).toEqual({ a: 4 });
  });

  it('CoreUtils.pick({ a: 4, b: 5, c: 6 }, [d]) = {}', () => {
    const result = CoreUtils.pick({ a: 4, b: 5, c: 6 }, ['d']);
    expect(result).toEqual({});
  });
});

describe('CoreUtils omit', () => {
  it('CoreUtils.omit({a: 4,b: 5, c: 6}, [a]) = { b: 5, c: 6 }', () => {
    const result = CoreUtils.omit({ a: 4, b: 5, c: 6 }, ['a']);
    expect(result).toEqual({ b: 5, c: 6 });
  });

  it('CoreUtils.omit({ a: 4, b: 5, c: 6 }, [d]) = {a: 4, b: 5, c: 6}', () => {
    const result = CoreUtils.omit({ a: 4, b: 5, c: 6 }, ['d']);
    expect(result).toEqual({ a: 4, b: 5, c: 6 });
  });
});

describe('CoreUtils chunk', () => {
  it('CoreUtils.chunk([], []) = []', () => {
    const result = CoreUtils.chunk([], []);
    expect(result).toEqual([]);
  });

  it('CoreUtils.chunk([apple, orange, banana],0, [purple]) = [purple]', () => {
    const result = CoreUtils.chunk(['apple', 'orange', 'banana'], 0, ['purple']);
    expect(result).toEqual(['purple']);
  });
  it('CoreUtils.chunk(["apple", "orange", "banana"], -1, ["purple"])', () => {
    const result = CoreUtils.chunk(['apple', 'orange', 'banana'], 1, ['purple']);
    expect(result).toEqual(['purple', ['apple'], ['orange'], ['banana']]);
  });
});

describe('CoreUtils compareVersion', () => {
  it('CoreUtils.compareVersion(3,4) = false', () => {
    const result = CoreUtils.compareVersion(3, 4);
    expect(result).toEqual(false);
  });

  it('CoreUtils.compareVersion(3.19,3.20) = -1', () => {
    const result = CoreUtils.compareVersion('3.19', '3.20');
    expect(result).toEqual(-1);
  });

  it('CoreUtils.compareVersion(3.19,3.19) = 0', () => {
    const result = CoreUtils.compareVersion('3.19', '3.19');
    expect(result).toEqual(0);
  });

  it('CoreUtils.compareVersion(3.19,3.19) = -1', () => {
    const result = CoreUtils.compareVersion('3.19.5', '3.19');
    expect(result).toEqual(1);
  });

  it('CoreUtils.compareVersion("2.2.0", "1.2.0") = false', () => {
    const result = CoreUtils.compareVersion('2.2.0', '1.2.0');
    expect(result).toEqual(1);
  });
  it('CoreUtils.compareVersion("2.2.0", 1) = false', () => {
    const result = CoreUtils.compareVersion('2.2.0', 1);
    expect(result).toEqual(false);
  });
});
