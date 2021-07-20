/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import './app.less';

import qs from 'qs';

import Strings from '#i18n';

export const locale = {
  getLocale() {
    const { search } = window.location;
    const { locale = 'zh-CN' } = qs.parse(search, { ignoreQueryPrefix: true });
    // @ts-ignore
    Strings.setLanguage({ en: 'en', cn: 'zh', zh: 'zh' }[String(locale)] ?? 'en');
    return locale;
  },
};

const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  window.console.log = () => '';
}
