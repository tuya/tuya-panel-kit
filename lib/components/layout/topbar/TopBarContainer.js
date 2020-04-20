Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/layout/topbar/TopBarContainer.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeSvg = require('react-native-svg');

var _TopBarContent = require('./TopBarContent');

var _TopBarContent2 = _interopRequireDefault(_TopBarContent);

var _TopBarAction = require('./TopBarAction');

var _TopBarAction2 = _interopRequireDefault(_TopBarAction);

var _radialGradient = require('../../gradient/radial-gradient');

var _radialGradient2 = _interopRequireDefault(_radialGradient);

var _linearGradient = require('../../gradient/linear-gradient');

var _linearGradient2 = _interopRequireDefault(_linearGradient);

var _styled = require('./styled');

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopBarContainer = function (_PureComponent) {
  _inherits(TopBarContainer, _PureComponent);

  function TopBarContainer(props) {
    _classCallCheck(this, TopBarContainer);

    var _this = _possibleConstructorReturn(this, (TopBarContainer.__proto__ || Object.getPrototypeOf(TopBarContainer)).call(this, props));

    _this.renderAction = function (child) {
      if (!_react2.default.isValidElement(child)) {
        return child;
      }
      var childStyle = child.props.style;
      if (child.type === _TopBarContent2.default) {
        _this.hasContent = true;
      }

      if (child.type === _TopBarAction2.default) {
        var _child$props = child.props,
            spacing = _child$props.spacing,
            source = _child$props.source;

        var isText = typeof source === 'string';
        var defaultWidth = isText ? _styled.TOPBAR_ACTION_TEXT_WIDTH : _styled.TOPBAR_ACTION_WIDTH;

        var _StyleSheet$flatten = _reactNative.StyleSheet.flatten([childStyle]),
            _StyleSheet$flatten$w = _StyleSheet$flatten.width,
            width = _StyleSheet$flatten$w === undefined ? defaultWidth : _StyleSheet$flatten$w;

        if (!_this.hasContent) {
          childStyle = [{ left: _this.leftItemWidth }, isText && { width: null, maxWidth: _styled.TOPBAR_ACTION_TEXT_WIDTH }, childStyle];
          _this.leftItemWidth += width + spacing * 2;
        } else {
          childStyle = [{ right: _this.rightItemWidth }, isText && { width: null, maxWidth: _styled.TOPBAR_ACTION_TEXT_WIDTH }, childStyle];
          _this.rightItemWidth += width + spacing * 2;
        }
      }
      return _react2.default.cloneElement(child, _extends({}, child.props, {
        style: childStyle
      }));
    };

    _this.renderContent = function (child) {
      if (child.type === _TopBarContent2.default) {
        var spacing = Math.max(_this.leftItemWidth, _this.rightItemWidth, 70);

        spacing = Math.min(spacing, _utils.RatioUtils.winWidth / 2 - 50);
        return _react2.default.cloneElement(child, _extends({}, child.props, {
          style: _extends({
            left: spacing,
            right: spacing,
            width: _utils.RatioUtils.winWidth - spacing * 2
          }, child.props.style)
        }));
      }
      return child;
    };

    _this.hasContent = false;
    _this.leftItemWidth = 0;
    _this.rightItemWidth = 0;
    return _this;
  }

  _createClass(TopBarContainer, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.hasContent = false;
      this.leftItemWidth = 0;
      this.rightItemWidth = 0;
    }
  }, {
    key: 'renderBackground',
    value: function renderBackground() {
      var _props = this.props,
          style = _props.style,
          background = _props.background;

      if (background && typeof background === 'object' && background.stops) {
        var _StyleSheet$flatten2 = _reactNative.StyleSheet.flatten([style]),
            _StyleSheet$flatten2$ = _StyleSheet$flatten2.width,
            width = _StyleSheet$flatten2$ === undefined ? _utils.RatioUtils.winWidth : _StyleSheet$flatten2$,
            _StyleSheet$flatten2$2 = _StyleSheet$flatten2.height,
            height = _StyleSheet$flatten2$2 === undefined ? _styled.TOPBAR_HEIGHT : _StyleSheet$flatten2$2;

        var dimension = { width: width, height: height };
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
          return _react2.default.createElement(_radialGradient2.default, { style: dimension, stops: stops, __source: {
              fileName: _jsxFileName,
              lineNumber: 54
            }
          });
        }
        return _react2.default.createElement(
          _linearGradient2.default,
          { style: dimension, stops: stops, x1: x1, y1: y1, x2: x2, y2: y2, __source: {
              fileName: _jsxFileName,
              lineNumber: 57
            }
          },
          _react2.default.createElement(_reactNativeSvg.Rect, _extends({ x: '0', y: '0' }, dimension, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 58
            }
          }))
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          style = _props2.style,
          contentStyle = _props2.contentStyle,
          background = _props2.background,
          children = _props2.children;

      var isColor = typeof background === 'string';
      return _react2.default.createElement(
        _styled.StyledTopBarContainer,
        { style: [isColor && { backgroundColor: background }, style], __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          }
        },
        this.renderBackground(),
        _react2.default.createElement(
          _styled.StyledTopBar,
          { style: [{ marginHorizontal: _styled.TOPBAR_MARGIN }, contentStyle], __source: {
              fileName: _jsxFileName,
              lineNumber: 126
            }
          },
          _react2.default.Children.toArray(children).map(this.renderAction).map(this.renderContent)
        )
      );
    }
  }]);

  return TopBarContainer;
}(_react.PureComponent);

TopBarContainer.displayName = 'TopBar.Container';
TopBarContainer.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  contentStyle: _reactNative.ViewPropTypes.style,
  background: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  children: _propTypes2.default.array.isRequired
};
TopBarContainer.defaultProps = {
  style: null,
  background: null,
  contentStyle: null
};
exports.default = TopBarContainer;