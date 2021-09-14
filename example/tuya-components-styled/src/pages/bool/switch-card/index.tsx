import React from 'react';
import { View } from 'react-native';
import { ClassicSwitchCard } from 'tuya-panel-classic-kit';
import { NordicSwitchCard } from 'tuya-panel-nordic-kit';
import { AcrylicSwitchCard } from 'tuya-panel-acrylic-kit';
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
              <ClassicSwitchCard icon={TuyaRNSvgs.power} />
              <ClassicSwitchCard
                icon={TuyaRNSvgs.power}
                subText="switch card"
                style={{ marginTop: 20 }}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: <NordicSwitchCard />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicSwitchCard icon={TuyaRNSvgs.power} subText="switch card" />,
        },
      ]}
    />
  );
};
