import React, { Component } from 'react';
import { TYSectionList } from 'tuya-panel-kit';

export default class TYSectionListImageItemScene extends Component {
  get sections() {
    return [
      {
        title: '图文列表',
        data: [
          {
            key: 0,
            title: `列表标题`,
            Icon: require('./res/timer.png'),
            arrow: true,
          },
          {
            key: 1,
            title: `列表标题`,
            value: '详细信息',
            Action: '详细信息',
            iconSize: 24,
            Icon: require('./res/cover.png'),
            arrow: true,
          },
        ],
      },
      {
        title: null,
        data: [
          {
            key: 0,
            title: `列表标题`,
            subTitle: `描述信息`,
            Action: '详细信息',
            iconSize: 48,
            Icon: require('./res/cover.png'),
            imageFollowIconColor: false,
            arrow: true,
          },
        ],
      },
      {
        title: '图文列表适配',
        data: [
          {
            key: 0,
            title: `列表标题过长的情况列表标题过长的情况列表标题过长的情况`,
            Icon: require('./res/timer.png'),
            arrow: true,
          },
          {
            key: 1,
            title: `列表标题过长的情况列表标题过长的情况列表标题过长的情况`,
            subTitle: `这是这个列表的详细信息内容过长的情况这是这个列表的详细信息`,
            Icon: require('./res/timer.png'),
            arrow: true,
          },
          {
            key: 2,
            title: `列表标题过长的情况列表标题过长的情况列表标题过长的情况`,
            subTitle: `详细信息`,
            Icon: require('./res/timer.png'),
            arrow: true,
          },
          {
            key: 3,
            title: `列表标题过长的情况列表标题过长的情况列表标题过长的情况`,
            subTitle: `这是这个列表的详细信息内容过长的情况这是这个列表的详细信息`,
            iconSize: 48,
            Icon: require('./res/cover.png'),
            // children: (
            //   <TYSectionList.Item
            //     styles={{
            //       container: { borderTopWidth: 1, borderColor: '#eee' },
            //       content: { paddingLeft: 0, paddingRight: 0 },
            //     }}
            //     subTitle="详细信息"
            //     arrow={true}
            //   />
            // ),
          },
          // {
          //   key: 4,
          //   subTitle: `详细信息`,
          //   Icon: () => <View style={{ width: 48, backgroundColor: 'transparent' }} />,
          //   arrow: true,
          // },
        ],
      },
    ];
  }

  renderItem = ({ item }) => {
    return <TYSectionList.Item {...item} />;
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
