import React from 'react';
import { ControllerBar, Utils } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('controllerbar_base'),
          content: (
            <ControllerBar
              style={{ flex: 1 }}
              size={44}
              button={[
                { text: '1', type: 'primary' },
                { text: '2', type: 'primary' },
              ]}
            />
          ),
        },
        {
          title: Strings.getLang('controllerbar_base'),
          itemStyle: {
            marginTop: cx(30),
          },
          content: (
            <ControllerBar.Group style={{ marginTop: 20, flex: 1 }}>
              <ControllerBar
                size={44}
                button={[
                  { text: '1', type: 'primary' },
                  { text: '2', type: 'primary' },
                ]}
              />
              <ControllerBar
                size={44}
                button={[
                  { text: '3', type: 'primary' },
                  { text: '4', type: 'primary' },
                ]}
              />
            </ControllerBar.Group>
          ),
        },
        {
          title: Strings.getLang('controllerbar_swiper'),
          itemStyle: {
            marginTop: cx(30),
          },
          content: (
            <ControllerBar.Group
              type="swiper"
              style={{ marginTop: 20, flex: 1 }}
              swiperConfig={{
                style: { height: 60 },
                dotActiveStyle: { backgroundColor: 'red' },
                dotStyle: { backgroundColor: 'blue' },
              }}
              size={44}
            >
              <ControllerBar
                size={44}
                button={[
                  { text: '1', type: 'primary' },
                  { text: '2', type: 'primary' },
                ]}
              />
              <ControllerBar
                size={44}
                button={[
                  { text: '3', type: 'primary' },
                  { text: '4', type: 'primary' },
                ]}
              />
            </ControllerBar.Group>
          ),
        },
        {
          title: Strings.getLang('controllerbar_divide'),
          itemStyle: {
            marginTop: cx(30),
          },
          content: (
            <ControllerBar.Group type="divide" style={{ marginTop: 20, flex: 1 }}>
              <ControllerBar
                size={44}
                button={[
                  { text: '1', type: 'primary' },
                  { text: '2', type: 'primary' },
                ]}
              />
              <ControllerBar
                size={44}
                button={[
                  { text: '3', type: 'primary' },
                  { text: '4', type: 'primary' },
                ]}
              />
            </ControllerBar.Group>
          ),
        },
      ]}
    />
  );
};
