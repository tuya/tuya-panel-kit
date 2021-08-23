import React from 'react';
import { View } from 'react-native';
import { CircleView, TYText, Utils } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      contentCenter={true}
      nthItemStyle={{
        marginTop: cx(40),
      }}
      list={[
        {
          title: Strings.getLang('circleview_basic'),
          content: <CircleView radius={30} color="red" />,
        },
        {
          title: Strings.getLang('circleview_border'),
          content: <CircleView radius={30} color="#ff0" borderWidth={4} borderColor="#00f" />,
        },
        {
          title: Strings.getLang('circleview_embedded'),
          content: (
            <CircleView
              radius={50}
              color="#0f0"
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <View
                style={{
                  backgroundColor: '#0ff',
                  width: 45,
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TYText text="Hello, World" style={{ textAlign: 'center' }} />
              </View>
            </CircleView>
          ),
        },
      ]}
    />
  );
};
