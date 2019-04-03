import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TYSectionList } from 'tuya-panel-kit';

export default class TYSectionListCheckboxItemScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: -1,
      values: [],
    };
  }

  get sections() {
    return [
      {
        title: '单选',
        data: [
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
        ],
      },
      {
        title: '多选',
        data: [
          {
            key: 4,
            title: `04月10日 23:15`,
            subTitle: `清扫 0平方米 | 工作 5分钟`,
            status: 0,
            checked: this.state.values.includes(4),
            onChange: checked =>
              this.setState(({ values }) => ({
                values: checked ? [...values, 4] : values.filter(v => v !== 4),
              })),
          },
          {
            key: 5,
            title: `04月11日 23:15`,
            subTitle: `清扫 10平方米 | 工作 15分钟`,
            status: 1,
            checked: this.state.values.includes(5),
            onChange: checked =>
              this.setState(({ values }) => ({
                values: checked ? [...values, 5] : values.filter(v => v !== 5),
              })),
          },
          {
            key: 6,
            title: `04月12日 23:15`,
            subTitle: `清扫 20平方米 | 工作 25分钟`,
            status: 1,
            checked: this.state.values.includes(6),
            onChange: checked =>
              this.setState(({ values }) => ({
                values: checked ? [...values, 6] : values.filter(v => v !== 6),
              })),
          },
        ],
      },
    ];
  }

  renderItem = ({ item, index }) => {
    const { status, ...itemProps } = item;
    return (
      <TYSectionList.CheckboxItem
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
      <TYSectionList
        style={{ alignSelf: 'stretch' }}
        contentContainerStyle={{ paddingTop: 16 }}
        sections={this.sections}
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
