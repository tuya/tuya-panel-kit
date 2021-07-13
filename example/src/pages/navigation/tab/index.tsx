import React from 'react';
import { View } from 'react-native';
import { Tab, TYText } from 'tuya-panel-kit';

import Strings from '#i18n';

export default () => {
  const [state, set] = React.useState({ tab: 'Tab 1' });
  const setState = value => set({ ...state, ...value });
  const tabPaneArr = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'];
  const textArr = [
    Strings.getLang('tab_content_1'),
    Strings.getLang('tab_content_2'),
    Strings.getLang('tab_content_3'),
    Strings.getLang('tab_content_4'),
  ];
  const tabPanes = tabPaneArr.map((item, idx) => (
    <Tab.TabPane key={`${item}`} tab={`${item}`}>
      <View
        style={{
          height: 530,
          backgroundColor: '#f8f8f8',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TYText>{`This is ${item}: ${textArr[idx]}`}</TYText>
      </View>
    </Tab.TabPane>
  ));

  return (
    <Tab
      activeKey={state.tab}
      animated={true}
      onChange={value => setState({ tab: value })}
      tabsContainerStyle={{
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      style={{ backgroundColor: '#fff' }}
      tabBarBackgroundColor="#e5e5e5"
      tabTextStyle={{ fontSize: 16 }}
    >
      {tabPanes}
    </Tab>
  );
};
