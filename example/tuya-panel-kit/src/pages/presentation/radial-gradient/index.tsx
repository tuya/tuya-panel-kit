import React from 'react';
import { View } from 'react-native';
import { RadialGradient, TYSectionList } from 'tuya-panel-kit';
import Strings from '#i18n';

export default () => {
  const sections = [
    {
      title: Strings.getLang('radialgradient_y2b'),
      data: [
        {
          key: 0,
          childView: (
            <View style={{ width: 300, height: 200, marginTop: 10 }}>
              <RadialGradient
                gradientId="Gradient1"
                style={{ width: 300, height: 200, marginLeft: 10 }}
                stops={[
                  {
                    offset: '0%',
                    stopColor: '#ff0',
                    stopOpacity: '1',
                  },
                  {
                    offset: '100%',
                    stopColor: '#00f',
                    stopOpacity: '1',
                  },
                ]}
                rx="50%"
                ry="50%"
                fx="50%"
                fy="50%"
                cx="50%"
                cy="50%"
              />
            </View>
          ),
        },
      ],
    },
    {
      title: Strings.getLang('radialgradient_ryp'),
      data: [
        {
          key: 0,
          childView: (
            <View style={{ width: 300, height: 200, marginTop: 10 }}>
              <RadialGradient
                gradientId="Gradient2"
                style={{ width: 300, height: 200, marginLeft: 10 }}
                stops={[
                  {
                    offset: '0%',
                    stopColor: 'red',
                    stopOpacity: '1',
                  },
                  {
                    offset: '50%',
                    stopColor: 'yellow',
                    stopOpacity: '1',
                  },
                  {
                    offset: '100%',
                    stopColor: 'pink',
                    stopOpacity: '1',
                  },
                ]}
                rx="50%"
                ry="50%"
                fx="100%"
                fy="50%"
                cx="50%"
                cy="50%"
              />
            </View>
          ),
        },
      ],
    },
  ];
  return (
    <View style={{ marginTop: 10 }}>
      <TYSectionList
        sections={sections}
        contentContainerStyle={{ backgroundColor: '#fff' }}
        separatorStyle={{ backgroundColor: '#fff' }}
        renderItem={({ item }) => item.childView}
      />
    </View>
  );
};
