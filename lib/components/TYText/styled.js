Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n      font-size: ', 'px;\n    '], ['\n      font-size: ', 'px;\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      font-size: ', 'px;\n      line-height: ', ';\n    '], ['\n      font-size: ', 'px;\n      line-height: ', ';\n    ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    font-size: ', 'px;\n    line-height: ', ';\n  '], ['\n    font-size: ', 'px;\n    line-height: ', ';\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n  color: ', ';\n'], ['\n  color: ', ';\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  text-align: ', ';\n'], ['\n  text-align: ', ';\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  font-weight: ', ';\n'], ['\n  font-weight: ', ';\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  font-family: ', ';\n'], ['\n  font-family: ', ';\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  background-color: transparent;\n  ', '\n'], ['\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  background-color: transparent;\n  ', '\n']);

var _reactNative = require('react-native');

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _theme = require('../theme');

var _core = require('../../utils/core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var get = _core2.default.get;


var sizeStyles = function sizeStyles(props) {
  if (typeof props.size === 'number') {
    return (0, _native.css)(_templateObject, props.size);
  }
  if (!props.type || !props.size) {
    return null;
  }
  var path = 'text.' + props.type + '.' + props.size;
  var ret = get(props.theme, path, _theme.defaultTheme.text.title.normal);
  if (typeof ret === 'function') {
    var result = ret(props);
    var _cssStyle = (0, _native.css)(_templateObject2, result.fontSize, result.lineHeight);
    return _cssStyle;
  }
  var cssStyle = (0, _native.css)(_templateObject3, ret.fontSize, ret.lineHeight);
  return cssStyle;
};

var colorStyle = (0, _native.css)(_templateObject4, function (props) {
  var type = get(props.theme, 'type', 'light');
  var path = 'global.text.' + type;
  return props.color || get(props.theme, path, _theme.defaultTheme.global.text.light);
});

var textAlignStyle = (0, _native.css)(_templateObject5, function (props) {
  return props.align;
});

var weightStyle = (0, _native.css)(_templateObject6, function (props) {
  return props.weight;
});

var fontFamilyStyle = (0, _native.css)(_templateObject7, function (props) {
  return get(props.theme, 'global.fontFamily', _theme.defaultTheme.global.fontFamily);
});

exports.default = (0, _native2.default)(_reactNative.Text)(_templateObject8, colorStyle, function (props) {
  return props.align && textAlignStyle;
}, function (props) {
  return props.weight && weightStyle;
}, function (props) {
  return sizeStyles(props);
}, function (props) {
  return typeof get(props.theme, 'global.fontFamily', _theme.defaultTheme.global.fontFamily) === 'string' && fontFamilyStyle;
});