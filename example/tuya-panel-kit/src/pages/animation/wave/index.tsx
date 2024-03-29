import React from 'react';
import { Utils, Wave } from 'tuya-panel-kit';
import { ListView } from '#components';
import Strings from '#i18n';

const { viewWidth, convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      contentPadding={false}
      contentCenter={true}
      list={[
        {
          title: Strings.getLang('wave_basic'),
          content: <Wave />,
          itemStyle: {
            width: viewWidth,
            height: cx(180),
          },
        },
        {
          title: Strings.getLang('wave_custom'),
          content: (
            <Wave
              style={{ width: 120, height: 120, borderRadius: 60 }}
              H={60}
              waveParams={[
                { A: 30, T: 120, fill: '#333' },
                { A: 20, T: 100, fill: '#666' },
              ]}
              animated={true}
            />
          ),
          itemStyle: {
            width: viewWidth,
            height: cx(180),
          },
        },
      ]}
    />
  );
};
