import React from 'react';
import { View } from 'react-native';
import { Swipeout, TYText } from 'tuya-panel-kit';
import Strings from '#i18n';
import { Icons, ListView } from '#components';

export default () => {
  return (
    <ListView
      style={{
        backgroundColor: '#F5F5F6',
        flex: 1,
      }}
      contentPadding={false}
      dot={false}
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
                  backgroundColor: '#FAAD21',
                  // @ts-ignore
                  fontStyle: { color: '#fff', fontSize: 16 },
                  content: Icons.Heart,
                },
              ]}
            >
              <View
                style={{
                  height: 44,
                  backgroundColor: '#fff',
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
                  // @ts-ignore
                  fontStyle: { color: '#fff', fontSize: 16 },
                  content: Icons.DeleteIcon,
                },
              ]}
            >
              <View
                style={{
                  height: 44,
                  backgroundColor: '#fff',
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
                  // @ts-ignore
                  fontStyle: { color: '#fff', fontSize: 16 },
                },
              ]}
            >
              <View
                style={{
                  height: 44,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                }}
              >
                <TYText style={{ color: '#FF4444' }}>{Strings.getLang('swipeout_disable')}</TYText>
              </View>
            </Swipeout>
          ),
        },
      ]}
    />
  );
};
