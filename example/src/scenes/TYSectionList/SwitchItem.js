import React, { Component } from 'react';
import { TYSectionList } from 'tuya-panel-kit';

export default class TYSectionListSwitchItemScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  get sections() {
    return [
      {
        title: '开关列表项',
        data: [
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
            subTitle: '哈哈哈',
            value: this.state.value,
            onValueChange: value => this.setState({ value }),
          },
        ],
      },
    ];
  }

  renderItem = ({ item }) => {
    return <TYSectionList.SwitchItem {...item} />;
  };

  render() {
    return (
      <TYSectionList
        style={{ alignSelf: 'stretch' }}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 16 }}
        sections={this.sections}
        renderItem={this.renderItem}
      />
    );
  }
}
