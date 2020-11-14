import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TYFlatList } from 'tuya-panel-kit';

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
        title: `04月10日 23:15`,
        subTitle: `清扫 0平方米 | 工作 5分钟`,
        status: 0,
      },
      {
        key: 1,
        title: `04月11日 23:15`,
        subTitle: `清扫 10平方米 | 工作 15分钟`,
        status: 1,
      },
      {
        key: 2,
        title: `04月12日 23:15`,
        subTitle: `清扫 20平方米 | 工作 25分钟`,
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
        Action={status === 1 ? '清扫成功' : '清扫失败'}
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
