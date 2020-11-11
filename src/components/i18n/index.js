import { I18N, TYSdk } from '../../TYNativeApi';
import NumberUtil from '../../utils/number';

class I18NWrapper extends I18N {
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
}

export default I18NWrapper;
