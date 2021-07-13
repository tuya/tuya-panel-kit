import React from 'react';
import { View } from 'react-native';
import { Checkbox } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('checkbox_basic'),
          content: (
            <Checkbox checked={checked} onChange={value => setChecked(value)}>
              {Strings.getLang('checkbox_label')}
            </Checkbox>
          ),
        },
        {
          title: Strings.getLang('checkbox_disable'),
          content: (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox color="red" checked={false} disabled={true} hideOnUnselect={true}>
                {Strings.getLang('checkbox_label')}
              </Checkbox>
              <Checkbox checked={true} disabled={true} style={{ marginLeft: 30 }}>
                {Strings.getLang('checkbox_label')}
              </Checkbox>
            </View>
          ),
        },
        {
          title: Strings.getLang('checkbox_color'),
          content: (
            <Checkbox size={30} color="red" checked={checked} onChange={value => setChecked(value)}>
              {Strings.getLang('checkbox_label')}
            </Checkbox>
          ),
        },
        {
          title: Strings.getLang('checkbox_position'),
          content: (
            <Checkbox reverse={true} checked={checked} onChange={value => setChecked(value)}>
              {Strings.getLang('checkbox_label')}
            </Checkbox>
          ),
        },
      ]}
    />
  );
};
