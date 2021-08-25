import React from 'react';
import { Image, View } from 'react-native';
import { IconFont, RotationView, TYText, Utils } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      contentCenter={true}
      nthItemStyle={{
        marginTop: cx(180),
      }}
      style={{
        backgroundColor: '#F5F5F6',
      }}
      list={[
        {
          title: Strings.getLang('rotationview_round'),
          content: (
            <RotationView style={{ width: 198, height: 198, marginTop: 20 }} active={true}>
              <Image
                style={{
                  width: 198,
                  height: 198,
                  resizeMode: 'contain',
                }}
                source={{
                  uri:
                    'https://images.tuyacn.com/rms-static/24872e70-0559-11ec-8caa-bf190bbd93b6-1629864096471.png?tyName=rotate-view-3.png',
                }}
              />
            </RotationView>
          ),
        },
        {
          title: Strings.getLang('rotationview_circle'),
          content: (
            <RotationView style={{ width: 198, height: 198, marginTop: 20 }} active={true}>
              <Image
                style={{
                  width: 198,
                  height: 198,
                  resizeMode: 'contain',
                }}
                source={{
                  uri:
                    'https://images.tuyacn.com/rms-static/7ee5cb60-0559-11ec-8caa-bf190bbd93b6-1629864248086.png?tyName=rotate-view-4.png',
                }}
              />
            </RotationView>
          ),
        },
      ]}
    />
  );
};
