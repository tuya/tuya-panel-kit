import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import OnlyTabs from './OnlyTabs';
import WithContent from './WithContent';
import OnlyContent from './OnlyContent';
import NestedTabs from './NestedTabs';

export default class TabsScene extends Component {
  static OnlyTabs = OnlyTabs;
  static WithContent = WithContent;
  static OnlyContent = OnlyContent;
  static NestedTabs = NestedTabs;

  get data() {
    return subRouters
      .filter(r => /^Tabs\..+/.test(r.id))
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
