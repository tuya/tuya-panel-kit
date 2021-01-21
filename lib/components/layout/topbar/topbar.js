Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/layout/topbar/topbar.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TopBarContainer = require('./TopBarContainer');

var _TopBarContainer2 = _interopRequireDefault(_TopBarContainer);

var _TopBarContent = require('./TopBarContent');

var _TopBarContent2 = _interopRequireDefault(_TopBarContent);

var _TopBarAction = require('./TopBarAction');

var _TopBarAction2 = _interopRequireDefault(_TopBarAction);

var _styled = require('./styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopBar = function (_PureComponent) {
  _inherits(TopBar, _PureComponent);

  function TopBar() {
    _classCallCheck(this, TopBar);

    return _possibleConstructorReturn(this, (TopBar.__proto__ || Object.getPrototypeOf(TopBar)).apply(this, arguments));
  }

  _createClass(TopBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          contentStyle = _props.contentStyle,
          background = _props.background,
          color = _props.color,
          leftActions = _props.leftActions,
          actions = _props.actions,
          onBack = _props.onBack,
          contentProps = _objectWithoutProperties(_props, ['style', 'contentStyle', 'background', 'color', 'leftActions', 'actions', 'onBack']);

      return _react2.default.createElement(
        TopBar.Container,
        { style: style, contentStyle: contentStyle, background: background, __source: {
            fileName: _jsxFileName,
            lineNumber: 47
          }
        },
        leftActions ? leftActions.map(function (item, k) {
          return _react2.default.createElement(TopBar.Action, _extends({ key: k, color: color }, item, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 49
            }
          }));
        }) : _react2.default.createElement(TopBar.Action, {
          accessibilityLabel: 'TopBar_Btn_Back',
          color: color,
          name: 'backIos',
          onPress: onBack,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 51
          }
        }),
        _react2.default.createElement(TopBar.Content, _extends({ color: color }, contentProps, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 58
          }
        })),
        actions && actions.map(function (item, k) {
          return _react2.default.createElement(TopBar.Action, _extends({ key: k, color: color }, item, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 59
            }
          }));
        })
      );
    }
  }]);

  return TopBar;
}(_react.PureComponent);

TopBar.height = _styled.TOPBAR_HEIGHT;
TopBar.Container = _TopBarContainer2.default;
TopBar.Content = _TopBarContent2.default;
TopBar.Action = _TopBarAction2.default;
TopBar.propTypes = _extends({}, _TopBarContainer2.default.propTypes, _TopBarContent2.default.propTypes, {
  color: _propTypes2.default.string,
  leftActions: _propTypes2.default.oneOfType([_propTypes2.default.shape(_TopBarAction2.default.propTypes), _propTypes2.default.arrayOf(_propTypes2.default.shape(_TopBarAction2.default.propTypes))]),
  actions: _propTypes2.default.oneOfType([_propTypes2.default.shape(_TopBarAction2.default.propTypes), _propTypes2.default.arrayOf(_propTypes2.default.shape(_TopBarAction2.default.propTypes))])
});
TopBar.defaultProps = {
  color: null,
  leftActions: null,
  actions: null
};
exports.default = TopBar;