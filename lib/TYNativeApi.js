Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYSdk = exports.Strings = exports.I18N = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactNative = require("react-native");

var _events = require("events");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INTERNAL_EVENT_TYPE = ["error", "newListener", "removeListener", "dpDataChange", "deviceChanged", "bluetoothChange", "deviceStateChange", "networkStateChange", "linkageTimeUpdate", "deviceLocalStateChange"],
    sucStyle = "background: green; color: #fff;",
    errStyle = "background: red; color: #fff;";var _TYAppNative = void 0,
    _TYDeviceDevice = void 0;var loop = function loop() {},
    type = function type(e) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
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
    isNumerical = function isNumerical(e) {
  return "[object Number]" === Object.prototype.toString.call(e);
},
    camelize = function camelize(e) {
  return isNumerical(e) ? "" + e : (e = e.replace(/[\-_\s]+(.)?/g, function (e, t) {
    return t ? t.toUpperCase() : "";
  })).substr(0, 1).toLowerCase() + e.substr(1);
},
    getBitValue = function getBitValue(e, t) {
  return (e & 1 << t) >> t;
},
    isEmptyObj = function isEmptyObj(e) {
  return 0 === Object.keys(e).length && e.constructor === Object;
},
    formatDevJSON = function formatDevJSON(e) {
  var t = void 0,
      i = void 0,
      a = void 0,
      o = void 0,
      n = void 0,
      s = void 0;var r = e,
      c = r.dps,
      v = parseJson(r.schema);r.schema = {}, r.codeIds = {}, r.idCodes = {}, r.state = {};for (var _e in v) {
    i = v[_e], t = i.code, a = "" + i.id, o = parseJson(i.property), i.dptype = i.type, i = _extends({}, i, o), i.id = a, r.codeIds[t] = a, r.idCodes[a] = t, n = formatValue(c[a], i), r.state[t] = n, r.schema[t] = i, delete i.property;
  }if (r.panelConfig) {
    s = _extends({}, r.panelConfig);for (var _e2 in s) {
      r.panelConfig[_e2] = "string" == typeof s[_e2] ? parseJson(s[_e2]) : s[_e2];
    }
  } else r.panelConfig = {};return r;
},
    formatUiConfig = function formatUiConfig(e) {
  var t = e.uiConfig ? _extends({}, e.uiConfig) : {};if (Object.keys(e.schema).forEach(function (i) {
    var _t$n$attri;

    var a = e.schema[i],
        o = "dp_" + a.code,
        n = camelize(o);switch (t[n] = { key: n, strKey: o.toLowerCase(), code: a.code, attr: {}, attri: {} }, a.type) {case "enum":
        a.range.forEach(function (e) {
          var i = (o + "_" + e).toLowerCase();t[n].attr[e] = i, t[n].attri[i] = e;
        });break;case "bool":
        var _e3 = (o + "_on").toLowerCase(),
            _i = (o + "_off").toLowerCase();t[n].attr = { false: _i, true: _e3 }, t[n].attri = (_t$n$attri = {}, _defineProperty(_t$n$attri, (o + "_off").toLowerCase(), !1), _defineProperty(_t$n$attri, (o + "_on").toLowerCase(), !0), _t$n$attri);break;case "bitmap":
        for (var _iterator = a.label, _isArray = Array.isArray(_iterator), _i3 = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
          var _ref;

          if (_isArray) {
            if (_i3 >= _iterator.length) break;
            _ref = _iterator[_i3++];
          } else {
            _i3 = _iterator.next();
            if (_i3.done) break;
            _ref = _i3.value;
          }

          var _e4 = _ref;
          var _i2 = (o + "_" + _e4).toLowerCase();t[n].attr[_e4] = _i2, t[n].attri[_i2] = _e4;
        }}
  }), !e.panelConfig || !e.panelConfig.bic) return t;var _e$panelConfig = e.panelConfig,
      i = _e$panelConfig.bic,
      a = _e$panelConfig.fun;
  if (i) for (var _e5 in i) {
    var _a = camelize("panel_" + i[_e5].code);!0 === i[_e5].selected ? t[_a] = !i[_e5].value || parseJSON(i[_e5].value) : t[_a] = !1;
  }if (a) for (var _e6 in a) {
    var _i4 = camelize("panel_fun_" + _e6);t[_i4] = a[_e6];
  }return t;
};var AppDeviceEventEmitter = {};var Event = {},
    Device = {},
    App = {};var Native = {},
    apiRequest = void 0;var TYDeviceData = {};var TYMobileData = {};if (_reactNative.NativeModules) {
  _TYAppNative = _reactNative.NativeModules.TYRCTPublicModule || _reactNative.NativeModules.TYRCTPublicManager, _TYDeviceDevice = _reactNative.NativeModules.TYRCTDeviceModule || _reactNative.NativeModules.TYRCTPanelManager, AppDeviceEventEmitter = _reactNative.Platform.select({ ios: function ios() {
      return _reactNative.NativeAppEventEmitter;
    }, android: function android() {
      return _reactNative.DeviceEventEmitter;
    } })();var e = new _events.EventEmitter();e.setMaxListeners(0);var t = ["on", "once", "emit"];if (t.forEach(function (t) {
    Event[t] = e[t].bind(e);
  }), Event.fire = e.emit.bind(e), Event.remove = e.removeListener.bind(e), Event.off = function (t) {
    1 === arguments.length && e.removeAllListeners(t), 2 === arguments.length && e.removeListener(t, arguments[1]);
  }, _TYAppNative && _TYDeviceDevice) {
    if (TYDeviceData.gState = {}, TYDeviceData.uiConfig = {}, Native = _extends({}, _TYAppNative, _TYDeviceDevice), TYDeviceData.devInfo = {}, App.mobileInfo = _TYAppNative.mobileInfo, Device.formatDps = function (e) {
      return TYDeviceData.devInfo && TYDeviceData.devInfo.idCodes ? Object.keys(e).reduce(function (t, i) {
        return _extends({}, t, _defineProperty({}, TYDeviceData.devInfo.idCodes[i], e[i]));
      }, {}) : {};
    }, Device.setState = function (e, t) {
      var i = {};if ("object" === type(e)) {
        for (var _t in e) {
          if (!Device.checkDpExist(_t)) return void console.log("1-----参数错误");_t = /^\d+$/.test(_t) ? Device.getDpCodeById(_t) : _t, i[_t] = e[_t];
        }if (!isEmptyObj(i)) {
          TYDeviceData.devInfo.state = _extends({}, TYDeviceData.devInfo.state, i);for (var _e7 in i) {
            -1 === INTERNAL_EVENT_TYPE.indexOf(_e7) ? Object.prototype.hasOwnProperty.call(i, _e7) && Event.emit(_e7, i) : console.warn("DP Code can not be one of [" + INTERNAL_EVENT_TYPE + "]");
          }
        }
      } else if (Device.checkDpExist(e)) {
        var a = /^\d+$/.test(e) ? Device.getDpCodeById(e) : e;i[a] = t, isEmptyObj(i) || (TYDeviceData.devInfo.state = _extends({}, TYDeviceData.devInfo.state, i), Event.emit(a, i));
      } else console.log("2-----参数错误");return i;
    }, Device.checkDpExist = function (e) {
      return Device.getDpIdByCode(e) || Device.getDpCodeById(e);
    }, Device.setDevState = function (e) {
      return TYDeviceData.devInfo = _extends({}, TYDeviceData.devInfo, e), TYDeviceData.devInfo;
    }, Device.getDeviceInfo = function () {
      return new Promise(function (e) {
        TYDeviceData.devInfo ? e(TYDeviceData.devInfo) : Device.initDevice().then(function (t) {
          e(t);
        });
      });
    }, Device.getDeviceState = function () {
      return new Promise(function (e) {
        return _TYDeviceDevice.getDevInfo({}, function (t) {
          if (!t || !t.dps) return e({});var i = {};for (var _e8 in t.dps) {
            if (Object.prototype.hasOwnProperty.call(t.dps, _e8)) {
              i[Device.getDpCodeById(_e8)] = t.dps[_e8];
            }
          }return e(i);
        });
      });
    }, Device.initDevice = function () {
      return Promise.all([new Promise(function (e) {
        return _TYDeviceDevice.getDevInfo({}, function (t) {
          return e(t);
        });
      }), App.getNetworkState()]).then(function (e) {
        var t = "undefined" === type(e[1].type) ? e[1] : e[1].type;return Device.setDeviceInfo(_extends({ networkType: t }, e[0])), TYDeviceData.devInfo;
      });
    }, Device.setDeviceInfo = function (e) {
      if (e.devId) {
        var _t2 = e;_t2.deviceOnline = e.isOnline, delete _t2.isOnline;var i = formatDevJSON(_extends({ appOnline: "NONE" !== e.networkType }, _t2));TYDeviceData.uiConfig = formatUiConfig(i), i.isVDevice = e.devId && 0 === e.devId.indexOf("vdev"), TYDeviceData.devInfo = i;
      } else TYDeviceData.uiConfig = {}, TYDeviceData.devInfo = {};
    }, Device.getDpIdByCode = function (e) {
      if (TYDeviceData.devInfo) {
        var _t3 = TYDeviceData.devInfo.codeIds;
        return _t3[e];
      }console.log("-----未初始化,getDpIdByCode");
    }, Device.getDpCodeById = function (e) {
      if (TYDeviceData.devInfo) {
        var _t4 = TYDeviceData.devInfo.idCodes;
        return _t4[e];
      }console.log("-----未初始化,getDpCodeById");
    }, Device.getDpCodes = function () {
      if (TYDeviceData.devInfo) {
        var _e9 = TYDeviceData.devInfo.idCodes;
        return Object.keys(_e9);
      }return console.log("-----未初始化,getDpCodes"), [];
    }, Device.isShareDevice = function () {
      return TYDeviceData.devInfo ? !!TYDeviceData.devInfo.isShare : (console.log("-----未初始化,isShareDevice"), !0);
    }, Device.getDpSchema = function (e) {
      if (TYDeviceData.devInfo) return e ? TYDeviceData.devInfo.schema[e] : TYDeviceData.devInfo.schema;console.log("-----未初始化,getDpSchema");
    }, Device.getState = function (e) {
      if (!isEmptyObj(TYDeviceData.devInfo)) return e ? Device.checkDpExist(e) ? (/^\d+$/.test(e) && (e = Device.getDpCodeById(e)), TYDeviceData.devInfo.state[e]) : void console.log("3-----参数错误") : (void 0 === TYDeviceData.devInfo.state && (TYDeviceData.devInfo.state = {}), TYDeviceData.devInfo.state);console.log("-----未初始化,devInfo getState");
    }, Device.setGState = function (e, t) {
      var i = {};return "object" === type(e) ? i = e : i[e] = t, TYDeviceData.gState = _extends({}, TYDeviceData.gState, i), i;
    }, Device.getGState = function (e) {
      return e ? TYDeviceData.gState[e] : TYDeviceData.gState;
    }, Device.getDpDataFromDevice = function (e) {
      return console.log("-----主动查询DP", e), new Promise(function (t, i) {
        var a = void 0,
            o = "" + e;if (!Device.checkDpExist(o)) return a = { ret: "param error" }, void Event.emit("message", a);/^\d+$/.test(o) || (o = Device.getDpIdByCode(e));var n = function n(e) {
          Event.emit("message", e);
        };if (Device.isMeshDevice()) return _TYDeviceDevice.getDpDataFromMeshDevice({ dpIds: [o] }, n);_TYDeviceDevice.getDpDataFromDevice({ dpId: o }, loop, function (e) {
          Event.emit("message", e);
        });
      });
    }, Device.putDeviceData = function (e) {
      return new Promise(function (t, i) {
        var a = e.option,
            o = _objectWithoutProperties(e, ["option"]);

        var n = void 0,
            s = !0;var r = {};for (var _e10 in o) {
          if (Device.checkDpExist(_e10)) {
            r[/^\d+$/.test(_e10) ? _e10 : Device.getDpIdByCode(_e10)] = o[_e10], s = !1;
          }
        }if (s) return n = { error: "param error" }, i(n), void Event.emit("message", n);__DEV__ && console.log("-----数据下发", e, r), _TYDeviceDevice.putDpData({ command: r, option: "undefined" === type(a) ? 3 : a }, function () {
          return t({ success: !0 });
        }, function (e) {
          console.log("-----返回结果错误?", e), i(e), Event.emit("message", e);
        });
      });
    }, Device.putLocalDpData = function (e) {
      return new Promise(function (t, i) {
        var a = e.option,
            o = _objectWithoutProperties(e, ["option"]);

        var n = void 0,
            s = !0;var r = {};for (var _e11 in o) {
          if (Device.checkDpExist(_e11)) {
            var _t5 = _e11;/^\d+$/.test(_e11) || (_e11 = Device.getDpIdByCode(_t5)), r[_e11] = o[_t5], s = !1;
          }
        }if (s) return n = { ret: "param error" }, i(n), void Event.emit("message", n);console.log("-----数据下发", e, r), _TYDeviceDevice.putLocalDpData({ command: r, option: void 0 === a ? 3 : a }, function () {
          return t();
        }, function (e) {
          console.log("-----返回结果错误?", e), i(e), Event.emit("message", e);
        });
      });
    }, Device.isMeshWifiDevice = function () {
      if (!TYDeviceData.devInfo) throw new Error("Device uninitialized");var e = TYDeviceData.devInfo.pcc;
      return void 0 !== e ? "0108" === e : e;
    }, Device.isMeshDevice = function () {
      if (!TYDeviceData.devInfo) throw new Error("Device uninitialized");var _TYDeviceData$devInfo = TYDeviceData.devInfo.capability,
          e = _TYDeviceData$devInfo === undefined ? 0 : _TYDeviceData$devInfo;
      return 1 === getBitValue(e, 11);
    }, Device.isSigMeshDevice = function () {
      if (!TYDeviceData.devInfo) throw new Error("Device uninitialized");var _TYDeviceData$devInfo2 = TYDeviceData.devInfo.capability,
          e = _TYDeviceData$devInfo2 === undefined ? 0 : _TYDeviceData$devInfo2;
      return 1 === getBitValue(e, 15);
    }, Device.isWifiDevice = function () {
      if (!TYDeviceData.devInfo) throw new Error("Device uninitialized");var _TYDeviceData$devInfo3 = TYDeviceData.devInfo.capability,
          e = _TYDeviceData$devInfo3 === undefined ? 0 : _TYDeviceData$devInfo3;
      return 1 === e;
    }, Device.isBleDevice = function () {
      if (!TYDeviceData.devInfo) throw new Error("Device uninitialized");var _TYDeviceData$devInfo4 = TYDeviceData.devInfo.capability,
          e = _TYDeviceData$devInfo4 === undefined ? 0 : _TYDeviceData$devInfo4;
      return 1 === getBitValue(e, 10) || 1 === getBitValue(e, 11) || 1 === getBitValue(e, 15);
    }, Device.isLocalLAN = function () {
      if (!TYDeviceData.devInfo) throw new Error("Device uninitialized");var _TYDeviceData$devInfo5 = TYDeviceData.devInfo.attribute,
          e = _TYDeviceData$devInfo5 === undefined ? 0 : _TYDeviceData$devInfo5;
      return 1 === getBitValue(e, 6);
    }, Device.getBleManagerState = function () {
      return new Promise(function (e, t) {
        (_TYDeviceDevice.getBleManagerState || function () {
          t();
        })(function (i) {
          if (i) return e(i.state);t();
        });
      });
    }, Device.getBluetoothState = function () {
      return new Promise(function (e, t) {
        ((_reactNative.NativeModules.TYRCTBluetoothUtilManager || {}).getBluetoothState || function () {
          t(null);
        })(function (i) {
          if (i) return e(i.state);t(null);
        });
      });
    }, Device.gotoDeviceWifiNetworkMonitor = _TYDeviceDevice.gotoDeviceWifiNetworkMonitor || function () {}, Device.gotoBlePermissions = _TYDeviceDevice.gotoBlePermissions || function () {}, Device.deleteDeviceInfo = function () {
      return new Promise(function (e, t) {
        (_TYDeviceDevice.deleteDeviceInfo || function () {
          t();
        })(e, t);
      });
    }, Device.getFunConfig = function () {
      var e = {};if (!TYDeviceData.devInfo) return {};if (!TYDeviceData.devInfo.panelConfig) return {};var t = TYDeviceData.devInfo.panelConfig.fun;
      if (!t) return {};for (var i in t) {
        if (Object.prototype.hasOwnProperty.call(t, i)) {
          e[camelize("panel_fun_" + i)] = t[i];
        }
      }return e;
    }, Device.getUnpackPanelInfo = function () {
      return new Promise(function (e) {
        _TYDeviceDevice.getPanelInfo ? _TYDeviceDevice.getPanelInfo(function (t, i) {
          return e(i);
        }) : e("");
      }).then(function (e) {
        return e && e.lang && (Native.lang = e.lang), Native.panelInfo = { isVDevice: e.isVDevice }, e.lang;
      });
    }, AppDeviceEventEmitter.addListener("dpDataChange", function (e) {
      if (isEmptyObj(TYDeviceData.devInfo)) TYDeviceData.__unInitializeDps = _extends({}, TYDeviceData.__unInitializeDps, e);else {
        var _t6 = Device.formatDps(e);isEmptyObj(_t6) || (__DEV__ && console.log("-----数据上报", _t6, e), Device.setState(_t6), Event.emit("deviceDataChange", { type: "dpData", payload: _t6 }));
      }
    }), AppDeviceEventEmitter.addListener("deviceChanged", function () {
      Device.initDevice().then(function (e) {
        return Event.emit("deviceDataChange", { type: "devInfo", payload: e });
      });
    }), AppDeviceEventEmitter.addListener("bluetoothChange", function (e) {
      Event.emit("bluetoothChange", e.state);
    }), AppDeviceEventEmitter.addListener("bluetoothStateChanged", function (e) {
      Event.emit("bluetoothStateChanged", e.state);
    }), AppDeviceEventEmitter.addListener("deviceStateChange", function (e) {
      void 0 !== e && void 0 !== e.state && Event.emit("deviceDataChange", { type: "deviceOnline", payload: { deviceOnline: e.state } });
    }), AppDeviceEventEmitter.addListener("networkStateChange", function (e) {
      void 0 !== e && void 0 !== e.state && Event.emit("networkStateChange", { appOnline: e.state });
    }), AppDeviceEventEmitter.addListener("linkageTimeUpdate", function () {
      Event.emit("linkageTimeUpdate", {});
    }), AppDeviceEventEmitter.addListener("deviceLocalStateChange", function (e) {
      void 0 !== e && void 0 !== e.state && Event.emit("deviceLocalStateChange", { state: e.state });
    }), App.getWiFiSsid = function () {
      return new Promise(function (e) {
        _TYAppNative.getWiFiSsid(function (t) {
          e(t);
        });
      });
    }, App.getNetworkState = function () {
      return new Promise(function (e) {
        _TYAppNative.getNetworkType(function (t) {
          e(t);
        });
      });
    }, App.is24Hour = function () {
      return new Promise(function (e) {
        _TYAppNative.is24Hour(function (t) {
          return e(t);
        });
      });
    }, App.verSupported = function (e) {
      return !!(_TYAppNative && _TYAppNative.mobileInfo && _TYAppNative.mobileInfo.appRnVersion) && _TYAppNative.mobileInfo.appRnVersion >= e;
    }, App.getMobileInfo = function () {
      return new Promise(function (e, t) {
        TYMobileData && Object.keys(TYMobileData).length > 0 ? e(TYMobileData) : _TYAppNative.getMobileInfo(function (t) {
          return e(t);
        });
      }).then(function (e) {
        return TYMobileData = e, TYMobileData;
      }, function () {
        return TYMobileData;
      });
    }, App.jumpTo = function (e) {
      _TYAppNative.jumpTo(e || "");
    }, App.showLoading = function (e) {
      _TYAppNative.showLoading({ title: e || "" });
    }, App.hideLoading = function () {
      _TYAppNative.hideLoading();
    }, App.back = function () {
      _TYAppNative.back();
    }, App.disablePopGesture = function () {
      "ios" === _reactNative.Platform.OS && _TYDeviceDevice.disablePopGesture();
    }, App.enablePopGesture = function () {
      "ios" === _reactNative.Platform.OS && _TYDeviceDevice.enablePopGesture();
    }, App.showPromptDialog = function (e, t, i, a, o, n, s) {
      if ("ios" === _reactNative.Platform.OS) try {
        _reactNative.AlertIOS.prompt(i, a, [{ text: e, onPress: function onPress(e) {
            return n(e);
          }, style: "default" }, { text: t, onPress: function onPress() {
            return s();
          }, style: "cancel" }], "plain-text", o);
      } catch (e) {} else _TYAppNative.showPromptDialog(i, a, o, n, s);
    }, App.bottomListDialog = function (e, t, i) {
      _TYAppNative.bottomListDialog(e, t, i);
    }, App.showEditDialog = function (e, t, i, a) {
      _TYAppNative.showEditDialog(e, t, i, a);
    }, App.simpleConfirmDialog = function (e, t, i, a) {
      _TYAppNative.simpleConfirmDialog(e, t, i, a);
    }, App.simpleTipDialog = function (e, t) {
      _TYAppNative.simpleTipDialog(e, t);
    }, App.shareMsg = function (e) {
      _TYAppNative.shareMsg(e);
    }, App && _reactNative.NativeModules) {
      var _e12 = _reactNative.NativeModules.TYRCTNavManager,
          _t7 = App.verSupported(5.23) && _e12,
          i = "message";
      var a = function () {
        function a() {
          _classCallCheck(this, a);

          this.emitter = null, this.subscription = null;
        }

        _createClass(a, [{
          key: "createEmitter",
          value: function createEmitter() {
            _t7 ? this.emitter = new _reactNative.NativeEventEmitter(_reactNative.NativeModules.TYRCTNavManager) : console.log("-----AppRnVersion must >= 5.23");
          }
        }, {
          key: "addListener",
          value: function addListener(e) {
            _t7 ? this.emitter && (this.subscription = this.emitter.addListener("receiveBroadcast", e)) : console.log("-----AppRnVersion must >= 5.23");
          }
        }, {
          key: "removeEmitter",
          value: function removeEmitter() {
            _t7 ? this.subscription && this.subscription.remove() : console.log("-----AppRnVersion must >= 5.23");
          }
        }, {
          key: "registerEventListener",
          value: function registerEventListener() {
            _t7 ? _e12.broadcastReceiverRegister(i) : console.log("-----AppRnVersion must >= 5.23");
          }
        }, {
          key: "sendEvent",
          value: function sendEvent(a) {
            _t7 ? _e12.broadcastMessage(i, a) : console.log("-----AppRnVersion must >= 5.23");
          }
        }, {
          key: "pushWithUiID",
          value: function pushWithUiID(i, a) {
            _t7 ? _e12.pushWithUIID(i, a) : console.log("-----AppRnVersion must >= 5.23");
          }
        }]);

        return a;
      }();

      App.uiIdNavEventEmitter = new a(), App.jumpSubPage = function (e, t) {
        var i = e.uiId;
        App.uiIdNavEventEmitter.pushWithUiID(i, t);
      };
    }apiRequest = function apiRequest(e, t) {
      var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "1.0";
      return new Promise(function (a, o) {
        _TYDeviceDevice.apiRNRequest({ a: e, postData: t, v: i }, function (t) {
          var i = parseJson(t);__DEV__ && console.log("API Success: %c" + e + "%o", sucStyle, i), a(i);
        }, function (t) {
          var i = parseJson(t);__DEV__ && console.log("API Failed: %c" + e + "%o", errStyle, i.message || i.errorMsg || i), o(i);
        });
      });
    };
  }
}var TYSdk = { mobile: App, device: Device, apiRequest: apiRequest, native: Native, event: Event, DeviceEventEmitter: AppDeviceEventEmitter, get devInfo() {
    return TYDeviceData.devInfo;
  }, get __unInitializeDps() {
    return TYDeviceData.__unInitializeDps;
  }, Navigator: {}, applyNavigator: function applyNavigator(e) {
    TYSdk.Navigator = e;
  } },
    TYNative = TYSdk.native,
    TYMobile = TYSdk.mobile,
    TYDevice = TYSdk.device;
var I18N = function () {
  function I18N(e) {
    var _this = this;

    _classCallCheck(this, I18N);

    __DEV__, this.strings = this.mergeLanguage(e, TYNative.lang), this.defaultLang = this.strings.en ? "en" : Object.keys(this.strings)[0], this.setLanguage(this.defaultLang), void 0 === TYNative.mobileInfo ? TYMobile.getMobileInfo().then(function (e) {
      _this.setLanguage(e.lang);
    }) : this.setLanguage(TYNative.mobileInfo.lang);
  }

  _createClass(I18N, [{
    key: "applyStrings",
    value: function applyStrings(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var i = t ? this.mergeLanguage(TYNative.lang, e) : this.mergeLanguage(e, TYNative.lang);this.strings = this.mergeLanguage(this.strings, i), this.buildLanguage(this.language);
    }
  }, {
    key: "forceUpdateNetworkLang",
    value: function forceUpdateNetworkLang(e) {
      var _this2 = this;

      return TYSdk.apiRequest("tuya.m.i18n.get", { productId: e, moduleName: "h5", endId: 2, osId: 0 }).then(function (e) {
        __DEV__ && console.info("tuya.m.i18n.get", e), e && (_this2.strings = _this2.mergeLanguage(_this2.strings, e), _this2.buildLanguage(_this2.language));
      });
    }
  }, {
    key: "mergeLanguage",
    value: function mergeLanguage(e, t) {
      if (void 0 === e && void 0 === t) return {};if (void 0 === e) return t;if (void 0 === t) return e;var i = _extends({}, e);for (var _e13 in t) {
        void 0 !== i[_e13] ? _extends(i[_e13], t[_e13]) : i[_e13] = _extends({}, t[_e13]);
      }return i;
    }
  }, {
    key: "setLanguage",
    value: function setLanguage(e) {
      var t = this._getBestMatchingLanguage(e, this.strings);if (t === this.language) return;this.language = t;"string" == typeof e && /^zh-hans$|^zh_hans$|^zh_cn$|^zh-cn$|^zh_hans_\w+|^zh-hans-\w+/.test(e.toLowerCase()) ? (this.buildLanguage("zh"), this.buildLanguage(e)) : this.buildLanguage(this.language);
    }
  }, {
    key: "buildLanguage",
    value: function buildLanguage(e) {
      if (this.strings[e]) {
        var _t8 = this.strings[e];for (var _e14 in _t8) {
          _t8.hasOwnProperty(_e14) && (this[_e14] = _t8[_e14]);
        }
      }
    }
  }, {
    key: "_getBestMatchingLanguage",
    value: function _getBestMatchingLanguage(e, t) {
      if (t[e]) return e;var i = e.lastIndexOf("-");if (i >= 0) {
        var _a2 = e.substring(0, i);return this._getBestMatchingLanguage(_a2, t);
      }var a = e.lastIndexOf("_");if (a >= 0) {
        var _i5 = e.substring(0, a);return this._getBestMatchingLanguage(_i5, t);
      }return this.defaultLang;
    }
  }, {
    key: "formatString",
    value: function formatString(e) {
      var i = e;
      for (var _len = arguments.length, t = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        t[_key - 1] = arguments[_key];
      }

      for (var _e15 = 0; _e15 < t.length; _e15++) {
        i = this._replaceAll("{" + _e15 + "}", t[_e15], i);
      }return i;
    }
  }, {
    key: "formatValue",
    value: function formatValue(e) {
      var i = this[e];
      for (var _len2 = arguments.length, t = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        t[_key2 - 1] = arguments[_key2];
      }

      for (var _e16 = 0; _e16 < t.length; _e16++) {
        i = this._replaceAll("{" + _e16 + "}", t[_e16], i);
      }return i;
    }
  }, {
    key: "_replaceAll",
    value: function _replaceAll(e, t, i) {
      return e = e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), i ? i.replace(new RegExp(e, "g"), t) : "";
    }
  }, {
    key: "getDpLang",
    value: function getDpLang(e, t) {
      var i = void 0;if (void 0 === t) i = ("dp_" + e).toLowerCase();else if ("boolean" == typeof t) {
        i = ("dp_" + e + "_" + (t ? "on" : "off")).toLowerCase();
      } else i = ("dp_" + e + "_" + t).toLowerCase();return void 0 !== this[i] ? this[i] : i;
    }
  }, {
    key: "getDpName",
    value: function getDpName(e, t) {
      var i = ("dp_" + e).toLowerCase();return void 0 !== this[i] ? this[i] : t || i;
    }
  }, {
    key: "getDpsLang",
    value: function getDpsLang(e) {
      var t = {};if ("object" == typeof e) {
        if ("string" == typeof e.strKey) t = void 0 !== this[e.strKey] ? this[e.strKey] : e.strKey;else for (var _i6 in e) {
          t[e[_i6]] = void 0 !== this[e[_i6]] ? this[e[_i6]] : e[_i6];
        }
      } else t = void 0 !== this[e] ? this[e] : e;return t;
    }
  }, {
    key: "getLang",
    value: function getLang(e, t) {
      return void 0 !== this[e] ? this[e] : void 0 !== t ? t : "I18N@" + e;
    }
  }, {
    key: "getRangeStrings",
    value: function getRangeStrings(e) {
      var t = {},
          i = TYDevice.getDpSchema(e);if (void 0 === i) return t;var a = i.range;for (var _iterator2 = a, _isArray2 = Array.isArray(_iterator2), _i8 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i8 >= _iterator2.length) break;
          _ref2 = _iterator2[_i8++];
        } else {
          _i8 = _iterator2.next();
          if (_i8.done) break;
          _ref2 = _i8.value;
        }

        var _i7 = _ref2;
        var _a3 = ("dp_" + e + "_" + _i7).toLowerCase();t[_i7] = void 0 !== this[_a3] ? this[_a3] : _a3;
      }return t;
    }
  }, {
    key: "parseCountdown",
    value: function parseCountdown(e, t) {
      var i = parseFloat(e / 3600),
          a = parseFloat(e / 60 - 60 * parseInt(i, 10)),
          o = i >= 1 ? "" + Math.round(i) + this.t_hour : "" + Math.round(a) + this.t_minute;return this.formatString(this["countdown_" + (t ? "on" : "off")], o);
    }
  }, {
    key: "dps",
    get: function get() {
      return this;
    }
  }]);

  return I18N;
}();

var lang = { en: { offline: "Device Offline", appoffline: "Network error, please check ", loading: "Loading...", confirm: "OK", cancel: "Cancel", back: "Back", expDevice: "Not supporting the operation for demo devices", complete: "Done", closeTimer: "Close Timer", startTimer: "Start", endTimer: "Stop", dptype_bool_true: "On", dptype_bool_false: "Off", dptype_enum: "{0}({1})", t_hour: "Hour", t_minute: "Minute", schedule: "Schedule", switchOn: "ON", switchOff: "OFF", setting: "Setting", airLevel0: "Excellent", airLevel1: "Good", airLevel2: "Fine", airLevel3: "Poor", airLevel4: "Very Bad", airLevel5: "Awful", day0: "Sun", day1: "Mon", day2: "Tues", day3: "Wed", day4: "Thur", day5: "Fri", day6: "Sat", day7: "Everyday", day8: "Once", countdown_on: "Turn off after {0}", countdown_off: "Turn on after {0}", bluetoothShareTip: 'Limited functionality, please turn on "Bluetooth Sharing"' }, zh: { offline: "设备暂时不可操作\n请稍后再试", appoffline: "当前网络不可用\n请检查手机网络", loading: "加载中...", confirm: "确定", cancel: "取消", back: "返回", expDevice: "演示设备暂不支持此操作", complete: "完成", closeTimer: "关闭定时", startTimer: "开始时间", endTimer: "结束时间", dptype_bool_true: "开", dptype_bool_false: "关", t_hour: "小时", t_minute: "分钟", schedule: "定时", switchOn: "开启", setting: "设置", switchOff: "关闭", airLevel0: "优", airLevel1: "良", airLevel2: "中", airLevel3: "差", airLevel4: "极差", airLevel5: "超级差", day0: "星期天", day1: "星期一", day2: "星期二", day3: "星期三", day4: "星期四", day5: "星期五", day6: "星期六", day7: "每天", day8: "仅此一次", countdown_on: "设备将在{0}后关闭", countdown_off: "设备将在{0}后开启", bluetoothShareTip: "功能受限，请开启“蓝牙共享”" } },
    Strings = new I18N(lang);exports.I18N = I18N;
exports.Strings = Strings;
exports.TYSdk = TYSdk;