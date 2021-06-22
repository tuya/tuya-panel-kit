import React, { Component } from 'react';
import strings from 'src/i18n/strings';
import { TYSectionList } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class TYSectionListImageItemScene extends Component {
  get sections() {
    return [
      {
        title: Strings.getLang('tysectionlist_graphic_list'),
        data: [
          {
            key: 0,
            title: Strings.getLang('tysectionlist_list_title'),
            Icon: require('./res/timer.png'),
            arrow: true,
          },
          {
            key: 1,
            title:  Strings.getLang('tysectionlist_list_title'),
            value: Strings.getLang('tysectionlist_details'),
            Action: Strings.getLang('tysectionlist_details'),
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
            title: Strings.getLang('tysectionlist_list_title'),
            subTitle: Strings.getLang('tysectionlist_description'),
            Action: Strings.getLang('tysectionlist_details'),
            iconSize: 48,
            Icon: require('./res/cover.png'),
            imageFollowIconColor: false,
            arrow: true,
          },
        ],
      },
      {
        title: Strings.getLang('tysectionlist_picture_adaptation'),
        data: [
          {
            key: 0,
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            Icon: require('./res/timer.png'),
            arrow: true,
          },
          {
            key: 1,
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            subTitle: `${Strings.getLang('tysectionlist_information')}${Strings.getLang('tysectionlist_information')}${Strings.getLang('tysectionlist_information')}`,
            Icon: require('./res/timer.png'),
            arrow: true,
          },
          {
            key: 2,
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            subTitle: Strings.getLang('tysectionlist_details'),
            Icon: require('./res/timer.png'),
            arrow: true,
          },
          {
            key: 3,
            title: `${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}${Strings.getLang('tysectionlist_longtitle')}`,
            subTitle: `${Strings.getLang('tysectionlist_information')}${Strings.getLang('tysectionlist_information')}${Strings.getLang('tysectionlist_information')}`,
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
