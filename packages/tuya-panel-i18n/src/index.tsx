/* eslint-disable no-useless-constructor */

import { I18N as OriginI18N, TYSdk } from 'tuya-panel-core';
import { Utils } from 'tuya-panel-utils';
import { lang } from './string';

const { getBitValue } = Utils.NumberUtils;

export interface I18NLanMap {
  en: Record<string, string>;
  zh: Record<string, string>;
  [lanKey: string]: Record<string, string>;
}

export class I18N extends OriginI18N {
  constructor(props: I18NLanMap) {
    super(props);
  }

  getRangeStrings(dpCode: string): Record<string, string> {
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

  sendToSentry: (key: string) => void;
  saveToI18N: (key: string, res: string) => void;
  getLang: (key: string, defaultString?: string) => string;
  getDpLang: (faultCode: number | string, value: any) => string;
  getDpName: (code: string, defaultName?: string) => string;
  applyStrings: (strings: string, force?: boolean) => void;
  forceUpdateNetworkLang: (productId: string) => void;
  mergeLanguage: (L1: Record<string, string>, L2: Record<string, string>) => Record<string, string>;
  setLanguage: (language: string) => void;
  buildLanguage: (language: string) => void;
  formatString: (str: string, ...values: string[]) => string;
  formatValue: (key: string, ...values: string[]) => string;
  getDpsLang: (key: string) => Record<string, string>;
  parseCountdown: (t: number, power: boolean) => string;

  getFaultStrings(faultCode: number | string, faultValue: number, onlyPrior = true): string {
    if (!faultValue) return '';
    const { label } = TYSdk.device.getDpSchema(faultCode);
    const labels = [];
    for (let i = 0; i < label.length; i++) {
      const value = label[i];
      const isExist = getBitValue(faultValue, i);
      if (isExist) {
        labels.push(this.getDpLang(faultCode, value));
        if (onlyPrior) break;
      }
    }
    return onlyPrior ? labels[0] : labels.join(', ');
  }
}

export const Strings = new I18N(lang);
