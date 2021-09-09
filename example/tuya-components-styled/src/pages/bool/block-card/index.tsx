import React from 'react';
import { View } from 'react-native';
import { ClassicBlockCard } from 'tuya-panel-classic-kit';
import { NordicBlockCard } from 'tuya-panel-nordic-kit';
import { AcrylicBlockCard } from 'tuya-panel-acrylic-kit';
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
              <ClassicBlockCard icon={TuyaRNSvgs.power} />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: <NordicBlockCard />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicBlockCard icon={TuyaRNSvgs.power} />,
        },
      ]}
    />
  );
};
