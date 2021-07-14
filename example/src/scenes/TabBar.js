import React from 'react';
import { View } from 'react-native';
import { TabBar } from 'tuya-panel-kit';

class TabBarScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab: '2',
    };
  }
  render() {
    const tabs = Array.from(Array(10), (v, k) => k + 1).map(v => {
      return { key: `${v}`, title: `Tab${v}` };
    });
    const tabRadios = Array.from(Array(3), (v, k) => k + 1).map(v => {
      return { key: `${v}`, title: `Tab${v}` };
    });
    const tabRadiosCircle = Array.from(Array(3), (v, k) => k + 1).map(v => {
      return {
        key: `${v}`,
        title: `Tab${v}`,
        activeTextStyle: { color: '#FFF' },
      };
    });
    return (
      <View>
        <TabBar
          tabs={tabs}
          activeKey={this.state.tab}
          onChange={value => this.setState({ tab: value })}
          underlineStyle={{ width: 20 }}
        />
        <TabBar
          type="radio"
          tabs={tabRadios}
          activeKey={this.state.tab}
          onChange={value => this.setState({ tab: value })}
          style={{ margin: 10, marginTop: 200 }}
        />
        <TabBar
          type="radioCircle"
          tabs={tabRadiosCircle}
          activeKey={this.state.tab}
          onChange={value => this.setState({ tab: value })}
          style={{ margin: 10, marginTop: 200 }}
          activeColor="#57BCFB"
        />
      </View>
    );
  }
}

export default TabBarScene;
