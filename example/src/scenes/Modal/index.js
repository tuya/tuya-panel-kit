import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Custom from './Custom';
import List from './List';
import Picker from './Picker';
import Countdown from './Countdown';
import DatePicker from './DatePicker';
import NestedModal from './NestedModal';

export default class ColorPickerScene extends Component {
  static Custom = Custom;
  static List = List;
  static Picker = Picker;
  static Countdown = Countdown;
  static DatePicker = DatePicker;
  static NestedModal = NestedModal;

  get data() {
    return subRouters
      .filter(r => /^Modal\..+/.test(r.id))
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
