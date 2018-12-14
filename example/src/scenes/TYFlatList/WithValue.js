import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';

export default class TYFlatListWithValueScene extends Component {
  state = {
    boolValue: true,
    strValue: '随机数字',
  }

  get data() {
    return [{
      key: 1,
      title: '布尔型value',
      value: this.state.boolValue,
      onValueChange: boolValue => this.setState({ boolValue }),
    }, {
      key: 2,
      title: '字符型value',
      value: this.state.strValue,
      onPress: () => this.setState({
        strValue: `随机数字: ${Math.random().toFixed(2) * 100}`,
      }),
    }, {
      key: 3,
      title: '定制SwitchButton',
      value: this.state.boolValue,
      onValueChange: boolValue => this.setState({ boolValue }),
      SwitchButtonProps: {
        onTintColor: '#007AFF',
      },
    }, {
      key: 4,
      title: '我不需要重新渲染也不可点击',
      disabled: true,
      value: this.state.strValue,
      onPress: () => this.setState({
        strValue: `随机数字: ${Math.random().toFixed(2) * 100}`,
      }),
      needUpdate: false,
    }];
  }

  render() {
    return (
      <TYFlatList
        style={{ alignSelf: 'stretch' }}
        contentContainStyle={{ paddingTop: 16 }}
        data={this.data}
      />
    );
  }
}
