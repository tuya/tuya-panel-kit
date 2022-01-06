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
  const [value1, setValue1] = React.useState(true);
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', height }}
      list={[
        {
          title: Strings.getLang('studio'),
          content: (
            <View>
              <ClassicSwitchCard
                icon={TuyaRNSvgs.power}
                value={value1}
                onValueChange={v => setValue1(v)}
              />
              <ClassicSwitchCard
                icon={TuyaRNSvgs.power}
                subText="switch card"
                style={{ marginTop: 20 }}
                value={value1}
                onValueChange={v => setValue1(v)}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: <NordicSwitchCard value={value1} onValueChange={v => setValue1(v)} />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: (
            <AcrylicSwitchCard
              value={value1}
              onValueChange={v => setValue1(v)}
              icon={TuyaRNSvgs.power}
              subText="switch card"
            />
          ),
        },
      ]}
    />
  );
};
