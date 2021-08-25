import React from 'react';
import { View } from 'react-native';
import { Checkbox, Utils } from 'tuya-panel-kit';
import Strings from '#i18n';
import { ListView } from '#components';
import { useSetParticalState } from '../../../hooks/useSetParticalState';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  const [checked, setChecked] = useSetParticalState({
    checked1: true,
    checked2: false,
  });
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('checkbox_basic'),
          content: (
            <View>
              <Checkbox
                color="#F84803"
                checked={checked.checked1}
                onChange={value => setChecked({ checked1: value })}
              >
                {`${Strings.getLang('checkbox_label')}1`}
              </Checkbox>
              <Checkbox
                color="#F84803"
                checked={checked.checked2}
                style={{ marginTop: cx(8) }}
                onChange={value => setChecked({ checked2: value })}
              >
                {`${Strings.getLang('checkbox_label')}2`}
              </Checkbox>
            </View>
          ),
        },
        {
          title: Strings.getLang('checkbox_disable'),
          content: (
            <View>
              <Checkbox color="red" checked={true} disabled={true}>
                {Strings.getLang('checkbox_label')}
              </Checkbox>
              <Checkbox checked={false} disabled={true} style={{ marginTop: cx(8) }}>
                {Strings.getLang('checkbox_label')}
              </Checkbox>
            </View>
          ),
        },
        {
          title: Strings.getLang('checkbox_color'),
          content: (
            <View>
              <Checkbox
                size={cx(22)}
                color="#3BEB56"
                checked={checked.checked1}
                onChange={value => setChecked({ checked1: value })}
              >
                {`${Strings.getLang('checkbox_label')}1`}
              </Checkbox>
              <Checkbox
                size={cx(22)}
                color="#3BEB56"
                checked={checked.checked2}
                style={{ marginTop: cx(8) }}
                onChange={value => setChecked({ checked2: value })}
              >
                {`${Strings.getLang('checkbox_label')}2`}
              </Checkbox>
            </View>
          ),
        },
        // {
        //   title: Strings.getLang('checkbox_position'),
        //   content: (
        //     <Checkbox reverse={true} checked={checked} onChange={value => setChecked(value)}>
        //       {Strings.getLang('checkbox_label')}
        //     </Checkbox>
        //   ),
        // },
      ]}
    />
  );
};
