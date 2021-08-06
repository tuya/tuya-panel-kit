import React from 'react';
import { View } from 'react-native';
import { Rect } from 'react-native-svg';
import { LinearGradient, TYSectionList } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  const sections = [
    {
      title: Strings.getLang('lineargradient_two'),
      data: [
        {
          key: 0,
          childView: (
            <View
              style={{
                height: 200,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LinearGradient
                gradientId="Gradient1"
                style={{
                  width: 300,
                  height: 200,
                  marginLeft: 20,
                  marginVertical: 20,
                }}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
                stops={{
                  '0%': 'red',
                  '100%': 'yellow',
                }}
              >
                <Rect width={300} height={200} />
              </LinearGradient>
            </View>
          ),
        },
      ],
    },
    {
      title: Strings.getLang('lineargradient_obl'),
      data: [
        {
          key: 0,
          childView: (
            <View
              style={{
                height: 200,

                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LinearGradient
                gradientId="Gradient2"
                style={{ width: 300, height: 200, marginLeft: 20, marginVertical: 20 }}
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
                stops={{
                  '0%': 'red',
                  '30%': 'blue',
                  '100%': 'yellow',
                }}
              >
                <Rect width={300} height={200} />
              </LinearGradient>
            </View>
          ),
        },
      ],
    },
  ];
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <TYSectionList
        sections={sections}
        contentContainerStyle={{ backgroundColor: '#fff' }}
        separatorStyle={{ backgroundColor: '#fff' }}
        renderItem={({ item }) => item.childView}
      />
    </View>
  );
};
