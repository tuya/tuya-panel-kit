import React from 'react';
import { View } from 'react-native';
import { Swipeout, TYText } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('swipeout_left'),
          content: (
            <Swipeout
              autoClose={true}
              left={[
                {
                  text: 'action',
                  type: 'primary',
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  fontStyle: { color: '#fff', fontSize: 16 },
                },
              ]}
            >
              <View
                style={{
                  height: 44,
                  backgroundColor: '#f99',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                }}
              >
                <TYText style={{ color: '#333' }}>
                  {Strings.getLang('swipeout_left_content')}
                </TYText>
              </View>
            </Swipeout>
          ),
        },
        {
          title: Strings.getLang('swipeout_right'),
          content: (
            <Swipeout
              autoClose={true}
              right={[
                {
                  text: 'delete',
                  type: 'delete',
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  fontStyle: { color: '#fff', fontSize: 16 },
                },
              ]}
            >
              <View
                style={{
                  height: 44,
                  backgroundColor: '#66f',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                }}
              >
                <TYText style={{ color: '#333' }}>
                  {Strings.getLang('swipeout_right_content')}
                </TYText>
              </View>
            </Swipeout>
          ),
        },
        {
          title: Strings.getLang('swipeout_disable'),
          content: (
            <Swipeout
              autoClose={true}
              disabled={true}
              right={[
                {
                  text: 'delete',
                  type: 'delete',
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  fontStyle: { color: '#fff', fontSize: 16 },
                },
              ]}
            >
              <View
                style={{
                  height: 44,
                  backgroundColor: '#333',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                }}
              >
                <TYText style={{ color: '#e5e5e5' }}>{Strings.getLang('swipeout_disable')}</TYText>
              </View>
            </Swipeout>
          ),
        },
      ]}
    />
  );
};
