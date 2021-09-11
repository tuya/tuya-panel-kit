import React, { useState } from 'react';
import { ClassicSliderCard, ClassicLargeSliderCard } from 'tuya-panel-classic-kit';
import { NordicLargeSliderCard } from 'tuya-panel-nordic-kit';
import { AcrylicSliderCard } from 'tuya-panel-acrylic-kit';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { Text, View } from 'react-native';
import { ListView } from '#components';
import Strings from '#i18n';

const IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

export default () => {
  const [value, setValue] = useState(20);
  const [value1, setValue1] = useState(10);
  const [enumValue, setEnumValue] = useState(['无', '上', '下', '左', '右']);
  return (
    <ListView
      style={{ backgroundColor: '#f9f9f9', height: 'auto' }}
      list={[
        {
          title: Strings.getLang('studio'),
          content: (
            <View>
              <ClassicSliderCard
                style={{ marginTop: 20 }}
                title="滑动card"
                icon={TuyaRNSvgs.power}
                value={value}
                unit="%"
                handValueChange={setValue}
                canTouchTrack
              />
              <ClassicLargeSliderCard
                icon={TuyaRNSvgs.power}
                showIconBg
                iconBgColor={{
                  deg: 90,
                  stops: {
                    '0%': 'red',
                    '100%': 'yellow',
                  },
                }}
                style={{ marginTop: 20 }}
                title="粗的滑动条"
                unit="条"
                value={value}
                handSlidingComplete={setValue}
                disabled
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: (
            <View>
              <NordicLargeSliderCard
                title="风速"
                icon={TuyaRNSvgs.power}
                maximumValue={enumValue.length - 1}
                minimumValue={0}
                value={0}
                renderValue={value => enumValue[value]}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('acrylic'),
          content: (
            <View>
              <AcrylicSliderCard
                iconSize={20}
                title="Function"
                icon={IMAGE}
                bothSideIcons={[
                  { icon: IMAGE, isImage: true },
                  { icon: IMAGE, isImage: true },
                ]}
                bothSideIconIsImage
                iconIsImage
                value={value1}
                bottomPromptTexts={['Low', 'Max']}
                handValueChange={setValue1}
              />
              <AcrylicSliderCard
                style={{ marginTop: 20 }}
                iconSize={20}
                iconIsImage
                title="Function"
                icon={IMAGE}
                bothSideIcons={[{ icon: TuyaRNSvgs.power }, { icon: TuyaRNSvgs.power }]}
                value={value1}
                bottomPromptTexts={['最小', '最大']}
                handSlidingComplete={setValue1}
              />
              <AcrylicSliderCard
                style={{ marginTop: 20 }}
                iconSize={20}
                title="Function"
                icon={TuyaRNSvgs.power}
                maximumValue={enumValue.length - 1}
                minimumValue={0}
                value={0}
                bottomPromptTexts={['最小', '最大']}
                renderValue={value => enumValue[value]}
              />
            </View>
          ),
        },
      ]}
    />
  );
};
