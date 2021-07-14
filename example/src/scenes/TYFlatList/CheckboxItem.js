import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TYFlatList } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class TYFlatListCheckboxItemScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: -1,
    };
  }

  get data() {
    return [
      {
        key: 0,
        title: Strings.getLang('tyflatlist_day1'),
        subTitle: Strings.getLang('tyflatlist_work1'),
        status: 0,
      },
      {
        key: 1,
        title: Strings.getLang('tyflatlist_day2'),
        subTitle: Strings.getLang('tyflatlist_work2'),
        status: 1,
      },
      {
        key: 2,
        title: Strings.getLang('tyflatlist_day3'),
        subTitle: Strings.getLang('tyflatlist_work3'),
        status: 1,
        Icon: require('./res/cover.png'),
        hideOnUnselect: true,
        reverse: true,
      },
    ];
  }

  renderItem = ({ item, index }) => {
    const { status, ...itemProps } = item;
    return (
      <TYFlatList.CheckboxItem
        styles={{
          container: styles.listItem,
          valueText: status === 1 ? styles.success : styles.warning,
        }}
        color="#4073fc"
        checked={this.state.value === index}
        onChange={checked => this.setState({ value: checked ? index : -1 })}
        Action={status === 1 ? Strings.getLang('tyflatlist_success') : Strings.getLang('tyflatlist_failure')}
        {...itemProps}
      />
    );
  };

  render() {
    return (
      <TYFlatList
        style={{ alignSelf: 'stretch' }}
        contentContainerStyle={{ paddingTop: 16 }}
        data={this.data}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 80,
  },

  success: {
    color: '#7ED321',
  },

  warning: {
    color: '#F5A623',
  },
});
