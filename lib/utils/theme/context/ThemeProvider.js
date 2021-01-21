Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/utils/theme/context/ThemeProvider.js';
exports.default = ThemeProvider;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _base = require('../../../components/theme/base');

var _base2 = _interopRequireDefault(_base);

var _ThemeContext = require('./ThemeContext');

var _ThemeContext2 = _interopRequireDefault(_ThemeContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ThemeProvider(_ref) {
  var theme = _ref.theme,
      children = _ref.children;

  return _react2.default.createElement(
    _ThemeContext2.default.Provider,
    { value: theme, __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      }
    },
    children
  );
}

ThemeProvider.propTypes = {
  theme: _propTypes2.default.object,
  children: _propTypes2.default.element.isRequired
};

ThemeProvider.defaultProps = {
  theme: _base2.default
};