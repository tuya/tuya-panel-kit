import _ from 'lodash';
import Home from '../scenes/Home';
import Theme from '../scenes/Theme';
import PickerView from '../scenes/PickerView';
import LinearGradient from '../scenes/LinearGradient';
import RadialGradient from '../scenes/RadialGradient';
import DatePicker from '../scenes/DatePicker';
import Slider from '../scenes/Slider';
import TYText from '../scenes/TYText';
import TYFlatList from '../scenes/TYFlatList';
import TYSectionList from '../scenes/TYSectionList';
import Swipeout from '../scenes/Swipeout';
import RotationView from '../scenes/RotationView';
import Circle from '../scenes/CircleView';
import Toast from '../scenes/Toast';
import IconFont from '../scenes/IconFont';
import TopBar from '../scenes/TopBar';
import Button from '../scenes/Button';
import ButtonBrick from '../scenes/ButtonBrick';
import Switch from '../scenes/Switch';
import Modal from '../scenes/Modal';
import Motion from '../scenes/Motion';
import Tab from '../scenes/Tab';
import Tabs from '../scenes/Tabs';
import TabBar from '../scenes/TabBar';
import Tips from '../scenes/Tips';
import Collapsible from '../scenes/Collapse';
import Checkbox from '../scenes/Checkbox';
import Carousel from '../scenes/Carousel';
import ControllerBar from '../scenes/ControllerBar';
import Dialog from '../scenes/Dialog';
import Popup from '../scenes/Popup';
import TimerPicker from '../scenes/TimerPicker';
import Notification from '../scenes/Notification';
import NotificationLegacy from '../scenes/NotificationLegacy';
import UnitText from '../scenes/UnitText';
import Progress from '../scenes/Progress';
import GlobalToast from '../scenes/GlobalToast';

const mainRouter = [
  {
    id: 'main',
    Scene: Home,
  },
];

export const themeRouter = [
  {
    id: 'Theme',
    Scene: Theme,
  },
];

export const componentsRouters = _.sortBy(
  [
    {
      id: 'Button',
      Scene: Button,
    },
    {
      id: 'ButtonBrick',
      Scene: ButtonBrick,
    },
    {
      id: 'PickerView',
      Scene: PickerView,
    },
    {
      id: 'LinearGradient',
      Scene: LinearGradient,
    },
    {
      id: 'RadialGradient',
      Scene: RadialGradient,
    },
    {
      id: 'Motion',
      Scene: Motion,
    },
    {
      id: 'DatePicker',
      Scene: DatePicker,
    },
    {
      id: 'Slider',
      Scene: Slider,
    },
    {
      id: 'TYText',
      Scene: TYText,
    },
    {
      id: 'TYFlatList',
      Scene: TYFlatList,
    },
    {
      id: 'TYSectionList',
      Scene: TYSectionList,
    },
    {
      id: 'Tips',
      Scene: Tips,
    },
    {
      id: 'Swipeout',
      Scene: Swipeout,
    },
    {
      id: 'Rotation',
      Scene: RotationView,
    },
    {
      id: 'Circle',
      Scene: Circle,
    },
    {
      id: 'Toast',
      Scene: Toast,
    },
    {
      id: 'IconFont',
      Scene: IconFont,
    },
    {
      id: 'TopBar',
      Scene: TopBar,
    },
    {
      id: 'Switch',
      Scene: Switch,
    },
    {
      id: 'Modal',
      Scene: Modal,
    },
    {
      id: 'Tab',
      Scene: Tab,
    },
    {
      id: 'Tabs',
      Scene: Tabs,
    },
    {
      id: 'TabBar',
      Scene: TabBar,
    },
    {
      id: 'Collapsible',
      Scene: Collapsible,
    },
    {
      id: 'Checkbox',
      Scene: Checkbox,
    },
    {
      id: 'Carousel',
      Scene: Carousel,
    },
    {
      id: 'ControllerBar',
      Scene: ControllerBar,
    },
    {
      id: 'Dialog',
      Scene: Dialog,
    },
    {
      id: 'Popup',
      Scene: Popup,
    },
    {
      id: 'Progress',
      Scene: Progress,
    },
    {
      id: 'TimerPicker',
      Scene: TimerPicker,
    },
    {
      id: 'Notification',
      Scene: Notification,
    },
    {
      id: 'NotificationLegacy',
      Scene: NotificationLegacy,
    },
    {
      id: 'UnitText',
      Scene: UnitText,
    },
    {
      id: 'GlobalToast',
      Scene: GlobalToast,
    },
  ],
  'id'
);

export const elementsRouters = _.sortBy([], 'id');

const blackList = ['caller', 'length', 'name', 'arguments', 'prototype', 'toString', 'displayName'];

export const subRouters = componentsRouters.reduce((acc, cur) => {
  const { id, Scene } = cur;
  const properties = Object.getOwnPropertyNames(Scene);
  const routers = _.difference(properties, blackList).map(v => ({
    id: `${id}.${v}`,
    Scene: Scene[v],
  }));
  return [...acc, ...routers];
}, []);

export default [
  ...mainRouter,
  ...themeRouter,
  ...componentsRouters,
  ...elementsRouters,
  ...subRouters,
];
