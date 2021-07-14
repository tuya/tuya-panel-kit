/* eslint-disable react/no-array-index-key */
import _ from 'lodash';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Tabs, TYText, TYListItem } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';
import Panel from './components/Panel';
import Strings from '../../i18n';

export default class WithContentTabsScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      activeKey2: '3',
      d1: [
        { value: '1', label: Strings.getLang('tabs_detector') },
        { value: '2', label: Strings.getLang('tabs_remote_control') },
        { value: '3', label: 'RFID' },
        { value: '4', label: Strings.getLang('tabs_limit_detector') },
      ],
      d2: [
        { value: '1', label: '1' },
        { value: '2', label: '22' },
        { value: '3', label: '333' },
        { value: '4', label: Strings.getLang('tabs_limit_detector') },
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
        {/* https://github.com/facebook/react-native/issues/11206 */}
        <TesterTitle title={Strings.getLang('tabs_onescreen')} />
        <Tabs
          wrapperStyle={{ width: 300, alignSelf: 'center' }}
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          swipeable={true}
          onChange={this._handleD1Change}
        >
          <Tabs.TabPanel style={{ width: 300 }}>
            <Tabs.TabScrollView>
              {_.times(10, n => (
                // <TYListItem key={n} title={`测试_${n}`} />
                <TYText key={n} text={`${Strings.getLang('test')}${n}`} />
              ))}
            </Tabs.TabScrollView>
          </Tabs.TabPanel>
          <Tabs.TabPanel style={{ width: 300 }}>
            <TYListItem title="Page two" />
          </Tabs.TabPanel>
          <Tabs.TabPanel style={{ width: 300 }}>
            <TYListItem title="Page three" />
          </Tabs.TabPanel>
          <Tabs.TabPanel style={{ width: 300 }}>
            <TYListItem title="Page four" />
          </Tabs.TabPanel>
        </Tabs>
        <TesterTitle title={Strings.getLang('tabs_multiple_screens')} />
        <Tabs
          activeKey={this.state.activeKey2}
          dataSource={this.state.d2}
          onChange={this._handleD2Change}
        >
          {this.state.d2.map((data, idx) => (
            <Panel key={idx} title={data.label} />
          ))}
        </Tabs>
        <TesterTitle title={Strings.getLang('tabs_multiple_screens_below')} />
        <Tabs
          tabPosition="bottom"
          activeKey={this.state.activeKey2}
          dataSource={this.state.d2}
          onChange={this._handleD2Change}
        >
          {this.state.d2.map((data, idx) => (
            <Panel key={idx} title={data.label} />
          ))}
        </Tabs>
      </View>
    );
  }
}
