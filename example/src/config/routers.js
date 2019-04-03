import _ from 'lodash';
import Home from '../scenes/Home';
import PickerView from '../scenes/PickerView';
import LinearGradient from '../scenes/LinearGradient';
import RadialGradient from '../scenes/RadialGradient';
import DatePicker from '../scenes/DatePicker';
import Slider from '../scenes/Slider';
import TYFlatList from '../scenes/TYFlatList';
import TYSectionList from '../scenes/TYSectionList';
import Swipeout from '../scenes/Swipeout';
import RotationView from '../scenes/RotationView';
import Circle from '../scenes/CircleView';
import Toast from '../scenes/ToastView';
import IconFont from '../scenes/IconFont';
import TopBar from '../scenes/TopBar';
import Button from '../scenes/NewButton';
import Switch from '../scenes/Switch';
import Modal from '../scenes/Modal';
import Tab from '../scenes/Tab';
import TabBar from '../scenes/TabBar';
import Collapsible from '../scenes/Collapse';
import Checkbox from '../scenes/Checkbox';
import Carousel from '../scenes/Carousel';

const mainRouter = [
  {
    id: 'main',
    Scene: Home,
  },
];

export const componentsRouters = _.sortBy(
  [
    {
      id: 'Button',
      Scene: Button,
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
      id: 'DatePicker',
      Scene: DatePicker,
    },
    {
      id: 'Slider',
      Scene: Slider,
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
  ],
  'id'
);

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

export default [...mainRouter, ...componentsRouters, ...subRouters];
