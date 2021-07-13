import React from 'react';
import { Text, View } from 'react-native';
import { Dialog } from 'tuya-panel-kit';

import { BlockList, Svg } from '#components';
import { useSetParticalState } from '#hooks/useSetParticalState';
import Strings from '#i18n';

export default () => {
  const [state, setState] = useSetParticalState({
    promptUnControlled: '',
    promptControlled: '',
    checkValueRadio: 'code1',
    checkValueSwitch: ['code1'],
  });
  return (
    <BlockList
      list={[
        {
          name: Strings.getLang('dialog_alert'),
          onPress: () =>
            Dialog.alert({
              title: Strings.getLang('text_title'),
              subTitle: Strings.getLang('text_subTitle'),
              confirmText: Strings.getLang('text_confirm'),
              onConfirm: (data, { close }) => {
                close();
              },
            }),
          component: <>{Svg.right}</>,
        },
        {
          name: Strings.getLang('dialog_confirm'),
          onPress: () =>
            Dialog.confirm({
              title: Strings.getLang('text_title'),
              subTitle: Strings.getLang('text_subTitle'),
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              onConfirm: (data, { close }) => {
                close();
              },
            }),
          component: <>{Svg.right}</>,
        },
        {
          name: Strings.getLang('dialog_prompt'),
          onPress: () =>
            Dialog.prompt({
              title: Strings.getLang('dialog_prompt'),
              subTitle: Strings.getLang('text_subTitle'),
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              defaultValue: state.promptUnControlled,
              placeholder: 'Password',
              onConfirm: (text, { close }) => {
                setState({ promptUnControlled: text });
                close();
              },
            }),
          component: <>{Svg.right}</>,
        },
        {
          name: Strings.getLang('dialog_prompt_control'),
          component: <>{Svg.right}</>,
          onPress: () =>
            Dialog.prompt({
              title: Strings.getLang('dialog_prompt_control'),
              subTitle: Strings.getLang('text_subTitle'),
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              value: state.promptControlled,
              placeholder: 'Password',
              onChangeText: text => {
                const t = +text;
                if (typeof t === 'number' && !Number.isNaN(t)) {
                  return text;
                }
              },
              onConfirm: (text, { close }) => {
                console.log('controlled text :', text);
                setState({ promptControlled: text });
                close();
              },
            }),
        },
        {
          name: Strings.getLang('dialog_single'),
          component: <>{Svg.right}</>,
          onPress: () =>
            Dialog.checkbox({
              title: 'Required',
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              type: 'radio',
              value: state.checkValueRadio,
              dataSource: [
                {
                  value: 'code1',
                  title: Strings.getLang('dialog_text_sensor'),
                },
                {
                  value: 'code2',
                  title: Strings.getLang('dialog_text_room'),
                },
                {
                  value: 'code3',
                  title: Strings.getLang('dialog_text_floor'),
                  iconSize: 24,
                  Icon: 'warning',
                  reverse: true,
                  hideOnUnselect: true,
                },
              ],
              onConfirm: (value, { close }) => {
                setState({ checkValueRadio: value });
                close();
              },
            }),
        },
        {
          name: Strings.getLang('dialog_multi'),
          component: <>{Svg.right}</>,
          onPress: () =>
            Dialog.checkbox({
              title: 'Required',
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              type: 'switch',
              value: state.checkValueSwitch,
              dataSource: [
                {
                  value: 'code1',
                  title: Strings.getLang('dialog_text_sensor'),
                },
                {
                  value: 'code2',
                  title: Strings.getLang('dialog_text_room'),
                },
                {
                  value: 'code3',
                  title: Strings.getLang('dialog_text_floor'),
                },
                {
                  value: 'code4',
                  title: Strings.getLang('dialog_text_adap'),
                },
                {
                  value: 'code5',
                  title: Strings.getLang('dialog_text_frost'),
                  iconSize: 20,
                  Icon: 'warning',
                  reverse: true,
                  hideOnUnselect: true,
                },
                {
                  value: 'code6',
                  title: Strings.getLang('dialog_text_test'),
                  reverse: true,
                },
              ],
              onConfirm: (value, { close }) => {
                setState({ checkValueSwitch: value });
                close();
              },
            }),
        },
        {
          name: Strings.getLang('dialog_list'),
          component: <>{Svg.right}</>,
          onPress: () =>
            Dialog.list({
              title: Strings.getLang('text_title'),
              subTitle: Strings.getLang('text_subTitle'),
              dataSource: new Array(6).fill(1).map((_, idx) => ({
                title:
                  idx === 0
                    ? Strings.getLang('dialog_text_click_close')
                    : Strings.formatValue('dialog_text_option', `${idx}`),
                onPress: () => {
                  idx === 0 && Dialog.close();
                  console.log('Press', idx);
                },
              })),
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              onConfirm: (data, { close }) => {
                close();
              },
            }),
        },
        {
          name: Strings.getLang('dialog_custom'),
          component: <>{Svg.right}</>,
          onPress: () =>
            Dialog.custom({
              title: 'Custom',
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              content: (
                <View style={{ height: 300, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 32, color: '#000' }}>
                    {Strings.getLang('dialog_text_cus_content')}
                  </Text>
                </View>
              ),
              onConfirm: (data, { close }) => {
                close();
              },
            }),
        },
      ]}
    />
  );
};
