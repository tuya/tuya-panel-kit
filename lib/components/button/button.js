Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/button/button.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _reactNativeSvg = require('react-native-svg');

var _linearGradient = require('../gradient/linear-gradient');

var _linearGradient2 = _interopRequireDefault(_linearGradient);

var _radialGradient = require('../gradient/radial-gradient');

var _radialGradient2 = _interopRequireDefault(_radialGradient);

var _styled = require('./styled');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _utils.RatioUtils.convertX;

var CircleBtn = function (_React$PureComponent) {
  _inherits(CircleBtn, _React$PureComponent);

  function CircleBtn(props) {
    _classCallCheck(this, CircleBtn);

    var _this = _possibleConstructorReturn(this, (CircleBtn.__proto__ || Object.getPrototypeOf(CircleBtn)).call(this, props));

    _this.getBorderStyle = function () {
      var border = _this.props.border;

      if (!border) {
        return { borderWidth: 0 };
      }
      if (_this.state.borderLayout && _this.state.badgeLayout) {
        var _this$state$borderLay = _this.state.borderLayout,
            x = _this$state$borderLay.x,
            y = _this$state$borderLay.y,
            width = _this$state$borderLay.width;

        _this.badgePosition = {
          left: x + width - _this.state.badgeLayout.width / 2,
          top: y
        };
      }
      if (typeof border === 'boolean') {
        return null;
      } else if (typeof border === 'number') {
        return { borderWidth: border };
      }

      var borderParamsArray = border.split(' ');
      if (borderParamsArray.length === 1) {
        return { borderWidth: parseFloat(border) };
      }
      if (borderParamsArray.length === 2) {
        return {
          borderWidth: parseFloat(borderParamsArray[0]),
          borderStyle: borderParamsArray[1]
        };
      }
      if (borderParamsArray.length === 3) {
        return {
          borderWidth: parseFloat(borderParamsArray[0]),
          borderStyle: borderParamsArray[1],
          borderColor: borderParamsArray[2]
        };
      }
    };

    _this.getChild = function () {
      var _this$props = _this.props,
          type = _this$props.type,
          children = _this$props.children,
          icon = _this$props.icon,
          image = _this$props.image,
          iconPath = _this$props.iconPath,
          imageColor = _this$props.imageColor,
          iconSize = _this$props.iconSize,
          iconColor = _this$props.iconColor,
          disabled = _this$props.disabled,
          disabledOpacity = _this$props.disabledOpacity,
          imageStyle = _this$props.imageStyle,
          size = _this$props.size,
          useART = _this$props.useART;

      var childCount = _react2.default.Children.count(children);
      var hasChild = true;
      var child = null;
      if (childCount > 1) {
        throw new Error('only contain one elements');
      } else if (childCount === 1) {
        child = children;
      } else if (icon || image || iconPath) {
        var cImageStyle = {
          resizeMode: 'stretch',
          tintColor: imageColor
        };
        var customIconSize = cx(40);
        if (_styled.SIZE_MAP[size]) {
          customIconSize = cx(_styled.SIZE_MAP[size]);
        } else if (typeof size === 'number') {
          customIconSize = size;
        }
        if (iconSize) {
          customIconSize = iconSize;
        }
        child = image ? _react2.default.createElement(_reactNative.Image, { source: image, style: [cImageStyle, imageStyle], __source: {
            fileName: _jsxFileName,
            lineNumber: 275
          }
        }) : _react2.default.createElement(_styled.StyledIconFont, {
          type: type,
          name: icon,
          d: iconPath,
          size: customIconSize,
          color: iconColor,
          useART: useART,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 277
          }
        });
      } else {
        hasChild = false;
        child = _this.renderText();
      }

      child = _react2.default.cloneElement(child, {
        style: [child.props.style, { opacity: disabled ? disabledOpacity : 1 }]
      });
      return { hasChild: hasChild, child: child };
    };

    _this.borderLayout = function (e) {
      _this.setState({
        borderLayout: e.nativeEvent.layout
      });
    };

    _this.iconLayout = function (e) {
      _this.setState({
        iconLayout: e.nativeEvent.layout
      });
    };

    _this.badgeLayout = function (e) {
      _this.setState({
        badgeLayout: e.nativeEvent.layout
      });
    };

    _this.renderBackground = function () {
      var _this$props2 = _this.props,
          size = _this$props2.size,
          background = _this$props2.background;

      if (typeof background === 'string') {
        return _react2.default.createElement(_reactNative.View, { style: [_reactNative.StyleSheet.absoluteFill, { backgroundColor: background }], __source: {
            fileName: _jsxFileName,
            lineNumber: 319
          }
        });
      } else if (background && typeof background === 'object' && background.stops) {
        var _StyleSheet$flatten = _reactNative.StyleSheet.flatten([style]),
            width = _StyleSheet$flatten.width,
            height = _StyleSheet$flatten.height;

        var dimension = typeof size === 'number' ? size : _styled.SIZE_MAP[size];
        var style = { width: width || dimension, height: height || dimension };
        var _background$x = background.x1,
            x1 = _background$x === undefined ? '0%' : _background$x,
            _background$y = background.y1,
            y1 = _background$y === undefined ? '0%' : _background$y,
            _background$x2 = background.x2,
            x2 = _background$x2 === undefined ? '0%' : _background$x2,
            _background$y2 = background.y2,
            y2 = _background$y2 === undefined ? '100%' : _background$y2,
            stops = background.stops;

        if (Array.isArray(stops)) {
          return _react2.default.createElement(_radialGradient2.default, { style: style, stops: stops, __source: {
              fileName: _jsxFileName,
              lineNumber: 326
            }
          });
        }
        return _react2.default.createElement(
          _linearGradient2.default,
          { style: style, stops: stops, x1: x1, y1: y1, x2: x2, y2: y2, __source: {
              fileName: _jsxFileName,
              lineNumber: 329
            }
          },
          _react2.default.createElement(_reactNativeSvg.Rect, _extends({ x: '0', y: '0' }, style, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 330
            }
          }))
        );
      }
      return null;
    };

    _this.renderText = function (textDirection) {
      var _this$props3 = _this.props,
          disabled = _this$props3.disabled,
          text = _this$props3.text,
          textAccessibilityLabel = _this$props3.textAccessibilityLabel,
          textSingleLine = _this$props3.textSingleLine,
          textStyle = _this$props3.textStyle;

      return _react2.default.createElement(
        _styled.StyledBtnText,
        {
          style: textStyle,
          disabled: disabled,
          accessibilityLabel: textAccessibilityLabel,
          numberOfLines: textSingleLine ? 1 : null,
          textDirection: textDirection,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 340
          }
        },
        text
      );
    };

    _this.renderButton = function () {
      var _this$props4 = _this.props,
          stretch = _this$props4.stretch,
          type = _this$props4.type,
          size = _this$props4.size,
          disabled = _this$props4.disabled,
          badgeText = _this$props4.badgeText,
          text = _this$props4.text,
          badgeStyle = _this$props4.badgeStyle,
          badgeTextStyle = _this$props4.badgeTextStyle,
          style = _this$props4.style,
          textDirection = _this$props4.textDirection,
          badgeAccessibilityLabel = _this$props4.badgeAccessibilityLabel,
          badgeTextAccessibilityLabel = _this$props4.badgeTextAccessibilityLabel,
          otherProps = _objectWithoutProperties(_this$props4, ['stretch', 'type', 'size', 'disabled', 'badgeText', 'text', 'badgeStyle', 'badgeTextStyle', 'style', 'textDirection', 'badgeAccessibilityLabel', 'badgeTextAccessibilityLabel']);

      if (!_this.badgePosition && _this.state.iconLayout && _this.state.badgeLayout) {
        var iconLayout = _this.state.iconLayout;

        _this.badgePosition = {
          left: iconLayout.x + iconLayout.width - _this.state.badgeLayout.width / 2,
          top: iconLayout.y - _this.state.badgeLayout.height / 2
        };
      }
      var customBadgeStyle = [_this.badgePosition && { left: _this.badgePosition.left, top: _this.badgePosition.top }, badgeStyle];

      var _this$getChild = _this.getChild(),
          hasChild = _this$getChild.hasChild,
          child = _this$getChild.child;

      var direction = !!text && (textDirection === 'left' || textDirection === 'right') ? 'row' : 'column';
      var isTextBefore = ~['left', 'top'].indexOf(textDirection);
      return _react2.default.createElement(
        _styled.StyledBtnContainer,
        _extends({
          style: { flexDirection: direction },
          disabled: disabled,
          activeOpacity: 0.6,
          stretch: stretch
        }, otherProps, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 393
          }
        }),
        hasChild && !!text && isTextBefore ? _this.renderText(textDirection) : null,
        _react2.default.createElement(
          _styled.StyledBtn,
          { type: type, size: size, onLayout: _this.iconLayout, style: style, __source: {
              fileName: _jsxFileName,
              lineNumber: 401
            }
          },
          _this.renderBackground(),
          child
        ),
        badgeText ? _react2.default.createElement(
          _styled.StyledBadge,
          {
            style: customBadgeStyle,
            onLayout: _this.badgeLayout,
            accessibilityLabel: badgeAccessibilityLabel,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 406
            }
          },
          _react2.default.createElement(
            _styled.StyledBadgeText,
            {
              style: badgeTextStyle,
              accessibilityLabel: badgeTextAccessibilityLabel,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 411
              }
            },
            badgeText
          )
        ) : null,
        hasChild && !!text && !isTextBefore ? _this.renderText(textDirection) : null
      );
    };

    _this.state = {
      borderLayout: null,
      iconLayout: null
    };
    _this.badgePosition = null;
    return _this;
  }

  _createClass(CircleBtn, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          stretch = _props.stretch,
          onLayout = _props.onLayout,
          wrapperStyle = _props.wrapperStyle,
          _props$wrapperProps = _props.wrapperProps,
          wrapperProps = _props$wrapperProps === undefined ? {} : _props$wrapperProps;

      return _react2.default.createElement(
        _styled.StyledBtnWrapper,
        _extends({}, wrapperProps, {
          style: wrapperStyle,
          onLayout: onLayout,
          stretch: stretch,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 427
          }
        }),
        this.renderButton()
      );
    }
  }]);

  return CircleBtn;
}(_react2.default.PureComponent);

CircleBtn.propTypes = {
  stretch: _propTypes2.default.bool,

  disabled: _propTypes2.default.bool,

  size: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['large', 'normal', 'small', 'noSet']), _propTypes2.default.number]),

  type: _propTypes2.default.oneOf(['primary', 'normal']),

  background: _propTypes2.default.oneOfType([_reactNative.ColorPropType, _propTypes2.default.object]),

  text: _propTypes2.default.string,

  textSingleLine: _propTypes2.default.bool,

  textDirection: _propTypes2.default.oneOf(['left', 'top', 'right', 'bottom', 'center']),

  icon: _propTypes2.default.string,

  iconPath: _propTypes2.default.string,

  iconSize: _propTypes2.default.number,

  iconColor: _reactNative.ColorPropType,

  image: _reactNative.Image.propTypes.source,

  imageColor: _reactNative.ColorPropType,

  imageStyle: _reactNative.ViewPropTypes.style,

  badgeText: _propTypes2.default.string,

  disabledOpacity: _propTypes2.default.number,

  style: _reactNative.ViewPropTypes.style,

  wrapperStyle: _reactNative.ViewPropTypes.style,

  border: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.number]),

  textStyle: _reactNative.Text.propTypes.style,

  badgeStyle: _reactNative.ViewPropTypes.style,

  badgeTextStyle: _reactNative.Text.propTypes.style,

  onPress: _propTypes2.default.func,

  onLayout: _propTypes2.default.func,

  useART: _propTypes2.default.bool,

  textAccessibilityLabel: _propTypes2.default.string,

  badgeAccessibilityLabel: _propTypes2.default.string,

  badgeTextAccessibilityLabel: _propTypes2.default.string,
  children: _propTypes2.default.element,
  wrapperProps: _propTypes2.default.any
};
CircleBtn.defaultProps = {
  stretch: false,
  border: true,
  size: 'noSet',
  type: 'normal',
  background: null,
  text: '',
  textSingleLine: true,
  textDirection: 'bottom',
  icon: undefined,
  iconPath: null,
  iconSize: null,
  iconColor: null,
  image: null,
  badgeText: '',
  style: {},
  wrapperStyle: {},
  textStyle: {},
  badgeStyle: {},
  badgeTextStyle: {},
  disabled: false,
  disabledOpacity: 0.2,
  imageColor: null,
  imageStyle: null,
  onPress: function onPress() {},
  onLayout: function onLayout() {},
  useART: false,
  textAccessibilityLabel: 'Button_Text',
  badgeAccessibilityLabel: 'Button_Badge',
  badgeTextAccessibilityLabel: 'Button_Badge_Text',
  children: null,
  wrapperProps: {}
};
exports.default = CircleBtn;