/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, Image } from 'react-native';
import { Tabs, TYListItem, TYText } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';
import Panel from './components/Panel';
import Strings from '../../i18n';

const Res = {
  hue: require('../../res/hue.png'),
};

export default class NestedTabsScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      activeKey2: '3',
      d1: [
        {
          value: '1',
          renderTab: (isActive, state, tabProps) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 36, height: 36 }} source={Res.hue} />
                <TYText color={isActive ? 'red' : '#000'} text={Strings.getLang('tabs_detector')} />
              </View>
            );
          },
        },
        { value: '2', label: Strings.getLang('tabs_remote_control') },
        { value: '3', label: 'RFID' },
        { value: '4', label: Strings.getLang('tabs_limit_detector') },
      ],
      d2: [
        { value: '1', label: '1' },
        { value: '2', label: '22' },
        { value: '3', label: '333' },
        { value: '4', label: '4444' },
        { value: '5', label: '55555' },
        { value: '6', label: '666666' },
        { value: '7', label: '7777777' },
        { value: '8', label: '88888888' },
      ],
    };
  }

  _handleD1Change = tab => {
    this.setState({ activeKey1: tab.value });
  };

  _handleD2Change = tab => {
    this.setState({ activeKey2: tab.value });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TesterTitle title={Strings.getLang('tabs_nested')} />
        <Tabs
          tabPosition="bottom"
          underlineStyle={{ backgroundColor: 'transparent' }}
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          swipeable={false}
          onChange={this._handleD1Change}
          background="#f99"
        >
          <Tabs.TabPanel background="#fff">
            <Tabs
              activeKey={this.state.activeKey2}
              dataSource={this.state.d2}
              onChange={this._handleD2Change}
            >
              {this.state.d2.map((data, idx) => (
                <Panel key={idx} title={data.label} />
              ))}
            </Tabs>
          </Tabs.TabPanel>
          <Tabs.TabPanel background="#fff">
            <TYListItem title="Page two" />
          </Tabs.TabPanel>
          <Tabs.TabPanel background="#fff">
            <TYListItem title="Page three" />
          </Tabs.TabPanel>
          <Tabs.TabPanel background="#fff">
            <TYListItem title="Page four" />
          </Tabs.TabPanel>
        </Tabs>
      </View>
    );
  }
}
