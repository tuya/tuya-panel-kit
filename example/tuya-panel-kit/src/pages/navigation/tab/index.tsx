import React from 'react';
import { View } from 'react-native';
import { Tab, TYText, Utils } from 'tuya-panel-kit';
import Strings from '#i18n';

const { height } = Utils.RatioUtils;

export default () => {
  const [state, set] = React.useState({ tab: 'Tab 1' });
  const setState = value => set({ ...state, ...value });
  const tabPaneArr = [1, 2, 3, 4].map(n => Strings.formatValue('tab_text', n));
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
          height: 323,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TYText>{`This is ${item}: ${textArr[idx]}`}</TYText>
      </View>
    </Tab.TabPane>
  ));

  return (
    <View
      style={{
        backgroundColor: '#F5F5F6',
        height,
      }}
    >
      <Tab
        activeKey={state.tab}
        animated={true}
        onChange={value => setState({ tab: value })}
        tabsContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
        tabBarBackgroundColor="#F5F5F6"
        tabTextStyle={{ fontSize: 16, color: '#A8ACB2' }}
        tabStyle={{
          height: 42,
          backgroundColor: '#fff',
          borderTopColor: '#F5F5F6',
          borderTopWidth: 1,
        }}
        tabActiveTextStyle={{
          color: '#FF4800',
        }}
        tabBarUnderlineStyle={{
          backgroundColor: '#FF4800',
          height: 2,
          width: 40,
          marginLeft: 26,
        }}
      >
        {tabPanes}
      </Tab>
    </View>
  );
};
