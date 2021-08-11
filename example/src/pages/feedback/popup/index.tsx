import React from 'react';
import { Text, View } from 'react-native';
import { Popup } from 'tuya-panel-kit';

import { BlockList, Icons } from '#components';
import Strings from '#i18n';
import { useSetParticalState } from '../../../hooks/useSetParticalState';

export default () => {
  const [state, setState] = useSetParticalState({
    countdown: 0,
    date: new Date(),
    timerPickerValue: [0, 0],
    numberValue: 0,
    listValue: '1',
    listValues: ['1'],
    pickerValue: '1',
    pickerValues: ['b', '2', 'm'],
  });

  return (
    <BlockList
      list={[
        {
          name: Strings.getLang('modal_count'),
          onPress: () =>
            Popup.countdown({
              title: Strings.getLang('modal_content_count_title'),
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              hourText: Strings.getLang('text_hour'),
              minuteText: Strings.getLang('text_minute'),
              value: state.countdown,
              onMaskPress: ({ close }) => close(),
              onConfirm: (data, { close }) => {
                setState({ countdown: data.hour * 60 + data.minute });
                close();
              },
            }),
          component: <>{Icons.right}</>,
        },
        {
          name: Strings.getLang('modal_date'),
          onPress: () =>
            Popup.datePicker({
              title: Strings.getLang('modal_content_date_title'),
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              hourText: Strings.getLang('text_hour'),
              minuteText: Strings.getLang('text_minute'),
              defaultDate: state.date,
              mode: 'datetime',
              minDate: new Date(1918, 0, 1, 0, 0, 0),
              maxDate: new Date(2018, 11, 31, 23, 59, 59),
              onMaskPress: ({ close }) => close(),
              onConfirm: (date, { close }) => {
                setState({ date });
                close();
              },
            }),
          component: <>{Icons.right}</>,
        },
        {
          name: Strings.getLang('popup_time'),
          onPress: () =>
            Popup.timerPicker({
              title: Strings.getLang('popup_time_title'),
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              prefixPosition: 'right',
              startTime: state.timerPickerValue[0],
              endTime: state.timerPickerValue[1],
              is12Hours: true,
              onMaskPress: ({ close }) => close(),
              onConfirm: ({ startTime, endTime }, { close }) => {
                setState({ timerPickerValue: [startTime, endTime] });
                close();
              },
            }),
          component: <>{Icons.right}</>,
        },
        {
          name: Strings.getLang('popup_number'),
          onPress: () =>
            Popup.numberSelector({
              title: Strings.getLang('popup_number_title'),
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              value: state.numberValue,
              min: 0,
              max: 50,
              onMaskPress: ({ close }) => close(),
              onConfirm: (value, { close }) => {
                setState({ numberValue: value });
                close();
              },
            }),
          component: <>{Icons.right}</>,
        },
        {
          name: Strings.getLang('popup_list'),
          onPress: () =>
            Popup.list({
              type: 'radio',
              maxItemNum: 7,
              dataSource: [
                {
                  key: '0',
                  title: '0',
                  value: '0',
                },
                {
                  key: '1',
                  title: '1',
                  value: '1',
                },
                {
                  key: '2',
                  title: '2',
                  value: '2',
                },
                {
                  key: '3',
                  title: '3',
                  value: '3',
                },
              ],
              title: Strings.getLang('text_single'),
              subTitle: Strings.getLang('text_subTitle'),
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              value: state.listValue,
              footerType: 'singleCancel',
              onMaskPress: ({ close }) => close(),
              onSelect: (value, { close }) => {
                setState({ listValue: String(value) });
                close();
              },
            }),
          component: <>{Icons.right}</>,
        },
        {
          name: Strings.getLang('popup_listmore'),
          onPress: () =>
            Popup.list({
              type: 'switch',
              dataSource: [
                {
                  key: '1',
                  title: '1',
                  value: '1',
                },
                {
                  key: '2',
                  title: '2',
                  value: '2',
                },
              ],
              title: Strings.getLang('text_mul'),
              subTitle: Strings.getLang('text_subTitle'),
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              value: state.listValues,
              onMaskPress: ({ close }) => close(),
              onConfirm: (value, { close }) => {
                setState({ listValues: value });
                close();
              },
            }),
          component: <>{Icons.right}</>,
        },
        {
          name: Strings.getLang('popup_picker'),
          onPress: () =>
            Popup.picker({
              dataSource: [
                {
                  label: '1',
                  value: '1',
                },
                {
                  label: '2',
                  value: '2',
                },
              ],
              title: 'Picker',
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              value: state.pickerValue,
              label: 'haha',
              onMaskPress: ({ close }) => close(),
              onConfirm: (value, idx, { close }) => {
                setState({ pickerValue: value });
                close();
              },
            }),
          component: <>{Icons.right}</>,
        },
        {
          name: Strings.getLang('popup_pickermore'),
          onPress: () =>
            Popup.picker({
              dataSource: [
                [
                  {
                    label: 'a',
                    value: 'a',
                  },
                  {
                    label: 'b',
                    value: 'b',
                  },
                  {
                    label: 'c',
                    value: 'c',
                  },
                ],
                [
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ],
                [
                  {
                    label: 'm',
                    value: 'm',
                  },
                  {
                    label: 'x',
                    value: 'x',
                  },
                  {
                    label: 'd',
                    value: 'd',
                  },
                ],
              ],
              singlePicker: false,
              title: 'Picker',
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              value: state.pickerValues,
              label: ['$', '%'],
              onMaskPress: ({ close }) => close(),
              onConfirm: (value, idx, { close }) => {
                setState({ pickerValues: value });
                close();
              },
            }),
          component: <>{Icons.right}</>,
        },
        {
          name: Strings.getLang('popup_cus'),
          onPress: () =>
            Popup.custom({
              content: (
                <View
                  style={{
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                  }}
                >
                  <Text style={{ fontSize: 36, color: '#000' }}>Custom Content</Text>
                </View>
              ),
              title: 'Custom',
              cancelText: Strings.getLang('text_cancel'),
              confirmText: Strings.getLang('text_confirm'),
              onMaskPress: ({ close }) => close(),
              onConfirm: (data, { close }) => {
                close();
              },
            }),
          component: <>{Icons.right}</>,
        },
      ]}
    />
  );
};
