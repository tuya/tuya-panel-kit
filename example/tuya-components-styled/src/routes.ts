import Strings from '#i18n';
import SwitchButton from './pages/bool/switch-card';
import ItemCard from './pages/show/item-card';
import ArrowCard from './pages/number/arrow-card';
import StepCard from './pages/number/step-card';
import BlockCard from './pages/bool/block-card';
import DepictCard from './pages/show/depict-card';
import DisplayCard from './pages/show/display-card';
import IconCard from './pages/show/icon-card';
import ListCard from './pages/enum/list-card';
import IconBackground from './pages/basic/icon-background';
import Button from './pages/basic/button';

// 这里的路由href要和文档markdown的demo路径一致
export const routes = [
  // basic
  {
    name: Strings.getLang('icon_background'),
    href: '/basic/icon-background',
    component: IconBackground,
  },
  {
    name: Strings.getLang('button'),
    href: '/basic/button',
    component: Button,
  },
  // bool
  {
    name: Strings.getLang('switch_card'),
    href: '/bool/switch-card',
    component: SwitchButton,
  },
  {
    name: Strings.getLang('block_card'),
    href: '/bool/block-card',
    component: BlockCard,
  },
  // show
  {
    name: Strings.getLang('item_card'),
    href: '/show/item-card',
    component: ItemCard,
  },
  {
    name: Strings.getLang('depict_card'),
    href: '/show/depict-card',
    component: DepictCard,
  },
  {
    name: Strings.getLang('display_card'),
    href: '/show/display-card',
    component: DisplayCard,
  },
  {
    name: Strings.getLang('icon_card'),
    href: '/show/icon-card',
    component: IconCard,
  },
  // number
  {
    name: Strings.getLang('arrow_card'),
    href: '/number/arrow-card',
    component: ArrowCard,
  },
  {
    name: Strings.getLang('step_card'),
    href: '/number/step-card',
    component: StepCard,
  },
  // enum
  {
    name: Strings.getLang('list_card'),
    href: '/enum/list-card',
    component: ListCard,
  },
];
