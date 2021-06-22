import React, { Component } from 'react';
import { TYSectionList } from 'tuya-panel-kit';
import Strings from '../../i18n';

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
        title: Strings.getLang('tysectionlist_inputbox_list'),
        data: [
          {
            key: 0,
            title: Strings.getLang('tyflatlist_name'),
            value: this.state.name,
            placeholder: Strings.getLang('tyflatlist_entername'),
            onChangeText: name => this.setState({ name }),
          },
          {
            key: 1,
            title: Strings.getLang('tyflatlist_lastname'),
            value: this.state.surname,
            placeholder: Strings.getLang('tyflatlist_enter_lastname'),
            onChangeText: surname => this.setState({ surname }),
          },
          {
            key: 2,
            title: Strings.getLang('tyflatlist_school'),
            value: this.state.school,
            placeholder: Strings.getLang('tyflatlist_enter_schoolname'),
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
