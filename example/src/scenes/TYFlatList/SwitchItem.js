import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';

export default class TYFlatListSwitchItemScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  get data() {
    return [
      {
        key: 0,
        title: 'Aluminum Rose',
        value: this.state.value,
        onValueChange: value => this.setState({ value }),
      },
      {
        key: 1,
        Icon: 'warning',
        title: 'Warning',
        subTitle: 'hahaha',
        value: this.state.value,
        onValueChange: value => this.setState({ value }),
      },
    ];
  }

  renderItem = ({ item }) => {
    return <TYFlatList.SwitchItem {...item} />;
  };

  render() {
    return (
      <TYFlatList
        style={{ alignSelf: 'stretch' }}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 16 }}
        data={this.data}
        renderItem={this.renderItem}
      />
    );
  }
}
