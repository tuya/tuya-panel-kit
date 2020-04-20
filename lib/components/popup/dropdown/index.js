Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/popup/dropdown/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.state = {
      haveImage: false
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data !== this.props.data) {
        if (nextProps.data.imageRes) {
          this.setState({
            haveImage: true
          });
        }
      }
    }
  }, {
    key: 'onSelect',
    value: function onSelect(item) {
      this.props.onSelect(item.value);
    }
  }, {
    key: 'renderList',
    value: function renderList() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          listStyle = _props.listStyle,
          touchViewStyle = _props.touchViewStyle,
          textStyle = _props.textStyle;

      return data.map(function (item, index) {
        return _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            accessibilityLabel: 'dropdown-listOnclick-' + index,
            key: item.key,
            onPress: function onPress() {
              return _this2.onSelect(item);
            },
            style: _extends({
              width: listStyle.width ? listStyle.width : 120,
              height: 40,
              alignItems: 'center',
              borderBottomColor: index === data.length - 1 ? 'transparent' : '#eee',
              borderBottomWidth: 1,
              justifyContent: 'center'
            }, touchViewStyle),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 59
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            { style: styles.itemStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 73
              }
            },
            _this2.state.haveImage && _react2.default.createElement(
              _reactNative.View,
              { style: styles.imageStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 75
                }
              },
              item.imageRes && _react2.default.createElement(_reactNative.Image, { source: item.imageRes, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 76
                }
              })
            ),
            _react2.default.createElement(
              _reactNative.Text,
              { style: [styles.textStyle, textStyle], __source: {
                  fileName: _jsxFileName,
                  lineNumber: 79
                }
              },
              item.title
            )
          )
        );
      });
    }
  }, {
    key: 'renderCorner',
    value: function renderCorner() {
      var _props2 = this.props,
          cornerDirection = _props2.cornerDirection,
          cornerDirectionValue = _props2.cornerDirectionValue,
          cornerColor = _props2.cornerColor,
          customCornerSize = _props2.customCornerSize;


      var borderList = (0, _config.getCornerDirection)(cornerDirection, cornerColor);
      var _props3 = this.props,
          cornerSize = _props3.cornerSize,
          cornerStyle = _props3.cornerStyle;

      var cornerSizeList = {
        small: 0,
        large: 2,
        normal: 1
      };
      var multiple = customCornerSize ? Number(customCornerSize) : cornerSizeList[cornerSize];
      return _react2.default.createElement(_reactNative.View, {
        style: [_defineProperty({
          width: 0,
          height: 0,
          borderTopWidth: borderList.top + multiple * 2,
          borderTopColor: borderList.topColor,
          borderRightWidth: borderList.right + multiple * 2,
          borderRightColor: borderList.rightColor,
          borderLeftWidth: borderList.left + multiple * 2,
          borderLeftColor: borderList.leftColor,
          borderBottomWidth: borderList.bottom + multiple * 2,
          borderBottomColor: borderList.bottomColor
        }, borderList.cornerDirectionValue.key, cornerDirectionValue === '' ? borderList.cornerDirectionValue.value : Number(cornerDirectionValue)), _extends({}, cornerStyle)],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var borderList = (0, _config.getCornerDirection)(this.props.cornerDirection);
      var _props4 = this.props,
          corner = _props4.corner,
          listStyle = _props4.listStyle,
          cornerDirection = _props4.cornerDirection;

      return _react2.default.createElement(
        _reactNative.View,
        { style: [borderList.flexValue], __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          }
        },
        corner && cornerDirection !== 'right' && this.renderCorner(),
        _react2.default.createElement(
          _reactNative.View,
          {
            style: _extends({
              width: 120,
              backgroundColor: '#fff',
              borderRadius: 6
            }, listStyle),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 127
            }
          },
          this.renderList()
        ),
        this.props.corner && this.props.cornerDirection === 'right' && this.renderCorner()
      );
    }
  }]);

  return Select;
}(_react.Component);

Select.propTypes = {
  data: _propTypes2.default.array,
  onSelect: _propTypes2.default.func,
  cornerSize: _propTypes2.default.string,
  customCornerSize: _propTypes2.default.string,
  cornerDirection: _propTypes2.default.string,
  cornerDirectionValue: _propTypes2.default.string,
  cornerColor: _propTypes2.default.string,
  corner: _propTypes2.default.bool,
  listStyle: _propTypes2.default.object,
  cornerStyle: _propTypes2.default.object,
  touchViewStyle: _propTypes2.default.object,
  textStyle: _propTypes2.default.object
};
Select.defaultProps = {
  data: [],
  onSelect: function onSelect() {},
  corner: true,
  cornerSize: 'normal',
  cornerDirection: 'top',
  cornerDirectionValue: '',
  listStyle: {},
  cornerStyle: {},
  touchViewStyle: {},
  textStyle: {},
  cornerColor: '',
  customCornerSize: ''
};
exports.default = Select;


var styles = _reactNative.StyleSheet.create({
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center'
  },
  imageStyle: {
    width: 40,
    height: 40
  }
});