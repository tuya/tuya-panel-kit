Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/layout/offline-view/ble-offline-view/ble-toast.js';

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _TYText = require('../../../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _topbar = require('../../topbar');

var _topbar2 = _interopRequireDefault(_topbar);

var _utils = require('../../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _utils.RatioUtils.convertX;


var Res = {
  bleAlert: require('../../../res/bleAlert.png')
};

var BleToast = function BleToast(_ref) {
  var style = _ref.style,
      text = _ref.text,
      image = _ref.image,
      onPress = _ref.onPress;
  return _react2.default.createElement(
    _reactNative.TouchableOpacity,
    { style: [styles.shareTip, style], activeOpacity: 1, onPress: onPress, __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      }
    },
    _react2.default.createElement(_reactNative.Image, { source: Res.bleAlert, __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      }
    }),
    _react2.default.createElement(_TYText2.default, { style: styles.shareText, text: text, __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      }
    }),
    _react2.default.createElement(_reactNative.Image, { source: image, __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      }
    })
  );
};

BleToast.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  text: _propTypes2.default.string.isRequired,
  image: _propTypes2.default.number.isRequired,
  onPress: _propTypes2.default.func
};

BleToast.defaultProps = {
  style: null,
  onPress: null
};

var styles = _reactNative.StyleSheet.create({
  shareTip: {
    position: 'absolute',
    top: 16 + _topbar2.default.height,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: cx(24),
    marginHorizontal: cx(24),
    paddingVertical: 10,
    paddingHorizontal: cx(16),
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2
  },

  shareText: {
    flex: 1,
    marginLeft: cx(6),
    textAlign: 'left',
    fontSize: cx(14),
    color: '#22242C'
  }
});

exports.default = BleToast;