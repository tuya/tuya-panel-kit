/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { TopBar, TYSdk, Utils } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  const radialBackground = {
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
  };
  const linearBackground = {
    stops: {
      '0%': 'red',
      '100%': 'yellow',
    },
  };

  return (
    <ListView
      contentPadding={false}
      contentCenter={true}
      nthItemStyle={{
        marginTop: cx(40),
      }}
      list={[
        {
          title: Strings.getLang('topbar_basic_split'),
          content: (
            <TopBar.Container background="#000" style={{ flex: 1 }}>
              <TopBar.Action name="backIos" color="red" onPress={TYSdk.Navigator.pop} />
              <TopBar.Content title="Title" />
              <TopBar.Action name="pen" color="yellow" onPress={TYSdk.native.showDeviceMenu} />
            </TopBar.Container>
          ),
        },
        {
          title: Strings.getLang('topbar_basic_pack'),
          content: (
            <TopBar
              style={{ flex: 1 }}
              background="#000"
              title="Title"
              color="red"
              actions={[
                {
                  name: 'pen',
                  color: 'yellow',
                  onPress: () => TYSdk.native.showDeviceMenu(),
                },
              ]}
              onBack={TYSdk.Navigator.pop}
            />
          ),
        },
        {
          title: Strings.getLang('topbar_rad_pack'),
          content: (
            <TopBar
              style={{ flex: 1 }}
              background={radialBackground}
              title="Title"
              onBack={TYSdk.Navigator.pop}
            />
          ),
        },
        {
          title: Strings.getLang('topbar_line_split'),
          content: (
            <TopBar.Container style={{ flex: 1 }} background={linearBackground}>
              <TopBar.Action name="backIos" onPress={TYSdk.Navigator.pop} />
              <TopBar.Content title="Title" />
            </TopBar.Container>
          ),
        },
        {
          title: Strings.getLang('topbar_mul_split'),
          content: (
            <TopBar.Container style={{ flex: 1 }} background="blue">
              <TopBar.Action name="backIos" onPress={TYSdk.Navigator.pop} />
              <TopBar.Action
                source={Strings.getLang('topbar_timing')}
                color="red"
                onPress={() => {
                  TYSdk.mobile.simpleTipDialog(
                    `click ${Strings.getLang('topbar_timing')}`,
                    () => {}
                  );
                }}
              />
              <TopBar.Content
                title="Very Very Very Very Very Long Title"
                subTitle="SubTitle"
                onPress={() => {
                  TYSdk.mobile.simpleTipDialog('click title', () => {});
                }}
              />
              {['plus', 'warning', 'edit'].map(v => (
                <TopBar.Action
                  key={v}
                  name={v as any}
                  onPress={() => {
                    TYSdk.mobile.simpleTipDialog(`click ${v}`, () => {});
                  }}
                />
              ))}
            </TopBar.Container>
          ),
        },
        {
          title: Strings.getLang('topbar_mul_pack'),
          content: (
            <TopBar
              style={{ flex: 1 }}
              background="blue"
              title="Very Very Very Very Very Long Title"
              subTitle="SubTitle"
              onPress={() => TYSdk.mobile.simpleTipDialog('click title', () => {})}
              leftActions={[
                {
                  name: 'backIos',
                  onPress: TYSdk.Navigator.pop,
                },
                {
                  source: Strings.getLang('topbar_timing'),
                  color: 'red',
                  onPress: () =>
                    TYSdk.mobile.simpleTipDialog(
                      `click ${Strings.getLang('topbar_timing')}`,
                      () => {}
                    ),
                },
              ]}
              actions={['plus', 'warning', 'edit'].map(v => ({
                name: v as any,
                onPress: () => TYSdk.mobile.simpleTipDialog(`click ${v}`, () => {}),
              }))}
            />
          ),
        },
      ]}
    />
  );
};
