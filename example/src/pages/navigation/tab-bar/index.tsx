import React from 'react';
import { TabBar } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

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
      textStyle: { fontSize: 16 },
    };
  });
  const [tabRadioCircle, setTabRadioCircle] = React.useState('2');
  const tabRadiosCircle = Array.from(Array(3), (v, k) => k + 1).map(v => {
    return {
      key: `${v}`,
      title: `Tab${v}`,
      activeTextStyle: { color: '#FFF' },
    };
  });

  return (
    <ListView
      list={[
        {
          title: Strings.getLang('tabbar_basic'),
          content: (
            <TabBar
              tabs={tabs}
              activeKey={tab}
              onChange={value => setTab(value)}
              underlineStyle={{ width: 20 }}
            />
          ),
        },
        {
          title: Strings.getLang('tabbar_radio'),
          content: (
            <TabBar
              type="radio"
              tabs={tabRadios}
              activeKey={tabRadio}
              onChange={value => setTabRadio(value)}
              style={{ marginTop: 10 }}
            />
          ),
        },
        {
          title: Strings.getLang('tabbar_radioCircle'),
          content: (
            <TabBar
              type="radioCircle"
              tabs={tabRadiosCircle}
              activeKey={tabRadioCircle}
              onChange={value => setTabRadioCircle(value)}
              activeColor="#57BCFB"
              style={{ marginTop: 10 }}
            />
          ),
        },
      ]}
    />
  );
};
