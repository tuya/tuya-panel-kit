import React from 'react';
import { View } from 'react-native';
import { ClassicItemCard } from 'tuya-panel-classic-kit';
import { NordicItemCard } from 'tuya-panel-nordic-kit';
import { AcrylicItemCard } from 'tuya-panel-acrylic-kit';
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
              <ClassicItemCard
                icon={TuyaRNSvgs.power}
                text="Item Card"
                onValueChange={() => {
                  console.log('pppp');
                }}
              />
              <ClassicItemCard
                icon={TuyaRNSvgs.power}
                subText="Item card"
                style={{ marginTop: 20 }}
                padding={[cx(12), cx(20), cx(12), cx(20)]}
                text="Item Card"
                onValueChange={() => {
                  console.log('pppp');
                }}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: (
            <NordicItemCard
              icon={TuyaRNSvgs.power}
              text="Item Card"
              onValueChange={() => {
                console.log('pppp');
              }}
            />
          ),
        },
        {
          title: Strings.getLang('acrylic'),
          content: (
            <AcrylicItemCard
              icon={TuyaRNSvgs.power}
              text="Item Card"
              onValueChange={() => {
                console.log('pppp');
              }}
            />
          ),
        },
      ]}
    />
  );
};
