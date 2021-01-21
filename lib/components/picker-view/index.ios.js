Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerView = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if ((typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsxFileName = 'src/components/picker-view/index.ios.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;


var MAX_ITEM_NUM = 1260;

var PickerView = exports.PickerView = function (_PureComponent) {
  _inherits(PickerView, _PureComponent);

  function PickerView(props) {
    _classCallCheck(this, PickerView);

    var _this = _possibleConstructorReturn(this, (PickerView.__proto__ || Object.getPrototypeOf(PickerView)).call(this, props));

    _initialiseProps.call(_this);

    var children = props.children,
        selectedValue = props.selectedValue;

    _this._loopTimes = children && children.length > 0 ? Math.round(MAX_ITEM_NUM / children.length) : 0;
    _this.state = {
      loopIdx: Math.floor(_this._loopTimes / 2),
      selectedValue: selectedValue
    };
    return _this;
  }

  _createClass(PickerView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.selectedValue !== nextProps.selectedValue) {
        this.setState({ selectedValue: nextProps.selectedValue });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          loop = _props.loop,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['loop', 'children']);

      var pickerItems = this.props.children;
      if (loop) {
        var childArray = _react2.default.Children.toArray(children);
        var curIdx = 0;
        pickerItems = new Array(this._loopTimes).fill(1).reduce(function (acc) {
          curIdx++;
          var current = childArray.map(function (c) {
            var key = curIdx + '-' + c.props.value;
            return _react2.default.cloneElement(c, _extends({}, c.props, {
              key: key,
              value: key
            }));
          });
          return [].concat(_toConsumableArray(acc), _toConsumableArray(current));
        }, []);
      }
      var selectedValue = loop ? this.state.loopIdx + '-' + this.state.selectedValue : this.state.selectedValue;
      return _react2.default.createElement(
        _reactNative.PickerIOS,
        _extends({}, rest, { selectedValue: selectedValue, onValueChange: this._handleValueChange, __source: {
            fileName: _jsxFileName,
            lineNumber: 85
          }
        }),
        pickerItems
      );
    }
  }]);

  return PickerView;
}(_react.PureComponent);

PickerView.propTypes = _extends({}, _reactNative.PickerIOS.propTypes, {
  loop: _propTypes2.default.bool,

  children: _propTypes2.default.array.isRequired
});
PickerView.defaultProps = {
  loop: false
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleValueChange = function (value, idx) {
    var _props2 = _this2.props,
        loop = _props2.loop,
        onValueChange = _props2.onValueChange;

    if (loop) {
      var _value$split = value.split('-'),
          _value$split2 = _slicedToArray(_value$split, 2),
          loopIdx = _value$split2[0],
          selectedValue = _value$split2[1];

      var originSelectedValue = typeof _this2.state.selectedValue === 'number' ? selectedValue * 1 : selectedValue;
      _this2.setState({
        loopIdx: loopIdx,
        selectedValue: originSelectedValue
      });
      onValueChange && onValueChange(originSelectedValue, idx);
    } else {
      var _selectedValue = value;
      _this2.setState({ selectedValue: _selectedValue });
      onValueChange && onValueChange(_selectedValue, idx);
    }
  };
};

PickerView.Item = _reactNative.PickerIOS.Item;

var ThemedPickerView = function ThemedPickerView(props) {
  var localTheme = props.theme,
      itemStyle = props.itemStyle,
      rest = _objectWithoutProperties(props, ['theme', 'itemStyle']);

  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97
      }
    },
    function (fullTheme) {
      var theme = _extends({}, fullTheme, {
        picker: _extends({}, fullTheme.picker, localTheme)
      });
      var propsWithTheme = _extends({ theme: theme }, rest);
      var fontSize = getTheme(propsWithTheme, 'picker.fontSize');
      var fontColor = getTheme(propsWithTheme, 'picker.fontColor');
      var themedItemStyle = _reactNative.StyleSheet.flatten([typeof fontSize === 'number' && { fontSize: fontSize }, fontColor && { color: fontColor }, itemStyle]);
      return _react2.default.createElement(PickerView, _extends({ itemStyle: themedItemStyle }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }));
    }
  );
};

ThemedPickerView.Item = _reactNative.PickerIOS.Item;

ThemedPickerView.propTypes = {
  theme: _propTypes2.default.shape({
    fontSize: _propTypes2.default.number,
    fontColor: _reactNative.ColorPropType
  })
};

ThemedPickerView.defaultProps = {
  theme: {}
};

exports.default = ThemedPickerView;