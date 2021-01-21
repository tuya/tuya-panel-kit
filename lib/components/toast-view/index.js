Object.defineProperty(exports, "__esModule", {
  value: true
});

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _toast = require('./toast');

var _toast2 = _interopRequireDefault(_toast);

var _success = require('./success');

var _success2 = _interopRequireDefault(_success);

var _warning = require('./warning');

var _warning2 = _interopRequireDefault(_warning);

var _loading = require('./loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_toast2.default.Error = _error2.default;
_toast2.default.Success = _success2.default;
_toast2.default.Warning = _warning2.default;
_toast2.default.Loading = _loading2.default;

exports.default = _toast2.default;