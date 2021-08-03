import React from 'react';
import { View } from 'react-native';
import { IconFont, Utils } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('style_basic'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <IconFont name="arrow" />
              <IconFont name="backAndroid" />
              <IconFont name="backIos" />
              <IconFont name="celsius" />
            </View>
          ),
        },
        {
          title: `${Strings.getLang('style_basic')} - ${Strings.getLang('iconfont_color')}`,
          content: (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <IconFont color="#F84803" name="arrow" />
              <IconFont color="#F84803" name="backAndroid" />
              <IconFont color="#F84803" name="backIos" />
              <IconFont color="#F84803" name="celsius" />
            </View>
          ),
        },
        {
          title: `${Strings.getLang('style_basic')} - ${Strings.getLang('iconfont_size')}`,
          content: (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <IconFont color="#F84803" size={cx(14)} name="arrow" />
              <IconFont color="#F84803" size={cx(24)} name="backAndroid" />
              <IconFont color="#F84803" size={cx(34)} name="backIos" />
              <IconFont color="#F84803" size={cx(44)} name="celsius" />
            </View>
          ),
        },
      ]}
    />
  );
};
