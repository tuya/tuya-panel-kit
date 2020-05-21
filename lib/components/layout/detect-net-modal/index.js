Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/layout/detect-net-modal/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _utils = require('../../../utils');

var _TYNativeApi = require('../../../TYNativeApi');

var _TYNativeApi2 = _interopRequireDefault(_TYNativeApi);

var _TYText = require('../../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _tips = require('../../tips');

var _tips2 = _interopRequireDefault(_tips);

var _strings = require('../../../i18n/strings');

var _strings2 = _interopRequireDefault(_strings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _utils.RatioUtils.convertX;

var _Dimensions$get = _reactNative.Dimensions.get('screen'),
    height = _Dimensions$get.height;

var compareVersion = _utils.CoreUtils.compareVersion,
    get = _utils.CoreUtils.get;

var TYNative = _TYNativeApi2.default.native;
var Res = {
  close: require('../../res/x.png'),
  wifi: require('../../res/wifi.png')
};

var requireRnVersion = '5.24';

var DetectNetModal = function (_PureComponent) {
  _inherits(DetectNetModal, _PureComponent);

  function DetectNetModal(props) {
    _classCallCheck(this, DetectNetModal);

    var _this = _possibleConstructorReturn(this, (DetectNetModal.__proto__ || Object.getPrototypeOf(DetectNetModal)).call(this, props));

    _this.handleToDetect = function () {
      _TYNativeApi2.default.device.getDeviceInfo().then(function (result) {
        if (!result) return;
        var devId = result.devId;

        TYNative.jumpTo('tuyaSmart://dev_network_check?devId=' + devId);
      });
    };

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
      value: new _reactNative.Animated.Value(0)
    };
    return _this;
  }

  _createClass(DetectNetModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.show();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          maskColor = _props.maskColor,
          style = _props.style,
          animatedStyle = _props.animatedStyle;
      var value = this.state.value;

      var appRnVersion = get(TYNative, 'mobileInfo.appRnVersion');
      var isGreater = appRnVersion && compareVersion(appRnVersion, requireRnVersion);
      var isShow = isGreater === 0 || isGreater === 1;
      return _react2.default.createElement(
        _reactNative.View,
        { style: [styles.modal, style], __source: {
            fileName: _jsxFileName,
            lineNumber: 89
          }
        },
        _react2.default.createElement(_reactNative.Animated.View, {
          style: [_reactNative.StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 90
          }
        }),
        _react2.default.createElement(
          _reactNative.Animated.View,
          {
            style: [{ marginTop: (height - 328) / 2, opacity: this.state.value }, animatedStyle],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 93
            }
          },
          _react2.default.createElement(
            _tips2.default,
            { show: true, bgColor: '#fff', showCorner: false, contentStyle: { borderRadius: 8 }, __source: {
                fileName: _jsxFileName,
                lineNumber: 96
              }
            },
            _react2.default.createElement(
              _reactNative.View,
              { style: styles.signal, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 97
                }
              },
              _react2.default.createElement(
                _reactNative.TouchableOpacity,
                { style: styles.closeImage, activeOpacity: 0.8, onPress: this.hide, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 98
                  }
                },
                _react2.default.createElement(_reactNative.Image, { source: Res.close, style: styles.image, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 99
                  }
                })
              ),
              _react2.default.createElement(
                _reactNative.View,
                { style: styles.signalContent, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 101
                  }
                },
                _react2.default.createElement(_reactNative.Image, { source: Res.wifi, style: styles.signalWifi, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 102
                  }
                }),
                _react2.default.createElement(_TYText2.default, {
                  text: _strings2.default.getLang('wifiBadTitle'),
                  style: { fontSize: 17, fontWeight: 'bold', color: '#22242C' },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 103
                  }
                }),
                _react2.default.createElement(
                  _reactNative.View,
                  { style: { marginTop: cx(38), alignItems: 'flex-start' }, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 107
                    }
                  },
                  _react2.default.createElement(_TYText2.default, { text: _strings2.default.getLang('detectPlease'), style: styles.text, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 108
                    }
                  }),
                  _react2.default.createElement(_TYText2.default, { text: _strings2.default.getLang('internetAccess'), style: styles.text, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 109
                    }
                  }),
                  _react2.default.createElement(_TYText2.default, { text: _strings2.default.getLang('obstructions'), style: styles.text, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 110
                    }
                  }),
                  isShow && _react2.default.createElement(
                    _reactNative.TouchableOpacity,
                    { activeOpacity: 0.8, onPress: this.handleToDetect, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 113
                      }
                    },
                    _react2.default.createElement(_TYText2.default, {
                      text: _strings2.default.getLang('retest'),
                      style: [styles.text, { color: '#4A90E2', textDecorationLine: 'underline' }],
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 114
                      }
                    })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return DetectNetModal;
}(_react.PureComponent);

DetectNetModal.propTypes = {
  maskColor: _reactNative.ColorPropType,
  onClose: _propTypes2.default.func,
  style: _reactNative.ViewPropTypes.style,
  animatedStyle: _reactNative.ViewPropTypes.style
};
DetectNetModal.defaultProps = {
  maskColor: 'rgba(51, 51, 51, 0.8)',
  onClose: null,
  style: null,
  animatedStyle: null
};
exports.default = DetectNetModal;


var styles = _reactNative.StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  signal: {
    width: cx(268),
    borderRadius: cx(16),
    backgroundColor: '#fff',
    paddingHorizontal: cx(7),
    paddingVertical: cx(17)
  },
  closeImage: {
    width: cx(28),
    height: cx(28),
    borderRadius: cx(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: cx(4),
    right: cx(0)
  },
  image: {
    width: cx(28),
    height: cx(28)
  },
  signalWifi: {
    width: cx(61),
    height: cx(53),
    marginTop: cx(15),
    marginBottom: cx(12)
  },
  signalContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: cx(13),
    color: '#81828B',
    lineHeight: cx(20)
  }
});