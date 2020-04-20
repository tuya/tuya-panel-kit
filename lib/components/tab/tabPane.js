Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/tab/tabPane.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TabPane = function TabPane(props) {
  var children = props.children,
      otherProps = _objectWithoutProperties(props, ['children']);

  return _react2.default.createElement(
    _reactNative.View,
    _extends({}, otherProps, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      }
    }),
    children
  );
};

TabPane.propTypes = {
  tabWidth: _propTypes2.default.number,
  tab: _propTypes2.default.node
};

exports.default = TabPane;