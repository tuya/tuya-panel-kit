import React from 'react';
import { View } from 'react-native';
import { TYFlatList, TYText } from 'tuya-panel-kit';

import Strings from '#i18n';

export default () => {
  const data = [
    {
      key: 0,
      title: Strings.getLang('tyflatlist_0_title'),
      value: Strings.getLang('tyflatlist_0_value'),
      arrow: true,
    },
    {
      key: 1,
      title: Strings.getLang('tyflatlist_1_title'),
      subTitle: Strings.getLang('tyflatlist_1_subTitle'),
      arrow: true,
    },
    {
      key: 2,
      title: Strings.getLang('tyflatlist_2_title'),
      value: true,
    },
    {
      key: 3,
      theme: { subFontColor: '#FF4444' },
      title: Strings.getLang('tyflatlist_3_title'),
      subTitle: Strings.getLang('tyflatlist_3_subTitle'),
    },
    {
      key: 4,
      styles: { valueText: { maxWidth: 250 } },
      title: Strings.getLang('tyflatlist_4_title'),
      value: Strings.getLang('tyflatlist_4_value'),
      arrow: true,
    },
    {
      key: 5,
      title: Strings.getLang('tyflatlist_5_title'),
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
    {
      key: 6,
      title: Strings.getLang('tyflatlist_6_title'),
      Action: (
        <View
          style={{
            paddingHorizontal: 4,
            borderRadius: 8,
            backgroundColor: '#FF4444',
          }}
        >
          <TYText type="paragraph" size="normal" text="99+" color="#fff" />
        </View>
      ),
      arrow: true,
    },
    {
      key: 7,
      title: Strings.getLang('tyflatlist_7_title'),
      Action: Strings.getLang('tyflatlist_7_action'),
      subTitle: Strings.getLang('tyflatlist_7_subTitle'),
      theme: { descFontColor: '#7ED321' },
    },
  ];
  return (
    <TYFlatList
      style={{ alignSelf: 'stretch', backgroundColor: '#f5f5f5', height: 591, borderRadius: 8 }}
      data={data}
    />
  );
};
