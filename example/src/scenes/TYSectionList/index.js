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
import Strings from '../../i18n';

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
    'TYSectionList.Basic': Strings.getLang('tysectionlist_basic_list'),
    'TYSectionList.CheckboxItem': Strings.getLang('tysectionlist_selectbox_list'),
    'TYSectionList.InputItem': Strings.getLang('tysectionlist_inputbox_list'),
    'TYSectionList.SliderItem': Strings.getLang('tysectionlist_slider_list'),
    'TYSectionList.SwitchItem': Strings.getLang('tysectionlist_switch_list'),
    'TYSectionList.ImageItem': Strings.getLang('tysectionlist_graphic_list'),
    'TYSectionList.ThemeItem': Strings.getLang('switch_test_localtheme'),
  };

  render() {
    return <TYFlatList contentContainerStyle={{ marginTop: 24 }} data={this.data} />;
  }
}
