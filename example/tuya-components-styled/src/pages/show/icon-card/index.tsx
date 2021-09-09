import React from 'react';
import { View } from 'react-native';
import { ClassicIconBlockCard } from 'tuya-panel-classic-kit';
import { NordicIconBlockCard } from 'tuya-panel-nordic-kit';
import { AcrylicIconBlockCard } from 'tuya-panel-acrylic-kit';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', height: 1200 }}
      list={[
        {
          title: Strings.getLang('studio'),
          content: <ClassicIconBlockCard icon={TuyaRNSvgs.power} />,
        },
        {
          title: Strings.getLang('nordic'),
          content: (
            <View>
              <NordicIconBlockCard icon={TuyaRNSvgs.power} />
              <NordicIconBlockCard showIcon={false} hasArrow style={{ marginTop: 20 }} />
              <NordicIconBlockCard icon={TuyaRNSvgs.power} hasArrow style={{ marginTop: 20 }} />
            </View>
          ),
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicIconBlockCard icon={TuyaRNSvgs.power} />,
        },
      ]}
    />
  );
};
