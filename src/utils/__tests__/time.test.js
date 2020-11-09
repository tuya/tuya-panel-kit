import { TimeUtils } from '../index';

// const { TimeUtils } = Utils;

describe('TimeUtils parseSecond', () => {
  it('TimeUtils.parseSecond(111) = [00, 01, 51]', () => {
    const result = TimeUtils.parseSecond(111);
    expect(result).toEqual(['00', '01', '51']);
  });

  it('TimeUtils.parseSecond(3333333) = ["25", "55", "33"]', () => {
    const result = TimeUtils.parseSecond(3333333);
    expect(result).toEqual(['25', '55', '33']);
  });
});

describe('TimeUtils parseTimer', () => {
  it('TimeUtils.parseTimer(111) = "00:01"', () => {
    const result = TimeUtils.parseTimer(111);
    expect(result).toEqual('00:01');
  });

  it('TimeUtils.parseTimer(3333333) = "13:55"', () => {
    const result = TimeUtils.parseTimer(3333333);
    expect(result).toEqual('13:55');
  });
});

describe('TimeUtils parseTimers', () => {
  it('TimeUtils.parseTimers(111) = "00:01:51"', () => {
    const result = TimeUtils.parseTimers(111);
    expect(result).toEqual('00:01:51');
  });

  it('TimeUtils.parseTimers(3333333) = "13:55:33"', () => {
    const result = TimeUtils.parseTimers(3333333);
    expect(result).toEqual('13:55:33');
  });
});

describe('TimeUtils parseHour12', () => {
  it('TimeUtils.parseHour12(111) = "12:01 AM"', () => {
    const result = TimeUtils.parseHour12(111);
    expect(result).toEqual('12:01 AM');
  });

  it('TimeUtils.parseHour12(3333333) = "01:55 PM"', () => {
    const result = TimeUtils.parseHour12(3333333);
    expect(result).toEqual('01:55 PM');
  });
});

describe('TimeUtils stringToSecond', () => {
  it('TimeUtils.stringToSecond("11:30") = 690', () => {
    const result = TimeUtils.stringToSecond('11:30');
    expect(result).toEqual(690);
  });

  it('TimeUtils.stringToSecond("22:11:30") = 79890', () => {
    const result = TimeUtils.stringToSecond('22:11:30');
    expect(result).toEqual(79890);
  });
});

describe('TimeUtils dateToTimer', () => {
  it('TimeUtils.dateToTimer("20110801") = 1312128000', () => {
    const result = TimeUtils.dateToTimer('20110801');
    expect(result).toEqual(1312156800);
  });

  it('TimeUtils.dateToTimer("20110801 12:11:11")', () => {
    const result = TimeUtils.dateToTimer('20110801 12:11:11');
    expect(result).toEqual(1312200671);
  });

  it('TimeUtils.dateToTimer("20110801 12:11")', () => {
    const result = TimeUtils.dateToTimer('20110801 12:11');
    expect(result).toEqual(1312200660);
  });
});

describe('TimeUtils dateFormat', () => {
  it('TimeUtils.dateToTimer(yyyy-MM-dd, new Date()) = 2020-09-17', () => {
    const result = TimeUtils.dateFormat('yyyy-MM-dd', new Date());
    expect(result).toEqual(
      `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
      }-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`
    );
  });
});

describe('TimeUtils timezone', () => {
  it('TimeUtils.timezone() = +00:00', () => {
    const result = TimeUtils.timezone();
    expect(result).toEqual('+00:00');
  });
});
