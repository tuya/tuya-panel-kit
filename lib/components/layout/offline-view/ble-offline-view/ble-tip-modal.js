Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/layout/offline-view/ble-offline-view/ble-tip-modal.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _topbar = require('../../../layout/topbar');

var _topbar2 = _interopRequireDefault(_topbar);

var _TYText = require('../../../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _utils = require('../../../../utils');

var _TYNativeApi = require('../../../../TYNativeApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _utils.RatioUtils.convertX,
    isIphoneX = _utils.RatioUtils.isIphoneX;


var Res = {
  bleShare: require('../../../res/bleShare.png'),
  bleSystem: require('../../../res/bleSystem.png')
};

var BleTipModal = function (_PureComponent) {
  _inherits(BleTipModal, _PureComponent);

  function BleTipModal(props) {
    _classCallCheck(this, BleTipModal);

    var _this = _possibleConstructorReturn(this, (BleTipModal.__proto__ || Object.getPrototypeOf(BleTipModal)).call(this, props));

    _this.show = function () {
      _reactNative.Animated.spring(_this.state.value, {
        toValue: 1,
        useNativeDriver: true
      }).start();
    };

    _this.hide = function () {
      _reactNative.Animated.spring(_this.state.value, {
        toValue: 0,
        useNativeDriver: true
      }).start(function () {
        typeof _this.props.onClose === 'function' && _this.props.onClose();
      });
    };

    _this.state = {
      value: new _reactNative.Animated.Value(0),
      isMultiLine: false
    };
    return _this;
  }

  _createClass(BleTipModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.show();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          disabled = _props.disabled,
          maskColor = _props.maskColor;
      var _state = this.state,
          value = _state.value,
          isMultiLine = _state.isMultiLine;

      return _react2.default.createElement(
        _reactNative.TouchableOpacity,
        {
          style: styles.modal,
          activeOpacity: 1,
          disabled: disabled,
          onPress: this.hide,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 61
          }
        },
        _react2.default.createElement(_reactNative.Animated.View, {
          style: [_reactNative.StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 67
          }
        }),
        _react2.default.createElement(
          _reactNative.Animated.View,
          {
            onStartShouldSetResponder: function onStartShouldSetResponder() {
              return true;
            },
            style: [styles.tipModal, {
              transform: [{
                translateY: value.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0]
                })
              }]
            }],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 70
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            {
              style: [styles.tipRow, {
                borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                borderBottomWidth: 1
              }],
              __source: {
                fileName: _jsxFileName,
                lineNumber: 86
              }
            },
            _react2.default.createElement(
              _reactNative.View,
              { style: [styles.flex, { marginLeft: cx(16) }], __source: {
                  fileName: _jsxFileName,
                  lineNumber: 95
                }
              },
              _react2.default.createElement(_TYText2.default, { style: styles.tipText, text: _TYNativeApi.Strings.getLang('openBleShare'), __source: {
                  fileName: _jsxFileName,
                  lineNumber: 96
                }
              }),
              _react2.default.createElement(_TYText2.default, {
                style: [styles.tipText, styles.tipParagraph],
                text: _TYNativeApi.Strings.getLang('openBleShareStep'),
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 97
                }
              })
            ),
            _react2.default.createElement(
              _reactNative.View,
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 102
                }
              },
              _react2.default.createElement(_reactNative.Image, { source: Res.bleShare, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 103
                }
              }),
              _react2.default.createElement(_TYText2.default, {
                style: [styles.absoluteText, isMultiLine && { top: cx(56) }],
                text: _TYNativeApi.Strings.getLang('bluetoothShare'),
                numberOfLines: 2,
                onLayout: function onLayout(_ref) {
                  var nativeEvent = _ref.nativeEvent;
                  var height = nativeEvent.layout.height;

                  _this2.setState({ isMultiLine: height >= cx(23) });
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 104
                }
              })
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: styles.tipRow, __source: {
                fileName: _jsxFileName,
                lineNumber: 115
              }
            },
            _react2.default.createElement(
              _reactNative.View,
              { style: [styles.flex, { marginLeft: cx(16) }], __source: {
                  fileName: _jsxFileName,
                  lineNumber: 116
                }
              },
              _react2.default.createElement(_TYText2.default, { style: styles.tipText, text: _TYNativeApi.Strings.getLang('openBle'), __source: {
                  fileName: _jsxFileName,
                  lineNumber: 117
                }
              })
            ),
            _react2.default.createElement(_reactNative.Image, { source: Res.bleSystem, __source: {
                fileName: _jsxFileName,
                lineNumber: 119
              }
            })
          )
        )
      );
    }
  }]);

  return BleTipModal;
}(_react.PureComponent);

BleTipModal.propTypes = {
  disabled: _propTypes2.default.bool,
  maskColor: _reactNative.ColorPropType,
  onClose: _propTypes2.default.func
};
BleTipModal.defaultProps = {
  disabled: false,
  maskColor: 'rgba(0, 0, 0, 0.4)',
  onClose: null
};
exports.default = BleTipModal;


var styles = _reactNative.StyleSheet.create({
  modal: {
    position: 'absolute',
    top: _topbar2.default.height,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end'
  },

  flex: {
    flex: 1
  },

  tipModal: {
    alignSelf: 'center',
    marginBottom: isIphoneX ? cx(32) : cx(12),
    width: cx(351),
    height: cx(336),
    borderRadius: cx(16),
    backgroundColor: '#f0f0f0'
  },

  tipRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  tipText: {
    fontWeight: '500',
    fontSize: cx(16),
    color: '#333',
    backgroundColor: 'transparent'
  },

  tipParagraph: {
    marginTop: cx(4),
    fontSize: cx(12),
    color: '#999'
  },

  absoluteText: {
    position: 'absolute',
    left: cx(40),
    top: cx(61),
    fontSize: cx(11),
    width: cx(112),
    color: '#22242C',
    backgroundColor: 'transparent'
  }
});