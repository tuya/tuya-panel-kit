const JsonUtil = {
  parseJSON(str) {
    let rst;
    if (str && ({}).toString.call(str) === '[object String]') {
      // 当JSON字符串解析
      try {
        rst = JSON.parse(str);
      } catch (e) {
        // 出错，用eval继续解析JSON字符串
        try {
          // eslint-disable-next-line
          rst = eval(`(${str})`);
        } catch (e2) {
          // 当成普通字符串
          rst = str;
        }
      }
    } else {
      rst = typeof str === 'undefined' ? {} : str;
    }

    return rst;
  },
};

export default JsonUtil;
