Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/dialog/confirm.js';

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _styled = require('./styled');

var _withMotion = require('./withMotion');

var _withMotion2 = _interopRequireDefault(_withMotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Confirm = function Confirm(_ref) {
  var style = _ref.style,
      contentStyle = _ref.contentStyle,
      title = _ref.title,
      titleStyle = _ref.titleStyle,
      subTitle = _ref.subTitle,
      subTitleStyle = _ref.subTitleStyle,
      confirmText = _ref.confirmText,
      confirmTextStyle = _ref.confirmTextStyle,
      confirmAccessibilityLabel = _ref.confirmAccessibilityLabel,
      footerWrapperStyle = _ref.footerWrapperStyle,
      cancelText = _ref.cancelText,
      cancelTextStyle = _ref.cancelTextStyle,
      cancelAccessibilityLabel = _ref.cancelAccessibilityLabel,
      onConfirm = _ref.onConfirm,
      onCancel = _ref.onCancel;

  return _react2.default.createElement(
    _styled.StyledContainer,
    { style: style, __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      }
    },
    _react2.default.createElement(
      _styled.StyledContent,
      { style: contentStyle, __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      },
      _react2.default.createElement(
        _styled.StyledTitle,
        { style: [!!subTitle && { fontSize: 16, marginBottom: 14 }, titleStyle], __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          }
        },
        title
      ),
      !!subTitle && _react2.default.createElement(
        _styled.StyledSubTitle,
        { style: subTitleStyle, __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          }
        },
        subTitle
      )
    ),
    _react2.default.createElement(_footer2.default, {
      style: footerWrapperStyle,
      cancelTextStyle: cancelTextStyle,
      confirmTextStyle: confirmTextStyle,
      cancelText: cancelText,
      confirmText: confirmText,
      cancelAccessibilityLabel: cancelAccessibilityLabel,
      confirmAccessibilityLabel: confirmAccessibilityLabel,
      onCancel: onCancel,
      onConfirm: onConfirm,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      }
    })
  );
};

Confirm.propTypes = {
  style: _reactNative.ViewPropTypes.style,

  contentStyle: _reactNative.ViewPropTypes.style,

  title: _propTypes2.default.string.isRequired,

  titleStyle: _TYText2.default.propTypes.style,

  subTitle: _propTypes2.default.string,

  subTitleStyle: _TYText2.default.propTypes.style,

  footerWrapperStyle: _reactNative.ViewPropTypes.style,

  cancelText: _propTypes2.default.string.isRequired,

  cancelTextStyle: _TYText2.default.propTypes.style,

  cancelAccessibilityLabel: _propTypes2.default.string,

  confirmText: _propTypes2.default.string.isRequired,

  confirmTextStyle: _TYText2.default.propTypes.style,

  confirmAccessibilityLabel: _propTypes2.default.string,

  onCancel: _propTypes2.default.func,

  onConfirm: _propTypes2.default.func
};

Confirm.defaultProps = {
  style: null,
  contentStyle: null,
  titleStyle: null,
  subTitle: '',
  subTitleStyle: null,
  footerWrapperStyle: null,
  cancelTextStyle: null,
  cancelAccessibilityLabel: 'Dialog.Cancel',
  confirmTextStyle: null,
  confirmAccessibilityLabel: 'Dialog.Confirm',
  onCancel: null,
  onConfirm: null
};

exports.default = (0, _withMotion2.default)(Confirm);