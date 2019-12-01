import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic from './Basic';
import WithValue from './WithValue';
import Playground from './Playground';
import CustomItem from './CustomItem';
import CheckboxItem from './CheckboxItem';
import InputItem from './InputItem';
import SliderItem from './SliderItem';
import SwitchItem from './SwitchItem';

export default class TYFlatListScene extends Component {
  static Basic = Basic;
  static WithValue = WithValue;
  static Playground = Playground;
  static CustomItem = CustomItem;
  static CheckboxItem = CheckboxItem;
  static InputItem = InputItem;
  static SliderItem = SliderItem;
  static SwitchItem = SwitchItem;

  get data() {
    return subRouters
      .filter(r => /^TYFlatList\..+/.test(r.id))
      .map(({ id }) => ({
        key: id,
        title: id,
        arrow: true,
        onPress: () =>
          TYSdk.Navigator.push({
            id,
            title: id,
          }),
      }));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ marginTop: 24 }} data={this.data} />;
  }
}
