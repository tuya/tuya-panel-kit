import React, { Component } from 'react';
import { TYSectionList } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class TYSectionListBasicScene extends Component {
  get sections() {
    return [
      {
        title: Strings.getLang('button_local_theme_test'),
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
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            subTitle: Strings.getLang('tysectionlist_warning_message'),
            Action: 'hahaha',
          },
        ],
      },
    ];
  }

  render() {
    return <TYSectionList style={{ alignSelf: 'stretch' }} sections={this.sections} />;
  }
}
