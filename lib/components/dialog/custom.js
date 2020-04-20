Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/dialog/custom.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomDialog = function (_Component) {
  _inherits(CustomDialog, _Component);

  function CustomDialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CustomDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CustomDialog.__proto__ || Object.getPrototypeOf(CustomDialog)).call.apply(_ref, [this].concat(args))), _this), _this._handleConfirm = function () {
      var onConfirm = _this.props.onConfirm;

      onConfirm && onConfirm();
    }, _this.renderHeader = function () {
      var _this$props = _this.props,
          header = _this$props.header,
          headerStyle = _this$props.headerStyle,
          titleNumberOfLines = _this$props.titleNumberOfLines,
          title = _this$props.title,
          titleStyle = _this$props.titleStyle,
          subTitle = _this$props.subTitle,
          subTitleStyle = _this$props.subTitleStyle;

      if (_react2.default.isValidElement(header)) return header;else if (typeof header === 'function') return header();
      return _react2.default.createElement(
        _styled.StyledHeader,
        { style: headerStyle, __source: {
            fileName: _jsxFileName,
            lineNumber: 77
          }
        },
        _react2.default.createElement(
          _styled.StyledTitle,
          { style: titleStyle, numberOfLines: titleNumberOfLines, __source: {
              fileName: _jsxFileName,
              lineNumber: 78
            }
          },
          title
        ),
        !!subTitle && _react2.default.createElement(
          _styled.StyledSubTitle,
          { style: subTitleStyle, __source: {
              fileName: _jsxFileName,
              lineNumber: 81
            }
          },
          subTitle
        )
      );
    }, _this.renderFooter = function () {
      var _this$props2 = _this.props,
          footer = _this$props2.footer,
          confirmText = _this$props2.confirmText,
          confirmTextStyle = _this$props2.confirmTextStyle,
          confirmAccessibilityLabel = _this$props2.confirmAccessibilityLabel,
          footerWrapperStyle = _this$props2.footerWrapperStyle,
          cancelText = _this$props2.cancelText,
          cancelTextStyle = _this$props2.cancelTextStyle,
          cancelAccessibilityLabel = _this$props2.cancelAccessibilityLabel,
          onCancel = _this$props2.onCancel;

      if (_react2.default.isValidElement(footer)) return footer;else if (typeof footer === 'function') return footer();
      return _react2.default.createElement(_footer2.default, {
        style: footerWrapperStyle,
        cancelTextStyle: cancelTextStyle,
        confirmTextStyle: confirmTextStyle,
        cancelText: cancelText,
        confirmText: confirmText,
        cancelAccessibilityLabel: cancelAccessibilityLabel,
        confirmAccessibilityLabel: confirmAccessibilityLabel,
        onCancel: onCancel,
        onConfirm: _this._handleConfirm,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CustomDialog, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          content = _props.content;

      return _react2.default.createElement(
        _styled.StyledContainer,
        { style: style, __source: {
            fileName: _jsxFileName,
            lineNumber: 118
          }
        },
        this.renderHeader(),
        content,
        this.renderFooter()
      );
    }
  }]);

  return CustomDialog;
}(_react.Component);

CustomDialog.propTypes = {
  content: _propTypes2.default.any.isRequired,

  header: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),

  footer: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  style: _reactNative.ViewPropTypes.style,
  headerStyle: _reactNative.ViewPropTypes.style,
  titleNumberOfLines: _propTypes2.default.number,
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
CustomDialog.defaultProps = {
  style: null,
  header: null,
  footer: null,
  headerStyle: null,
  titleNumberOfLines: 2,
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
exports.default = (0, _withMotion2.default)(CustomDialog);