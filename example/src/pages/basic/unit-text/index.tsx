import React from 'react';
import { View } from 'react-native';
import { UnitText } from 'tuya-panel-kit';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('unittext_style'),
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <UnitText value=" " unit="%" unitColor="green" style={{ marginLeft: 20 }} />
              <UnitText
                value=" "
                unit={TuyaRNSvgs.celsius}
                unitColor="#9A3253"
                style={{ marginLeft: 40 }}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('unittext_size'),
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <UnitText value=" " size={88} unit="%" unitColor="green" style={{ marginLeft: 20 }} />
              <UnitText
                value=" "
                size={48}
                unit="fahrenheit"
                unitColor="#f0f"
                style={{ marginHorizontal: 40 }}
              />
              <UnitText value=" " size={66} unit={TuyaRNSvgs.celsius} unitColor="#9A3253" />
            </View>
          ),
        },
        {
          title: Strings.getLang('unittext_color'),
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <UnitText
                value="032"
                size={36}
                unit={TuyaRNSvgs.fahrenheit}
                valueColor="red"
                valueColors={['rgba(0, 0, 0, 0.3)', undefined, 'blue']}
                unitColor="red"
              />
            </View>
          ),
        },
      ]}
    />
  );
};
