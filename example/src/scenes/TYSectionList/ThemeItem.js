import React, { Component } from 'react';
import { TYSectionList } from 'tuya-panel-kit';

export default class TYSectionListBasicScene extends Component {
  get sections() {
    return [
      {
        title: '测试一下local theme配置',
        data: [
          {
            key: 0,
            Icon: 'close',
            theme: {
              iconColor: '#ff00ff',
              fontColor: '#ff0000',
              subFontColor: '#00ffff',
              descFontColor: '#00ff00',
              cellLine: '#000',
              cellBg: '#999',
              cellRadius: 24,
              margin: [24, 16, 8, 4],
              padding: [4, 8, 16, 24],
            },
            title: '列表标题过长的情况列表标题过长的情况列表标题过长的情况',
            subTitle: '警告信息',
            Action: '哈哈蛤',
          },
        ],
      },
    ];
  }

  render() {
    return <TYSectionList style={{ alignSelf: 'stretch' }} sections={this.sections} />;
  }
}
