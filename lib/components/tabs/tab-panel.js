Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/tabs/tab-panel.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var width = _utils.RatioUtils.width;


var TabPanel = function TabPanel(_ref) {
  var style = _ref.style,
      background = _ref.background,
      props = _objectWithoutProperties(_ref, ['style', 'background']);

  return _react2.default.createElement(_reactNative.View, _extends({ style: [{ width: width }, { backgroundColor: background }, style] }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }));
};

TabPanel.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  background: _reactNative.ColorPropType
};

TabPanel.defaultProps = {
  style: null,
  background: 'transparent'
};

exports.default = TabPanel;