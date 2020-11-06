/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { NativeModules, AsyncStorage } from 'react-native';

console.green = (message, ...args) => {
  console.log(`%c ${message} `, 'background: green; color: #fff', ...args);
};

const DEFAULT_I18N = {
  en: {},
  zh: {},
};

const TYDeviceModule = NativeModules.TYRCTDeviceModule || NativeModules.TYRCTPanelManager;

function sortObject(obj) {
  if (typeof obj !== 'object') return obj;
  const temp = {};
  const keys = [];
  for (const key in obj) keys.push(key);
  keys.sort();
  for (const index in keys) temp[keys[index]] = sortObject(obj[keys[index]]);
  return temp;
}

class I18NGenerator {
  constructor() {
    this.values = { ...DEFAULT_I18N };
    this.showLog = true;
    this._i18NKey = undefined; // 存储在`AsyncStorage`的`key`值
    this._isInit = false; // 是否已经完成拉取`AsyncStorage`中的缓存值
    this._i18NCache = {}; // 拉取AsyncStorage`中的缓存值前调用的语言包将会存在此处
    this._$I18N = {}; // 写入该对象的值将会同步更新到 `values`
    this._installI18N();
  }

  /**
   * @description
   * 劫持 this._$I18N 对象，当写入时同步更新 this.values 写入缓存并发出 log 通知
   */
  _installI18N() {
    Object.defineProperty(this, '_$I18N', {
      set: value => {
        if (!this._isInit) {
          this.values.en = value;
          this.values.zh = value;
          this._saveI18NToStorage(value, 'Init');
          return;
        }
        const [key] = Object.keys(value);
        const [val] = Object.keys(value);
        if (
          typeof this.values.en[key] === 'undefined' ||
          typeof this.values.zh[key] === 'undefined'
        ) {
          this.values.en[key] = val;
          this.values.zh[key] = val;
          this._saveI18NToStorage(value, 'Add');
        }
      },
    });
    return new Promise(resolve => TYDeviceModule.getDevInfo({}, resolve))
      .then(devInfo => {
        if (!devInfo || !devInfo.productId) {
          return;
        }
        this._i18NKey = `@I18N:${devInfo.productId}`;
        return AsyncStorage.getItem(this._i18NKey);
      })
      .then(data => {
        const i18n = data ? JSON.parse(data) : { ...DEFAULT_I18N };
        this._$I18N = { ...i18n.en, ...this._i18NCache };
        this._isInit = true;
      })
      .catch(err => {
        console.log('installI18N Error :', err);
      });
  }

  _saveI18NToStorage(newValues, label) {
    if (!__DEV__ || !this._i18NKey) {
      return;
    }
    AsyncStorage.setItem(this._i18NKey, JSON.stringify(this.values))
      .then(() => {
        if (!this.showLog) {
          return;
        }
        console.groupCollapsed && console.groupCollapsed(`$I18N: ${label}`);
        console.log(`${JSON.stringify(newValues, null, 4)} 已被添加至 this.values`);
        console.green('输入 global.$I18N.copyToClipboard() 即可拷贝当前语言包');
        console.groupEnd && console.groupEnd();
      })
      .catch(err => {
        console.log('saveI18NToStorage Error: ', err);
      });
  }

  copyToClipboard() {
    if (typeof global.copy !== 'function') {
      return;
    }
    global.copy(JSON.stringify(sortObject(this.values), undefined, 4));
  }

  /**
   * @description 如果尚未拉取完毕当前缓存的语言包，则将当前跑的语言包写入到cache中
   * @param {String} key - 语言key
   * @param {String} value - 语言值
   */
  saveI18N(key, value) {
    if (!__DEV__) {
      return;
    }
    if (this._isInit) {
      this._$I18N = { [key]: value };
    } else {
      this._i18NCache[key] = value;
    }
  }

  /**
   * 从`AsyncStorage`中读取当前存储的语言包并更新至`values`中区
   */
  async getI18NCache() {
    if (!this._i18NKey) {
      return;
    }
    try {
      const data = await AsyncStorage.getItem(this._i18NKey);
      console.green('getI18NCache Success', JSON.parse(data));
      this.values = data || { ...DEFAULT_I18N };
    } catch (err) {
      console.log('getI18NCache Error :', err);
    }
  }

  /**
   * 清空`AsyncStorage`以及`values`中当前存储的语言包
   */
  async clearI18NCache() {
    if (!this._i18NKey) {
      return;
    }
    try {
      await AsyncStorage.removeItem(this._i18NKey);
      console.green('clearI18NCache Success');
      this.values = { ...DEFAULT_I18N };
    } catch (err) {
      console.log('clearI18NCache Error :', err);
    }
  }

  /**
   * 获取所有`AsyncStorage`内I18N相关的缓存
   */
  async getAllI18NCache() {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allI18NKeys = allKeys.filter(key => key.indexOf('@I18N') !== -1);
      const allI18NCaches = await AsyncStorage.multiGet(allI18NKeys);
      console.green('getAllI18NCache Success: ', allI18NCaches);
    } catch (err) {
      console.log('getAllI18NCache Error :', err);
    }
  }

  /**
   * 清空所有`AsyncStorage`内I18N相关的缓存
   */
  async clearAllI18NCache() {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allI18NKeys = allKeys.filter(key => key.indexOf('@I18N') !== -1);
      await AsyncStorage.multiRemove(allI18NKeys);
      console.green('clearAllI18NCache Success');
      this.values = { ...DEFAULT_I18N };
    } catch (err) {
      console.log('clearAllI18NCache Error :', err);
    }
  }
}

export default I18NGenerator;
