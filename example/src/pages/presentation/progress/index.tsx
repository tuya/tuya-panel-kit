import React from 'react';
import { Progress, Utils } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      contentCenter={true}
      nthItemStyle={{
        marginTop: cx(90),
      }}
      list={[
        {
          title: Strings.getLang('text_basic'),
          content: (
            <Progress
              foreColor={{
                '0%': '#1381FB',
                '100%': '#00C36C',
              }}
              style={{ width: 100, height: 100 }}
              needMaxCircle={true}
              startColor="#1381FB"
              thumbRadius={4}
              value={50}
              startDegree={135}
              andDegree={270}
            />
          ),
        },
        {
          title: Strings.getLang('progress_space'),
          content: (
            <Progress.Space strokeWidth={2} scaleNumber={70} style={{ width: 100, height: 100 }} />
          ),
        },
        {
          title: Strings.getLang('progress_dou'),
          content: (
            <Progress.Double
              foreColor={{
                '0%': '#1381FB',
                '100%': '#00C36C',
              }}
              startDegree={170}
              style={{ width: 100, height: 100 }}
            />
          ),
        },
        {
          title: Strings.getLang('progress_comb'),
          content: <Progress.Compose style={{ width: 100, height: 100 }} />,
        },
      ]}
    />
  );
};
