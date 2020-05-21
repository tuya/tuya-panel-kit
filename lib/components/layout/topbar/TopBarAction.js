Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/layout/topbar/TopBarAction.js';

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _styled = require('./styled');

var _iconfont = require('../../iconfont');

var _iconfont2 = _interopRequireDefault(_iconfont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TopBarAction = function TopBarAction(_ref) {
  var accessibilityLabel = _ref.accessibilityLabel,
      style = _ref.style,
      contentStyle = _ref.contentStyle,
      size = _ref.size,
      color = _ref.color,
      spacing = _ref.spacing,
      source = _ref.source,
      disabled = _ref.disabled,
      children = _ref.children,
      onPress = _ref.onPress,
      restProps = _objectWithoutProperties(_ref, ['accessibilityLabel', 'style', 'contentStyle', 'size', 'color', 'spacing', 'source', 'disabled', 'children', 'onPress']);

  var isText = typeof source === 'string';
  var child = children;
  if (isText) {
    child = _react2.default.createElement(
      _styled.StyledTopBarText,
      _extends({ style: contentStyle, color: color, numberOfLines: 1 }, restProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }),
      source
    );
  } else if (typeof source === 'number' || source && typeof source === 'object' && typeof source.uri === 'string') {
    child = _react2.default.createElement(_styled.StyledImage, _extends({ style: contentStyle, source: source, color: color }, restProps, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      }
    }));
  }
  if (restProps.name || restProps.d) {
    child = _react2.default.createElement(_styled.StyledIconFont, _extends({ style: contentStyle, size: size, color: color }, restProps, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      }
    }));
  }
  return _react2.default.createElement(
    _styled.StyledTopBarAction,
    {
      accessibilityLabel: accessibilityLabel,
      style: [{ marginHorizontal: spacing }, style],
      activeOpacity: 0.8,
      disabled: disabled,
      hitSlop: isText ? null : { top: spacing, left: spacing, bottom: spacing, right: spacing },
      onPress: onPress,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      }
    },
    child
  );
};

TopBarAction.displayName = 'TopBar.Action';

TopBarAction.width = _styled.TOPBAR_ACTION_WIDTH;

TopBarAction.propTypes = _extends({}, _iconfont2.default.propTypes, {
  style: _reactNative.ViewPropTypes.style,

  contentStyle: _propTypes2.default.any,

  size: _propTypes2.default.number,

  spacing: _propTypes2.default.number,

  color: _propTypes2.default.string,

  source: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.shape({
    uri: _propTypes2.default.string.isRequired
  })]),

  disabled: _propTypes2.default.bool,

  children: _propTypes2.default.any,

  onPress: _propTypes2.default.func
});

TopBarAction.defaultProps = {
  style: null,
  contentStyle: null,
  size: _styled.TOPBAR_ACTION_WIDTH,
  spacing: _styled.TOPBAR_MARGIN,
  color: null,
  source: null,
  disabled: false,
  children: _react2.default.createElement(_reactNative.View, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118
    }
  }),
  onPress: null
};

exports.default = TopBarAction;