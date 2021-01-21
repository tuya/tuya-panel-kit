Object.defineProperty(exports, "__esModule", {
  value: true
});

var _progressSpace = require('./progress-space');

var _progressSpace2 = _interopRequireDefault(_progressSpace);

var _progress = require('./progress');

var _progress2 = _interopRequireDefault(_progress);

var _progressDouble = require('./progress-double');

var _progressDouble2 = _interopRequireDefault(_progressDouble);

var _progressCompose = require('./progress-compose');

var _progressCompose2 = _interopRequireDefault(_progressCompose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_progress2.default.Space = _progressSpace2.default;
_progress2.default.Double = _progressDouble2.default;
_progress2.default.Compose = _progressCompose2.default;

exports.default = _progress2.default;