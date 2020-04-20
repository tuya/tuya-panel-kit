Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MASK_SIZE = exports.DECELERATION = exports.SWIPE_THRESHOLD = exports.VELOCITY_THRESHOLD = exports.PRESS_THRESHOLD = exports.FRICTION_LEVEL = undefined;

var _utils = require('../../utils');

var cx = _utils.RatioUtils.convertX;
var FRICTION_LEVEL = exports.FRICTION_LEVEL = 0.2;

var PRESS_THRESHOLD = exports.PRESS_THRESHOLD = 5;

var VELOCITY_THRESHOLD = exports.VELOCITY_THRESHOLD = 0.3;

var SWIPE_THRESHOLD = exports.SWIPE_THRESHOLD = 80;

var DECELERATION = exports.DECELERATION = 0.998;

var MASK_SIZE = exports.MASK_SIZE = { width: cx(64), height: 36 };