Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/layout/topbar/index.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _topbar = require('./topbar');

var _topbar2 = _interopRequireDefault(_topbar);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;


var ThemedTopBar = function ThemedTopBar(props) {
  var localTheme = props.theme,
      rest = _objectWithoutProperties(props, ['theme']);

  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    },
    function (globalTheme) {
      var theme = _extends({}, globalTheme, {
        topbar: _extends({}, globalTheme.topbar, localTheme)
      });
      var propsWithTheme = _extends({ theme: theme }, rest);
      var background = getTheme(propsWithTheme, 'topbar.background');
      var color = getTheme(propsWithTheme, 'topbar.color');
      return _react2.default.createElement(_topbar2.default, _extends({ background: background, color: color }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }));
    }
  );
};

ThemedTopBar.propTypes = {
  theme: _propTypes2.default.shape({
    background: _reactNative.ColorPropType,

    color: _reactNative.ColorPropType
  })
};

ThemedTopBar.defaultProps = {
  theme: null
};

ThemedTopBar.height = _topbar2.default.height;
ThemedTopBar.Container = _topbar2.default.Container;
ThemedTopBar.Content = _topbar2.default.Content;
ThemedTopBar.Action = _topbar2.default.Action;

exports.default = ThemedTopBar;