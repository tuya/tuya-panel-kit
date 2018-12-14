import TimeUtils from '../time';

describe('TimeUtils parseSecond', () => {
  it('TimeUtils.parseSecond(111) = [00, 01, 51]', () => {
    const result = TimeUtils.parseSecond(111);
    expect(result).toEqual(['00', '01', '51']);
  });

  it('TimeUtils.parseSecond(3333333) = ["25", "55", "33"]', () => {
    const result = TimeUtils.parseSecond(3333333);
    expect(result).toEqual(["25", "55", "33"]);
  });
});

describe('TimeUtils parseTimer', () => {
  it('TimeUtils.parseTimer(111) = "00:01"', () => {
    const result = TimeUtils.parseTimer(111);
    expect(result).toEqual('00:01');
  });

  it('TimeUtils.parseTimer(3333333) = "13:55"', () => {
    const result = TimeUtils.parseTimer(3333333);
    expect(result).toEqual("13:55");
  });
});

describe('TimeUtils parseTimers', () => {
  it('TimeUtils.parseTimers(111) = "00:01:51"', () => {
    const result = TimeUtils.parseTimers(111);
    expect(result).toEqual('00:01:51');
  });

  it('TimeUtils.parseTimers(3333333) = "13:55:33"', () => {
    const result = TimeUtils.parseTimers(3333333);
    expect(result).toEqual("13:55:33");
  });
});

describe('TimeUtils parseHour12', () => {
  it('TimeUtils.parseHour12(111) = "12:01 AM"', () => {
    const result = TimeUtils.parseHour12(111);
    expect(result).toEqual("12:01 AM");
  });

  it('TimeUtils.parseHour12(3333333) = "01:55 PM"', () => {
    const result = TimeUtils.parseHour12(3333333);
    expect(result).toEqual("01:55 PM");
  });
});

describe('TimeUtils stringToSecond', () => {
  it('TimeUtils.stringToSecond("11:30") = 690', () => {
    const result = TimeUtils.stringToSecond('11:30');
    expect(result).toEqual(690);
  });

  it('TimeUtils.stringToSecond("22:11:30") = 79890', () => {
    const result = TimeUtils.stringToSecond("22:11:30");
    expect(result).toEqual(79890);
  });
});

describe('TimeUtils dateToTimer', () => {
  // 注意，只能一模一样的格式调用
  it('TimeUtils.dateToTimer("20110801") = 1312128000', () => {
    const result = TimeUtils.dateToTimer('20110801');
    expect(result).toEqual(1312128000);
  });

  it('TimeUtils.dateToTimer("20110801 12:11:11") = 1312171871', () => {
    const result = TimeUtils.dateToTimer('20110801 12:11:11');
    expect(result).toEqual(1312171871);
  });

  it('TimeUtils.dateToTimer("22:11:30") = NaN', () => {
    const result = TimeUtils.dateToTimer("22:11:30");
    expect(result).toEqual(NaN);
  });
});

describe('TimeUtils dateFormat', () => {
  it('TimeUtils.dateFormat("yyyy-MM-dd", new Date()) = "2018-12-04"', () => {
    const result = TimeUtils.dateFormat("yyyy-MM-dd", new Date(1543904283000));
    expect(result).toEqual('2018-12-04');
  });

  it('TimeUtils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()) = 2018-03-16 17:49:47', () => {
    const result = TimeUtils.dateFormat("yyyyyyyy-MM-dd hh:mm:ss", new Date(1521193787825));
    expect(result).toEqual('2018-03-16 17:49:47');
  });
});
