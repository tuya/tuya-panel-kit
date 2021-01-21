Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/TYLists/lists.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _theme = require('../theme');

var _utils = require('../../utils');

var _styled = require('./styled');

var _listItem = require('./list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _checkboxItem = require('./items/checkbox-item');

var _checkboxItem2 = _interopRequireDefault(_checkboxItem);

var _inputItem = require('./items/input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

var _sliderItem = require('./items/slider-item');

var _sliderItem2 = _interopRequireDefault(_sliderItem);

var _switchItem = require('./items/switch-item');

var _switchItem2 = _interopRequireDefault(_switchItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var get = _utils.CoreUtils.get;
var cx = _utils.RatioUtils.convertX;
var getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;

var TYSectionLists = function (_Component) {
  _inherits(TYSectionLists, _Component);

  function TYSectionLists() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TYSectionLists);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TYSectionLists.__proto__ || Object.getPrototypeOf(TYSectionLists)).call.apply(_ref, [this].concat(args))), _this), _this.renderSectionHeader = function (_ref2) {
      var section = _ref2.section;
      var title = section.title;
      var sections = _this.props.sections;
      var headerStyle = _this.props.headerStyle;

      var sectionIdx = sections.findIndex(function (sec) {
        return sec.title === title;
      });
      var prevSectionHasFooter = !!get(sections, sectionIdx - 1 + '.footer');
      if (title) {
        return _react2.default.createElement(
          _styled.StyledHeader,
          { style: [{ marginTop: prevSectionHasFooter ? 0 : 24 }, headerStyle], __source: {
              fileName: _jsxFileName,
              lineNumber: 85
            }
          },
          _react2.default.isValidElement(title) ? title : _react2.default.createElement(
            _styled.StyledHeaderText,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 86
              }
            },
            title
          )
        );
      }
      return _react2.default.createElement(_reactNative.View, { style: { marginTop: prevSectionHasFooter ? 0 : 12 }, __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        }
      });
    }, _this.renderSectionFooter = function (_ref3) {
      var footer = _ref3.section.footer;
      var footerStyle = _this.props.footerStyle;

      if (footer) {
        return _react2.default.createElement(
          _styled.StyledFooter,
          { style: footerStyle, __source: {
              fileName: _jsxFileName,
              lineNumber: 97
            }
          },
          _react2.default.isValidElement(footer) ? footer : _react2.default.createElement(
            _styled.StyledFooterText,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 98
              }
            },
            footer
          )
        );
      }
      return null;
    }, _this.renderItem = function (_ref4) {
      var item = _ref4.item,
          otherData = _objectWithoutProperties(_ref4, ['item']);

      var useART = _this.props.useART;

      var value = item.value,
          SwitchButtonProps = item.SwitchButtonProps,
          renderItem = item.renderItem,
          listItemProps = _objectWithoutProperties(item, ['value', 'SwitchButtonProps', 'renderItem']);

      if (typeof renderItem === 'function') {
        return renderItem(_extends({ item: item }, otherData));
      }
      if (typeof value === 'boolean') {
        return _react2.default.createElement(_switchItem2.default, _extends({ value: value, useART: useART }, listItemProps, SwitchButtonProps, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 112
          }
        }));
      } else if (typeof value !== 'undefined') {
        var descFontColor = get(item, 'theme.descFontColor');
        var valueStyle = [descFontColor && { color: descFontColor }, get(item, 'styles.valueText')];
        return _react2.default.createElement(_listItem2.default, _extends({
          useART: useART
        }, listItemProps, {
          Action: _react2.default.createElement(
            _reactNative.View,
            { style: { flexDirection: 'row', alignItems: 'center' }, __source: {
                fileName: _jsxFileName,
                lineNumber: 121
              }
            },
            _react2.default.createElement(
              _styled.StyledValueText,
              { style: valueStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 122
                }
              },
              value
            ),
            typeof listItemProps.Action === 'function' ? listItemProps.Action() : listItemProps.Action
          ),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 117
          }
        }));
      }
      return _react2.default.createElement(_listItem2.default, _extends({ useART: useART }, listItemProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        }
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TYSectionLists, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          contentContainerStyle = _props.contentContainerStyle,
          separatorStyle = _props.separatorStyle,
          sections = _props.sections,
          sectionListRef = _props.sectionListRef,
          sectionListProps = _objectWithoutProperties(_props, ['contentContainerStyle', 'separatorStyle', 'sections', 'sectionListRef']);

      return _react2.default.createElement(
        ThemeConsumer,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 143
          }
        },
        function (globalTheme) {
          var propsWithTheme = _extends({}, _this2.props, { theme: globalTheme });
          var contentStyle = [{
            backgroundColor: getTheme(propsWithTheme, 'list.boardBg', _theme.defaultTheme.list.light.boardBg)
          }, contentContainerStyle];
          var sepStyle = [{
            marginLeft: cx(16),
            height: _reactNative.StyleSheet.hairlineWidth,
            backgroundColor: getTheme(propsWithTheme, 'list.cellLine', _theme.defaultTheme.list.light.cellLine)
          }, separatorStyle];
          return _react2.default.createElement(_reactNative.SectionList, _extends({
            contentContainerStyle: contentStyle,
            ItemSeparatorComponent: function ItemSeparatorComponent() {
              return _react2.default.createElement(_reactNative.View, { style: sepStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 171
                }
              });
            },
            renderSectionHeader: _this2.renderSectionHeader,
            renderSectionFooter: _this2.renderSectionFooter,
            renderItem: _this2.renderItem,
            sections: sections,
            keyExtractor: function keyExtractor(item) {
              return item.key;
            },
            stickySectionHeadersEnabled: false
          }, sectionListProps, {
            ref: sectionListRef,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 169
            }
          }));
        }
      );
    }
  }]);

  return TYSectionLists;
}(_react.Component);

TYSectionLists.Item = _listItem2.default;
TYSectionLists.CheckboxItem = _checkboxItem2.default;
TYSectionLists.InputItem = _inputItem2.default;
TYSectionLists.SliderItem = _sliderItem2.default;
TYSectionLists.SwitchItem = _switchItem2.default;
TYSectionLists.propTypes = _extends({}, _reactNative.SectionList.propTypes, {
  sections: _propTypes2.default.array.isRequired,

  headerStyle: _reactNative.Text.propTypes.style,

  separatorStyle: _reactNative.ViewPropTypes.style,

  sectionListRef: _propTypes2.default.func,

  useART: _propTypes2.default.bool
});
TYSectionLists.defaultProps = {
  headerStyle: null,
  separatorStyle: null,
  sectionListRef: null,
  useART: false
};
exports.default = TYSectionLists;