Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedUnderline = exports.AnimatedView = exports.StyledTabText = exports.StyledTabBtn = exports.Center = exports.StyledTab = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  background-color: transparent;\n  min-height: 36px;\n  background-color: #fff;\n  overflow: hidden;\n'], ['\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  background-color: transparent;\n  min-height: 36px;\n  background-color: #fff;\n  overflow: hidden;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  align-items: center;\n  justify-content: center;\n'], ['\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  font-size: 14px;\n  color: ', ';\n'], ['\n  font-size: 14px;\n  color: ', ';\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  flex-direction: row;\n  background-color: transparent;\n'], ['\n  flex-direction: row;\n  background-color: transparent;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  position: absolute;\n  height: 3;\n  border-radius: 1.5;\n  bottom: 0;\n  background-color: ', ';\n  shadow-color: ', ';\n  shadow-opacity: 0.3;\n  shadow-radius: 4;\n  shadow-offset: 0px 1px;\n'], ['\n  position: absolute;\n  height: 3;\n  border-radius: 1.5;\n  bottom: 0;\n  background-color: ', ';\n  shadow-color: ', ';\n  shadow-opacity: 0.3;\n  shadow-radius: 4;\n  shadow-offset: 0px 1px;\n']);

var _reactNative = require('react-native');

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _core = require('../theme/core');

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledTab = exports.StyledTab = (0, _native2.default)(_reactNative.View)(_templateObject);

var Center = exports.Center = (0, _native2.default)(_reactNative.View)(_templateObject2);

var StyledTabBtn = exports.StyledTabBtn = (0, _native2.default)(_reactNative.View)(_templateObject2);

var StyledTabText = exports.StyledTabText = (0, _native2.default)(_TYText2.default).attrs({
  numberOfLines: 1
})(_templateObject3, function (props) {
  if (typeof props.color !== 'undefined') {
    return props.isActive ? props.color : (0, _core.getTypedFontColor)(props);
  }
  return props.isActive ? (0, _core.getBrandColor)(props) : (0, _core.getTypedFontColor)(props);
});

var AnimatedView = exports.AnimatedView = (0, _native2.default)(_reactNative.Animated.View)(_templateObject4);

var AnimatedUnderline = exports.AnimatedUnderline = (0, _native2.default)(_reactNative.Animated.View)(_templateObject5, function (props) {
  return props.color || (0, _core.getBrandColor)(props);
}, function (props) {
  return props.color || (0, _core.getBrandColor)(props);
});