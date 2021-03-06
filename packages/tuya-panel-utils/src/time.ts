import CoreUtils from './core';

const numberToFixed = (n: number, c = 2) => {
  let s = `${Math.abs(n)}`;
  s = '0'.repeat(c) + s;
  s = s.slice(-c);
  return n < 0 ? `-${s}` : s;
};

/**
 * 等同于原来的 parseSec
 * @example
 * parseSecond(111)
 * // ['00', '01', '51']
 * @example
 * parseSecond(3333333)
 * // ['25', '55', '33']
 * @param {Number} t, is a number stands second
 * @param {Number} n, is a number stands the string length to fixed, default value is 2
 * @returns {Array} a Array of String which each item is a string which length is `n`
 */
const parseSecond: (t: number) => string[] = (t: number) => {
  const h = Math.floor(t / 3600);
  const m = Math.floor(t / 60 - h * 60);
  const s = Math.floor(t - h * 3600 - m * 60);
  return [CoreUtils.toFixed(h, 2), CoreUtils.toFixed(m, 2), CoreUtils.toFixed(s, 2)];
};

/**
 * 等同于原来的 parseTimer
 * @example
 * parseTimer(111)
 * // '00:01'
 * @example
 * parseTimer(3333333)
 * // '13:55'
 * @param {Number} second, is a number stands second
 * @returns {Array} a Array of String which each item is a string which length is 2
 */
const parseTimer: (second: number) => string = (second: number) => {
  const t = second % 86400;
  const h = Math.floor(t / 3600);
  const m = Math.floor(t / 60 - h * 60);

  return `${CoreUtils.toFixed(h, 2)}:${CoreUtils.toFixed(m, 2)}`;
};

/**
 * 等同于原来的 parseTimers
 * @example
 * parseTimers(111)
 * // '00:01:51'
 * @example
 * parseTimers(3333333)
 * // '13:55:33'
 * @param {Number} second, is a number stands second
 * @returns {Array} a Array of String which each item is a string which length is 2
 */
const parseTimers: (second: number) => string = (second: number) => {
  const t = second % 86400;
  const h = Math.floor(t / 3600);
  const m = Math.floor(t / 60 - h * 60);
  const s = t % 60;

  return `${CoreUtils.toFixed(h, 2)}:${CoreUtils.toFixed(m, 2)}:${CoreUtils.toFixed(s, 2)}`;
};

/**
 * 等同于原来的 parseHour12
 * @example
 * parseHour12(111)
 * // '12:01 AM'
 * @example
 * parseHour12(3333333)
 * // '01:55 PM'
 * @param {Number} t, is a number stands second
 * @returns {Array} a Array of String which each item is a string which length is 2
 */
const parseHour12: (second: number) => string = (second: number) => {
  const t = second % 86400;
  const originHour = Math.floor(t / 3600);
  const m = Math.floor(t / 60 - originHour * 60);
  let h = originHour % 12;
  if (h === 0) {
    h = 12;
  }
  return [
    `${CoreUtils.toFixed(h, 2)}`,
    `${CoreUtils.toFixed(m, 2)} ${originHour >= 12 ? 'PM' : 'AM'}`,
  ].join(':');
};

/**
 * 等同于原来的 stringToTimer, 但是有区别的
 * @example
 * stringToSecond('11:30')
 * // 690
 * @example
 * stringToSecond('22:11:30')
 * // 79890
 * @param {String} timeStr, is a string stands time
 * @returns {Number} a number convert from the `timeStr`
 */
const stringToSecond: (timeStr: string) => number = (timeStr: string) =>
  timeStr.split(':').reduce((sum, item) => sum * 60 + parseInt(item, 10), 0);

/**
 * 等同于原来的 dateToTimer
 * 注意，只能一模一样的格式调用
 * @example
 * dateToTimer('20110801') = 1312128000
 * @example
 * dateToTimer('20110801 12:11:11') = 1312171871
 * @param {String} dateString, is a string stands time
 * @returns {Number} a number convert from the `timeStr`, the unit is `second`, is 10 digits
 */
const dateToTimer: (dateString: string) => number = (dateString: string) => {
  const date = new Date();
  date.setFullYear(Number(dateString.substring(0, 4)));
  date.setMonth(Number(dateString.substring(4, 6)) - 1);
  date.setDate(Number(dateString.substring(6, 8)));
  date.setHours(Number(dateString.substring(9, 11)));
  date.setMinutes(Number(dateString.substring(12, 14)));
  date.setSeconds(Number(dateString.substring(15, 17)));
  return Date.parse(`${date}`) / 1000;
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
const dateFormat: (fmt: string, date: Date) => string = (fmt: string, date: Date) => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  let format = fmt;
  // eslint-disable-next-line
  if (/(y+)/.test(fmt)) {
    format = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  // eslint-disable-next-line
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      // eslint-disable-next-line
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return format;
};

const timezone: () => string = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const gt0 = Math.abs(offset);
  const hour = Math.floor(gt0 / 60);
  const minute = gt0 % 60;
  const strHour = `${numberToFixed(hour, 2)}:${numberToFixed(minute, 2)}`;
  const zone = offset > 0 ? `-${strHour}` : `+${strHour}`;
  return zone;
};

const TimeUtils = {
  parseSecond,
  parseTimer,
  parseTimers,
  parseHour12,
  stringToSecond,
  dateToTimer,
  dateFormat,
  timezone,
};

export default TimeUtils;
