Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/button-brick/index.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer,
    parseToStyle = _utils.ThemeUtils.parseToStyle;

var keysNeedToMerge = {
  wrapperStyle: {
    bgWidth: 'width',
    bgHeight: 'height',
    bgRadius: 'borderRadius',
    bgBorderWidth: 'borderWidth',
    bgBorder: 'borderColor',
    margin: 'margin',
    padding: 'padding',
    bgColor: 'backgroundColor'
  },
  textStyle: {
    fontSize: 'fontSize',
    fontColor: 'color'
  }
};

var ThemedBrickButton = function ThemedBrickButton(props) {
  var localTheme = props.theme,
      rest = _objectWithoutProperties(props, ['theme']);

  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      }
    },
    function (globalTheme) {
      var theme = _extends({}, globalTheme, {
        brickButton: _extends({}, globalTheme.brickButton, localTheme)
      });
      var propsWithTheme = _extends({ theme: theme }, rest);
      var type = propsWithTheme.type,
          brand = propsWithTheme.theme.global.brand;

      var isBorderType = type === 'primaryBorder';
      var themedProps = {
        wrapperStyle: {
          backgroundColor: isBorderType ? 'transparent' : brand,
          borderColor: isBorderType ? brand : 'transparent'
        },
        textStyle: {
          color: isBorderType ? brand : '#fff'
        },
        style: {},
        loadingColor: getTheme(propsWithTheme, 'brickButton.loadingColor'),
        loadingBackground: getTheme(propsWithTheme, 'brickButton.loadingBackground')
      };
      var keys = Object.keys(keysNeedToMerge);
      var keysFromThemeButton = keys.reduce(function (pre, cur) {
        return [].concat(_toConsumableArray(pre), _toConsumableArray(Object.keys(keysNeedToMerge[cur])));
      }, []);
      keysFromThemeButton.forEach(function (key) {
        var path = 'brickButton.' + key;
        var _idx = keys.findIndex(function (it) {
          return key in keysNeedToMerge[it];
        });
        var result = getTheme(propsWithTheme, path);
        if (_idx !== -1 && result) {
          var indexer = keys[_idx];
          var _target = themedProps[indexer];
          var curKey = keysNeedToMerge[indexer][key];
          if (['margin', 'padding'].includes(curKey)) {
            curKey === 'padding' && _extends(_target, parseToStyle(result, curKey));
            curKey === 'margin' && _extends(themedProps, {
              style: parseToStyle(result, curKey)
            });
          } else {
            _target[curKey] = result;
          }
        }
      });
      if (isBorderType) {
        themedProps.wrapperStyle = _extends({}, themedProps.wrapperStyle, {
          backgroundColor: 'transparent',
          borderColor: brand
        });
        themedProps.textStyle = _extends({}, themedProps.textStyle, {
          color: brand
        });
      }
      return _react2.default.createElement(_button2.default, _extends({}, themedProps, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        }
      }));
    }
  );
};

ThemedBrickButton.propTypes = _extends({}, _button2.default.propTypes, {
  theme: _propTypes2.default.shape({
    fontSize: _propTypes2.default.number,

    fontColor: _reactNative.ColorPropType,

    bgRadius: _propTypes2.default.number,

    bgHeight: _propTypes2.default.number,

    bgWidth: _propTypes2.default.number,

    margin: _propTypes2.default.array,

    padding: _propTypes2.default.array,

    bgColor: _reactNative.ColorPropType,

    bgBorder: _reactNative.ColorPropType,

    bgBorderWidth: _propTypes2.default.number,

    loadingColor: _reactNative.ColorPropType,

    loadingBackground: _reactNative.ColorPropType
  })
});

ThemedBrickButton.defaultProps = {
  theme: null
};

exports.default = ThemedBrickButton;