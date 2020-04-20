Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/TYLists/list-item.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _defaultSvg = require('../iconfont/svg/defaultSvg');

var _defaultSvg2 = _interopRequireDefault(_defaultSvg);

var _defaultSvg3 = require('../iconfont/art/defaultSvg');

var _defaultSvg4 = _interopRequireDefault(_defaultSvg3);

var _utils = require('../../utils');

var _styled = require('./styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isNil = _utils.CoreUtils.isNil;
var parseToStyle = _utils.ThemeUtils.parseToStyle;

var TYListItem = function (_Component) {
  _inherits(TYListItem, _Component);

  function TYListItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TYListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TYListItem.__proto__ || Object.getPrototypeOf(TYListItem)).call.apply(_ref, [this].concat(args))), _this), _this.renderArrow = function () {
      var _this$props = _this.props,
          theme = _this$props.theme,
          arrow = _this$props.arrow,
          arrowColor = _this$props.arrowColor,
          arrowUseIcon = _this$props.arrowUseIcon;

      if (!arrow) return null;
      if (arrowUseIcon) {
        return _react2.default.createElement(_styled.StyledIconFont, { size: 14, name: 'arrow', color: arrowColor || theme.arrowColor, __source: {
            fileName: _jsxFileName,
            lineNumber: 307
          }
        });
      }
      return _react2.default.createElement(_styled.StyledArrowImage, { color: arrowColor || theme.arrowColor, __source: {
          fileName: _jsxFileName,
          lineNumber: 309
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TYListItem, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!nextProps.needUpdate) {
        return false;
      }
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'getImageComponent',
    value: function getImageComponent(source) {
      var _props = this.props,
          theme = _props.theme,
          imageFollowIconColor = _props.imageFollowIconColor,
          iconSize = _props.iconSize,
          iconColor = _props.iconColor;

      return _react2.default.createElement(_styled.StyledImage, {
        size: iconSize,
        iconColor: iconColor || theme.iconColor,
        source: source,
        imageFollowIconColor: imageFollowIconColor,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        }
      });
    }
  }, {
    key: 'getIconComponent',
    value: function getIconComponent(data) {
      var _props2 = this.props,
          theme = _props2.theme,
          iconSize = _props2.iconSize,
          iconColor = _props2.iconColor,
          useART = _props2.useART;

      var svgMap = useART ? _defaultSvg4.default : _defaultSvg2.default;
      return _react2.default.createElement(_styled.StyledIconFont, {
        size: iconSize,
        name: svgMap[data] ? data : undefined,
        d: data,
        color: iconColor || theme.iconColor,
        useART: useART,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 194
        }
      });
    }
  }, {
    key: 'getTextComponent',
    value: function getTextComponent(text) {
      var _props3 = this.props,
          styles = _props3.styles,
          theme = _props3.theme;

      return _react2.default.createElement(
        _styled.StyledValueText,
        {
          style: [theme.descFontColor && { color: theme.descFontColor }, styles.valueText],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 207
          }
        },
        text
      );
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon() {
      var _props4 = this.props,
          styles = _props4.styles,
          iconType = _props4.iconType,
          Icon = _props4.Icon;

      if (!Icon) return null;
      var iconComp = void 0;
      if (iconType !== 'auto') {
        switch (iconType) {
          case 'image':
            iconComp = this.getImageComponent(Icon);
            break;
          case 'iconfont':
            iconComp = this.getIconComponent(Icon);
            break;
          case 'text':
          default:
            iconComp = this.getTextComponent(Icon);
            break;
        }
        return _react2.default.createElement(
          _styled.StyledItemLeft,
          { style: styles.contentLeft, __source: {
              fileName: _jsxFileName,
              lineNumber: 232
            }
          },
          iconComp
        );
      }
      switch (typeof Icon) {
        case 'function':
          iconComp = Icon();
          break;
        case 'string':
          iconComp = this.getIconComponent(Icon);
          break;
        case 'number':
          iconComp = this.getImageComponent(Icon);
          break;
        case 'object':
          {
            if (Icon && Icon.uri) {
              iconComp = this.getImageComponent(Icon);
            } else {
              iconComp = Icon;
            }
            break;
          }
        default:
          iconComp = Icon;
          break;
      }
      return _react2.default.createElement(
        _styled.StyledItemLeft,
        { style: styles.contentLeft, __source: {
            fileName: _jsxFileName,
            lineNumber: 256
          }
        },
        iconComp
      );
    }
  }, {
    key: 'renderAction',
    value: function renderAction() {
      var _props5 = this.props,
          actionType = _props5.actionType,
          Action = _props5.Action;

      if (!Action) return null;
      var actionComp = void 0;
      if (actionType !== 'auto') {
        switch (actionType) {
          case 'image':
            actionComp = this.getImageComponent(Action);
            break;
          case 'iconfont':
            actionComp = this.getIconComponent(Action);
            break;
          case 'text':
          default:
            actionComp = this.getTextComponent(Action);
            break;
        }
        return actionComp;
      }
      switch (typeof Action) {
        case 'function':
          actionComp = Action();
          break;
        case 'string':
          actionComp = this.getTextComponent(Action);
          break;
        case 'number':
          actionComp = this.getImageComponent(Action);
          break;
        case 'object':
          {
            if (Action && Action.uri) {
              actionComp = this.getImageComponent(Action);
            } else {
              actionComp = Action;
            }
            break;
          }
        default:
          actionComp = Action;
          break;
      }
      return actionComp;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          styles = _props6.styles,
          theme = _props6.theme,
          disabled = _props6.disabled,
          actionDisabled = _props6.actionDisabled,
          title = _props6.title,
          subTitle = _props6.subTitle,
          children = _props6.children,
          onPress = _props6.onPress,
          onActionPress = _props6.onActionPress,
          touchProps = _objectWithoutProperties(_props6, ['styles', 'theme', 'disabled', 'actionDisabled', 'title', 'subTitle', 'children', 'onPress', 'onActionPress']);

      var radiusStyle = !isNil(theme.cellRadius) && { borderRadius: theme.cellRadius };
      var itemStyle = [radiusStyle, theme.margin && parseToStyle(theme.margin, 'margin'), theme.cellBg && { backgroundColor: theme.cellBg }, styles.container];
      var contentStyle = [radiusStyle, theme.padding && parseToStyle(theme.padding, 'padding'), styles.content];
      var titleStyle = [theme.fontColor && { color: theme.fontColor }, styles.title];
      var subTitleStyle = [theme.subFontColor && { color: theme.subFontColor }, styles.subTitle];
      return _react2.default.createElement(
        _styled.StyledItem,
        _extends({
          activeOpacity: 0.8,
          style: itemStyle,
          disabled: disabled,
          onPress: onPress
        }, touchProps, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 341
          }
        }),
        _react2.default.createElement(
          _styled.StyledItemContent,
          { style: contentStyle, disabled: disabled, __source: {
              fileName: _jsxFileName,
              lineNumber: 348
            }
          },
          this.renderIcon(),
          _react2.default.createElement(
            _styled.StyledItemCenter,
            { style: styles.contentCenter, __source: {
                fileName: _jsxFileName,
                lineNumber: 350
              }
            },
            !!title && _react2.default.createElement(
              _styled.StyledTitle,
              { style: titleStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 351
                }
              },
              title
            ),
            !!subTitle && _react2.default.createElement(
              _styled.StyledSubTitle,
              { style: subTitleStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 352
                }
              },
              subTitle
            ),
            children
          ),
          _react2.default.createElement(
            _styled.StyledItemRight,
            {
              activeOpacity: 0.8,
              style: styles.contentRight,
              disabled: actionDisabled,
              onPress: onActionPress || onPress,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 355
              }
            },
            this.renderAction(),
            this.renderArrow()
          )
        )
      );
    }
  }]);

  return TYListItem;
}(_react.Component);

TYListItem.propTypes = _extends({}, _reactNative.TouchableOpacity.propTypes, {
  styles: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    container: _reactNative.ViewPropTypes.style,
    content: _reactNative.ViewPropTypes.style,
    contentLeft: _reactNative.ViewPropTypes.style,
    contentCenter: _reactNative.ViewPropTypes.style,
    contentRight: _reactNative.ViewPropTypes.style,
    title: _reactNative.Text.propTypes.style,
    subTitle: _reactNative.Text.propTypes.style
  })]),
  theme: _propTypes2.default.shape({
    boardBg: _reactNative.ColorPropType,
    fontColor: _reactNative.ColorPropType,
    subFontColor: _reactNative.ColorPropType,
    descFontColor: _reactNative.ColorPropType,
    cellLine: _reactNative.ColorPropType,
    cellBg: _reactNative.ColorPropType,
    cellRadius: _propTypes2.default.number,
    margin: _propTypes2.default.array,
    padding: _propTypes2.default.array
  }),

  arrow: _propTypes2.default.bool,

  arrowColor: _reactNative.ColorPropType,

  arrowUseIcon: _propTypes2.default.bool,

  disabled: _propTypes2.default.bool,

  actionDisabled: _propTypes2.default.bool,

  title: _propTypes2.default.string,

  subTitle: _propTypes2.default.string,

  children: _propTypes2.default.element,

  imageFollowIconColor: _propTypes2.default.bool,

  iconType: _propTypes2.default.oneOf(['auto', 'image', 'iconfont', 'text']),

  actionType: _propTypes2.default.oneOf(['auto', 'image', 'iconfont', 'text']),

  iconSize: _propTypes2.default.number,

  iconColor: _reactNative.ColorPropType,

  Icon: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.object]),

  Action: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.object]),

  needUpdate: _propTypes2.default.bool,

  useART: _propTypes2.default.bool,

  onPress: _propTypes2.default.func
});
TYListItem.defaultProps = {
  styles: {},
  theme: {},
  arrow: false,
  arrowColor: null,
  arrowUseIcon: false,
  disabled: false,
  actionDisabled: false,
  title: null,
  subTitle: null,
  children: null,
  imageFollowIconColor: true,
  iconSize: null,
  iconColor: null,
  iconType: 'auto',
  actionType: 'auto',
  Icon: null,
  Action: null,
  needUpdate: true,
  useART: false,
  onPress: null
};
exports.default = TYListItem;