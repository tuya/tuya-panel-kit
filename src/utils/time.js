import CoreUtils from './core';

const numberToFixed = (n, c = 2) => {
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
const parseSecond = (t, n = 2) => {
  const h = parseInt(t / 3600, 10);
  const m = parseInt(t / 60 - h * 60, 10);
  const s = parseInt(t - h * 3600 - m * 60, 10);
  return [
    CoreUtils.toFixed(h, 2),
    CoreUtils.toFixed(m, 2),
    CoreUtils.toFixed(s, 2),
  ];
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
const parseTimer = second => {
  const t = second % 86400;
  const h = parseInt(t / 3600, 10);
  const m = parseInt(t / 60 - h * 60, 10);

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
const parseTimers = second => {
  const t = second % 86400;
  const h = parseInt(t / 3600, 10);
  const m = parseInt(t / 60 - h * 60, 10);
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
const parseHour12 = second => {
  const t = second % 86400;
  const originHour = parseInt(t / 3600, 10);
  const m = parseInt(t / 60 - originHour * 60, 10);
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
const stringToSecond = timeStr => timeStr.split(':')
  .reduce((sum, item) => (sum * 60 + (parseInt(item, 10))), 0);


const timezone = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const gt0 = Math.abs(offset);
  let hour = Math.floor(gt0 / 60);
  let minute = gt0 % 60;
  hour = numberToFixed(hour, 2);
  minute = numberToFixed(minute, 2);
  const strHour = `${hour}:${minute}`;
  const zone = offset > 0 ? `-${strHour}` : `+${strHour}`;
  return zone;
};


const TimeUtils = {
  parseSecond,
  parseTimer,
  parseTimers,
  parseHour12,
  stringToSecond,
  timezone
};

export default TimeUtils;
