Object.defineProperty(exports, "__esModule", {
  value: true
});
var JsonUtil = {
  parseJSON: function parseJSON(str) {
    var rst = void 0;
    if (str && {}.toString.call(str) === '[object String]') {
      try {
        rst = JSON.parse(str);
      } catch (e) {
        try {
          rst = eval('(' + str + ')');
        } catch (e2) {
          rst = str;
        }
      }
    } else {
      rst = typeof str === 'undefined' ? {} : str;
    }

    return rst;
  }
};

exports.default = JsonUtil;