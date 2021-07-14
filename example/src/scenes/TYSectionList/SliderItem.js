import React, { Component } from 'react';
import { TYSectionList } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class TYSectionListSliderItemScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: 0,
      value2: 100,
    };
  }

  get sections() {
    return [
      {
        title: Strings.getLang('tysectionlist_slider_list'),
        data: [
          {
            key: 0,
            actionType: 'iconfont',
            Icon: 'volume-sharp-off',
            Action: 'volume-sharp-max',
            value: this.state.value1,
            minimumValue: 0,
            maximumValue: 100,
            onSlidingComplete: value1 => this.setState({ value1 }),
          },
          {
            key: 1,
            Icon: require('./res/timer.png'),
            Action: `${Math.round(this.state.value2)}%`,
            actionType: 'text',
            value: this.state.value2,
            minimumValue: 0,
            maximumValue: 100,
            onSlidingComplete: value2 => this.setState({ value2 }),
          },
          {
            key: 2,
            value: this.state.value2,
            minimumValue: 0,
            maximumValue: 100,
            onSlidingComplete: value2 => this.setState({ value2 }),
          },
        ],
      },
      {
        title: Strings.getLang('switch_test_localtheme'),
        data: [
          {
            key: 0,
            theme: {
              iconColor: '#fff',
              subFontColor: '#ff0000',
              cellBg: '#000',
              cellRadius: 14,
              margin: [14, 14, 14, 14],
              padding: [6, 6, 6, 6],
              minimumTrackTintColor: '#00ffff',
              thumbTintColor: 'red',
            },
            actionType: 'iconfont',
            Icon: 'volume-sharp-off',
            Action: 'volume-sharp-max',
            value: this.state.value1,
            minimumValue: 0,
            maximumValue: 100,
            canTouchTrack: true,
            onSlidingComplete: value1 => this.setState({ value1 }),
          },
          {
            key: 1,
            Icon: require('./res/timer.png'),
            Action: `${Math.round(this.state.value2)}%`,
            rightType: 'text',
            value: this.state.value2,
            minimumValue: 0,
            maximumValue: 100,
            onSlidingComplete: value2 => this.setState({ value2 }),
          },
        ],
      },
    ];
  }

  renderItem = ({ item }) => {
    return <TYSectionList.SliderItem {...item} />;
  };

  render() {
    return (
      <TYSectionList
        style={{ alignSelf: 'stretch' }}
        scrollEnabled={false}
        sections={this.sections}
        renderItem={this.renderItem}
      />
    );
  }
}
