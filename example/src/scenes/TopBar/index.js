import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Basic from './Basic';
import Gradient from './Gradient';
import CustomContent from './CustomContent';
import HideStatusBar from './HideStatusBar';
import MultipleAction from './MultipleAction';

export default class TopBarScene extends Component {
  static Basic = Basic;
  static Gradient = Gradient;
  static CustomContent = CustomContent;
  static HideStatusBar = HideStatusBar;
  static MultipleAction = MultipleAction;

  get data() {
    return subRouters
      .filter(r => /^TopBar\..+/.test(r.id))
      .map(({ id }) => ({
        key: id,
        title: id,
        arrow: true,
        onPress: () =>
          TYSdk.Navigator.push({
            id,
            title: id,
            hideTopbar: true,
          }),
      }));
  }

  render() {
    return <TYFlatList data={this.data} />;
  }
}
