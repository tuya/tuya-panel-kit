import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic from './Basic';
import TimePicker from './TimePicker';

export default class TYSectionList extends Component {
  static Basic = Basic;
  static TimePicker = TimePicker;

  get datas() {
    return subRouters
      .filter(r => /^Picker\..+/.test(r.id))
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
    return <TYFlatList data={this.datas} />;
  }
}
