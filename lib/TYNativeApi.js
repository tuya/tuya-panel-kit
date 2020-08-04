Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactNative = require("react-native");

var _events = require("events");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INTERNAL_EVENT_TYPE = ["error", "newListener", "removeListener", "dpDataChange", "deviceChanged", "bluetoothChange", "deviceStateChange", "networkStateChange", "linkageTimeUpdate", "deviceLocalStateChange"],
    type = function type(e) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
},
    isEmptyObj = function isEmptyObj(e) {
  return e.constructor === Object && 0 === Object.keys(e).length;
},
    parseJson = function parseJson(str) {
  var result = void 0;if (str && "string" === type(str)) try {
    result = JSON.parse(str);
  } catch (parseError) {
    try {
      result = eval("(" + str + ")");
    } catch (e) {
      result = str;
    }
  } else result = void 0 === str ? {} : str;return result;
},
    formatValue = function formatValue(e, t) {
  if ("string" === type(e)) {
    if ("true" === e) return !0;if ("false" === e) return !1;
  } else if ("undefined" === type(e)) switch (t.type) {case "bool":
      return !1;case "value":
      return t.min;default:
      return "";}return e;
},
    formatDevJSON = function formatDevJSON(e) {
  var t = void 0,
      i = void 0,
      n = void 0,
      o = void 0,
      a = void 0,
      s = void 0;var r = e,
      c = r.dps,
      v = parseJson(r.schema);r.schema = {}, r.codeIds = {}, r.idCodes = {}, r.state = {};for (var _e in v) {
    t = (i = v[_e]).code, n = "" + i.id, o = parseJson(i.property), i.dptype = i.type, (i = _extends({}, i, o)).id = n, r.codeIds[t] = n, r.idCodes[n] = t, a = formatValue(c[n], i), r.state[t] = a, r.schema[t] = i, delete i.property;
  }if (r.panelConfig) {
    s = _extends({}, r.panelConfig);for (var _e2 in s) {
      r.panelConfig[_e2] = "string" == typeof s[_e2] ? parseJson(s[_e2]) : s[_e2];
    }
  } else r.panelConfig = {};return r;
};var AppDeviceEventEmitter = {};var Event = {},
    Device = {},
    App = {};var Native = {},
    apiRequest = void 0;var TYDeviceData = {};var TYMobileData = {};if (_reactNative.NativeModules) {
  AppDeviceEventEmitter = _reactNative.Platform.select({ ios: function ios() {
      return _reactNative.NativeAppEventEmitter;
    }, android: function android() {
      return _reactNative.DeviceEventEmitter;
    } })();var e = new _events.EventEmitter();e.setMaxListeners(0);var t = ["on", "once", "emit"];t.forEach(function (t) {
    Event[t] = e[t].bind(e);
  }), Event.fire = e.emit.bind(e), Event.remove = e.removeListener.bind(e), Event.off = function (t) {
    1 === arguments.length && e.removeAllListeners(t), 2 === arguments.length && e.removeListener(t, arguments[1]);
  };var i = _reactNative.NativeModules.TYRCTPublicModule,
      n = _reactNative.NativeModules.TYRCTPublicManager,
      o = _reactNative.NativeModules.TYRCTDeviceModule,
      a = _reactNative.NativeModules.TYRCTPanelManager,
      s = i || n,
      r = o || a;
  s && r && (Native = _extends({}, s, r), TYDeviceData.devInfo = {}, Device.formatDps = function (e) {
    return TYDeviceData.devInfo && TYDeviceData.devInfo.idCodes ? Object.keys(e).reduce(function (t, i) {
      var n = TYDeviceData.devInfo.idCodes[i];return _extends({}, t, _defineProperty({}, n, e[i]));
    }, {}) : {};
  }, Device.setState = function (e, t) {
    var i = {};if ("object" === type(e)) {
      for (var _t in e) {
        if (!Device.checkDpExist(_t)) return;i[_t = /^\d+$/.test(_t) ? Device.getDpCodeById(_t) : _t] = e[_t];
      }if (!isEmptyObj(i)) {
        TYDeviceData.devInfo.state = _extends({}, TYDeviceData.devInfo.state, i);for (var _e3 in i) {
          -1 === INTERNAL_EVENT_TYPE.indexOf(_e3) ? Object.prototype.hasOwnProperty.call(i, _e3) && Event.emit(_e3, i) : console.warn("DP Code can not be one of [" + INTERNAL_EVENT_TYPE + "]");
        }
      }
    } else {
      if (!Device.checkDpExist(e)) return;{
        var _n = /^\d+$/.test(e) ? Device.getDpCodeById(e) : e;i[_n] = t, isEmptyObj(i) || (TYDeviceData.devInfo.state = _extends({}, TYDeviceData.devInfo.state, i), Event.emit(_n, i));
      }
    }return i;
  }, Device.getDeviceInfo = function () {
    return new Promise(function (e) {
      TYDeviceData.devInfo ? e(TYDeviceData.devInfo) : Device.initDevice().then(function (t) {
        e(t);
      });
    });
  }, Device.initDevice = function () {
    return Promise.all([new Promise(function (e) {
      return r.getDevInfo({}, function (t) {
        return e(t);
      });
    }), App.getNetworkState()]).then(function (e) {
      var t = "undefined" === type(e[1].type) ? e[1] : e[1].type;return Device.setDeviceInfo(_extends({ networkType: t }, e[0])), TYDeviceData.devInfo;
    });
  }, Device.setDeviceInfo = function (e) {
    if (e.devId) {
      var _t2 = e;_t2.deviceOnline = e.isOnline, delete _t2.isOnline;var _i = formatDevJSON(_extends({ appOnline: "NONE" !== e.networkType }, _t2));_i.isVDevice = e.devId && 0 === e.devId.indexOf("vdev"), TYDeviceData.devInfo = _i;
    } else TYDeviceData.devInfo = {};
  }, Device.checkDpExist = function (e) {
    return Device.getDpIdByCode(e) || Device.getDpCodeById(e);
  }, Device.getDpIdByCode = function (e) {
    if (TYDeviceData.devInfo) {
      var _t3 = TYDeviceData.devInfo.codeIds;
      return _t3[e];
    }
  }, Device.getDpCodeById = function (e) {
    if (TYDeviceData.devInfo) {
      var _t4 = TYDeviceData.devInfo.idCodes;
      return _t4[e];
    }
  }, Device.putDeviceData = function (e) {
    return new Promise(function (t, i) {
      var n = e.option,
          o = _objectWithoutProperties(e, ["option"]);

      var a = void 0,
          s = !0;var c = {};for (var _e4 in o) {
        if (Device.checkDpExist(_e4)) {
          c[/^\d+$/.test(_e4) ? _e4 : Device.getDpIdByCode(_e4)] = o[_e4], s = !1;
        }
      }if (s) return i(a = { error: "param error" }), void Event.emit("message", a);__DEV__ && console.log("-----数据下发", e, c), r.putDpData({ command: c, option: "undefined" === type(n) ? 3 : n }, function () {
        return t({ success: !0 });
      }, function (e) {
        i(e), Event.emit("message", e);
      });
    });
  }, Device.isMeshWifiDevice = function () {
    if (!TYDeviceData.devInfo) throw new Error("Device uninitialized");var e = TYDeviceData.devInfo.pcc;
    return void 0 !== e ? "0108" === e : e;
  }, Device.isMeshDevice = function () {
    if (!TYDeviceData.devInfo) throw new Error("Device uninitialized");var e = TYDeviceData.devInfo.nodeId;
    return void 0 !== e ? e.length > 0 : e;
  }, Device.isWifiDevice = function () {
    if (!TYDeviceData.devInfo) throw new Error("Device uninitialized");var e = TYDeviceData.devInfo.pcc;
    return void 0 !== e ? 0 === e.length : e;
  }, Device.getBleManagerState = function () {
    return new Promise(function (e, t) {
      (r.getBleManagerState || function () {
        t();
      })(function (i) {
        if (i) return e(i.state);t();
      });
    });
  }, Device.deleteDeviceInfo = function () {
    return new Promise(function (e, t) {
      (r.deleteDeviceInfo || function () {
        t();
      })(e, t);
    });
  }, AppDeviceEventEmitter.addListener("deviceDataChange", function (e) {
    Event.emit("deviceDataChange", { type: "dpData", payload: e });
  }), AppDeviceEventEmitter.addListener("dpDataChange", function (e) {
    if (isEmptyObj(TYDeviceData.devInfo)) TYDeviceData.__unInitializeDps = e;else {
      var _t5 = Device.formatDps(e);isEmptyObj(_t5) || (__DEV__ && console.log("-----数据上报", _t5, e), Device.setState(_t5), Event.emit("deviceDataChange", { type: "dpData", payload: _t5 }));
    }
  }), AppDeviceEventEmitter.addListener("deviceChanged", function () {
    __DEV__ && console.warn("deviceChanged"), Device.initDevice().then(function (e) {
      return Event.emit("deviceDataChange", { type: "devInfo", payload: e });
    });
  }), AppDeviceEventEmitter.addListener("bluetoothChange", function (e) {
    Event.emit("bluetoothChange", e.state);
  }), AppDeviceEventEmitter.addListener("deviceStateChange", function (e) {
    __DEV__ && console.warn("deviceStateChange"), void 0 !== e && void 0 !== e.state && Event.emit("deviceDataChange", { type: "deviceOnline", payload: { deviceOnline: e.state } });
  }), AppDeviceEventEmitter.addListener("networkStateChange", function (e) {
    __DEV__ && console.warn("networkStateChange"), void 0 !== e && void 0 !== e.state && Event.emit("networkStateChange", { appOnline: e.state });
  }), AppDeviceEventEmitter.addListener("linkageTimeUpdate", function () {
    Event.emit("linkageTimeUpdate", {});
  }), App.verSupported = function (e) {
    return !!(s && s.mobileInfo && s.mobileInfo.appRnVersion) && s.mobileInfo.appRnVersion >= e;
  }, App.getNetworkState = function () {
    return new Promise(function (e) {
      s.getNetworkType(function (t) {
        e(t);
      });
    });
  }, App.is24Hour = function () {
    return new Promise(function (e) {
      s.is24Hour(function (t) {
        return e(t);
      });
    });
  }, App.getMobileInfo = function () {
    return new Promise(function (e, t) {
      TYMobileData ? t() : s.getMobileInfo(function (t) {
        return e(t);
      });
    }).then(function (e) {
      return TYMobileData = e;
    }, function () {
      return TYMobileData;
    });
  }, App.jumpTo = function (e) {
    s.jumpTo(e || "");
  }, App.showLoading = function (e) {
    s.showLoading({ title: e || "" });
  }, App.back = function () {
    s.back();
  }, App.disablePopGesture = function () {
    "ios" === _reactNative.Platform.OS && r.disablePopGesture();
  }, App.enablePopGesture = function () {
    "ios" === _reactNative.Platform.OS && r.enablePopGesture();
  }, App.showPromptDialog = function (e, t, i, n, o, a, r) {
    if ("ios" === _reactNative.Platform.OS) try {
      _reactNative.AlertIOS.prompt(i, n, [{ text: e, onPress: function onPress(e) {
          return a(e);
        }, style: "default" }, { text: t, onPress: function onPress() {
          return r();
        }, style: "cancel" }], "plain-text", o);
    } catch (e) {} else s.showPromptDialog(i, n, o, a, r);
  }, apiRequest = function apiRequest(e) {
    return new Promise(function (t, i) {
      r.apiRNRequest(e, function (e) {
        var i = parseJson(e);t(i);
      }, function (e) {
        var t = parseJson(e);i(t);
      });
    });
  });
}var TySdk = { mobile: App, device: Device, apiRequest: apiRequest, native: Native, event: Event, DeviceEventEmitter: AppDeviceEventEmitter };if (App && _reactNative.NativeModules) {
  var _e5 = _reactNative.NativeModules.TYRCTNavManager,
      _t6 = App.verSupported(5.23) && _e5,
      _i2 = "message";
  var _n2 = function () {
    function _n2() {
      _classCallCheck(this, _n2);

      this.emitter = null, this.subscription = null;
    }

    _createClass(_n2, [{
      key: "createEmitter",
      value: function createEmitter() {
        _t6 ? this.emitter = new NativeEventEmitter(_reactNative.NativeModules.TYRCTNavManager) : console.log("-----AppRnVersion must >= 5.23");
      }
    }, {
      key: "addListener",
      value: function addListener(e) {
        _t6 ? this.emitter && (this.subscription = this.emitter.addListener("receiveBroadcast", e)) : console.log("-----AppRnVersion must >= 5.23");
      }
    }, {
      key: "removeEmitter",
      value: function removeEmitter() {
        _t6 ? this.subscription && this.subscription.remove() : console.log("-----AppRnVersion must >= 5.23");
      }
    }, {
      key: "registerEventListener",
      value: function registerEventListener() {
        _t6 ? _e5.broadcastReceiverRegister(_i2) : console.log("-----AppRnVersion must >= 5.23");
      }
    }, {
      key: "sendEvent",
      value: function sendEvent(n) {
        _t6 ? _e5.broadcastMessage(_i2, n) : console.log("-----AppRnVersion must >= 5.23");
      }
    }, {
      key: "pushWithUiID",
      value: function pushWithUiID(i, n) {
        _t6 ? _e5.pushWithUIID(i, n) : console.log("-----AppRnVersion must >= 5.23");
      }
    }]);

    return _n2;
  }();

  var _o = new _n2();App.jumpSubPage = function (e, t) {
    var i = e.uiId;
    _o.pushWithUiID(i, t);
  };
}TySdk.Navigator = {}, TySdk.applyNavigator = function (e) {
  TySdk.Navigator = e;
};exports.default = TySdk;