import React, { useState } from 'react';
import { AcrylicEnumSliderCard } from 'tuya-panel-acrylic-kit';
import { View, Text, Button } from 'react-native';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';

const data = [
  {
    label: 'close',
    key: '0',
  },
  {
    label: 'one',
    key: '1',
  },
  {
    label: 'two',
    key: '2',
  },
  {
    label: 'three',
    key: '3',
  },
];

export default () => {
  const [activeKey1, setActiveKey1] = useState('3');

  return (
    <ListView
      style={{ backgroundColor: '#f9f9f9', minHeight: 200 }}
      list={[
        {
          title: 'Acrylic',
          content: (
            <View>
              <AcrylicEnumSliderCard
                data={data}
                title="AcrylicEnumSliderCard"
                icon={TuyaRNSvgs.power}
                bottomPromptTexts={['Off', 'Max']}
                activeKey={activeKey1}
                handSlidingComplete={(key, index) => setActiveKey1(key)}
              />
              <View style={{ marginTop: 20 }}>
                <Button onPress={() => setActiveKey1('2')} title="click to change key 2" />
              </View>
            </View>
          ),
        },
      ]}
    />
  );
};
