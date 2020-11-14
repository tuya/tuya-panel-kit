import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Error from './Error';
import Basic from './Basic';
import Success from './success';
import Warning from './warning';
import Loading from './Loading';

export default class ToastScene extends Component {
  static Error = Error;
  static Basic = Basic;
  static Success = Success;
  static Warning = Warning;
  static Loading = Loading;

  get data() {
    return subRouters
      .filter(r => /^Toast\..+/.test(r.id))
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
