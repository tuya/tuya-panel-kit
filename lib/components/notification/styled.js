Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledImage = exports.StyledIconFont = exports.StyledButton = exports.StyledTitle = exports.StyledNotificationContent = exports.StyledNotification = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  align-self: stretch;\n  align-items: center;\n  justify-content: space-between;\n'], ['\n  align-self: stretch;\n  align-items: center;\n  justify-content: space-between;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  margin: ', ';\n  padding: ', ';\n  min-height: 24;\n  border-radius: 22;\n  background-color: ', ';\n'], ['\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  margin: ', ';\n  padding: ', ';\n  min-height: 24;\n  border-radius: 22;\n  background-color: ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  min-width: ', 'px;\n  max-width: ', 'px;\n  font-size: 14;\n  line-height: 22;\n  color: ', ';\n  margin: ', ';\n'], ['\n  min-width: ', 'px;\n  max-width: ', 'px;\n  font-size: 14;\n  line-height: 22;\n  color: ', ';\n  margin: ', ';\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  width: ', 'px;\n  height: 24;\n  justify-content: center;\n'], ['\n  width: ', 'px;\n  height: 24;\n  justify-content: center;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  position: absolute;\n  top: ', 'px;\n  left: ', 'px;\n'], ['\n  position: absolute;\n  top: ', 'px;\n  left: ', 'px;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  position: absolute;\n  top: ', 'px;\n  left: ', 'px;\n  height: ', 'px;\n  width: ', 'px;\n'], ['\n  position: absolute;\n  top: ', 'px;\n  left: ', 'px;\n  height: ', 'px;\n  width: ', 'px;\n']);

var _reactNative = require('react-native');

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _utils = require('../../utils');

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _iconfont = require('../iconfont');

var _iconfont2 = _interopRequireDefault(_iconfont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var viewWidth = _utils.RatioUtils.viewWidth,
    cx = _utils.RatioUtils.convertX;
var StyledNotification = exports.StyledNotification = (0, _native2.default)(_reactNative.TouchableOpacity)(_templateObject);

var StyledNotificationContent = exports.StyledNotificationContent = (0, _native2.default)(_reactNative.View)(_templateObject2, 12 + 'px 0px ' + 2 + 'px 0px', '10px ' + cx(16) + 'px', function (props) {
  return props.background;
});

var StyledTitle = exports.StyledTitle = (0, _native2.default)(_TYText2.default)(_templateObject3, cx(44), viewWidth - 142, function (props) {
  return props.color;
}, function (props) {
  return props.backIconCenter ? '0px ' + cx(30) + 'px 0px ' + cx(32) + 'px' : '0px ' + cx(54) + 'px 0px ' + cx(32) + 'px';
});

var StyledButton = exports.StyledButton = (0, _native2.default)(_reactNative.TouchableOpacity)(_templateObject4, cx(24));

var StyledIconFont = exports.StyledIconFont = (0, _native2.default)(_iconfont2.default)(_templateObject5, cx(10), cx(16));

var StyledImage = exports.StyledImage = (0, _native2.default)(_reactNative.Image)(_templateObject6, cx(10), cx(16), cx(21), cx(24));