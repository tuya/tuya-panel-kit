import React from 'react';
import { View } from 'react-native';
import { ClassicArrowCard } from 'tuya-panel-classic-kit';
import { NordicArrowCard } from 'tuya-panel-nordic-kit';
import { AcrylicArrowCard } from 'tuya-panel-acrylic-kit';
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
              <ClassicArrowCard icon={TuyaRNSvgs.power} onPress={() => console.log('hhhhhh')} />
              <ClassicArrowCard
                icon={TuyaRNSvgs.power}
                subText="switch card"
                style={{ marginTop: 20 }}
                padding={[cx(12), cx(28), cx(12), cx(20)]}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: <NordicArrowCard icon={TuyaRNSvgs.power} />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicArrowCard icon={TuyaRNSvgs.power} />,
        },
      ]}
    />
  );
};
