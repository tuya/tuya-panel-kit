import React, { Component } from 'react';
import { TYSectionList } from 'tuya-panel-kit';

export default class TYSectionListInputItemScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      school: '',
    };
  }

  get sections() {
    return [
      {
        title: '输入框列表项',
        data: [
          {
            key: 0,
            title: `名字`,
            value: this.state.name,
            placeholder: '输入名字',
            onChangeText: name => this.setState({ name }),
          },
          {
            key: 1,
            title: `姓氏`,
            value: this.state.surname,
            placeholder: '输入姓氏',
            onChangeText: surname => this.setState({ surname }),
          },
          {
            key: 2,
            title: `学校`,
            value: this.state.school,
            placeholder: '输入学校名称',
            onChangeText: school => this.setState({ school }),
          },
        ],
      },
    ];
  }

  renderItem = ({ item }) => {
    return <TYSectionList.InputItem {...item} />;
  };

  render() {
    return (
      <TYSectionList
        style={{ alignSelf: 'stretch' }}
        contentContainerStyle={{ paddingTop: 16 }}
        sections={this.sections}
        renderItem={this.renderItem}
      />
    );
  }
}
