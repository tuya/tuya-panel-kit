import Strings from '#i18n';

import Button from './pages/basic/button';
import ButtonCard from './pages/basic/button-card';

// 这里的路由href要和文档markdown的demo路径一致
export const routes = [
  {
    name: Strings.getLang('button'),
    href: '/basic/button',
    component: Button,
  },
  {
    name: Strings.getLang('button_card'),
    href: '/basic/button-card',
    component: ButtonCard,
  },
];
