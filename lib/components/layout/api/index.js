Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRssi = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactNative = require('react-native');

var _TYNativeApi = require('../../../TYNativeApi');

var _TYNativeApi2 = _interopRequireDefault(_TYNativeApi);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ESPNative = _extends({}, _reactNative.NativeModules.TYRCTMqttManager);
var TYNative = _TYNativeApi2.default.native;

var requireRnVersion = '5.21';
var compareVersion = _utils.CoreUtils.compareVersion,
    get = _utils.CoreUtils.get;
var getRssi = exports.getRssi = function getRssi() {
  return new Promise(function (resolve, reject) {
    _TYNativeApi2.default.device.getDeviceInfo().then(function (result) {
      if (!result) return;
      var devId = result.devId;

      TYNative.apiRNRequest({
        a: 'tuya.m.device.upgrade.rssi.info.query',
        devId: devId,
        v: '1.0'
      }, function (d) {
        var data = _utils.JsonUtils.parseJSON(d);
        resolve(data);
      }, function (e) {
        reject(e);
      });
    });
  });
};

var sendMqttData = function sendMqttData(param, protocol, success, error) {
  var appRnVersion = get(TYNative, 'mobileInfo.appRnVersion');
  var isGreater = appRnVersion && compareVersion(appRnVersion, requireRnVersion);
  if (isGreater === undefined || !_reactNative.NativeModules.TYRCTMqttManager || isGreater === -1) return;
  ESPNative.sendMqttData(protocol, param, success, error);
};

var receiverMqttData = function receiverMqttData(protocol) {
  var appRnVersion = get(TYNative, 'mobileInfo.appRnVersion');
  var isGreater = appRnVersion && compareVersion(appRnVersion, requireRnVersion);
  if (isGreater === undefined || !_reactNative.NativeModules.TYRCTMqttManager || isGreater === -1) return;
  ESPNative.receiverMqttData(protocol);
};

TYNative.sendMqttData = function (protocol) {
  var param = { reqType: 'sigQry' };
  return new Promise(function (resolve, reject) {
    sendMqttData(param, protocol, function (data) {
      resolve(_utils.JsonUtils.parseJSON(data));
    }, function (error) {
      console.log(error, 'eee');
      reject(error);
    });
  });
};

TYNative.receiverMqttData = function (protocol) {
  return new Promise(function (resolve, reject) {
    receiverMqttData(protocol);
  });
};

exports.default = TYNative;