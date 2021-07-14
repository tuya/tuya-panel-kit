import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Space from './Space';
import Basic from './Basic';
import Double from './Double';
import Compose from './Compose';

export default class ToastScene extends Component {
  static Space = Space;
  static Basic = Basic;
  static Double = Double;
  static Compose = Compose;

  get data() {
    return subRouters
      .filter(r => /^Progress\..+/.test(r.id))
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
