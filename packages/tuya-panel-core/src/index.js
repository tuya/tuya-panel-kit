import {
  NativeModules,
  Platform,
  NativeAppEventEmitter,
  DeviceEventEmitter,
  Linking,
  AlertIOS,
  NativeEventEmitter,
} from 'react-native';
import { EventEmitter } from 'events';
const INTERNAL_EVENT_TYPE = [
  'error',
  'newListener',
  'removeListener',
  'dpDataChange',
  'deviceChanged',
  'bluetoothChange',
  'deviceStateChange',
  'networkStateChange',
  'linkageTimeUpdate',
  'deviceLocalStateChange',
];
const sucStyle = 'background: green; color: #fff;';
const errStyle = 'background: red; color: #fff;';
let _TYAppNative;
let _TYDeviceDevice;
const loop = () => {};
const type = e =>
  Object.prototype.toString
    .call(e)
    .slice(8, -1)
    .toLowerCase();
const parseJson = str => {
  let result;
  if (str && type(str) === 'string')
    try {
      result = JSON.parse(str);
    } catch (parseError) {
      try {
        result = eval(`(${str})`);
      } catch (e) {
        result = str;
      }
    }
  else result = void 0 === str ? {} : str;
  return result;
};
const formatValue = (e, t) => {
  if (type(e) === 'string') {
    if (e === 'true') return !0;
    if (e === 'false') return !1;
  } else if (type(e) === 'undefined')
    switch (t.type) {
      case 'bool':
        return !1;
      case 'value':
        return t.min;
      default:
        return '';
    }
  return e;
};
const isNumerical = e => Object.prototype.toString.call(e) === '[object Number]';
const camelize = e =>
  isNumerical(e)
    ? '' + e
    : (e = e.replace(/[\-_\s]+(.)?/g, (e, t) => (t ? t.toUpperCase() : '')))
        .substr(0, 1)
        .toLowerCase() + e.substr(1);
const getBitValue = (e, t) => (e & (1 << t)) >> t;
const isEmptyObj = e => Object.keys(e).length === 0 && e.constructor === Object;
const formatDevJSON = e => {
  let t;
  let i;
  let o;
  let a;
  let n;
  let s;
  const r = e;
  const { dps: c } = r;
  const v = parseJson(r.schema);
  (r.schema = {}), (r.codeIds = {}), (r.idCodes = {}), (r.state = {});
  for (const e in v)
    (i = v[e]),
      (t = i.code),
      (o = '' + i.id),
      (a = parseJson(i.property)),
      (i.dptype = i.type),
      (i = Object.assign({}, i, a)),
      (i.id = o),
      (r.codeIds[t] = o),
      (r.idCodes[o] = t),
      (n = formatValue(c[o], i)),
      (r.state[t] = n),
      (r.schema[t] = i),
      delete i.property;
  if (r.panelConfig) {
    s = Object.assign({}, r.panelConfig);
    for (const e in s) r.panelConfig[e] = typeof s[e] === 'string' ? parseJson(s[e]) : s[e];
  } else r.panelConfig = {};
  return r;
};
const formatUiConfig = e => {
  let t = e.uiConfig ? { ...e.uiConfig } : {};
  if (
    (Object.keys(e.schema).forEach(i => {
      const o = e.schema[i];
      const a = 'dp_' + o.code;
      const n = camelize(a);
      switch (
        ((t[n] = { key: n, strKey: a.toLowerCase(), code: o.code, attr: {}, attri: {} }), o.type)
      ) {
        case 'enum':
          o.range.forEach(e => {
            const i = `${a}_${e}`.toLowerCase();
            (t[n].attr[e] = i), (t[n].attri[i] = e);
          });
          break;
        case 'bool':
          const e = (a + '_on').toLowerCase();
          const i = (a + '_off').toLowerCase();
          (t[n].attr = { false: i, true: e }),
            (t[n].attri = { [(a + '_off').toLowerCase()]: !1, [(a + '_on').toLowerCase()]: !0 });
          break;
        case 'bitmap':
          for (const e of o.label) {
            const i = `${a}_${e}`.toLowerCase();
            (t[n].attr[e] = i), (t[n].attri[i] = e);
          }
      }
    }),
    !e.panelConfig || !e.panelConfig.bic)
  )
    return t;
  const { bic: i, fun: o } = e.panelConfig;
  if (i)
    for (const e in i) {
      const o = camelize('panel_' + i[e].code);
      !0 === i[e].selected ? (t[o] = !i[e].value || parseJson(i[e].value)) : (t[o] = !1);
    }
  if (o)
    for (const e in o) {
      const i = camelize('panel_fun_' + e);
      t[i] = o[e];
    }
  return t;
};
let AppDeviceEventEmitter = {};
const Event = {};
const Device = {};
const App = {};
let Native = {};
let apiRequest;
const TYDeviceData = {};
let TYMobileData = {};
if (NativeModules) {
  (_TYAppNative = NativeModules.TYRCTPublicModule || NativeModules.TYRCTPublicManager),
    (_TYDeviceDevice = NativeModules.TYRCTDeviceModule || NativeModules.TYRCTPanelManager),
    (AppDeviceEventEmitter = Platform.select({
      ios: () => NativeAppEventEmitter,
      android: () => DeviceEventEmitter,
    })());
  const e = new EventEmitter();
  e.setMaxListeners(0);
  const t = ['on', 'once', 'emit'];
  if (
    (t.forEach(t => {
      Event[t] = e[t].bind(e);
    }),
    (Event.fire = e.emit.bind(e)),
    (Event.remove = e.removeListener.bind(e)),
    (Event.off = function(t) {
      arguments.length === 1 && e.removeAllListeners(t),
        arguments.length === 2 && e.removeListener(t, arguments[1]);
    }),
    _TYAppNative && _TYDeviceDevice)
  ) {
    if (
      ((TYDeviceData.gState = {}),
      (TYDeviceData.uiConfig = {}),
      (Native = { ..._TYAppNative, ..._TYDeviceDevice }),
      (TYDeviceData.devInfo = {}),
      (App.mobileInfo = _TYAppNative.mobileInfo),
      (Device.formatDps = e =>
        TYDeviceData.devInfo && TYDeviceData.devInfo.idCodes
          ? Object.keys(e).reduce((t, i) => ({ ...t, [TYDeviceData.devInfo.idCodes[i]]: e[i] }), {})
          : {}),
      (Device.setState = (e, t) => {
        const i = {};
        if (type(e) === 'object') {
          for (let t in e) {
            if (!Device.checkDpExist(t)) return void console.log('1-----参数错误');
            (t = /^\d+$/.test(t) ? Device.getDpCodeById(t) : t), (i[t] = e[t]);
          }
          if (!isEmptyObj(i)) {
            TYDeviceData.devInfo.state = { ...TYDeviceData.devInfo.state, ...i };
            for (const e in i)
              INTERNAL_EVENT_TYPE.indexOf(e) === -1
                ? Object.prototype.hasOwnProperty.call(i, e) && Event.emit(e, i)
                : console.warn(`DP Code can not be one of [${INTERNAL_EVENT_TYPE}]`);
          }
        } else if (Device.checkDpExist(e)) {
          const o = /^\d+$/.test(e) ? Device.getDpCodeById(e) : e;
          (i[o] = t),
            isEmptyObj(i) ||
              ((TYDeviceData.devInfo.state = { ...TYDeviceData.devInfo.state, ...i }),
              Event.emit(o, i));
        } else console.log('2-----参数错误');
        return i;
      }),
      (Device.checkDpExist = e => Device.getDpIdByCode(e) || Device.getDpCodeById(e)),
      (Device.setDevState = e => (
        (TYDeviceData.devInfo = { ...TYDeviceData.devInfo, ...e }), TYDeviceData.devInfo
      )),
      (Device.getDeviceInfo = () =>
        new Promise(e => {
          TYDeviceData.devInfo
            ? e(TYDeviceData.devInfo)
            : Device.initDevice().then(t => {
                e(t);
              });
        })),
      (Device.getDeviceState = () =>
        new Promise(e =>
          _TYDeviceDevice.getDevInfo({}, t => {
            if (!t || !t.dps) return e({});
            const i = {};
            for (const e in t.dps)
              if (Object.prototype.hasOwnProperty.call(t.dps, e)) {
                i[Device.getDpCodeById(e)] = t.dps[e];
              }
            return e(i);
          })
        )),
      (Device.initDevice = () =>
        Promise.all([
          new Promise(e => _TYDeviceDevice.getDevInfo({}, t => e(t))),
          App.getNetworkState(),
        ]).then(e => {
          const t = type(e[1].type) === 'undefined' ? e[1] : e[1].type;
          return Device.setDeviceInfo({ networkType: t, ...e[0] }), TYDeviceData.devInfo;
        })),
      (Device.setDeviceInfo = e => {
        if (e.devId) {
          const t = e;
          (t.deviceOnline = e.isOnline), delete t.isOnline;
          const i = formatDevJSON({ appOnline: e.networkType !== 'NONE', ...t });
          (TYDeviceData.uiConfig = formatUiConfig(i)),
            (i.isVDevice = e.devId && e.devId.indexOf('vdev') === 0),
            (TYDeviceData.devInfo = i);
        } else (TYDeviceData.uiConfig = {}), (TYDeviceData.devInfo = {});
      }),
      (Device.getDpIdByCode = e => {
        if (TYDeviceData.devInfo) {
          const { codeIds: t } = TYDeviceData.devInfo;
          return t[e];
        }
        console.log('-----未初始化,getDpIdByCode');
      }),
      (Device.getDpCodeById = e => {
        if (TYDeviceData.devInfo) {
          const { idCodes: t } = TYDeviceData.devInfo;
          return t[e];
        }
        console.log('-----未初始化,getDpCodeById');
      }),
      (Device.getDpCodes = () => {
        if (TYDeviceData.devInfo) {
          const { idCodes: e } = TYDeviceData.devInfo;
          return Object.keys(e);
        }
        return console.log('-----未初始化,getDpCodes'), [];
      }),
      (Device.isShareDevice = () =>
        TYDeviceData.devInfo
          ? !!TYDeviceData.devInfo.isShare
          : (console.log('-----未初始化,isShareDevice'), !0)),
      (Device.getDpSchema = e => {
        if (TYDeviceData.devInfo)
          return e ? TYDeviceData.devInfo.schema[e] : TYDeviceData.devInfo.schema;
        console.log('-----未初始化,getDpSchema');
      }),
      (Device.getState = e => {
        if (!isEmptyObj(TYDeviceData.devInfo))
          return e
            ? Device.checkDpExist(e)
              ? (/^\d+$/.test(e) && (e = Device.getDpCodeById(e)), TYDeviceData.devInfo.state[e])
              : void console.log('3-----参数错误')
            : (void 0 === TYDeviceData.devInfo.state && (TYDeviceData.devInfo.state = {}),
              TYDeviceData.devInfo.state);
        console.log('-----未初始化,devInfo getState');
      }),
      (Device.setGState = (e, t) => {
        let i = {};
        return (
          type(e) === 'object' ? (i = e) : (i[e] = t),
          (TYDeviceData.gState = { ...TYDeviceData.gState, ...i }),
          i
        );
      }),
      (Device.getGState = e => (e ? TYDeviceData.gState[e] : TYDeviceData.gState)),
      (Device.getDpDataFromDevice = e => (
        console.log('-----主动查询DP', e),
        new Promise((t, i) => {
          let o;
          let a = '' + e;
          if (!Device.checkDpExist(a))
            return (o = { ret: 'param error' }), void Event.emit('message', o);
          /^\d+$/.test(a) || (a = Device.getDpIdByCode(e));
          const n = e => {
            Event.emit('message', e);
          };
          if (Device.isMeshDevice())
            return _TYDeviceDevice.getDpDataFromMeshDevice({ dpIds: [a] }, n);
          _TYDeviceDevice.getDpDataFromDevice({ dpId: a }, loop, e => {
            Event.emit('message', e);
          });
        })
      )),
      (Device.putDeviceData = e =>
        new Promise((t, i) => {
          const { option: o, ...a } = e;
          let n;
          let s = !0;
          const r = {};
          for (const e in a)
            if (Device.checkDpExist(e)) {
              (r[/^\d+$/.test(e) ? e : Device.getDpIdByCode(e)] = a[e]), (s = !1);
            }
          if (s) return (n = { error: 'param error' }), i(n), void Event.emit('message', n);
          __DEV__ && console.log('-----数据下发', e, r),
            _TYDeviceDevice.putDpData(
              { command: r, option: type(o) === 'undefined' ? 3 : o },
              () => t({ success: !0 }),
              e => {
                console.log('-----返回结果错误?', e), i(e), Event.emit('message', e);
              }
            );
        })),
      (Device.putLocalDpData = e =>
        new Promise((t, i) => {
          const { option: o, ...a } = e;
          let n;
          let s = !0;
          const r = {};
          for (let e in a)
            if (Device.checkDpExist(e)) {
              const t = e;
              /^\d+$/.test(e) || (e = Device.getDpIdByCode(t)), (r[e] = a[t]), (s = !1);
            }
          if (s) return (n = { ret: 'param error' }), i(n), void Event.emit('message', n);
          console.log('-----数据下发', e, r),
            _TYDeviceDevice.putLocalDpData(
              { command: r, option: void 0 === o ? 3 : o },
              () => t(),
              e => {
                console.log('-----返回结果错误?', e), i(e), Event.emit('message', e);
              }
            );
        })),
      (Device.isMeshWifiDevice = () => {
        if (!TYDeviceData.devInfo) throw new Error('Device uninitialized');
        const { pcc: e } = TYDeviceData.devInfo;
        return void 0 !== e ? e === '0108' : e;
      }),
      (Device.isMeshDevice = () => {
        if (!TYDeviceData.devInfo) throw new Error('Device uninitialized');
        const { capability: e = 0 } = TYDeviceData.devInfo;
        return getBitValue(e, 11) === 1;
      }),
      (Device.isSigMeshDevice = () => {
        if (!TYDeviceData.devInfo) throw new Error('Device uninitialized');
        const { capability: e = 0 } = TYDeviceData.devInfo;
        return getBitValue(e, 15) === 1;
      }),
      (Device.isWifiDevice = () => {
        if (!TYDeviceData.devInfo) throw new Error('Device uninitialized');
        const { capability: e = 0 } = TYDeviceData.devInfo;
        return e === 1;
      }),
      (Device.isBleDevice = () => {
        if (!TYDeviceData.devInfo) throw new Error('Device uninitialized');
        const { capability: e = 0 } = TYDeviceData.devInfo;
        return getBitValue(e, 10) === 1 || getBitValue(e, 11) === 1 || getBitValue(e, 15) === 1;
      }),
      (Device.isLocalLAN = () => {
        if (!TYDeviceData.devInfo) throw new Error('Device uninitialized');
        const { attribute: e = 0 } = TYDeviceData.devInfo;
        return getBitValue(e, 6) === 1;
      }),
      (Device.getBleManagerState = () =>
        new Promise((e, t) => {
          (
            _TYDeviceDevice.getBleManagerState ||
            function() {
              t();
            }
          )(i => {
            if (i) return e(i.state);
            t();
          });
        })),
      (Device.getBluetoothState = () =>
        new Promise((e, t) => {
          (
            (NativeModules.TYRCTBluetoothUtilManager || {}).getBluetoothState ||
            function() {
              t(null);
            }
          )(i => {
            if (i) return e(i.state);
            t(null);
          });
        })),
      (Device.gotoDeviceWifiNetworkMonitor =
        _TYDeviceDevice.gotoDeviceWifiNetworkMonitor || function() {}),
      (Device.gotoBlePermissions = _TYDeviceDevice.gotoBlePermissions || function() {}),
      (Device.deleteDeviceInfo = () =>
        new Promise((e, t) => {
          (
            _TYDeviceDevice.deleteDeviceInfo ||
            function() {
              t();
            }
          )(e, t);
        })),
      (Device.getFunConfig = () => {
        const e = {};
        if (!TYDeviceData.devInfo) return {};
        if (!TYDeviceData.devInfo.panelConfig) return {};
        const { fun: t } = TYDeviceData.devInfo.panelConfig;
        if (!t) return {};
        for (const i in t)
          if (Object.prototype.hasOwnProperty.call(t, i)) {
            e[camelize('panel_fun_' + i)] = t[i];
          }
        return e;
      }),
      (Device.getUnpackPanelInfo = () =>
        new Promise(e => {
          _TYDeviceDevice.getPanelInfo ? _TYDeviceDevice.getPanelInfo((t, i) => e(i)) : e('');
        }).then(
          e => (
            e && e.lang && (Native.lang = e.lang),
            (Native.panelInfo = { isVDevice: e.isVDevice }),
            e.lang
          )
        )),
      AppDeviceEventEmitter.addListener('dpDataChange', e => {
        if (isEmptyObj(TYDeviceData.devInfo))
          TYDeviceData.__unInitializeDps = { ...TYDeviceData.__unInitializeDps, ...e };
        else {
          const t = Device.formatDps(e);
          isEmptyObj(t) ||
            (__DEV__ && console.log('-----数据上报', t, e),
            Device.setState(t),
            Event.emit('deviceDataChange', { type: 'dpData', payload: t }));
        }
      }),
      AppDeviceEventEmitter.addListener('deviceChanged', () => {
        TYDeviceData && TYDeviceData.devInfo && TYDeviceData.devInfo.devId
          ? Device.initDevice().then(e =>
              Event.emit('deviceDataChange', { type: 'devInfo', payload: e })
            )
          : console.log('-----deviceChanged 发生在初始化 devInfo 之前');
      }),
      AppDeviceEventEmitter.addListener('bluetoothChange', e => {
        Event.emit('bluetoothChange', e.state);
      }),
      AppDeviceEventEmitter.addListener('bluetoothStateChanged', e => {
        Event.emit('bluetoothStateChanged', e.state);
      }),
      AppDeviceEventEmitter.addListener('deviceStateChange', e => {
        void 0 !== e &&
          void 0 !== e.state &&
          Event.emit('deviceDataChange', {
            type: 'deviceOnline',
            payload: { deviceOnline: e.state },
          });
      }),
      AppDeviceEventEmitter.addListener('networkStateChange', e => {
        void 0 !== e &&
          void 0 !== e.state &&
          Event.emit('networkStateChange', { appOnline: e.state });
      }),
      AppDeviceEventEmitter.addListener('linkageTimeUpdate', () => {
        Event.emit('linkageTimeUpdate', {});
      }),
      AppDeviceEventEmitter.addListener('deviceLocalStateChange', e => {
        void 0 !== e &&
          void 0 !== e.state &&
          Event.emit('deviceLocalStateChange', { state: e.state });
      }),
      (App.getWiFiSsid = () =>
        new Promise(e => {
          _TYAppNative.getWiFiSsid(t => {
            e(t);
          });
        })),
      (App.getNetworkState = () =>
        new Promise(e => {
          _TYAppNative.getNetworkType(t => {
            e(t);
          });
        })),
      (App.is24Hour = () =>
        new Promise(e => {
          _TYAppNative.is24Hour(t => e(t));
        })),
      (App.verSupported = e =>
        !!(_TYAppNative && _TYAppNative.mobileInfo && _TYAppNative.mobileInfo.appRnVersion) &&
        _TYAppNative.mobileInfo.appRnVersion >= e),
      (App.getMobileInfo = () =>
        new Promise((e, t) => {
          TYMobileData && Object.keys(TYMobileData).length > 0
            ? e(TYMobileData)
            : _TYAppNative.getMobileInfo(t => e(t));
        }).then(
          e => ((TYMobileData = e), TYMobileData),
          () => TYMobileData
        )),
      (App.jumpTo = e => {
        if (e && e.indexOf('http') === 0) Linking.openURL(e);
        else
          try {
            _TYAppNative.jumpTo(e || '');
          } catch (e) {
            console.log('jumpTo error', e);
          }
      }),
      (App.showLoading = e => {
        _TYAppNative.showLoading({ title: e || '' });
      }),
      (App.hideLoading = () => {
        _TYAppNative.hideLoading();
      }),
      (App.back = () => {
        _TYAppNative.back();
      }),
      (App.disablePopGesture = () => {
        Platform.OS === 'ios' && _TYDeviceDevice.disablePopGesture();
      }),
      (App.enablePopGesture = function() {
        Platform.OS === 'ios' && _TYDeviceDevice.enablePopGesture();
      }),
      (App.showPromptDialog = (e, t, i, o, a, n, s) => {
        if (Platform.OS === 'ios')
          try {
            AlertIOS.prompt(
              i,
              o,
              [
                { text: e, onPress: e => n(e), style: 'default' },
                { text: t, onPress: () => s(), style: 'cancel' },
              ],
              'plain-text',
              a
            );
          } catch (e) {}
        else _TYAppNative.showPromptDialog(i, o, a, n, s);
      }),
      (App.bottomListDialog = (e, t, i) => {
        _TYAppNative.bottomListDialog(e, t, i);
      }),
      (App.showEditDialog = (e, t, i, o) => {
        _TYAppNative.showEditDialog(e, t, i, o);
      }),
      (App.simpleConfirmDialog = (e, t, i, o) => {
        _TYAppNative.simpleConfirmDialog(e, t, i, o);
      }),
      (App.simpleTipDialog = (e, t) => {
        _TYAppNative.simpleTipDialog(e, t);
      }),
      (App.shareMsg = e => {
        _TYAppNative.shareMsg(e);
      }),
      App && NativeModules)
    ) {
      const e = NativeModules.TYRCTNavManager;
      const t = e;
      const i = 'message';
      class o {
        constructor() {
          (this.emitter = null), (this.subscription = null);
        }

        createEmitter() {
          t
            ? (this.emitter = new NativeEventEmitter(NativeModules.TYRCTNavManager))
            : console.log('-----AppRnVersion must >= 5.23');
        }

        addListener(e) {
          t
            ? this.emitter && (this.subscription = this.emitter.addListener('receiveBroadcast', e))
            : console.log('-----AppRnVersion must >= 5.23');
        }

        removeEmitter() {
          t
            ? this.subscription && this.subscription.remove()
            : console.log('-----AppRnVersion must >= 5.23');
        }

        registerEventListener() {
          t ? e.broadcastReceiverRegister(i) : console.log('-----AppRnVersion must >= 5.23');
        }

        sendEvent(o) {
          t ? e.broadcastMessage(i, o) : console.log('-----AppRnVersion must >= 5.23');
        }

        pushWithUiID(i, o) {
          t ? e.pushWithUIID(i, o) : console.log('-----AppRnVersion must >= 5.23');
        }
      }
      (App.uiIdNavEventEmitter = new o()),
        (App.jumpSubPage = (e, t) => {
          const { uiId: i } = e;
          App.uiIdNavEventEmitter.pushWithUiID(i, t);
        });
    }
    apiRequest = (e, t, i = '1.0') =>
      new Promise((o, a) => {
        _TYDeviceDevice.apiRNRequest(
          { a: e, postData: t, v: i },
          t => {
            const i = parseJson(t);
            __DEV__ && console.log(`API Success: %c${e}%o`, sucStyle, i), o(i);
          },
          t => {
            const i = parseJson(t);
            __DEV__ && console.log(`API Failed: %c${e}%o`, errStyle, i.message || i.errorMsg || i),
              a(i);
          }
        );
      });
  }
}
const TYSdk = {
  mobile: App,
  device: Device,
  apiRequest: apiRequest,
  native: Native,
  event: Event,
  DeviceEventEmitter: AppDeviceEventEmitter,
  get devInfo() {
    return TYDeviceData.devInfo;
  },
  get __unInitializeDps() {
    return TYDeviceData.__unInitializeDps;
  },
  Navigator: {},
  applyNavigator: e => {
    TYSdk.Navigator = e;
  },
};
const TYNative = TYSdk.native;
const TYMobile = TYSdk.mobile;
const TYDevice = TYSdk.device;
class I18N {
  constructor(e) {
    __DEV__,
      (this.strings = this.mergeLanguage(e, TYNative.lang)),
      (this.defaultLang = this.strings.en ? 'en' : Object.keys(this.strings)[0]),
      this.setLanguage(this.defaultLang),
      void 0 === TYNative.mobileInfo
        ? TYMobile.getMobileInfo().then(e => {
            this.setLanguage(e.lang);
          })
        : this.setLanguage(TYNative.mobileInfo.lang);
  }

  applyStrings(e, t = !1) {
    const i = t ? this.mergeLanguage(TYNative.lang, e) : this.mergeLanguage(e, TYNative.lang);
    (this.strings = this.mergeLanguage(this.strings, i)), this.buildLanguage(this.language);
  }

  forceUpdateNetworkLang(e) {
    return TYSdk.apiRequest('tuya.m.i18n.get', {
      productId: e,
      moduleName: 'h5',
      endId: 2,
      osId: 0,
    }).then(e => {
      __DEV__ && console.info('tuya.m.i18n.get', e),
        e &&
          ((this.strings = this.mergeLanguage(this.strings, e)), this.buildLanguage(this.language));
    });
  }

  mergeLanguage(e, t) {
    if (void 0 === e && void 0 === t) return {};
    if (void 0 === e) return t;
    if (void 0 === t) return e;
    const i = Object.assign({}, e);
    for (const e in t)
      void 0 !== i[e] ? Object.assign(i[e], t[e]) : (i[e] = Object.assign({}, t[e]));
    return i;
  }

  setLanguage(e) {
    const t = this._getBestMatchingLanguage(e, this.strings);
    if (t === this.language) return;
    this.language = t;
    typeof e === 'string' &&
    /^zh-hans$|^zh_hans$|^zh_cn$|^zh-cn$|^zh_hans_\w+|^zh-hans-\w+/.test(e.toLowerCase())
      ? (this.buildLanguage('zh'), this.buildLanguage(e))
      : this.buildLanguage(this.language);
  }

  buildLanguage(e) {
    if (this.strings[e]) {
      const t = this.strings[e];
      for (const e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
    }
  }

  _getBestMatchingLanguage(e, t) {
    if (t[e]) return e;
    const i = e.lastIndexOf('-');
    if (i >= 0) {
      const o = e.substring(0, i);
      return this._getBestMatchingLanguage(o, t);
    }
    const o = e.lastIndexOf('_');
    if (o >= 0) {
      const i = e.substring(0, o);
      return this._getBestMatchingLanguage(i, t);
    }
    return this.defaultLang;
  }

  formatString(e, ...t) {
    let i = e;
    for (let e = 0; e < t.length; e++) i = this._replaceAll(`{${e}}`, t[e], i);
    return i;
  }

  formatValue(e, ...t) {
    let i = this[e];
    for (let e = 0; e < t.length; e++) i = this._replaceAll(`{${e}}`, t[e], i);
    return i;
  }

  _replaceAll(e, t, i) {
    return (
      (e = e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')),
      i ? i.replace(new RegExp(e, 'g'), t) : ''
    );
  }

  getDpLang(e, t) {
    let i;
    if (void 0 === t) i = ('dp_' + e).toLowerCase();
    else if (typeof t === 'boolean') {
      i = `dp_${e}_${t ? 'on' : 'off'}`.toLowerCase();
    } else i = `dp_${e}_${t}`.toLowerCase();
    return void 0 !== this[i] ? this[i] : i;
  }

  getDpName(e, t) {
    const i = ('dp_' + e).toLowerCase();
    return void 0 !== this[i] ? this[i] : t || i;
  }

  getDpsLang(e) {
    let t = {};
    if (typeof e === 'object')
      if (typeof e.strKey === 'string') t = void 0 !== this[e.strKey] ? this[e.strKey] : e.strKey;
      else for (const i in e) t[e[i]] = void 0 !== this[e[i]] ? this[e[i]] : e[i];
    else t = void 0 !== this[e] ? this[e] : e;
    return t;
  }

  getLang(e, t) {
    return void 0 !== this[e] ? this[e] : void 0 !== t ? t : 'I18N@' + e;
  }

  getRangeStrings(e) {
    const t = {};
    const i = TYDevice.getDpSchema(e);
    if (void 0 === i) return t;
    const o = i.range;
    for (const i of o) {
      const o = `dp_${e}_${i}`.toLowerCase();
      t[i] = void 0 !== this[o] ? this[o] : o;
    }
    return t;
  }

  parseCountdown(e, t) {
    const i = parseFloat(e / 3600);
    const o = parseFloat(e / 60 - 60 * parseInt(i, 10));
    const a = i >= 1 ? `${Math.round(i)}${this.t_hour}` : `${Math.round(o)}${this.t_minute}`;
    return this.formatString(this['countdown_' + (t ? 'on' : 'off')], a);
  }

  get dps() {
    return this;
  }
}
const lang = {
  en: {
    offline: 'Device Offline',
    appoffline: 'Network error, please check ',
    loading: 'Loading...',
    confirm: 'OK',
    cancel: 'Cancel',
    back: 'Back',
    expDevice: 'Not supporting the operation for demo devices',
    complete: 'Done',
    closeTimer: 'Close Timer',
    startTimer: 'Start',
    endTimer: 'Stop',
    dptype_bool_true: 'On',
    dptype_bool_false: 'Off',
    dptype_enum: '{0}({1})',
    t_hour: 'Hour',
    t_minute: 'Minute',
    schedule: 'Schedule',
    switchOn: 'ON',
    switchOff: 'OFF',
    setting: 'Setting',
    airLevel0: 'Excellent',
    airLevel1: 'Good',
    airLevel2: 'Fine',
    airLevel3: 'Poor',
    airLevel4: 'Very Bad',
    airLevel5: 'Awful',
    day0: 'Sun',
    day1: 'Mon',
    day2: 'Tues',
    day3: 'Wed',
    day4: 'Thur',
    day5: 'Fri',
    day6: 'Sat',
    day7: 'Everyday',
    day8: 'Once',
    countdown_on: 'Turn off after {0}',
    countdown_off: 'Turn on after {0}',
    bluetoothShareTip: 'Limited functionality, please turn on "Bluetooth Sharing"',
  },
  zh: {
    offline: '设备暂时不可操作\n请稍后再试',
    appoffline: '当前网络不可用\n请检查手机网络',
    loading: '加载中...',
    confirm: '确定',
    cancel: '取消',
    back: '返回',
    expDevice: '演示设备暂不支持此操作',
    complete: '完成',
    closeTimer: '关闭定时',
    startTimer: '开始时间',
    endTimer: '结束时间',
    dptype_bool_true: '开',
    dptype_bool_false: '关',
    t_hour: '小时',
    t_minute: '分钟',
    schedule: '定时',
    switchOn: '开启',
    setting: '设置',
    switchOff: '关闭',
    airLevel0: '优',
    airLevel1: '良',
    airLevel2: '中',
    airLevel3: '差',
    airLevel4: '极差',
    airLevel5: '超级差',
    day0: '星期天',
    day1: '星期一',
    day2: '星期二',
    day3: '星期三',
    day4: '星期四',
    day5: '星期五',
    day6: '星期六',
    day7: '每天',
    day8: '仅此一次',
    countdown_on: '设备将在{0}后关闭',
    countdown_off: '设备将在{0}后开启',
    bluetoothShareTip: '功能受限，请开启“蓝牙共享”',
  },
};
const Strings = new I18N(lang);
export { I18N, Strings, TYSdk };
