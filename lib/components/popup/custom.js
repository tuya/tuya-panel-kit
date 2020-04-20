Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomModal = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withSkeleton = require('./withSkeleton');

var _withSkeleton2 = _interopRequireDefault(_withSkeleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CustomPopup(_ref) {
  var content = _ref.content;

  return content;
}

CustomPopup.displayName = 'Custom';

CustomPopup.PropTypes = {
  content: _propTypes2.default.any.isRequired
};

var CustomModal = exports.CustomModal = (0, _withSkeleton2.default)(CustomPopup, true);

exports.default = (0, _withSkeleton2.default)(CustomPopup);