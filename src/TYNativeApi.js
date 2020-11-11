import { NativeModules, Platform, NativeAppEventEmitter, DeviceEventEmitter, AlertIOS } from 'react-native';
import { EventEmitter } from 'events';

/* eslint-disable */

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

let _TYAppNative; // App Native 相关接口
let _TYDeviceDevice; // RN Device 相关接口

// ============================ 一些通用函数 ================================= //
const loop = () => {};

const type = val =>
  Object.prototype.toString
    .call(val)
    .slice(8, -1)
    .toLowerCase();

const parseJson = str => {
  let result;
  if (str && type(str) === 'string') {
    // as jsonstring
    try {
      result = JSON.parse(str);
    } catch (parseError) {
      // error! use eval
      try {
        result = eval(`(${str})`);
      } catch (evalError) {
        // normal string
        result = str;
      }
    }
  } else {
    result = typeof str === 'undefined' ? {} : str;
  }
  return result;
};

const formatValue = (val, schema) => {
  if (type(val) === 'string') {
    if (val === 'true') {
      return true;
    } else if (val === 'false') {
      return false;
    }
  } else if (type(val) === 'undefined') {
    switch (schema.type) {
      case 'bool':
        return false;
      case 'value':
        return schema.min;
      default:
        return '';
    }
  }
  return val;
};

const isNumerical = obj => Object.prototype.toString.call(obj) === '[object Number]';

const camelize = str => {
  if (isNumerical(str)) {
    return `${str}`;
  }
  str = str.replace(/[\-_\s]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''));
  // Ensure 1st char is always lowercase
  return str.substr(0, 1).toLowerCase() + str.substr(1);
};

const getBitValue = (num, index) => {
  return (num & (1 << index)) >> index;
};

// https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
// because Object.keys(new Date()).length === 0;
// we have to do some additional check
const isEmptyObj = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

// ============================ 一些通用函数 ending =========================== //

const formatDevJSON = json => {
  let code, define, id, property, val, panelConfig;

  const resultJson = json;
  const { dps } = resultJson;
  const schema = parseJson(resultJson.schema);
  resultJson.schema = {};
  resultJson.codeIds = {};
  resultJson.idCodes = {};
  resultJson.state = {};

  for (const i in schema) {
    define = schema[i];
    code = define.code;
    id = `${define.id}`;
    property = parseJson(define.property); // property.type dp值type
    define.dptype = define.type; // dp点type
    define = Object.assign({}, define, property);
    define.id = id;
    resultJson.codeIds[code] = id;
    resultJson.idCodes[id] = code;
    val = formatValue(dps[id], define);
    resultJson.state[code] = val;
    resultJson.schema[code] = define;
    delete define.property;
  }
  // delete json.dps;

  if (resultJson.panelConfig) {
    panelConfig = Object.assign({}, resultJson.panelConfig);
    for (const k in panelConfig) {
      resultJson.panelConfig[k] =
        typeof panelConfig[k] === 'string' ? parseJson(panelConfig[k]) : panelConfig[k];
    }
  } else {
    resultJson.panelConfig = {};
  }

  return resultJson;
};

const formatUiConfig = devInfo => {
  // eslint-disable-next-line
  let uiConfig = devInfo.uiConfig ? { ...devInfo.uiConfig } : {};

  Object.keys(devInfo.schema).forEach(itKey => {
    const dps = devInfo.schema[itKey];
    const strKey = `dp_${dps.code}`;
    const key = camelize(strKey);
    uiConfig[key] = {
      key,
      strKey: strKey.toLowerCase(),
      code: dps.code,
      attr: {},
      attri: {},
    };

    switch (dps.type) {
      case 'enum':
        dps.range.forEach(it => {
          const k = `${strKey}_${it}`.toLowerCase();
          uiConfig[key].attr[it] = k;
          uiConfig[key].attri[k] = it;
        });
        break;

      case 'bool':
        const on = `${strKey}_on`.toLowerCase();
        const off = `${strKey}_off`.toLowerCase();
        uiConfig[key].attr = {
          false: off,
          true: on,
        };
        uiConfig[key].attri = {
          [`${strKey}_off`.toLowerCase()]: false,
          [`${strKey}_on`.toLowerCase()]: true,
        };
        break;

      case 'bitmap':
        // eslint-disable-next-line
        for (const v of dps.label) {
          const k = `${strKey}_${v}`.toLowerCase();
          uiConfig[key].attr[v] = k;
          uiConfig[key].attri[k] = v;
        }
        break;
    }
  });

  if (!devInfo.panelConfig || !devInfo.panelConfig.bic) return uiConfig;

  const { bic, fun } = devInfo.panelConfig;
  // let bic = typeof bicN === 'string' ? Utils.parseJSON(bicN) : bicN;

  // eslint-disable-next-line
  if (bic) {
    for (const i in bic) {
      const key = camelize(`panel_${bic[i].code}`);
      if (bic[i].selected === true) {
        uiConfig[key] = bic[i].value ? parseJSON(bic[i].value) : true;
      } else {
        uiConfig[key] = false;
      }
    }
  }

  if (fun) {
    for (const i in fun) {
      const key = camelize(`panel_fun_${i}`);
      uiConfig[key] = fun[i];
    }
  }

  return uiConfig;
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
  _TYAppNative = NativeModules.TYRCTPublicModule || NativeModules.TYRCTPublicManager;
  _TYDeviceDevice = NativeModules.TYRCTDeviceModule || NativeModules.TYRCTPanelManager;

  AppDeviceEventEmitter = Platform.select({
    ios: () => NativeAppEventEmitter,
    android: () => DeviceEventEmitter,
  })();
  // events
  const RNEventEmitter = new EventEmitter();
  RNEventEmitter.setMaxListeners(0);
  // Event = RNEventEmitter;
  const eventsType = ['on', 'once', 'emit'];
  eventsType.forEach(it => {
    Event[it] = RNEventEmitter[it].bind(RNEventEmitter);
  });
  Event.fire = RNEventEmitter.emit.bind(RNEventEmitter);
  Event.remove = RNEventEmitter.removeListener.bind(RNEventEmitter);
  /* istanbul ignore next */
  Event.off = function(eventType) {
    if (arguments.length === 1) {
      RNEventEmitter.removeAllListeners(eventType);
    }
    if (arguments.length === 2) {
      RNEventEmitter.removeListener(eventType, arguments[1]);
    }
  };

  if (_TYAppNative && _TYDeviceDevice) {
    // 缓存数据
    TYDeviceData.gState = {};
    TYDeviceData.uiConfig = {};
    Native = {
      ..._TYAppNative,
      ..._TYDeviceDevice,
    };
    TYDeviceData.devInfo = {};
    App.mobileInfo = _TYAppNative.mobileInfo;

    // =====================================================================
    // ============================== Device  ==============================
    // =====================================================================
    Device.formatDps = dps => {
      if (TYDeviceData.devInfo && TYDeviceData.devInfo.idCodes) {
        return Object.keys(dps).reduce((state, dp) => {
          const code = TYDeviceData.devInfo.idCodes[dp];
          return {
            ...state,
            [code]: dps[dp],
          };
        }, {});
      }
      return {};
    };

    Device.setState = (dp, val) => {
      const state = {};
      // 批量设置
      if (type(dp) === 'object') {
        for (let p in dp) {
          if (Device.checkDpExist(p)) {
            p = /^\d+$/.test(p) ? Device.getDpCodeById(p) : p;
            state[p] = dp[p];
          } else {
            console.log('1-----参数错误');
            return;
          }
        }

        if (!isEmptyObj(state)) {
          TYDeviceData.devInfo.state = {
            ...TYDeviceData.devInfo.state,
            ...state,
          };

          for (const p in state) {
            if (INTERNAL_EVENT_TYPE.indexOf(p) !== -1) {
              console.warn(`DP Code can not be one of [${INTERNAL_EVENT_TYPE}]`);
              continue;
            }
            if (Object.prototype.hasOwnProperty.call(state, p)) {
              Event.emit(p, state);
            }
          }
        }
      } else if (Device.checkDpExist(dp)) {
        const dpCode = /^\d+$/.test(dp) ? Device.getDpCodeById(dp) : dp;
        state[dpCode] = val;
        if (!isEmptyObj(state)) {
          TYDeviceData.devInfo.state = {
            ...TYDeviceData.devInfo.state,
            ...state,
          };
          Event.emit(dpCode, state);
        }
      } else {
        console.log('2-----参数错误');
      }
      return state;
    };

    Device.checkDpExist = idOrCode =>
      Device.getDpIdByCode(idOrCode) || Device.getDpCodeById(idOrCode);

    Device.setDevState = state => {
      TYDeviceData.devInfo = { ...TYDeviceData.devInfo, ...state };
      return TYDeviceData.devInfo;
    };

    // 获取设备信息
    Device.getDeviceInfo = () =>
      new Promise(resolve => {
        if (TYDeviceData.devInfo) {
          resolve(TYDeviceData.devInfo);
        } else {
          Device.initDevice().then(d => {
            resolve(d);
          });
        }
      });

    // 获取设备当前最新的状态（getDeviceInfo 里的 state 可能存在白屏渲染阶段时上报导致无法收集）
    Device.getDeviceState = () =>
      new Promise(resolve =>
        _TYDeviceDevice.getDevInfo({}, d => {
          if (!d || !d.dps) {
            return resolve({});
          }
          const dpState = {};
          for (const dpId in d.dps) {
            if (Object.prototype.hasOwnProperty.call(d.dps, dpId)) {
              const dpCode = Device.getDpCodeById(dpId);
              dpState[dpCode] = d.dps[dpId];
            }
          }
          return resolve(dpState);
        })
      );

    Device.initDevice = () =>
      Promise.all([
        new Promise(resolve => _TYDeviceDevice.getDevInfo({}, d => resolve(d))),
        App.getNetworkState(),
      ]).then(d => {
        const networkType = type(d[1].type) === 'undefined' ? d[1] : d[1].type;
        Device.setDeviceInfo({ networkType, ...d[0] });
        return TYDeviceData.devInfo;
      });

    Device.setDeviceInfo = d => {
      if (!d.devId) {
        TYDeviceData.uiConfig = {};
        TYDeviceData.devInfo = {};
      } else {
        const deviceData = d;
        deviceData.deviceOnline = d.isOnline;
        delete deviceData.isOnline;
        const devInfo = formatDevJSON({
          appOnline: d.networkType !== 'NONE',
          ...deviceData,
        });
        TYDeviceData.uiConfig = formatUiConfig(devInfo);
        devInfo.isVDevice = d.devId && d.devId.indexOf('vdev') === 0;
        TYDeviceData.devInfo = devInfo;
      }
    };

    Device.getDpIdByCode = code => {
      if (TYDeviceData.devInfo) {
        const { codeIds } = TYDeviceData.devInfo;
        return codeIds[code];
      }
      console.log('-----未初始化,getDpIdByCode');
    };

    Device.getDpCodeById = id => {
      if (TYDeviceData.devInfo) {
        const { idCodes } = TYDeviceData.devInfo;
        return idCodes[id];
      }
      console.log('-----未初始化,getDpCodeById');
    };

    Device.getDpCodes = () => {
      if (TYDeviceData.devInfo) {
        const { idCodes } = TYDeviceData.devInfo;
        return Object.keys(idCodes);
      }
      console.log('-----未初始化,getDpCodes');
      return [];
    };

    Device.isShareDevice = () => {
      if (TYDeviceData.devInfo) {
        return !!TYDeviceData.devInfo.isShare;
      }
      console.log('-----未初始化,isShareDevice');
      return true;
    };

    Device.getDpSchema = code => {
      if (TYDeviceData.devInfo) {
        if (code) {
          return TYDeviceData.devInfo.schema[code];
        }
        return TYDeviceData.devInfo.schema;
      }
      console.log('-----未初始化,getDpSchema');
    };

    Device.getState = dp => {
      if (isEmptyObj(TYDeviceData.devInfo)) {
        console.log('-----未初始化,devInfo getState');
        return;
      }
      if (!dp) {
        if (typeof TYDeviceData.devInfo.state === 'undefined') {
          TYDeviceData.devInfo.state = {};
        }
        return TYDeviceData.devInfo.state;
      }
      if (Device.checkDpExist(dp)) {
        if (/^\d+$/.test(dp)) {
          dp = Device.getDpCodeById(dp);
        }
        return TYDeviceData.devInfo.state[dp];
      }
      console.log('3-----参数错误');
    };

    /* istanbul ignore next */
    Device.setGState = (dp, val) => {
      let state = {};
      // 批量设置
      if (type(dp) === 'object') {
        state = dp;
      } else {
        state[dp] = val;
      }
      TYDeviceData.gState = { ...TYDeviceData.gState, ...state };
      return state;
    };

    /* istanbul ignore next */
    Device.getGState = dp => {
      if (!dp) {
        return TYDeviceData.gState;
      }
      return TYDeviceData.gState[dp];
    };

    Device.getDpDataFromDevice = idOrCode => {
      console.log('-----主动查询DP', idOrCode);
      return new Promise((resolve, reject) => {
        let err;
        let dpId = `${idOrCode}`;
        if (!Device.checkDpExist(dpId)) {
          err = { ret: 'param error' };
          Event.emit('message', err);
          return;
        }
        if (!/^\d+$/.test(dpId)) {
          dpId = Device.getDpIdByCode(idOrCode);
        }
        const error = d => {
          Event.emit('message', d);
        };
        if (Device.isMeshDevice()) {
          return _TYDeviceDevice.getDpDataFromMeshDevice({ dpIds: [dpId] }, error);
        }
        _TYDeviceDevice.getDpDataFromDevice(
          {
            dpId,
          },
          loop,
          d => {
            Event.emit('message', d);
          }
        );
      });
    };

    // 到硬件查询dp点
    // 设置dp点
    Device.putDeviceData = data =>
      new Promise((resolve, reject) => {
        const { option, ...params } = data;
        let isEmpty = true;
        let err;
        const cmds = {};
        for (const dp in params) {
          if (Device.checkDpExist(dp)) {
            const dpId = /^\d+$/.test(dp) ? dp : Device.getDpIdByCode(dp);
            cmds[dpId] = params[dp];
            isEmpty = false;
          }
        }
        if (isEmpty) {
          err = { error: 'param error' };
          reject(err);
          Event.emit('message', err);
          return;
        }
        if (__DEV__) {
          console.log('-----数据下发', data, cmds);
        }
        _TYDeviceDevice.putDpData(
          {
            command: cmds, // {'1': true, '2': false}
            option: type(option) === 'undefined' ? 3 : option, // 0，静音； 1，震动；2,声音； 3，震动声音
          },
          () => resolve({ success: true }),
          d => {
            console.log('-----返回结果错误?', d);
            reject(d);
            Event.emit('message', d);
          }
        );
      });

    // 局域网
    Device.putLocalDpData = data =>
      new Promise((resolve, reject) => {
        const { option, ...params } = data;
        let isEmpty = true;
        let err;
        const cmds = {};
        for (let dpId in params) {
          // 验证dp点是否合法
          if (Device.checkDpExist(dpId)) {
            const dpCode = dpId;
            // 如果不是id值，整型
            if (!/^\d+$/.test(dpId)) {
              dpId = Device.getDpIdByCode(dpCode);
            }
            cmds[dpId] = params[dpCode];
            isEmpty = false;
          }
        }

        if (isEmpty) {
          err = { ret: 'param error' };
          reject(err);
          Event.emit('message', err);
          return;
        }
        console.log('-----数据下发', data, cmds);
        _TYDeviceDevice.putLocalDpData(
          {
            command: cmds, // {'1': true, '2': false}
            option: typeof option === 'undefined' ? 3 : option, // 0，静音； 1，震动；2,声音； 3，震动声音
          },
          () => resolve(),
          d => {
            console.log('-----返回结果错误?', d);
            reject(d);
            Event.emit('message', d);
          }
        );
      });

    /**
     * 是否是mesh wifi设备
     * 返回值: undefined | bool
     * 当 undefined，app不支持该接口
     */
    Device.isMeshWifiDevice = () => {
      if (!TYDeviceData.devInfo) {
        throw new Error('Device uninitialized');
      }
      const { pcc } = TYDeviceData.devInfo;
      if (pcc !== undefined) {
        return pcc === '0108';
      }
      return pcc;
    };

    Device.isMeshDevice = () => {
      if (!TYDeviceData.devInfo) {
        throw new Error('Device uninitialized');
      }
      const { capability = 0 } = TYDeviceData.devInfo;
      return getBitValue(capability, 11) === 1;
    };

    /**
     * 是否是sigMesh设备
     **/
    Device.isSigMeshDevice = () => {
      if (!TYDeviceData.devInfo) {
        throw new Error('Device uninitialized');
      }
      const { capability = 0 } = TYDeviceData.devInfo;
      return getBitValue(capability, 15) === 1;
    };

    /**
     * 是否是wifi设备
     * 返回值: undefined | bool
     * 当 undefined，app不支持该接口
     */
    Device.isWifiDevice = () => {
      if (!TYDeviceData.devInfo) {
        throw new Error('Device uninitialized');
      }
      const { capability = 0 } = TYDeviceData.devInfo;
      return capability === 1;
    };

    /**
     * 是否是蓝牙设备
     **/
    Device.isBleDevice = () => {
      if (!TYDeviceData.devInfo) {
        throw new Error('Device uninitialized');
      }
      const { capability = 0 } = TYDeviceData.devInfo;
      return (
        getBitValue(capability, 10) === 1 ||
        getBitValue(capability, 11) === 1 ||
        getBitValue(capability, 15) === 1
      );
    };

    /**
     * 是否局域网
     */
    Device.isLocalLAN = () => {
      if (!TYDeviceData.devInfo) {
        throw new Error('Device uninitialized');
      }
      const { attribute = 0 } = TYDeviceData.devInfo;
      return getBitValue(attribute, 6) === 1;
    };

    /**
     * 获取蓝牙状态
     * 返回值: bool类型
     */
    Device.getBleManagerState = () => {
      return new Promise((resolve, reject) => {
        (_TYDeviceDevice.getBleManagerState ||
          function() {
            reject();
          })(d => {
          if (d) {
            return resolve(d.state);
          }
          reject();
        });
      });
    };

    /**
     *
     * @desc 获取设备蓝牙权限状态，IOS13新增
     *
     * state = 3, 未打开应用蓝牙权限
     * state = 4, 系统蓝牙关闭
     * state = 5, 系统蓝牙打开
     */
    Device.getBluetoothState = () => {
      return new Promise((resolve, reject) => {
        const TYRCTBluetoothUtilManager = NativeModules.TYRCTBluetoothUtilManager || {};
        (TYRCTBluetoothUtilManager.getBluetoothState ||
          function() {
            reject(null);
          })(d => {
          if (d) {
            return resolve(d.state);
          }
          reject(null);
        });
      });
    };

    /**
     * wifi网络状态监测
     */
    Device.gotoDeviceWifiNetworkMonitor =
      _TYDeviceDevice.gotoDeviceWifiNetworkMonitor || function() {};

    /**
     * 申请蓝牙权限
     */
    Device.gotoBlePermissions = _TYDeviceDevice.gotoBlePermissions || function() {};

    /**
     * 删除设备
     */
    Device.deleteDeviceInfo = () => {
      return new Promise((resolve, reject) => {
        (_TYDeviceDevice.deleteDeviceInfo ||
          function() {
            reject();
          })(resolve, reject);
      });
    };

    /**
     * 获取设备功能点配置
     */
    Device.getFunConfig = () => {
      const funConfig = {};
      if (!TYDeviceData.devInfo) return {};
      if (!TYDeviceData.devInfo.panelConfig) return {};
      const { fun } = TYDeviceData.devInfo.panelConfig;
      if (!fun) return {};
      for (const i in fun) {
        if (Object.prototype.hasOwnProperty.call(fun, i)) {
          const key = camelize(`panel_fun_${i}`);
          funConfig[key] = fun[i];
        }
      }
      return funConfig;
    };

    /**
     * 获取拆包面板信息
     */
    Device.getUnpackPanelInfo = () => {
      return new Promise(resolve => {
        if (_TYDeviceDevice.getPanelInfo) {
          _TYDeviceDevice.getPanelInfo((_, d) => resolve(d));
        } else {
          resolve('');
        }
      }).then(d => {
        if (d && d.lang) {
          Native.lang = d.lang;
        }
        Native.panelInfo = { isVDevice: d.isVDevice };
        return d.lang;
      });
    };

    // =====================================================================
    // ============================= Device end ============================
    // =====================================================================

    // =====================================================================
    // ======================= AppDeviceEventEmitter =======================
    // =====================================================================
    // 设备dp状态变更通知
    AppDeviceEventEmitter.addListener('dpDataChange', d => {
      if (!isEmptyObj(TYDeviceData.devInfo)) {
        const newState = Device.formatDps(d);
        if (!isEmptyObj(newState)) {
          if (__DEV__) {
            console.log('-----数据上报', newState, d);
          }
          Device.setState(newState);
          Event.emit('deviceDataChange', { type: 'dpData', payload: newState });
        }
      } else {
        /**
         * 如果在根组件 mount 完毕之前，消息推送过来了，
         * 面板会使用 app 刚进入面板传递的状态，导致状态与实体设备不一致,
         * 因此这里需要将最新推送过来的数据缓存起来，业务面板在渲染完毕后自行再同步一次。
         */
        TYDeviceData.__unInitializeDps = {
          ...TYDeviceData.__unInitializeDps,
          ...d,
        };
      }
    });

    // 设备信息变更通知,只通知,无数据
    AppDeviceEventEmitter.addListener('deviceChanged', () => {
      Device.initDevice().then(d =>
        Event.emit('deviceDataChange', { type: 'devInfo', payload: d })
      );
    });

    // 蓝牙状态变更通知
    AppDeviceEventEmitter.addListener('bluetoothChange', d => {
      Event.emit('bluetoothChange', d.state);
    });

    /**
     *
     * @desc 升级版蓝牙状态变更通知，IOS13新增
     *
     * state = 3, 未打开应用蓝牙权限
     * state = 4, 系统蓝牙关闭
     * state = 5, 系统蓝牙打开
     */
    AppDeviceEventEmitter.addListener('bluetoothStateChanged', d => {
      Event.emit('bluetoothStateChanged', d.state);
    });

    // 设备网络状态变更通知
    AppDeviceEventEmitter.addListener('deviceStateChange', d => {
      if (typeof d === 'undefined' || typeof d.state === 'undefined') return;
      Event.emit('deviceDataChange', {
        type: 'deviceOnline',
        payload: { deviceOnline: d.state },
      });
    });

    // app网络状态变更通知
    AppDeviceEventEmitter.addListener('networkStateChange', d => {
      if (typeof d === 'undefined' || typeof d.state === 'undefined') return;
      Event.emit('networkStateChange', { appOnline: d.state });
    });

    // 设备信息变更通知,只通知,无数据
    AppDeviceEventEmitter.addListener('linkageTimeUpdate', () => {
      Event.emit('linkageTimeUpdate', {});
    });

    // app 是否为局域网在线通知
    AppDeviceEventEmitter.addListener('deviceLocalStateChange', d => {
      if (typeof d === 'undefined' || typeof d.state === 'undefined') return;
      Event.emit('deviceLocalStateChange', { state: d.state });
    });

    // =====================================================================
    // ===================== AppDeviceEventEmitter end =====================
    // =====================================================================

    // =====================================================================
    // ============================ App ====================================
    // =====================================================================

    // 获取ssid
    // 此方法 ios native 有的，但是 Android 没有发现有，不知道用了什么黑魔法
    App.getWiFiSsid = () =>
      new Promise(resolve => {
        _TYAppNative.getWiFiSsid(t => {
          resolve(t);
        });
      });

    // 获取客户端网络状态
    // {type: 'WIFI|GPRS|NONE'}
    App.getNetworkState = () =>
      new Promise(resolve => {
        _TYAppNative.getNetworkType(t => {
          resolve(t);
        });
      });

    App.is24Hour = () =>
      new Promise(resolve => {
        _TYAppNative.is24Hour(is24 => resolve(is24));
      });

    // App related
    App.verSupported = version => {
      if (_TYAppNative && _TYAppNative.mobileInfo && _TYAppNative.mobileInfo.appRnVersion) {
        return _TYAppNative.mobileInfo.appRnVersion >= version;
      }
      return false;
    };

    // 获取客户端信息
    App.getMobileInfo = () =>
      new Promise((resolve, reject) => {
        if (TYMobileData && Object.keys(TYMobileData).length > 0) {
          resolve(TYMobileData);
          return;
        }
        _TYAppNative.getMobileInfo(d => resolve(d));
      }).then(
        d => {
          TYMobileData = d;
          return TYMobileData;
        },
        () => TYMobileData
      );

    App.jumpTo = url => {
      _TYAppNative.jumpTo(url || '');
    };

    // 展示loading，有问题 （在ios中，在modal的上层显示dialog，会导致生命周期异常无法控制）
    App.showLoading = title => {
      _TYAppNative.showLoading({
        title: title || '',
      });
    };

    App.hideLoading = () => {
      _TYAppNative.hideLoading();
    };

    App.back = () => {
      _TYAppNative.back();
    };

    App.disablePopGesture = () => {
      if (Platform.OS === 'ios') {
        _TYDeviceDevice.disablePopGesture();
      }
    };

    App.enablePopGesture = function() {
      if (Platform.OS === 'ios') {
        _TYDeviceDevice.enablePopGesture();
      }
    };

    App.showPromptDialog = (
      confirmText,
      cancelText,
      title,
      message,
      defaultValue,
      onConfirmed,
      onCanceled
    ) => {
      if (Platform.OS === 'ios') {
        try {
          AlertIOS.prompt(
            title,
            message,
            [
              {
                text: confirmText,
                onPress: inputText => onConfirmed(inputText),
                style: 'default',
              },
              {
                text: cancelText,
                onPress: () => onCanceled(),
                style: 'cancel',
              },
            ],
            'plain-text',
            defaultValue
          );
        } catch (e) {}
      } else {
        _TYAppNative.showPromptDialog(title, message, defaultValue, onConfirmed, onCanceled);
      }
    };

    App.bottomListDialog = (itemList, selected, onConfirmed) => {
      _TYAppNative.bottomListDialog(itemList, selected, onConfirmed);
    };

    App.showEditDialog = (title, editString, onConfirmed, onCanceled) => {
      _TYAppNative.showEditDialog(title, editString, onConfirmed, onCanceled);
    };

    App.simpleConfirmDialog = (title, msg, onConfirmed, onCanceled) => {
      _TYAppNative.simpleConfirmDialog(title, msg, onConfirmed, onCanceled);
    };

    App.simpleTipDialog = (msg, onConfirmed) => {
      _TYAppNative.simpleTipDialog(msg, onConfirmed);
    };

    // 分享。rn 0.38.0 智能台灯定制
    App.shareMsg = map => {
      _TYAppNative.shareMsg(map);
    };

    // 面板跳面板
    if (App && NativeModules) {
      const _TYAppNativeNav = NativeModules.TYRCTNavManager;
      const _AppSupport = App.verSupported(5.23) && _TYAppNativeNav;
      const NavEventName = 'message';

      /* istanbul ignore next */
      class SubPageNav {
        constructor() {
          this.emitter = null;
          this.subscription = null;
        }

        createEmitter() {
          if (!_AppSupport) {
            console.log('-----AppRnVersion must >= 5.23');
            return;
          }
          this.emitter = new NativeEventEmitter(NativeModules.TYRCTNavManager);
        }

        addListener(callback) {
          if (!_AppSupport) {
            console.log('-----AppRnVersion must >= 5.23');
            return;
          }
          if (this.emitter) {
            this.subscription = this.emitter.addListener('receiveBroadcast', callback);
          }
        }

        removeEmitter() {
          if (!_AppSupport) {
            console.log('-----AppRnVersion must >= 5.23');
            return;
          }
          if (this.subscription) {
            this.subscription.remove();
          }
        }

        registerEventListener() {
          if (!_AppSupport) {
            console.log('-----AppRnVersion must >= 5.23');
            return;
          }
          _TYAppNativeNav.broadcastReceiverRegister(NavEventName);
        }

        sendEvent(props) {
          if (!_AppSupport) {
            console.log('-----AppRnVersion must >= 5.23');
            return;
          }
          _TYAppNativeNav.broadcastMessage(NavEventName, props);
        }

        pushWithUiID(uiId, props) {
          if (!_AppSupport) {
            console.log('-----AppRnVersion must >= 5.23');
            return;
          }
          _TYAppNativeNav.pushWithUIID(uiId, props);
        }
      }

      const uiIdNavEventEmitter = new SubPageNav();

      App.jumpSubPage = (uiIdParams, pageParams) => {
        const { uiId } = uiIdParams;
        uiIdNavEventEmitter.pushWithUiID(uiId, pageParams);
      };
    }

    // =====================================================================
    // ============================ App end ================================
    // =====================================================================

    apiRequest = (a, postData, v = '1.0') =>
      new Promise((resolve, reject) => {
        _TYDeviceDevice.apiRNRequest(
          {
            a,
            postData,
            v,
          },
          d => {
            const data = parseJson(d);
            if (__DEV__) {
              console.log(`API Success: %c${a}%o`, sucStyle, data);
            }
            resolve(data);
          },
          err => {
            const e = parseJson(err);
            if (__DEV__) {
              console.log(`API Failed: %c${a}%o`, errStyle, e.message || e.errorMsg || e);
            }
            reject(e);
          }
        );
      });
  }
}

const TYSdk = {
  mobile: App,
  device: Device,
  apiRequest,
  native: Native,
  event: Event,
  DeviceEventEmitter: AppDeviceEventEmitter,
  get devInfo() {
    return TYDeviceData.devInfo;
  },
  get __unInitializeDps() {
    return TYDeviceData.__unInitializeDps;
  },
};

// NavigatorLayout里特殊处理设置....
TYSdk.Navigator = {};
TYSdk.applyNavigator = navigator => {
  TYSdk.Navigator = navigator;
};

const TYNative = TYSdk.native;
const TYMobile = TYSdk.mobile;
const TYDevice = TYSdk.device;

class I18N {
  constructor(props) {
    if (__DEV__) ;

    this.strings = this.mergeLanguage(props, TYNative.lang);
    this.defaultLang = this.strings.en ? 'en' : Object.keys(this.strings)[0];
    this.setLanguage(this.defaultLang);
    if (typeof TYNative.mobileInfo === 'undefined') {
      TYMobile.getMobileInfo().then(d => {
        this.setLanguage(d.lang);
      });
    } else {
      this.setLanguage(TYNative.mobileInfo.lang);
    }
  }

  applyStrings(strings) {
    // console.log('TYNative.lang', TYNative.lang);
    const strLang = this.mergeLanguage(strings, TYNative.lang);
    this.strings = this.mergeLanguage(this.strings, strLang);
    this.buildLanguage(this.language);
  }

  forceUpdateNetworkLang(productId) {
    return TYSdk.apiRequest('tuya.m.i18n.get', {
      productId,
      moduleName: 'h5',
      endId: 2,
      osId: 0,
    }).then(data => {
      if (__DEV__) {
        console.info('tuya.m.i18n.get', data);
      }
      if (data) {
        this.strings = this.mergeLanguage(this.strings, data);
        this.buildLanguage(this.language);
      }
    });
  }

  mergeLanguage(L1, L2) {
    if (typeof L1 === 'undefined' && typeof L2 === 'undefined') return {};
    if (typeof L1 === 'undefined') return L2;
    if (typeof L2 === 'undefined') return L1;

    const L0 = Object.assign({}, L1);
    for (const k in L2) {
      if (typeof L0[k] !== 'undefined') {
        Object.assign(L0[k], L2[k]);
      } else {
        L0[k] = Object.assign({}, L2[k]);
      }
    }
    return L0;
  }

  setLanguage(language) {
    const bestLanguage = this._getBestMatchingLanguage(language, this.strings);
    if (bestLanguage === this.language) return;
    this.language = bestLanguage;
    /**
     * ios 的中文简体固定为 zh-Hans，
     * 但安卓的中文简体可能有一大堆排列组件 = =，如 zh_CN、zh_cn、zh_Hans_CH、zh_hans_cn 等等;
     */
    const isZhRegex = /^zh-hans$|^zh_hans$|^zh_cn$|^zh-cn$|^zh_hans_\w+|^zh-hans-\w+/;
    /**
     * 如果匹配到位中文简体地区，
     * 则将中文 zh 相关的 values 都写入到 this.strings 下，保证兜底本地 zh 相关的能取到，
     * 再将当前地区 key 相关的 values 都写入到 this.strings 下，优先级最高；
     */
    if (typeof language === 'string' && isZhRegex.test(language.toLowerCase())) {
      this.buildLanguage('zh');
      this.buildLanguage(language);
    } else {
      this.buildLanguage(this.language);
    }
  }

  buildLanguage(language) {
    if (this.strings[language]) {
      const localizedStrings = this.strings[language];
      for (const key in localizedStrings) {
        if (localizedStrings.hasOwnProperty(key)) {
          this[key] = localizedStrings[key];
        }
      }
    }
  }

  _getBestMatchingLanguage(language, props) {
    if (props[language]) return language;
    const idx = language.lastIndexOf('-');
    if (idx >= 0) {
      const lang = language.substring(0, idx);
      return this._getBestMatchingLanguage(lang, props);
    }
    const underlineIdx = language.lastIndexOf('_');
    if (underlineIdx >= 0) {
      const lang = language.substring(0, underlineIdx);
      return this._getBestMatchingLanguage(lang, props);
    }
    return this.defaultLang;
  }

  // Format the passed string replacing the numbered placeholders
  // i.e. I'd like some {0} and {1}, or just {0}
  // Use example:
  //  strings.formatString(strings.question, strings.bread, strings.butter)
  formatString(str, ...values) {
    let res = str;
    for (let i = 0; i < values.length; i++) {
      res = this._replaceAll(`{${i}}`, values[i], res);
    }
    return res;
  }

  formatValue(key, ...values) {
    let res = this[key];
    for (let i = 0; i < values.length; i++) {
      res = this._replaceAll(`{${i}}`, values[i], res);
    }
    return res;
  }

  _replaceAll(find, replace, str) {
    find = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    if (!str) return '';
    return str.replace(new RegExp(find, 'g'), replace);
  }

  getDpLang(code, value) {
    let key;
    if (typeof value === 'undefined') {
      key = `dp_${code}`.toLowerCase();
    } else if (typeof value === 'boolean') {
      const valStr = value ? 'on' : 'off';
      key = `dp_${code}_${valStr}`.toLowerCase();
    } else {
      key = `dp_${code}_${value}`.toLowerCase();
    }
    return typeof this[key] !== 'undefined' ? this[key] : key;
  }

  getDpName(code, defaultName) {
    const key = `dp_${code}`.toLowerCase();
    return typeof this[key] !== 'undefined' ? this[key] : defaultName || key;
  }

  getDpsLang(key) {
    let strs = {};
    if (typeof key === 'object') {
      if (typeof key.strKey === 'string') {
        strs = typeof this[key.strKey] !== 'undefined' ? this[key.strKey] : key.strKey;
      } else {
        for (const i in key) {
          strs[key[i]] = typeof this[key[i]] !== 'undefined' ? this[key[i]] : key[i];
        }
      }
    } else {
      strs = typeof this[key] !== 'undefined' ? this[key] : key;
    }
    return strs;
  }

  getLang(key, defaultString) {
    return typeof this[key] !== 'undefined'
      ? this[key]
      : typeof defaultString !== 'undefined'
        ? defaultString
        : `I18N@${key}`;
  }

  /**
   *  获取picker标题
   * @param {*} dpCode
   */
  getRangeStrings(dpCode) {
    const result = {};
    const schema = TYDevice.getDpSchema(dpCode);
    if (typeof schema === 'undefined') return result;
    const lists = schema.range;
    for (const v of lists) {
      const key = `dp_${dpCode}_${v}`.toLowerCase();
      result[v] = typeof this[key] !== 'undefined' ? this[key] : key;
    }
    return result;
  }

  /**
   *  开关倒计时转换为文案 time => 设备将在xxx后 关闭／开启
   *  精确到分钟
   * @param {*} t 倒计时剩余(秒)
   * @param {*} power 设备当前的开关状态 (如果当前设备为开启状态， 则倒计时显示为关闭)
   */
  parseCountdown(t, power) {
    const h = parseFloat(t / 3600);
    const m = parseFloat(t / 60 - parseInt(h, 10) * 60);

    const time = h >= 1.0 ? `${Math.round(h)}${this.t_hour}` : `${Math.round(m)}${this.t_minute}`;

    return this.formatString(this[`countdown_${power ? 'on' : 'off'}`], time);
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
