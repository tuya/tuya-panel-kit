import React from 'react';
import { View } from 'react-native';
import { ClassicEnumCard } from 'tuya-panel-classic-kit';
import { NordicEnumCard } from 'tuya-panel-nordic-kit';
import { AcrylicEnumCard } from 'tuya-panel-acrylic-kit';
import { Utils } from 'tuya-panel-utils';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

const { height, convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', height }}
      list={[
        {
          title: Strings.getLang('studio'),
          content: (
            <View>
              <ClassicEnumCard icon={TuyaRNSvgs.power} />
              <ClassicEnumCard
                icon={TuyaRNSvgs.power}
                subText="switch card"
                style={{ marginTop: 20 }}
                padding={[cx(12), cx(20), cx(12), cx(20)]}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: <NordicEnumCard icon={TuyaRNSvgs.power} />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicEnumCard icon={TuyaRNSvgs.power} />,
        },
      ]}
    />
  );
};
