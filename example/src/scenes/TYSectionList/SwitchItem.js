import React, { Component } from 'react';
import { TYSectionList } from 'tuya-panel-kit';
import Strings from '../../i18n';

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
        title: Strings.getLang('tysectionlist_switch_list'),
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
            subTitle: 'hahaha',
            value: this.state.value,
            onValueChange: value => this.setState({ value }),
          },
        ],
      },
      {
        title: Strings.getLang('tysectionlist_switch_adaptation'),
        data: [
          {
            key: 0,
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            value: this.state.value,
            onValueChange: value => this.setState({ value }),
          },
          {
            key: 1,
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            subTitle: `${Strings.getLang('tysectionlist_information')}${Strings.getLang('tysectionlist_information')}${Strings.getLang('tysectionlist_information')}`,
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
