import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic from './Basic';
import WithValue from './WithValue';
import Item from './Item';
import Playground from './Playground';

export default class TYFlatListScene extends Component {
  static Basic = Basic;
  static WithValue = WithValue;
  static Item = Item;
  static Playground = Playground;

  get data() {
    return subRouters
      .filter(r => /^TYFlatList\..+/.test(r.id))
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
