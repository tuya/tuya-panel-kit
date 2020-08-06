import React, { Component } from 'react';
import { TYFlatList, TYSdk } from 'tuya-panel-kit';
import Basic from './Basic';
import Special from './Special';
import { subRouters } from '../../config/routers';

export default class GlobalToastScene extends Component {
  get data() {
    return subRouters
      .filter(r => /^GlobalToast\..+/.test(r.id))
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

  static Special = Special;
  static Basic = Basic;

  render() {
    return <TYFlatList contentContainerStyle={{ marginTop: 24 }} data={this.data} />;
  }
}
