import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TYSectionList, TYText } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/src/components/iconfont/svg/defaultSvg'; // eslint-disable-line

const DetailAction = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TYText type="paragraph" size="large" text="详细信息" color="rgba(51, 51, 51, 0.5)" />
    <Image style={{ marginLeft: 6 }} source={require('./res/alert.png')} />
  </View>
);

export default class TYSectionListCheckboxItemScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: -1,
      value2: 0,
      values: [],
    };
  }

  get sections() {
    return [
      {
        title: '单选',
        data: new Array(3).fill(0).map((_, idx) => ({
          key: idx,
          theme: { descFontColor: idx === 0 ? '#7ED321' : '#F5A623' },
          Action: idx === 0 ? '清扫成功' : '清扫失败',
          title: `04月1${idx}日 23:15`,
          subTitle: `清扫 0平方米 | 工作 5分钟`,
          checked: this.state.value === idx,
          onChange: checked => this.setState({ value: checked ? idx : -1 }),
        })),
      },
      {
        title: '多选',
        data: [
          {
            key: 0,
            title: '多选项 - 选中情况',
            checked: this.state.values.includes(0),
            onChange: checked =>
              this.setState(({ values }) => ({
                values: checked ? [...values, 0] : values.filter(v => v !== 0),
              })),
          },
          {
            key: 1,
            title: '多选项 - 未选中情况',
            Action: () => <DetailAction />,
            checked: this.state.values.includes(1),
            onChange: checked =>
              this.setState(({ values }) => ({
                values: checked ? [...values, 1] : values.filter(v => v !== 1),
              })),
          },
          {
            key: 2,
            title: '多选项 - 无法操作的情况',
            Action: () => <DetailAction />,
            checked: false,
            disabled: true,
          },
          {
            key: 3,
            title: '多选项 - 无法操作选中的情况',
            Action: () => <DetailAction />,
            checked: true,
            disabled: true,
          },
        ],
      },
      {
        title: '适配测试',
        data: [
          {
            key: 0,
            title: `单选项标题过长的情况单选项标题过长的情况单选项标题过长的情况`,
            subTitle: '测试副标题',
            checked: this.state.value2 === 0,
            checkedIcon: svgs.selectedUnBordered,
            onChange: checked => this.setState({ value2: checked ? 0 : -1 }),
            hideOnUnselect: true,
          },
          {
            key: 1,
            title: `单选项标题过长的情况单选项标题过长的情况单选项标题过长的情况`,
            subTitle: '测试副标题',
            checked: this.state.value2 === 1,
            checkedIcon: svgs.selectedUnBordered,
            onChange: checked => this.setState({ value2: checked ? 1 : -1 }),
            hideOnUnselect: true,
          },
          {
            key: 2,
            title: `单选项`,
            checked: this.state.value2 === 2,
            checkedIcon: svgs.selectedUnBordered,
            onChange: checked => this.setState({ value2: checked ? 2 : -1 }),
            Action: () => <DetailAction />,
            hideOnUnselect: true,
          },
        ],
      },
    ];
  }

  renderItem = ({ item }) => {
    return <TYSectionList.CheckboxItem {...item} />;
  };

  render() {
    return (
      <TYSectionList
        style={{ alignSelf: 'stretch' }}
        sections={this.sections}
        renderItem={this.renderItem}
      />
    );
  }
}
