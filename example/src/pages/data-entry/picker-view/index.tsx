import React from 'react';
import { View } from 'react-native';
import { Picker } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  const languages = ['杭州', '温州', '宁波', '绍兴', '嵊州', '金华'];
  const [value, setValue] = React.useState('宁波');

  const weeks = [
    {
      key: 'week',
      values: [
        { value: '1', label: 'Monday' },
        { value: '2', label: 'Tuesday' },
        { value: '3', label: 'Wednesday' },
        { value: '4', label: 'Thursday' },
        { value: '5', label: 'Friday' },
        { value: '6', label: 'Saturday' },
        { value: '7', label: 'Sunday' },
      ],
    },
    {
      key: 'day',
      values: [
        { value: '1', label: 'Morning' },
        { value: '2', label: 'Afternoon' },
      ],
    },
  ];
  const [day, setDay] = React.useState(['3', '1']);

  return (
    <ListView
      contentPadding={false}
      list={[
        {
          title: Strings.getLang('pickerview_basic'),
          content: (
            <Picker
              style={{
                width: 375,
                height: 225,
              }}
              selectedValue={value}
              onValueChange={newValue => setValue(newValue as string)}
            >
              {languages.map(newValue => (
                <Picker.Item key={newValue} value={newValue} label={newValue} />
              ))}
            </Picker>
          ),
        },
        {
          title: Strings.getLang('pickerview_mul'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              {weeks.map((pItem, pIndex) => (
                <Picker
                  key={pItem.key}
                  style={{
                    width: 200,
                    height: 225,
                  }}
                  selectedValue={day[pIndex]}
                >
                  {pItem.values.map(item => (
                    <Picker.Item
                      key={`${pItem.key}_${item.value}`}
                      value={item.value}
                      label={item.label}
                    />
                  ))}
                </Picker>
              ))}
            </View>
          ),
        },
      ]}
    />
  );
};
