import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic from './Basic';

export default class CarouselScene extends Component {
  static Basic = Basic;

  get data() {
    return subRouters
      .filter(r => /^Carousel\..+/.test(r.id))
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
