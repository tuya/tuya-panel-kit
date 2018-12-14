import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Horizontal from './Horizontal';
import Vertical from './Vertical';
import Playground from './Playground';

export default class SliderScene extends Component {
  static Horizontal = Horizontal;
  static Vertical = Vertical;
  static Playground = Playground;

  get data() {
    return subRouters
      .filter(r => /^Slider\..+/.test(r.id))
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
