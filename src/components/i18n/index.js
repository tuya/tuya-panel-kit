import { I18N, TYSdk } from '@tuya-rn/tuya-native-kit';
import { Sentry, SentrySeverity } from '@tuya-rn/react-native-sentry';
import NumberUtil from '../../utils/number';
import I18NGenerator from './I18NGenerator';

const SENTRY_TOKEN = {
  AY: 'https://e5dfac416b414147933be577a818dc31@sailormoon.tuya.com/11', // 中国 - https://sailormoon.tuya.com/sentry/tuya-react-native-i18n/getting-started/javascript/ （国区数据库有迁移，以本地的为准）
  AZ: 'https://c4e84380303e4a67a454313008d687ea@sailormoon.tuyaus.com/2', // 美区 - https://sailormoon.tuyaus.com/sentry/tuya-react-native-i18n/getting-started/javascript/
  EU: 'https://0e5fe0478a9d4f4dbfd35194f49684b7@sailormoon.tuyaeu.com/2', // 欧洲 - https://sailormoon.tuyaeu.com/sentry/tuya-react-native-i18n/getting-started/javascript/
  WE: 'https://1267bbbf7c054977bdab930a79805758@sailormoon-we.tuyaeu.com/4', // 西欧 - https://sailormoon-we.tuyaeu.com/sentry/tuya-react-native-i18n/getting-started/javascript/
  UE: 'https://748425c56fe14f379ea45eaa34587c65@sailormoon-ueaz.tuyaus.com/6', // 美东区 - https://sailormoon-ueaz.tuyaus.com/sentry/tuya-react-native-i18n/getting-started/javascript/
  IN: 'https://c6a1a0fda7be4a48b875f9b2fa26b100@sailormoon.tuyain.com/8', // 印度区 - https://sailormoon.tuyain.com/sentry/tuya-react-native-i18n/getting-started/javascript/
};

if (
  __DEV__ &&
  TYSdk &&
  TYSdk.native.mobileInfo &&
  TYSdk.native.mobileInfo.platform === 'Simulator'
) {
  global.$I18N = new I18NGenerator();
}

class I18NWrapper extends I18N {
  constructor(...args) {
    super(...args);
    this.sentI18NKeys = {}; // 已发送到sentry的 i18n key 值
    if (typeof TYSdk.native.mobileInfo === 'undefined') {
      TYSdk.mobile.getMobileInfo().then(d => {
        this.installSentry(d.service);
      });
    } else {
      this.installSentry(TYSdk.native.mobileInfo.service);
    }
  }

  installSentry = service => {
    if (__DEV__) return;
    Sentry.config(SENTRY_TOKEN[service] || SENTRY_TOKEN.AZ, {
      autoBreadcrumbs: {
        xhr: false,
        console: false,
        dom: true,
        location: false,
        sentry: true,
      },
      release: 'i18n@1.1.1',
    }).install();
  };

  getDpLang(code, value) {
    let key;
    if (typeof value === 'undefined') {
      key = `dp_${code}`.toLowerCase();
    } else if (typeof value === 'boolean') {
      // eslint-disable-next-line no-extra-boolean-cast
      const valStr = !!value ? 'on' : 'off';
      key = `dp_${code}_${valStr}`.toLowerCase();
    } else {
      key = `dp_${code}_${value}`.toLowerCase();
    }
    const i18nValue = typeof this[key] !== 'undefined' ? this[key] : key;
    this.sendToSentry(key);
    this.saveToI18N(key, i18nValue);
    return i18nValue;
  }

  getDpName(code, defaultName) {
    const key = `dp_${code}`.toLowerCase();
    const i18nValue = typeof this[key] !== 'undefined' ? this[key] : defaultName || key;
    this.sendToSentry(key);
    this.saveToI18N(key, i18nValue);
    return i18nValue;
  }

  getLang(key, defaultString) {
    this.sendToSentry(key);
    this.saveToI18N(key, defaultString || key);
    return super.getLang(key, defaultString);
  }

  getRangeStrings(dpCode) {
    const result = {};
    const schema = TYSdk.device.getDpSchema(dpCode);
    if (typeof schema === 'undefined') return result;
    const lists = schema.range;
    // eslint-disable-next-line no-restricted-syntax
    for (const v of lists) {
      const key = `dp_${dpCode}_${v}`.toLowerCase();
      result[v] = typeof this[key] !== 'undefined' ? this[key] : key;
      this.sendToSentry(key);
      this.saveToI18N(key, result[v]);
    }
    return result;
  }

  getFaultStrings(faultCode, faultValue, onlyPrior = true) {
    if (!faultValue) return '';
    const { label } = TYSdk.device.getDpSchema(faultCode);
    const labels = [];
    for (let i = 0; i < label.length; i++) {
      const value = label[i];
      const isExist = NumberUtil.getBitValue(faultValue, i);
      if (isExist) {
        labels.push(this.getDpLang(faultCode, value));
        if (onlyPrior) break;
      }
    }
    return onlyPrior ? labels[0] : labels.join(', ');
  }

  sendToSentry = key => {
    if (__DEV__) return;
    const isExist = !!this.sentI18NKeys[key];
    if (isExist) return;
    this.sentI18NKeys[key] = key;
    const { uiId = '2333', productId = '666' } = TYSdk.devInfo;
    const { lang = 'hello' } = TYSdk.native.mobileInfo;
    Sentry.setTagsContext({
      Pid: productId,
      uiid: uiId,
    });
    Sentry.setExtraContext({
      uiid: uiId,
      pid: productId,
      lang,
    });
    if (key === '__esModule') return;
    if (typeof key === 'undefined' || key === 'undefined' || key === '') {
      Sentry.captureMessage(`I18N:key is invalid`);
    } else if (typeof this[key] === 'undefined') {
      Sentry.captureMessage(`I18N:${key} is not defined`);
    } else if (this[key] === '') {
      Sentry.captureMessage(`I18N:value of ${key} is an empty string`);
    } else if (lang !== 'en' && key === this[key]) {
      Sentry.captureMessage(`I18N:value of ${key} is the same as the key`, {
        level: SentrySeverity.Warning,
      });
    }
  };

  saveToI18N = (key, value) => {
    if (__DEV__ && global.$I18N) {
      global.$I18N.saveI18N(key, value);
    }
  };
}

export default I18NWrapper;
