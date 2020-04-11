import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';

export default class OnlyTabsScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      activeKey2: '3',
      d1: [
        { value: '1', label: '探测器', disabled: true },
        { value: '2', label: '遥控器', disabled: true },
        { value: '3', label: 'RFID' },
        { value: '4', label: '卫生间', disabled: true },
      ],
      d2: [
        { value: '1', label: '所有设备' },
        { value: '2', label: '卧室' },
        { value: '3', label: '厨房' },
        { value: '4', label: '卫生间' },
        { value: '5', label: '客厅' },
        { value: '6', label: '书房' },
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
        <TesterTitle title="基础Tabs" />
        <Tabs
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          onChange={this._handleD1Change}
        />
        <TesterTitle title="多屏Tabs" />
        <Tabs
          activeKey={this.state.activeKey2}
          dataSource={this.state.d2}
          onChange={this._handleD2Change}
          background="transparent"
          maxItem={3}
          extraSpace={50}
        />
        <TesterTitle title="基础Tabs（无状态组件）" />
        <Tabs dataSource={this.state.d1} />
        <TesterTitle title="多屏Tabs（无状态组件）" />
        <Tabs dataSource={this.state.d2} />
        <TesterTitle title="下划线宽度固定的Tabs" />
        <Tabs underlineWidth={30} dataSource={this.state.d2} />
        <TesterTitle title="自定义宽度的Tabs" />
        <Tabs style={{ width: 300, alignSelf: 'center' }} dataSource={this.state.d2} />
      </View>
    );
  }
}
