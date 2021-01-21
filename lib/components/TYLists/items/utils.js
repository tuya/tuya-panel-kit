Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var pick = exports.pick = function pick(object, keys) {
  return keys.reduce(function (obj, key) {
    if (typeof object[key] !== 'undefined') {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

var omit = exports.omit = function omit(object, keys) {
  var shallowCopy = _extends({}, object);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
};