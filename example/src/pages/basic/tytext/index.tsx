import React from 'react';
import { View } from 'react-native';
import { TYText } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('tytext_basic_style'),
          content: <TYText color="red" text="I am Tuya'er" weight="bold" size={24} />,
        },
        {
          title: Strings.getLang('tytext_size_type'),
          content: (
            <View>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TYText size="small" type="paragraph" text="Tuya" />
                <TYText size="small" type="title" text="Tuya" style={{ marginHorizontal: 20 }} />
                <TYText size="small" type="heading" text="Tuya" />
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TYText size="normal" type="paragraph" text="Tuya" />
                <TYText size="normal" type="title" text="Tuya" style={{ marginHorizontal: 20 }} />
                <TYText size="normal" type="heading" text="Tuya" />
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TYText size="large" type="paragraph" text="Tuya" />
                <TYText size="large" type="title" text="Tuya" style={{ marginHorizontal: 20 }} />
                <TYText size="large" type="heading" text="Tuya" />
              </View>
            </View>
          ),
        },
      ]}
    />
  );
};
