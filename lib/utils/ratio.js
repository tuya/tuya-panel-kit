Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSmallH = exports.isSmallW = exports.statusBarHeight = exports.topBarHeight = exports.convert = exports.convertY = exports.convertX = exports.ratio = exports.viewHeight = exports.viewWidth = exports.winHeight = exports.winWidth = exports.VRatio = exports.HRatio = exports.isIphoneX = exports.isWeb = exports.isIos = undefined;

var _reactNative = require('react-native');

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height,
    width = _Dimensions$get.width;

var baseHeight = 667;
var baseWidth = 375;
var baseX = Math.sqrt(baseHeight * baseHeight + baseWidth * baseWidth);
var x = Math.sqrt(height * height + width * width);
var statusHeight = _reactNative.StatusBar.currentHeight || 0;
var isIos = exports.isIos = _reactNative.Platform.OS === 'ios';
var isWeb = exports.isWeb = _reactNative.Platform.OS === 'web';
var isIphoneX = exports.isIphoneX = isIos && height >= 812;
var HRatio = exports.HRatio = width / baseWidth;
var VRatio = exports.VRatio = height / baseHeight;
var winWidth = exports.winWidth = width;
var winHeight = exports.winHeight = height;
var viewWidth = exports.viewWidth = width;
var viewHeight = exports.viewHeight = height - (isIos ? isIphoneX ? 88 : 64 : 56 + statusHeight);
var finalRatio = x / baseX;
if (baseWidth === width && finalRatio > 1) {
  finalRatio = 1;
}
var ratio = exports.ratio = finalRatio;
var convertX = exports.convertX = function convertX(width) {
  return isWeb ? width : width * HRatio;
};
var convertY = exports.convertY = function convertY(height) {
  return isWeb ? height : height * VRatio;
};
var convert = exports.convert = function convert(number) {
  return isWeb ? number : number * ratio;
};
var topBarHeight = exports.topBarHeight = isIos ? isIphoneX ? 88 : 64 : 56;
var statusBarHeight = exports.statusBarHeight = isIos ? isIphoneX ? 44 : 20 : statusHeight;

var isSmallW = exports.isSmallW = width < 375;
var isSmallH = exports.isSmallH = height < 667;

var getDimension = function getDimension() {
  if (isWeb) {
    try {
      return _reactNative.Dimensions.get('osWindow');
    } catch (error) {
      return _reactNative.Dimensions.get('window');
    }
  }
  return _reactNative.Dimensions.get('window');
};

exports.default = {
  get hRatio() {
    var _getDimension = getDimension(),
        actualWidth = _getDimension.width;

    return actualWidth / baseWidth;
  },
  get vRatio() {
    var _getDimension2 = getDimension(),
        actualHeight = _getDimension2.height;

    return actualHeight / baseHeight;
  },
  get ratio() {
    var actualX = Math.sqrt(height * height + width * width);

    var _getDimension3 = getDimension(),
        actualWidth = _getDimension3.width;

    var actualRatio = actualX / baseX;
    if (baseWidth === actualWidth && actualRatio > 1) {
      actualRatio = 1;
    }
    return actualRatio;
  },
  get width() {
    return getDimension().width;
  },
  get height() {
    return getDimension().height;
  },
  get winWidth() {
    return getDimension().width;
  },
  get winHeight() {
    return getDimension().height;
  },
  get viewWidth() {
    return getDimension().width;
  },
  get viewHeight() {
    return getDimension().height - (isIos ? isIphoneX ? 88 : 64 : 56 + statusHeight);
  },
  convertX: function convertX(number) {
    var _getDimension4 = getDimension(),
        actualWidth = _getDimension4.width;

    var hRatio = actualWidth / baseWidth;
    return number * hRatio;
  },
  convertY: function convertY(number) {
    var _getDimension5 = getDimension(),
        actualHeight = _getDimension5.height;

    var vRatio = actualHeight / baseHeight;
    return number * vRatio;
  },
  convert: function convert(number) {
    var actualX = Math.sqrt(height * height + width * width);

    var _getDimension6 = getDimension(),
        actualWidth = _getDimension6.width;

    var actualRatio = actualX / baseX;
    if (baseWidth === actualWidth && actualRatio > 1) {
      actualRatio = 1;
    }
    return number * actualRatio;
  },
  get isSmallW() {
    return getDimension().width < 375;
  },
  get isSmallH() {
    return getDimension().height < 667;
  },
  isIos: isIos,
  isIphoneX: isIphoneX,
  iPhoneX: isIphoneX,
  topBarHeight: topBarHeight,
  statusBarHeight: statusBarHeight
};