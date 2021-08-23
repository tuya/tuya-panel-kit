import Strings from '#i18n';

// basic
import Battery from './pages/basic/battery';
import BrickButton from './pages/basic/brick-button';

export const routes = [
  // basic
  {
    name: Strings.getLang('battery'),
    href: '/basic/battery',
    component: Battery,
  },
  {
    name: Strings.getLang('brick_button'),
    href: '/basic/brick-button',
    component: BrickButton,
  },
];
