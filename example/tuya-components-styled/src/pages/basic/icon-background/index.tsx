import React from 'react';
import { View, Text } from 'react-native';
import { ClassicIconBackground, Background } from 'tuya-panel-style-icon-background';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

const IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

export default () => {
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', height: 'auto' }}
      list={[
        {
          title: Strings.getLang('icon_and_background'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <ClassicIconBackground icon={TuyaRNSvgs.power} style={{ marginRight: 20 }} />
              <ClassicIconBackground
                iconBgColor="#ff6700"
                icon={TuyaRNSvgs.power}
                iconBgRadius={5}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('only_icon'),
          content: (
            <ClassicIconBackground
              icon={TuyaRNSvgs.power}
              iconColor="#57BCFB"
              iconBgRadius={5}
              showIconBg={false}
            />
          ),
        },
        {
          title: Strings.getLang('icon_image'),
          content: (
            <ClassicIconBackground
              image={IMAGE}
              iconBgColor="#fff"
              iconColor="#57BCFB"
              iconBgRadius={5}
              imageRadius={10}
            />
          ),
        },
        {
          title: Strings.getLang('background_gradient'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <ClassicIconBackground
                iconBgColor={{
                  deg: 90,
                  stops: {
                    '0%': 'red',
                    '100%': 'yellow',
                  },
                }}
                icon={TuyaRNSvgs.power}
                style={{ marginRight: 20 }}
              />
              <ClassicIconBackground
                iconBgColor={{
                  stops: [
                    {
                      offset: '0%',
                      stopColor: '#ff6700',
                      stopOpacity: '1',
                    },
                    {
                      offset: '100%',
                      stopColor: '#22ee2d',
                      stopOpacity: '1',
                    },
                  ],
                  rx: '50%',
                  ry: '50%',
                  fx: '50%',
                  fy: '50%',
                  cx: '50%',
                  cy: '50%',
                }}
                iconSize={40}
                iconBgSize={70}
                icon={TuyaRNSvgs.power}
                style={{ marginRight: 20 }}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('background'),
          content: (
            <View>
              <Background
                style={{ justifyContent: 'center', alignItems: 'center' }}
                width={100}
                height={100}
                background="#ff6700"
              >
                <Text>hello world</Text>
              </Background>
              <Background
                style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                width={100}
                height={100}
                background={IMAGE}
              >
                <Text style={{ color: '#fff' }}>hello world</Text>
              </Background>
              <Background
                style={{ paddingTop: 20, marginTop: 20 }}
                contentStyle={{ paddingLeft: 5 }}
                width={100}
                height={100}
                background={{
                  deg: 90,
                  stops: {
                    '0%': 'red',
                    '100%': 'yellow',
                  },
                }}
              >
                <Text style={{ color: '#fff' }}>hello world</Text>
              </Background>
              <Background
                style={{ paddingTop: 20, marginTop: 20, borderRadius: 20, overflow: 'hidden' }}
                contentStyle={{ paddingLeft: 5 }}
                width={100}
                height={100}
                background={{
                  stops: [
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
                  ],
                  rx: '50%',
                  ry: '50%',
                  fx: '50%',
                  fy: '50%',
                  cx: '50%',
                  cy: '50%',
                }}
              >
                <Text style={{ color: '#fff' }}>hello world</Text>
              </Background>
            </View>
          ),
        },
      ]}
    />
  );
};
