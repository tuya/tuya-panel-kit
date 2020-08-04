Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/layout/offline-view/new-offline-view.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _TYNativeApi = require('../../../TYNativeApi');

var _TYNativeApi2 = _interopRequireDefault(_TYNativeApi);

var _motion = require('../../motion');

var _motion2 = _interopRequireDefault(_motion);

var _TYText = require('../../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _strings = require('../../../i18n/strings');

var _strings2 = _interopRequireDefault(_strings);

var _utils = require('../../../utils');

var _svg = require('../../iconfont/svg');

var _svg2 = _interopRequireDefault(_svg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var convert = _utils.RatioUtils.convert,
    winWidth = _utils.RatioUtils.winWidth,
    isIos = _utils.RatioUtils.isIos,
    isIphoneX = _utils.RatioUtils.isIphoneX;
var get = _utils.CoreUtils.get;


var TYNative = _TYNativeApi2.default.native;

var NewOfflineView = function (_PureComponent) {
  _inherits(NewOfflineView, _PureComponent);

  function NewOfflineView(props) {
    _classCallCheck(this, NewOfflineView);

    var _this = _possibleConstructorReturn(this, (NewOfflineView.__proto__ || Object.getPrototypeOf(NewOfflineView)).call(this, props));

    _this.show = function () {
      _reactNative.Animated.spring(_this.state.value, {
        toValue: 1,
        useNativeDriver: true,
        showDuration: 250,
        easing: _reactNative.Easing.bezier(0, 0, 0.25, 1)
      }).start();
    };

    _this.hide = function () {
      _reactNative.Animated.spring(_this.state.value, {
        toValue: 0,
        useNativeDriver: true,
        hideDuration: 250,
        easing: _reactNative.Easing.bezier(0.42, 0, 1, 1)
      }).start(function () {
        typeof _this.props.onClose === 'function' && _this.props.onClose();
      });
    };

    _this.cropString = function (str, newStrArr) {
      if (!str) return;
      if (str.indexOf('\n') !== -1) {
        var idx = str.indexOf('\n');
        var indexBefore = str.substring(0, idx);
        newStrArr.push(indexBefore);
        var strAfter = str.substring(idx + 1);
        _this.cropString(strAfter, newStrArr);
      } else {
        newStrArr.push(str);
      }
      return newStrArr;
    };

    _this.state = {
      value: new _reactNative.Animated.Value(0),
      show: props.show
    };
    return _this;
  }

  _createClass(NewOfflineView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.show();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.show !== nextProps.show) {
        this.setState({
          show: nextProps.show
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          maskColor = _props.maskColor,
          style = _props.style,
          animatedStyle = _props.animatedStyle,
          showDeviceImg = _props.showDeviceImg,
          onLinkPress = _props.onLinkPress,
          onHelpPress = _props.onHelpPress;
      var _state = this.state,
          value = _state.value,
          show = _state.show;

      var textLineBefore = _strings2.default.getLang('offline_textLinkBefore');
      var textLink = _strings2.default.getLang('offline_link');
      var textLineAfter = _strings2.default.getLang('offline_textLinkAfter');
      var textLineMore = _strings2.default.getLang('offline_textLinkMore');
      var linkBeforeArr = this.cropString(textLineBefore, []);
      var imgUrl = _reactNative.Platform.OS === 'ios' ? get(TYNative, 'devInfo.iconUrl') : get(TYNative, 'devInfo.icon');
      return _react2.default.createElement(
        _reactNative.View,
        { style: [show && styles.modal, style], __source: {
            fileName: _jsxFileName,
            lineNumber: 115
          }
        },
        _react2.default.createElement(_reactNative.Animated.View, {
          style: [show && _reactNative.StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 116
          }
        }),
        _react2.default.createElement(
          _motion2.default.ScaleFadeIn,
          { show: show, style: { flex: 1 }, __source: {
              fileName: _jsxFileName,
              lineNumber: 119
            }
          },
          _react2.default.createElement(
            _reactNative.Animated.View,
            { style: [{ opacity: this.state.value }, animatedStyle], __source: {
                fileName: _jsxFileName,
                lineNumber: 120
              }
            },
            _react2.default.createElement(
              _reactNative.View,
              {
                style: [styles.oldOfflineWrapper, { paddingTop: showDeviceImg && !!imgUrl ? convert(24) : convert(32) }],
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 121
                }
              },
              showDeviceImg && !!imgUrl && _react2.default.createElement(_reactNative.Image, {
                source: { uri: imgUrl },
                style: { width: convert(95), height: convert(95) },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 128
                }
              }),
              _react2.default.createElement(
                _TYText2.default,
                { style: styles.offlineTitle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 133
                  }
                },
                _strings2.default.getLang('offline_alreadyOffline')
              ),
              _react2.default.createElement(
                _reactNative.View,
                { style: { paddingBottom: convert(32) }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 136
                  }
                },
                _react2.default.createElement(
                  _TYText2.default,
                  { style: [styles.firstLine, { color: '#333', marginBottom: convert(8) }], __source: {
                      fileName: _jsxFileName,
                      lineNumber: 137
                    }
                  },
                  _strings2.default.getLang('offline_pleaseCheck')
                ),
                linkBeforeArr && linkBeforeArr.length && linkBeforeArr.map(function (item) {
                  return !!item && _react2.default.createElement(_TYText2.default, { key: item, style: styles.firstLine, text: item, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 143
                    }
                  });
                }),
                !!textLink && _react2.default.createElement(
                  _reactNative.View,
                  { style: { flexDirection: 'row' }, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 146
                    }
                  },
                  _react2.default.createElement(
                    _reactNative.Text,
                    { style: styles.firstLine, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 147
                      }
                    },
                    _strings2.default.getLang('offline_linkFront'),
                    _react2.default.createElement(
                      _reactNative.Text,
                      { style: styles.firstLine, onPress: onLinkPress, __source: {
                          fileName: _jsxFileName,
                          lineNumber: 150
                        }
                      },
                      textLink
                    )
                  )
                ),
                !!textLineAfter && _react2.default.createElement(_TYText2.default, { style: [styles.firstLine, { marginBottom: 0 }], text: textLineAfter, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 157
                  }
                })
              ),
              !!textLineMore && _react2.default.createElement(
                _reactNative.TouchableOpacity,
                {
                  style: styles.confirmTouchable,
                  activeOpacity: 0.8,
                  onPress: onHelpPress,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 161
                  }
                },
                _react2.default.createElement(
                  _TYText2.default,
                  { style: styles.confirmText, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 166
                    }
                  },
                  _strings2.default.getLang('offline_moreHelp')
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            style: styles.circleBlack,
            activeOpacity: 0.8,
            onPress: function onPress() {
              return TYNative.back();
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 174
            }
          },
          _react2.default.createElement(_svg2.default, { name: 'backIos', color: '#fff', size: 18, __source: {
              fileName: _jsxFileName,
              lineNumber: 179
            }
          })
        )
      );
    }
  }]);

  return NewOfflineView;
}(_react.PureComponent);

NewOfflineView.propTypes = {
  maskColor: _reactNative.ColorPropType,
  onClose: _propTypes2.default.func,
  style: _reactNative.ViewPropTypes.style,
  animatedStyle: _reactNative.ViewPropTypes.style,
  showDeviceImg: _propTypes2.default.bool,
  show: _propTypes2.default.bool,
  onLinkPress: _propTypes2.default.func,
  onHelpPress: _propTypes2.default.func
};
NewOfflineView.defaultProps = {
  maskColor: 'rgba(0, 0, 0, 0.8)',
  onClose: null,
  style: null,
  animatedStyle: null,
  showDeviceImg: true,
  show: true,
  onLinkPress: function onLinkPress() {},
  onHelpPress: function onHelpPress() {}
};
exports.default = NewOfflineView;


var styles = _reactNative.StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000
  },
  moreHelp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: convert(17),
    marginBottom: convert(15)
  },
  circleBlack: {
    width: convert(36),
    height: convert(36),
    borderRadius: convert(18),
    backgroundColor: '#000',
    position: 'absolute',
    top: isIos ? isIphoneX ? 44 : 20 : 10,
    left: convert(6),
    justifyContent: 'center',
    paddingLeft: convert(9)
  },
  firstLine: {
    fontSize: 12,
    color: '#999',
    marginBottom: 7
  },
  oldOfflineWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: convert(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: winWidth - convert(32)
  },
  offlineTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 32,
    marginTop: 8,
    color: '#000'
  },
  confirmTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: convert(54),
    width: winWidth - convert(32),
    borderTopWidth: _reactNative.StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5E5'
  },
  confirmText: {
    fontSize: 16,
    color: '#FF4800'
  }
});