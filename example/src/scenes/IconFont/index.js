import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic from './Basic';
import AllSvgs from './AllSvgs';

export default class IconFontScene extends Component {
  static Basic = Basic;
  static AllSvgs = AllSvgs;

  get data() {
    return subRouters
      .filter(r => /^IconFont\..+/.test(r.id))
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
    return <TYFlatList data={this.data} />;
  }
}
