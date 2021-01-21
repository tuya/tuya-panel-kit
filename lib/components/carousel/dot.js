Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/carousel/dot.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _reactNative.StyleSheet.create({
  dot: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
    left: 0,
    right: 0
  },
  dotContainer: {
    flexDirection: 'row'
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#bbb'
  },
  dotActiveStyle: {
    backgroundColor: '#fff'
  },
  spaceStyle: {
    marginHorizontal: 3,
    marginVertical: 3
  }
});

var defaultDot = function defaultDot(props) {
  var dotStyle = props.dotStyle,
      dotActiveStyle = props.dotActiveStyle,
      count = props.count,
      currentIndex = props.currentIndex,
      dotWrapperStyle = props.dotWrapperStyle;

  var dotArr = Array(count).fill('2333').map(function (item, i) {
    return _react2.default.createElement(_reactNative.View, {
      key: 'dot-' + i,
      style: [styles.dotStyle, styles.spaceStyle, dotStyle, i === currentIndex && styles.dotActiveStyle, i === currentIndex && dotActiveStyle],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      }
    });
  });
  return _react2.default.createElement(
    _reactNative.View,
    { style: [styles.dot, dotWrapperStyle], __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      }
    },
    _react2.default.createElement(
      _reactNative.View,
      { style: styles.dotContainer, __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      },
      dotArr
    )
  );
};

defaultDot.propTypes = {
  dotStyle: _reactNative.ViewPropTypes.style,
  dotActiveStyle: _reactNative.ViewPropTypes.style,
  dotWrapperStyle: _reactNative.ViewPropTypes.style,
  count: _propTypes2.default.number,
  currentIndex: _propTypes2.default.number
};

defaultDot.defaultProps = {
  dotStyle: {},
  dotActiveStyle: {},
  dotWrapperStyle: {},
  count: 3,
  currentIndex: 0
};

exports.default = defaultDot;