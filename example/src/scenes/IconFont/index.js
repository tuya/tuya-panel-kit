import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic from './Basic';
import AllSvgs from './AllSvgs';
import AllARTSvgs from './AllARTSvgs';
import Perf from './Perf';
import PerfART from './PerfART';

export default class IconFontScene extends Component {
  static Basic = Basic;
  static AllSvgs = AllSvgs;
  static AllARTSvgs = AllARTSvgs;
  static Perf = Perf;
  static PerfART = PerfART;

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
    return <TYFlatList contentContainerStyle={{ marginTop: 24 }} data={this.data} />;
  }
}
