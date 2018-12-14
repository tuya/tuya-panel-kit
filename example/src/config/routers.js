import _ from 'lodash';
import Home from '../scenes/Home';
import CircularPicker from '../scenes/CircularPicker';
import ColorPicker from '../scenes/ColorPicker';
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
import Icon from '../scenes/Icon';
import TopBar from '../scenes/TopBar';
import Button from '../scenes/Button';
import Switch from '../scenes/Switch';
import RectColorPicker from '../scenes/RectColorPicker';
import Tab from '../scenes/Tab';

const mainRouter = [{
  id: 'main',
  Scene: Home,
}];

export const componentsRouters = _.sortBy([
  {
    id: 'Button',
    Scene: Button,
  },
  {
    id: 'CircularPicker',
    Scene: CircularPicker,
  },
  {
    id: 'ColorPicker',
    Scene: ColorPicker,
  },
  {
    id: 'RectColorPicker',
    Scene: RectColorPicker,
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
    id: 'Icon',
    Scene: Icon,
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
    id: 'Tab',
    Scene: Tab,
  },
], 'id');

export const elementsRouters = _.sortBy([], 'id');

export const subRouters = [
  {
    id: 'TYSectionList.Basic',
    Scene: TYSectionList.Basic,
  },
  {
    id: 'TYSectionList.WithValue',
    Scene: TYSectionList.WithValue,
  },
  {
    id: 'TYSectionList.Item',
    Scene: TYSectionList.Item,
  },
  {
    id: 'TYSectionList.Playground',
    Scene: TYSectionList.Playground,
  },
  {
    id: 'PickerView.Basic',
    Scene: PickerView.Basic,
  },
  {
    id: 'PickerView.TimePicker',
    Scene: PickerView.TimePicker,
  },
  {
    id: 'TYFlatList.Basic',
    Scene: TYFlatList.Basic,
  },
  {
    id: 'TYFlatList.WithValue',
    Scene: TYFlatList.WithValue,
  },
  {
    id: 'TYFlatList.Item',
    Scene: TYFlatList.Item,
  },
  {
    id: 'TYFlatList.Playground',
    Scene: TYFlatList.Playground,
  },
  {
    id: 'Slider.Horizontal',
    Scene: Slider.Horizontal,
  },
  {
    id: 'Slider.Vertical',
    Scene: Slider.Vertical,
  },
  {
    id: 'Slider.Playground',
    Scene: Slider.Playground,
  },
  {
    id: 'LinearGradient.Basic1',
    Scene: LinearGradient.Basic1,
  },
  {
    id: 'LinearGradient.Basic2',
    Scene: LinearGradient.Basic2,
  },
  {
    id: 'RadialGradient.Basic1',
    Scene: RadialGradient.Basic1,
  },
  {
    id: 'RadialGradient.Basic2',
    Scene: RadialGradient.Basic2,
  },
  {
    id: 'CircularPicker.Basic',
    Scene: CircularPicker.Basic,
  },
  {
    id: 'CircularPicker.Progress',
    Scene: CircularPicker.Progress,
  },
  {
    id: 'CircularPicker.HuePicker',
    Scene: CircularPicker.HuePicker,
  },
  {
    id: 'CircularPicker.Playground',
    Scene: CircularPicker.Playground,
  },
  {
    id: 'ColorPicker.Basic',
    Scene: ColorPicker.Basic,
  },
  {
    id: 'ColorPicker.Playground',
    Scene: ColorPicker.Playground,
  },
  {
    id: 'RectColorPicker.Horizontal',
    Scene: RectColorPicker.Horizontal,
  },
  {
    id: 'RectColorPicker.Vertical',
    Scene: RectColorPicker.Vertical,
  },
  {
    id: 'RectColorPicker.HSPicker',
    Scene: RectColorPicker.HSPicker,
  },
  {
    id: 'RectColorPicker.KelvinPicker',
    Scene: RectColorPicker.KelvinPicker,
  },
  {
    id: 'RectColorPicker.Playground',
    Scene: RectColorPicker.Playground,
  },
];

export default [
  ...mainRouter,
  ...componentsRouters,
  ...elementsRouters,
  ...subRouters,
];
