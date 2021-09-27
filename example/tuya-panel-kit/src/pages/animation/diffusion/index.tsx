import React from 'react';
import { View } from 'react-native';
import Diffusion from 'tuya-panel-animation-diffusion';
import { Utils } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      contentPadding={false}
      contentCenter={true}
      list={[
        {
          title: Strings.getLang('diffusion_basic'),
          content: <Diffusion />,
          itemStyle: {
            width: cx(250),
            height: cx(250),
          },
        },
        {
          title: Strings.getLang('diffusion_children'),
          content: (
            <Diffusion color="#0ff" number={3}>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#0ff' }} />
            </Diffusion>
          ),
          itemStyle: {
            width: cx(250),
            height: cx(250),
          },
        },
      ]}
    />
  );
};
