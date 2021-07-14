/* eslint-disable react/no-array-index-key */
import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';
import Panel from './components/Panel';
import Strings from '../../i18n';

export default class OnlyContentTabsScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      d1: [
        { value: '1', label: '111' },
        { value: '2', label: '222' },
        { value: '3', label: '333' },
        { value: '4', label: '444' },
      ],
    };
  }

  _handleRelease = (gestureState, index) => {
    this.setState({ activeIndex: index });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TesterTitle title={Strings.getLang('tabs_lightweight')} />
        <Tabs.TabContent
          preload={false}
          activeIndex={this.state.activeIndex}
          onRelease={this._handleRelease}
        >
          {this.state.d1.map((data, idx) => (
            <Panel key={idx} title={`${idx}`} />
          ))}
        </Tabs.TabContent>
        <TesterTitle title={Strings.getLang('tabs_separate_content')} />
        <Tabs.TabContent activeIndex={this.state.activeIndex} onRelease={this._handleRelease}>
          {this.state.d1.map((data, idx) => (
            <Panel key={idx} largeData={idx === 1} title={data.label} />
          ))}
        </Tabs.TabContent>
      </View>
    );
  }
}
