Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/utils/theme/ThemeProvider.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _native = require('styled-components/native');

var _utils = require('./utils');

var _ThemeConsumer = require('./ThemeConsumer');

var _ThemeConsumer2 = _interopRequireDefault(_ThemeConsumer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemeProvider = function ThemeProvider(_ref) {
  var theme = _ref.theme,
      children = _ref.children;

  return _react2.default.createElement(
    _ThemeConsumer2.default,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    },
    function (t) {
      return _react2.default.createElement(
        _native.ThemeProvider,
        { theme: (0, _utils.deepMerge)(t, theme), __source: {
            fileName: _jsxFileName,
            lineNumber: 10
          }
        },
        children
      );
    }
  );
};

ThemeProvider.propTypes = {
  theme: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.element.isRequired
};

exports.default = ThemeProvider;