import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic from './Basic';
import Progress from './Progress';
import HuePicker from './HuePicker';
import Playground from './Playground';

export default class CircularPickerScene extends Component {
  static Basic = Basic;
  static Progress = Progress;
  static HuePicker = HuePicker;
  static Playground = Playground;

  get data() {
    return subRouters
      .filter(r => /^CircularPicker\..+/.test(r.id))
      .map(({ id }) => ({
        key: id,
        title: id,
        arrow: true,
        onPress: () => TYSdk.Navigator.push({
          id,
          title: id,
        }),
      }));
  }

  render() {
    return (
      <TYFlatList data={this.data} />
    );
  }
}
