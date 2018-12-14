// 简单的处理JsDoc
/* eslint-disable */
function docParser(input) {
  const arr = input.replace(/\n/g, '').split('@');
  const kvs = arr.slice(1).reduce((v, s) => {
    const whiteSpaceIndex = s.indexOf(' ');
    v[s.substr(0, whiteSpaceIndex)] = s.substr(whiteSpaceIndex + 1);
    return v;
  }, {});

  return {
    desc: arr[0],
    kvs: kvs,
  }
}

module.exports = docParser;
