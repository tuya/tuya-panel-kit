import React from 'react';
import { View } from 'react-native';
import {
  ClassicDisplayCard,
  NordicDisplayCard,
  AcrylicDisplayCard,
} from 'tuya-panel-style-display-card';
import { Utils } from 'tuya-panel-utils';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

const { height } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', height }}
      list={[
        {
          title: Strings.getLang('studio'),
          content: (
            <View>
              <ClassicDisplayCard isAlignCenter />
              <ClassicDisplayCard backgroundColor="#FFF" icon={TuyaRNSvgs.power} />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: <NordicDisplayCard icon={TuyaRNSvgs.power} value="32.0" />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicDisplayCard />,
        },
      ]}
    />
  );
};
