import React, { Component } from 'react';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import Fade from './Fade';
import PullUp from './PullUp';
import Toast from './Toast';
import ScaleFadeIn from './ScaleFadeIn';
import ScalePullDown from './ScalePullDown';
import Popup from './Popup';
import Custom from './Custom';
import Alert from './Alert';
import Prompt from './Prompt';
import PushDown from './PushDown';
import Strings from '../../i18n';

export default class ToastScene extends Component {
  static Fade = Fade;
  static PullUp = PullUp;
  static PushDown = PushDown;
  static ScalePullDown = ScalePullDown;
  static Toast = Toast;
  static ScaleFadeIn = ScaleFadeIn;
  static Popup = Popup;
  static Custom = Custom;
  static Alert = Alert;
  static Prompt = Prompt;

  get data() {
    return subRouters
      .filter(r => /^Motion\..+/.test(r.id))
      .map(({ id }) => ({
        key: id,
        title: `${id}(${this.titleMap[id]})`,
        arrow: true,
        onPress: () =>
          TYSdk.Navigator.push({
            id,
            title: `${id}(${this.titleMap[id]})`,
          }),
      }));
  }

  titleMap = {
    'Motion.Fade': Strings.getLang('motion_fade_inout'),
    'Motion.PullUp': Strings.getLang('motion_swipe_updown'),
    'Motion.PushDown': Strings.getLang('motion_swipe_downup'),
    'Motion.ScalePullDown': Strings.getLang('motion_zoomin_swipeout'),
    'Motion.Toast': Strings.getLang('motion_zoomswipe_without_operation'),
    'Motion.ScaleFadeIn': Strings.getLang('motion_zoom_inout'),
    'Motion.Popup': Strings.getLang('test') + 'Popup',
    'Motion.Custom': Strings.getLang('test') + 'Dialog',
    'Motion.Alert': Strings.getLang('test') + 'Dialog',
    'Motion.Prompt': Strings.getLang('test') + 'Prompt',
  };

  render() {
    return <TYFlatList contentContainerStyle={{ marginTop: 24 }} data={this.data} />;
  }
}
