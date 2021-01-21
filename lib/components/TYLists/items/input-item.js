Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/TYLists/items/input-item.js';

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _divider = require('../../divider');

var _divider2 = _interopRequireDefault(_divider);

var _TYText = require('../../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _listItem = require('../list-item');

var _listItem2 = _interopRequireDefault(_listItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function InputItem(_ref) {
  var style = _ref.style,
      title = _ref.title,
      titleStyle = _ref.titleStyle,
      inputStyle = _ref.inputStyle,
      textInputProps = _objectWithoutProperties(_ref, ['style', 'title', 'titleStyle', 'inputStyle']);

  return _react2.default.createElement(
    _reactNative.View,
    { style: [styles.container, style], __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    _react2.default.createElement(
      _reactNative.View,
      { style: styles.content, __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      },
      _react2.default.createElement(
        _TYText2.default,
        { style: [styles.title, titleStyle], __source: {
            fileName: _jsxFileName,
            lineNumber: 12
          }
        },
        title
      ),
      _react2.default.createElement(_reactNative.TextInput, _extends({
        style: [styles.textInput, { padding: _reactNative.Platform.OS === 'android' ? 0 : null }, inputStyle],
        placeholderTextColor: '#dbdbdb',
        underlineColorAndroid: 'transparent'
      }, textInputProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }))
    ),
    _react2.default.createElement(_reactNative.View, { style: styles.dot, __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      }
    }),
    _react2.default.createElement(_divider2.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      }
    })
  );
}

InputItem.propTypes = _extends({}, _listItem2.default.propTypes, _reactNative.TextInput.propTypes, {
  title: _propTypes2.default.string.isRequired,

  titleStyle: _reactNative.Text.propTypes.style,

  inputStyle: _reactNative.ViewPropTypes.style
});

InputItem.defaultProps = {
  titleStyle: null,
  inputStyle: null
};

var styles = _reactNative.StyleSheet.create({
  container: {
    height: 94,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff'
  },

  content: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },

  title: {
    fontSize: 14,
    color: '#999'
  },

  textInput: {
    alignSelf: 'stretch',
    marginTop: 10,
    fontSize: 16,
    color: '#333'
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dbdbdb'
  }
});

exports.default = InputItem;