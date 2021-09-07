import Strings from '#i18n';

import Button from './pages/basic/button';
import ButtonCard from './pages/basic/button-card';
import SwitchButton from './pages/bool/switch-card';
import ItemCard from './pages/show/item-card';
import ArrowCard from './pages/number/arrow-card';

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
  // bool
  {
    name: Strings.getLang('switch_card'),
    href: '/bool/switch-card',
    component: SwitchButton,
  },
  // show
  {
    name: Strings.getLang('item_card'),
    href: '/show/item-card',
    component: ItemCard,
  },
  // number
  {
    name: Strings.getLang('arrow_card'),
    href: '/number/arrow-card',
    component: ArrowCard,
  },
];
