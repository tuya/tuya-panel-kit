import React from 'react';
import { View } from 'react-native';
import { ClassicDepictCard } from 'tuya-panel-classic-kit';
import { NordicDepictCard } from 'tuya-panel-nordic-kit';
import { AcrylicDepictCard, AcrylicDepictIconCard } from 'tuya-panel-acrylic-kit';
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
          content: <ClassicDepictCard backgroundColor="#fff" />,
        },
        {
          title: Strings.getLang('nordic'),
          content: <NordicDepictCard />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: (
            <View>
              <AcrylicDepictCard style={{ marginBottom: 20 }} />
              <AcrylicDepictIconCard icon={TuyaRNSvgs.power} />
            </View>
          ),
        },
      ]}
    />
  );
};
