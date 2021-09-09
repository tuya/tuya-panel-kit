import React from 'react';
import { View } from 'react-native';
import { ClassicStepCard } from 'tuya-panel-classic-kit';
import { NordicStepCard } from 'tuya-panel-nordic-kit';
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
              <ClassicStepCard onValueChange={value => console.log({ value })} />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: <NordicStepCard icon={TuyaRNSvgs.power} unit="%" />,
        },
      ]}
    />
  );
};
