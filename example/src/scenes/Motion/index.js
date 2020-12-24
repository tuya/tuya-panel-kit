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
    'Motion.Fade': '淡入淡出',
    'Motion.PullUp': '上拉下滑',
    'Motion.PushDown': '下滑上拉',
    'Motion.ScalePullDown': '放大淡入/下滑淡出',
    'Motion.Toast': '无操作放大淡入/缩小淡出',
    'Motion.ScaleFadeIn': '放大淡入/缩小淡出',
    'Motion.Popup': '测试Popup',
    'Motion.Custom': '测试Dialog',
    'Motion.Alert': '测试Dialog',
    'Motion.Prompt': '测试Prompt',
  };

  render() {
    return <TYFlatList contentContainerStyle={{ marginTop: 24 }} data={this.data} />;
  }
}
