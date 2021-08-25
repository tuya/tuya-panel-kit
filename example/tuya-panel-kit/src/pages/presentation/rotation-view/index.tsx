import React from 'react';
import { Image } from 'react-native';
import { RotationView, Utils } from 'tuya-panel-kit';
import Strings from '#i18n';
import { ListView } from '#components';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      contentCenter={true}
      nthItemStyle={{
        marginTop: cx(24),
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
                    'https://cdn.jsdelivr.net/gh/TuyaInc/tuya-panel-kit-docs@gh-pages/assets/rotate-view-3.png',
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
                    'https://cdn.jsdelivr.net/gh/TuyaInc/tuya-panel-kit-docs@gh-pages/assets/rotate-view-4.png',
                }}
              />
            </RotationView>
          ),
        },
      ]}
    />
  );
};
