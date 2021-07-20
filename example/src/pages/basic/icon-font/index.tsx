import React from 'react';
import { View } from 'react-native';
import { IconFont } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('iconfont_basic_use'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <IconFont name={'0' as any} style={{ marginRight: 25 }} />
              <IconFont name="plus" />
            </View>
          ),
        },
        {
          title: Strings.getLang('iconfont_color'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <IconFont name="error" style={{ marginRight: 25 }} />
              <IconFont name="error" color="red" />
            </View>
          ),
        },
        {
          title: Strings.getLang('iconfont_size'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <IconFont name="power" style={{ marginRight: 25 }} />
              <IconFont name="power" size={50 * 0.72} />
            </View>
          ),
        },
      ]}
    />
  );
};
