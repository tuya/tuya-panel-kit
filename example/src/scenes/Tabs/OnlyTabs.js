import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';
import Strings from '../../i18n';

export default class OnlyTabsScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      activeKey2: '3',
      d1: [
        { value: '1', label: Strings.getLang('tabs_detector'), disabled: true },
        { value: '2', label: Strings.getLang('tabs_remote_control'), disabled: true },
        { value: '3', label: 'RFID' },
        { value: '4', label: Strings.getLang('tabs_bathroom'), disabled: true },
      ],
      d2: [
        { value: '1', label: Strings.getLang('tabs_all_equipment') },
        { value: '2', label: Strings.getLang('tabs_bedroom') },
        { value: '3', label: Strings.getLang('tabs_kitchen') },
        { value: '4', label: Strings.getLang('tabs_bathroom') },
        { value: '5', label: Strings.getLang('tabs_living_room') },
        { value: '6', label: Strings.getLang('tabs_study_room') },
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
        <TesterTitle title={Strings.getLang('tabs_basic')}/>
        <Tabs
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          onChange={this._handleD1Change}
        />
        <TesterTitle title={Strings.getLang('tabs_multi_screen')} />
        <Tabs
          activeKey={this.state.activeKey2}
          dataSource={this.state.d2}
          onChange={this._handleD2Change}
          background="transparent"
          maxItem={3}
          extraSpace={50}
        />
        <TesterTitle title={Strings.getLang('tabs_basic_stateless')} />
        <Tabs dataSource={this.state.d1} />
        <TesterTitle title={Strings.getLang('tabs_multi_screen_stateless')} />
        <Tabs dataSource={this.state.d2} />
        <TesterTitle title={Strings.getLang('tabs_fixed_underline')}/>
        <Tabs underlineWidth={30} dataSource={this.state.d2} />
        <TesterTitle title={Strings.getLang('tabs_custom_width')} />
        <Tabs style={{ width: 300, alignSelf: 'center' }} dataSource={this.state.d2} />
      </View>
    );
  }
}
