import React from 'react';
import { TabBar, Utils } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  const [tab, setTab] = React.useState('2');
  const tabs = Array.from(Array(10), (v, k) => k + 1).map(v => {
    return { key: `${v}`, title: `Tab${v}` };
  });

  const [tabRadio, setTabRadio] = React.useState('2');
  const tabRadios = Array.from(Array(3), (v, k) => k + 1).map(v => {
    return {
      key: `${v}`,
      title: `Tab${v}`,
      tabStyle: { alignItems: 'center', justifyContent: 'center' },
      textStyle: { fontSize: 16, color: '#333333' },
      activeTextStyle: {
        color: '#F84803',
      },
    };
  });
  const [tabRadioCircle, setTabRadioCircle] = React.useState('2');
  const tabRadiosCircle = Array.from(Array(3), (v, k) => k + 1).map(v => {
    return {
      key: `${v}`,
      title: `Tab${v}`,
      textStyle: { fontSize: 16 },
      activeTextStyle: {
        color: '#F84803',
      },
      circleStyle: {
        backgroundColor: '#F84803',
      },
    };
  });

  return (
    <ListView
      style={{ backgroundColor: '#F5F5F6' }}
      contentPadding={false}
      dot={false}
      list={[
        {
          title: Strings.getLang('tabbar_basic'),
          contentStyle: {
            padding: 0,
          },
          content: (
            <TabBar
              tabs={tabs}
              activeKey={tab}
              onChange={value => setTab(value)}
              underlineStyle={{ width: 20, backgroundColor: '#F84803' }}
              tabActiveTextStyle={{
                color: '#F84803',
              }}
              tabTextStyle={{ color: 'rgba(41, 50, 61, 0.4)' }}
            />
          ),
        },
        {
          title: Strings.getLang('tabbar_radio'),
          contentStyle: {
            paddingHorizontal: cx(16),
          },
          content: (
            <TabBar
              type="radio"
              tabs={tabRadios}
              activeKey={tabRadio}
              onChange={value => setTabRadio(value)}
              style={{
                marginTop: 10,
                height: cx(42),
                borderRadius: cx(21),
                backgroundColor: '#E5E5E5',
              }}
              tabActiveTextStyle={{
                color: '#F84803',
              }}
            />
          ),
        },
        {
          title: Strings.getLang('tabbar_radioCircle'),
          contentStyle: {
            paddingHorizontal: cx(16),
          },
          content: (
            <TabBar
              type="radioCircle"
              tabs={tabRadiosCircle}
              activeKey={tabRadioCircle}
              onChange={value => setTabRadioCircle(value)}
              style={{
                marginTop: 10,
                height: cx(42),
                borderRadius: cx(21),
                backgroundColor: '#E5E5E5',
              }}
            />
          ),
        },
      ]}
    />
  );
};
