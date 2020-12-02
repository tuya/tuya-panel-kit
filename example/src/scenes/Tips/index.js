import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Special from './SpecialShow';
import Basic from './BasicShow';

export default class ToastScene extends Component {
  get data() {
    return subRouters
      .filter(r => /^Tips\..+/.test(r.id))
      .map(({ id }) => ({
        key: id,
        title: `${id}(${this.titleMap[id]})`,
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

  titleMap = {
    'Tips.Basic': '角标的六种显示位置',
    'Tips.Special': '定位气泡',
  };

  render() {
    return <TYFlatList contentContainerStyle={{ marginTop: 24 }} data={this.data} />;
  }
}
