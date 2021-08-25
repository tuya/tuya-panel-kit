import Strings from '#i18n';

import Button from './pages/button';
import ButtonCard from './pages/button-card';

export const routes = [
  {
    name: Strings.getLang('button'),
    href: '/button',
    component: Button,
  },
  {
    name: Strings.getLang('button_card'),
    href: '/button-card',
    component: ButtonCard,
  },
];
