import React from 'react';
import { Battery, Utils } from 'tuya-panel-kit';

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
      list={[
        {
          title: Strings.formatValue('battery_power', '100'),
          content: <Battery value={100} />,
          contentStyle: {
            width: cx(100),
          },
        },
        {
          title: Strings.formatValue('battery_power', '60'),
          content: <Battery value={60} />,
          contentStyle: {
            width: cx(100),
          },
        },
        {
          title: Strings.formatValue('battery_power', '19'),
          content: <Battery value={19} />,
          contentStyle: {
            width: cx(100),
          },
        },
        {
          title: Strings.formatValue('battery_power', '9'),
          content: <Battery value={9} />,
          contentStyle: {
            width: cx(100),
          },
        },
        {
          title: Strings.formatValue('battery_power', '0'),
          content: <Battery value={0} />,
          contentStyle: {
            width: cx(100),
          },
        },
        {
          title: Strings.formatValue('battery_power_cus', '40'),
          content: <Battery value={40} size={30} theme={{ batteryColor: 'rgba(167,98,43,.5)' }} />,
          contentStyle: {
            width: cx(100),
            marginTop: cx(40),
          },
        },
        {
          title: Strings.formatValue('battery_power_mod', '60'),
          content: <Battery value={60} size={30} onCalcColor={calcColor} middleColor="#999" />,
          contentStyle: {
            width: cx(100),
            marginTop: cx(40),
          },
          itemStyle: {
            marginTop: cx(20),
          },
        },
      ]}
    />
  );
};
