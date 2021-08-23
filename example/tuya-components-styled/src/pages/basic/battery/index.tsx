import React from 'react';
import { Battery, Utils } from 'tuya-panel-kit';

import { View } from 'react-native';
import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  // 自定义电量颜色分配规则
  const calcColor = (top, highColor, middleColor, lowColor) => {
    // 0-10%: 红色   10%-60%: 黑色    60%-100%: 绿色
    if (top <= 8.4 && top >= 3) {
      return highColor;
    }
    if (top <= 15.6 && top > 8.4) {
      return middleColor;
    }
    return lowColor;
  };

  return (
    <ListView
      contentPadding={false}
      list={[
        {
          title: Strings.getLang('style_basic'),
          contentStyle: {
            marginTop: cx(24),
          },
          content: (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}
            >
              {[100, 50, 20, 10].map((val, i) => (
                <View key={val} style={{ flexGrow: 1 }}>
                  <Battery value={val} />
                </View>
              ))}
            </View>
          ),
        },
        {
          title: Strings.getLang('battery_power_cus2'),
          content: <Battery value={100} theme={{ batteryColor: '#FF4800' }} />,
          contentStyle: {
            width: cx(86),
            marginTop: cx(24),
          },
          itemStyle: {
            marginTop: cx(20),
          },
        },
        {
          title: Strings.getLang('battery_power_mod2'),
          content: <Battery value={100} onCalcColor={calcColor} highColor="#999" />,
          contentStyle: {
            width: cx(86),
            marginTop: cx(24),
          },
          itemStyle: {
            marginTop: cx(20),
          },
        },
      ]}
    />
  );
};
