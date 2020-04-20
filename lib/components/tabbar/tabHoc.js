Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/tabbar/tabHoc.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _group = require('./radio-button/group');

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WrapperComponent = function WrapperComponent(WrappedComponent) {
  return function (_WrappedComponent) {
    _inherits(_class2, _WrappedComponent);

    function _class2() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.radioOnChange = function (value) {
        var tab = _this.props.tabs[value];
        var key = typeof tab.key === 'undefined' ? 'tab_' + value : tab.key;
        _this.props.onChange && _this.props.onChange(key);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class2, [{
      key: 'render',
      value: function render() {
        if (this.props.type === 'radio') {
          var _props = this.props,
              activeKey = _props.activeKey,
              defaultActiveKey = _props.defaultActiveKey,
              onChange = _props.onChange,
              otherProps = _objectWithoutProperties(_props, ['activeKey', 'defaultActiveKey', 'onChange']);

          var radioProps = {};
          if (typeof activeKey !== 'undefined') {
            radioProps.activeIndex = this.activeIndex;
          }
          if (typeof defaultActiveKey !== 'undefined') {
            radioProps.defaultActiveIndex = this.activeIndex;
          }
          return _react2.default.createElement(_group2.default, _extends({}, radioProps, otherProps, { onChange: this.radioOnChange, __source: {
              fileName: _jsxFileName,
              lineNumber: 21
            }
          }));
        }
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          }
        }));
      }
    }]);

    return _class2;
  }(WrappedComponent);
};

exports.default = WrapperComponent;