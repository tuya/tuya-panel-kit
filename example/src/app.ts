import './app.less';

import qs from 'qs';

import Strings from '#i18n';

export const locale = {
  getLocale() {
    const { search } = window.location;
    // eslint-disable-next-line no-shadow
    const { locale = 'zh-CN' } = qs.parse(search, { ignoreQueryPrefix: true });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Strings.setLanguage({ en: 'en', cn: 'zh', zh: 'zh' }[String(locale)] ?? 'en');
    return locale;
  },
};

const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  window.console.log = () => '';
}
