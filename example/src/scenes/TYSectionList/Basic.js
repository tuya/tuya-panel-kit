import React, { Component } from 'react';
import { View } from 'react-native';
import { TYSdk, TYText, TYSectionList } from 'tuya-panel-kit';

const TYNative = TYSdk.native;

export default class TYSectionListBasicScene extends Component {
  state = {
    switch1: true,
    switch2: false,
  };

  get sections() {
    return [
      {
        title: '基础列表',
        data: new Array(2).fill(0).map((_, idx) => ({
          key: idx,
          title: `列表标题${idx + 1}`,
          value: idx === 0 ? '' : '详细信息',
          arrow: true,
          onPress: this._handleItemPress(idx),
        })),
      },
      {
        title: 'Switch列表',
        data: new Array(2).fill(0).map((_, idx) => ({
          key: idx,
          title: `列表标题${idx + 1}`,
          value: this.state[`switch${idx + 1}`],
          onValueChange: value => this.setState({ [`switch${idx + 1}`]: value }),
        })),
      },
      {
        title: '定制文案颜色',
        data: new Array(3).fill(0).map((_, idx) => {
          const valueMap = {
            0: '详细信息',
            1: '新内容',
            2: '警告信息',
          };
          const colorMap = {
            0: 'rgba(51, 51, 51, 0.5)',
            1: '#0E7EFF',
            2: '#FF4444',
          };
          return {
            key: idx,
            theme: { descFontColor: colorMap[idx] },
            title: `列表标题${idx + 1}`,
            value: valueMap[idx],
            onPress: this._handleItemPress(idx),
          };
        }),
      },
      {
        title: '定制Action',
        data: new Array(3).fill(0).map((_, idx) => {
          const valueMap = {
            0: '8',
            1: '99+',
            2: 'New',
          };
          return {
            key: idx,
            title: `列表标题${idx + 1}`,
            Action: (
              <View style={{ paddingHorizontal: 4, borderRadius: 8, backgroundColor: '#FF4444' }}>
                <TYText type="paragraph" size="normal" text={valueMap[idx]} color="#fff" />
              </View>
            ),
            arrow: true,
          };
        }),
      },
      {
        title: '分类标题',
        data: [
          {
            key: 0,
            title: '列表标题1',
            arrow: true,
          },
        ],
      },
      {
        footer: '这是这个列表的详细说明及解释',
        data: [
          {
            key: 0,
            title: '列表标题1',
            arrow: true,
          },
        ],
      },
      {
        footer: (
          <View style={{ flexDirection: 'row' }}>
            <TYText
              type="paragraph"
              size="normal"
              color="#666"
              text="这是这个列表的详细说明及解释"
            />
            <TYText type="paragraph" size="normal" color="#3388FF" text="了解详情" />
          </View>
        ),
        data: [
          {
            key: 0,
            title: '列表标题1',
            arrow: true,
          },
        ],
      },
      {
        footer:
          '这是这个列表的详细说明及解释这是这个列表的详细说明及解释这是这个列表的详细说明及解释',
        data: [
          {
            key: 0,
            title: '列表标题1',
            arrow: true,
          },
        ],
      },
      {
        title: '列表文案适配测试',
        data: [
          {
            key: 0,
            title: '列表标题1',
            subTitle: '这是这个列表的详细信息内容过长的情况这是这个列表的详细信息内容过长的情况',
            arrow: true,
          },
          {
            key: 1,
            title: '列表标题过长的情况列表标题过长的情况列表标题过长的情况',
            subTitle: '详细信息',
            arrow: true,
          },
          {
            key: 2,
            title: '列表标题过长的情况列表标题过长的情况列表标题过长的情况',
            subTitle: '这是这个列表的详细信息内容过长的情况这是这个列表的详细信息内容过长的情况',
            arrow: true,
          },
          {
            key: 3,
            title: '列表标题过长的情况列表标题过长的情况列表标题过长的情况',
            value: true,
          },
          {
            key: 4,
            theme: { subFontColor: '#FF4444' },
            title: '列表标题过长的情况列表标题过长的情况列表标题过长的情况',
            subTitle: '警告信息',
          },
          {
            key: 5,
            title: '列表标题过长的情况列表标题过长的情况列表标题过长的情况',
            children: (
              <View
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 4,
                  paddingHorizontal: 4,
                  borderRadius: 8,
                  backgroundColor: '#FF4444',
                }}
              >
                <TYText type="paragraph" size="normal" text="New" color="#fff" />
              </View>
            ),
          },
        ],
      },
    ];
  }

  _handleItemPress = value => () => {
    TYNative.simpleTipDialog(`Click Item ${value}`, () => {});
  };

  render() {
    return <TYSectionList style={{ alignSelf: 'stretch' }} sections={this.sections} />;
  }
}
