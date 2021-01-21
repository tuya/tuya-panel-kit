Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTheme;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ThemeContext = require('./ThemeContext');

var _ThemeContext2 = _interopRequireDefault(_ThemeContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useTheme() {
  var theme = _react2.default.useContext(_ThemeContext2.default);
  return theme;
}