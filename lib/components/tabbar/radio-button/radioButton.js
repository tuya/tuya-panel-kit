Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/tabbar/radio-button/radioButton.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TYText = require('../../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _reactNative.StyleSheet.create({
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  activeTextStyle: {
    color: '#5190F3'
  }
});

var RadioButton = function RadioButton(props) {
  var title = props.title,
      onItemPress = props.onItemPress,
      style = props.style,
      isActive = props.isActive,
      textStyle = props.textStyle,
      activeTextStyle = props.activeTextStyle,
      accessibilityLabel = props.accessibilityLabel,
      textAccessibilityLabel = props.textAccessibilityLabel;

  var customTextStyle = [styles.textStyle, textStyle && textStyle, isActive && styles.activeTextStyle, isActive && activeTextStyle && activeTextStyle];
  return _react2.default.createElement(
    _reactNative.TouchableOpacity,
    { onPress: onItemPress, style: style, accessibilityLabel: accessibilityLabel, __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      }
    },
    typeof title === 'string' || typeof title === 'number' ? _react2.default.createElement(
      _TYText2.default,
      {
        style: customTextStyle,
        numberOfLines: 1,
        accessibilityLabel: textAccessibilityLabel,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        }
      },
      title
    ) : title
  );
};

RadioButton.propTypes = {
  title: _propTypes2.default.node.isRequired,
  isActive: _propTypes2.default.bool,

  accessibilityLabel: _propTypes2.default.string,
  textAccessibilityLabel: _propTypes2.default.string,

  style: _reactNative.ViewPropTypes.style,
  textStyle: _reactNative.Text.propTypes.style,
  activeTextStyle: _reactNative.Text.propTypes.style,

  onItemPress: _propTypes2.default.func.isRequired
};

RadioButton.defaultProps = {
  isActive: false,
  style: {},
  textStyle: {},
  activeTextStyle: {}
};

exports.default = RadioButton;