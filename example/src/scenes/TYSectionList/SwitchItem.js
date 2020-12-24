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
            disabled: true,
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
      {
        title: '开关列表项适配',
        data: [
          {
            key: 0,
            title: '列表标题过长的情况列表标题过长的情况列表标题过长的情况',
            value: this.state.value,
            onValueChange: value => this.setState({ value }),
          },
          {
            key: 1,
            title: '列表标题过长的情况列表标题过长的情况列表标题过长的情况',
            subTitle: '这是这个列表的详细信息内容过长的情况这是这个列表的详细信息内容过长的情况',
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
        sections={this.sections}
        renderItem={this.renderItem}
      />
    );
  }
}
