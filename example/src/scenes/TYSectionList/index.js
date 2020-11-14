import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic from './Basic';
import CheckboxItem from './CheckboxItem';
import InputItem from './InputItem';
import SliderItem from './SliderItem';
import SwitchItem from './SwitchItem';
import ImageItem from './ImageItem';
import ThemeItem from './ThemeItem';

export default class TYSectionListScene extends Component {
  static Basic = Basic;
  static CheckboxItem = CheckboxItem;
  static InputItem = InputItem;
  static SliderItem = SliderItem;
  static SwitchItem = SwitchItem;
  static ImageItem = ImageItem;
  static ThemeItem = ThemeItem;

  get data() {
    return subRouters
      .filter(r => /^TYSectionList\..+/.test(r.id))
      .map(({ id }) => ({
        key: id,
        title: `${id}(${this.titleMap[id]})`,
        arrow: true,
        onPress: () =>
          TYSdk.Navigator.push({
            id,
            title: `${id}(${this.titleMap[id]})`,
          }),
      }));
  }

  titleMap = {
    'TYSectionList.Basic': '基础列表',
    'TYSectionList.CheckboxItem': '选择框列表',
    'TYSectionList.InputItem': '输入框列表',
    'TYSectionList.SliderItem': '滑块列表',
    'TYSectionList.SwitchItem': '开关列表',
    'TYSectionList.ImageItem': '图文列表',
    'TYSectionList.ThemeItem': '测试本地主题',
  };

  render() {
    return <TYFlatList contentContainerStyle={{ marginTop: 24 }} data={this.data} />;
  }
}
