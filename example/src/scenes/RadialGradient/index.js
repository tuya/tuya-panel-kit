import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic1 from './Basic1';
import Basic2 from './Basic2';

export default class RadialGradientScene extends Component {
  static Basic1 = Basic1;
  static Basic2 = Basic2;

  get data() {
    return subRouters
      .filter(r => /^RadialGradient\..+/.test(r.id))
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
