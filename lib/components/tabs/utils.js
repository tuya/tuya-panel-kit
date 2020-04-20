Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceTabLayoutLeft = exports.isValidSwipe = exports.isValidPress = exports.getCenteredScrollIndex = exports.getSiblingIndex = exports.getNearestIndexByDeltaX = exports.getIndexByDeltaX = exports.getTabWidth = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('../../utils');

var _constant = require('./constant');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var winWidth = _utils.RatioUtils.winWidth;
var inMaxMin = _utils.NumberUtils.inMaxMin;
var getTabWidth = exports.getTabWidth = function getTabWidth() {
  var maxNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
  var tabsWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : winWidth;
  return tabsWidth / maxNum;
};

var getIndexByDeltaX = exports.getIndexByDeltaX = function getIndexByDeltaX(deltaX, indexWidth) {
  return Math.floor(deltaX / indexWidth);
};

var getNearestIndexByDeltaX = exports.getNearestIndexByDeltaX = function getNearestIndexByDeltaX(deltaX, indexWidth) {
  var maxIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

  if (deltaX > 0) return 0;
  return inMaxMin(0, maxIndex, Math.round(Math.abs(deltaX) / indexWidth));
};

var getSiblingIndex = exports.getSiblingIndex = function getSiblingIndex(index, min, max) {
  if (index === min && index === max) {
    return [index, index];
  } else if (index === min) {
    return [index, index + 1];
  } else if (index === max) {
    return [index - 1, index];
  }
  return [index - 1, index + 1];
};

var getCenteredScrollIndex = exports.getCenteredScrollIndex = function getCenteredScrollIndex(idx, oneScreenTabNum, totalNum) {
  var min = 0;
  var max = Math.max(0, totalNum - oneScreenTabNum);
  var median = Math.ceil(oneScreenTabNum / 2) - 1;
  var scrollToIdx = idx - median;
  var index = inMaxMin(min, max, scrollToIdx);
  return index;
};

var isValidPress = exports.isValidPress = function isValidPress(dx, dy) {
  return Math.abs(dx) <= _constant.PRESS_THRESHOLD && Math.abs(dy) <= _constant.PRESS_THRESHOLD;
};

var isValidSwipe = exports.isValidSwipe = function isValidSwipe(velocity, direction) {
  return Math.abs(velocity) > _constant.VELOCITY_THRESHOLD && Math.abs(direction) < _constant.SWIPE_THRESHOLD;
};

var reduceTabLayoutLeft = exports.reduceTabLayoutLeft = function reduceTabLayoutLeft(tabLayout) {
  return tabLayout.reduce(function (acc, cur, index) {
    if (index === 0) {
      return [_extends({}, cur, { left: cur.x })];
    }
    var prev = acc[index - 1];
    var prevTotalX = prev.left + prev.width + prev.x;
    return [].concat(_toConsumableArray(acc), [_extends({}, cur, {
      left: prevTotalX + cur.x
    })]);
  }, {});
};