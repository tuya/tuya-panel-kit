import React, { useState } from 'react';
import { View } from 'react-native';
import { ClassicEnumTabsButtonCard } from 'tuya-panel-classic-kit';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';

const data = [
  {
    label: '1',
    key: '1',
    disabled: true,
  },
  {
    label: '2',
    key: 'two',
  },
  {
    label: '3',
    key: '3',
  },
  {
    label: '4',
    key: '5',
  },
  {
    label: '5',
    key: '6',
  },
  {
    label: '6',
    key: '7',
  },
];

export default () => {
  const [activeKey, setActiveKey] = useState('7');
  return (
    <ListView
      style={{ backgroundColor: '#f9f9f9', minHeight: 200 }}
      list={[
        {
          title: 'Classic',
          content: (
            <View>
              <ClassicEnumTabsButtonCard
                activeKey={activeKey}
                data={data}
                title="Classic"
                icon={TuyaRNSvgs.power}
                unit="step"
                onChange={key => setActiveKey(key)}
              />
              <ClassicEnumTabsButtonCard
                style={{ marginTop: 20 }}
                data={data}
                title="Custom theme"
                icon={TuyaRNSvgs.power}
                unit="step"
                valueFontColor="#ff6700"
                grooveBgColor="#000"
                activeTextColor="#fff"
                thumbBgColor="#ff6700"
                onChange={key => setActiveKey(key)}
              />
            </View>
          ),
        },
      ]}
    />
  );
};
