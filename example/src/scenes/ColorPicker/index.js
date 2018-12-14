import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic from './Basic';
import Playground from './Playground';

export default class ColorPickerScene extends Component {
  static Basic = Basic;
  static Playground = Playground;

  get data() {
    return subRouters
      .filter(r => /^ColorPicker\..+/.test(r.id))
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
