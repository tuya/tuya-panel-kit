import React from 'react';
import { Modal, TYText } from 'tuya-panel-kit';

import { BlockList, Icons } from '#components';
import Strings from '#i18n';
import { useSetParticalState } from '../../../hooks/useSetParticalState';

export default () => {
  const [state, setState] = useSetParticalState({
    basicVisible: false,
    countDownVisible: false,
    countdown: 0,
    datePickerVisible: false,
    date: new Date(),
    listOneVisible: false,
    listValue: '1',
    listMoreVisible: false,
    listValues: ['1'],
    pickerOneVisible: false,
    pickerValue: '1',
  });

  const closeCountDownModal = () => setState({ countDownVisible: false });
  const handleCountDownConfirm = ({ hour, minute }) =>
    setState({ countDownVisible: false, countdown: hour * 60 + minute });

  const closeDatePickerModal = () => setState({ datePickerVisible: false });
  const handleDatePickerConfirm = (date: any) => setState({ datePickerVisible: false, date });

  const handleListOneConfirm = (listValue: any) => setState({ listOneVisible: false, listValue });
  const closeListOneModal = () => setState({ listOneVisible: false });

  const handleListMoreConfirm = (listValues: any) =>
    setState({ listMoreVisible: false, listValues });
  const closeListMoreModal = () => setState({ listMoreVisible: false });

  const handlePickerOneConfirm = (pickerValue: any) =>
    setState({ pickerOneVisible: false, pickerValue });
  const closePickerOneModal = () => setState({ pickerOneVisible: false });

  const dataSource = [
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
  ];

  return (
    <>
      <BlockList
        list={[
          {
            name: Strings.getLang('text_basic'),
            onPress: () => setState({ basicVisible: !state.basicVisible }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('modal_count'),
            onPress: () => setState({ countDownVisible: !state.countDownVisible }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('modal_date'),
            onPress: () => setState({ datePickerVisible: !state.datePickerVisible }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('modal_list_single'),
            onPress: () => setState({ listOneVisible: !state.listOneVisible }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('modal_list_mul'),
            onPress: () => setState({ listMoreVisible: !state.listMoreVisible }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('modal_list_pick'),
            onPress: () => setState({ pickerOneVisible: !state.pickerOneVisible }),
            component: <>{Icons.right}</>,
          },
        ]}
      />
      <Modal visible={state.basicVisible} onMaskPress={() => setState({ basicVisible: false })}>
        <TYText
          style={{
            height: 64,
            color: '#333',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
          text={Strings.getLang('modal_content_iam')}
        />
      </Modal>
      <Modal.Countdown
        visible={state.countDownVisible}
        value={state.countdown}
        onMaskPress={closeCountDownModal}
        onCancel={closeCountDownModal}
        onConfirm={handleCountDownConfirm}
        title={Strings.getLang('modal_content_count_title')}
        cancelText={Strings.getLang('text_cancel')}
        confirmText={Strings.getLang('text_confirm')}
        hourText={Strings.getLang('text_hour')}
        minuteText={Strings.getLang('text_minute')}
      />
      <Modal.DatePicker
        visible={state.datePickerVisible}
        onMaskPress={closeDatePickerModal}
        onCancel={closeDatePickerModal}
        onConfirm={handleDatePickerConfirm}
        title={Strings.getLang('modal_content_date_title')}
        cancelText={Strings.getLang('text_cancel')}
        confirmText={Strings.getLang('text_confirm')}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        hourText={Strings.getLang('text_hour')}
        minuteText={Strings.getLang('text_minute')}
        date={state.date}
        mode="datetime"
        minDate={new Date(1918, 0, 1, 0, 0, 0)}
        maxDate={new Date(2018, 11, 31, 23, 59, 59)}
      />
      <Modal.List
        visible={state.listOneVisible}
        dataSource={dataSource}
        type="radio"
        value={state.listValue}
        onMaskPress={closeListOneModal}
        onCancel={closeListOneModal}
        onConfirm={handleListOneConfirm}
      />
      <Modal.List
        visible={state.listMoreVisible}
        dataSource={dataSource}
        type="switch"
        value={state.listValues}
        onMaskPress={closeListMoreModal}
        onCancel={closeListMoreModal}
        onConfirm={handleListMoreConfirm}
      />
      <Modal.Picker
        visible={state.pickerOneVisible}
        dataSource={[
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
        ]}
        value={state.pickerValue}
        label="haha"
        onMaskPress={closePickerOneModal}
        onCancel={closePickerOneModal}
        onConfirm={handlePickerOneConfirm}
        onValueChange={value => console.log('onValueChange', value)}
      />
    </>
  );
};
