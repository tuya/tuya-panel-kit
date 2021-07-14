import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TYFlatList, Popup, Utils, TYText } from 'tuya-panel-kit';
import Strings from '../../i18n';

const { convertX: cx } = Utils.RatioUtils;
export default class PopupScene extends Component {
  state = {
    countdown: 60,
    countdownSwitchValue: true,
    date: new Date(),
    numberValue: 0,
    listValue: '1',
    listValues: ['1'],
    pickerValue: '2',
    pickerValues: ['b', '2', 'm'],
    timerPickerValue: [0, 0],
    dropDownList: [
      {
        key: '1',
        title: 'airModeTitle',
        value: 'air',
      },
      {
        key: '2',
        title: 'socketModeTitle',
        value: 'socketHome',
      },
      {
        key: '3',
        title: 'diyModeTitle',
        value: 'customList',
      },
      {
        key: '4',
        title: 'settingTitle',
        value: 'setting',
      },
    ],
  };

  get data() {
    return [
      {
        key: 'dropDown',
        title: 'Popup.dropDown',
        onPress: () => {
          Popup.dropdown({
            data: this.state.dropDownList,
            onSelect: value => {
              console.log(value);
            },
            // cornerSize: 'normal',
            // cornerDirection: 'right',
            // customCornerSize: 5,
            // cornerDirectionValue: 20,
            // corner: true,
            listStyle: { backgroundColor: '#ccc' },
            cornerColor: '#ccc',
            // cornerStyle: {},
            // touchViewStyle: {},
            // textStyle: {},
            // dropdownDirectionX: 'left',
            // dropdownDirectionY: 'bottom',
            // dropdownDirectionXValue: 50,
            // dropdownDirectionYValue: 50,
          });
        },
      },

      {
        key: 'countdown',
        title: 'Popup.countdown',
        onPress: () => {
          Popup.countdown(
            {
              title: Strings.getLang('modal_countdown'),
              cancelText: Strings.getLang('dialog_cancel'),
              confirmText: Strings.getLang('dialog_confirm'),
              hourText: Strings.getLang('modal_hour'),
              minuteText: Strings.getLang('modal_minute'),
              max: 1466,
              value: this.state.countdown,
              switchValue: this.state.countdownSwitchValue,
              onSwitchValueChange: value => this.setState({ countdownSwitchValue: value }),
              onMaskPress: ({ close }) => {
                close();
              },
              onConfirm: (data, { close }) => {
                this.setState({ countdown: data.value });
                if (data.value < 100) {
                  console.log('return', data.value);
                  return;
                }
                close();
              },
            },
            {
              onShow: () => console.log('show'),
              onHide: () => console.log('hide'),
              onDismiss: () => console.log('dismiss'),
            }
          );
        },
      },
      {
        key: 'datePicker',
        title: 'Popup.datePicker',
        onPress: () => {
          Popup.datePicker({
            title: Strings.getLang('modal_birthday'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            hourText: Strings.getLang('modal_hour'),
            minuteText: Strings.getLang('modal_minute'),
            defaultDate: this.state.date,
            mode: 'datetime',
            minDate: new Date(1918, 0, 1, 0, 0, 0),
            maxDate: new Date(2018, 11, 31, 23, 59, 59),
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (date, { close }) => {
              this.setState({ date });
              close();
            },
          });
        },
      },
      {
        key: 'numberSelector.basic',
        title: 'Popup.numberSelector(Basic)',
        onPress: () => {
          Popup.numberSelector({
            title: Strings.getLang('popup_temperature_adjustment'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            isValueChangeUniform: true,
            value: this.state.numberValue,
            min: 0,
            max: 50,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              this.setState({ numberValue: value });
              close();
            },
          });
        },
      },
      {
        key: 'numberSelector.slider',
        title: 'Popup.numberSelector(Slider)',
        onPress: () => {
          Popup.numberSelector({
            title: Strings.getLang('popup_temperature_adjustment'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            type: 'slider',
            value: this.state.numberValue,
            min: 0,
            max: 50,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              this.setState({ numberValue: value });
              // 符合预期条件，关闭弹框内容
              if (value < 20) {
                // sureCloseMotion为true,即为真正想要执行Popup.close的时候，否则仅为内部判断
                close();
                // 不符合预期条件，不关闭弹框内容
              } else {
                return false;
              }
            },
          });
        },
      },
      {
        key: 'Popup.list.radio',
        title: 'Popup.list(Radio)',
        onPress: () => {
          Popup.list({
            type: 'radio',
            maxItemNum: 6,
            dataSource: _.times(6, n => ({
              key: `${n}`,
              title: `${n}`,
              value: `${n}`,
            })),
            title: Strings.getLang('motion_single_choice'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            showBack: true,
            onBack: ({ close }) => {
              console.log('I am Popup.list.radio');
              close();
            },
            value: this.state.listValue,
            footerType: 'singleCancel',
            onMaskPress: ({ close }) => {
              close();
            },
            onSelect: (value, { close }) => {
              console.log('radio value :', value);
              this.setState({ listValue: value });
              close();
            },
          });
        },
      },
      {
        key: 'Popup.list.radio - withIcon',
        title: 'Popup.list(Radio - withIcon)',
        onPress: () => {
          Popup.list({
            type: 'radio',
            maxItemNum: 6,
            dataSource: _.times(7, n => ({
              key: `${n}`,
              title: `${Strings.getLang('list')}${n}`,
              value: `${n}`,
              Icon:
                'M512 0c282.770286 0 512 229.229714 512 512s-229.229714 512-512 512S0 794.770286 0 512 229.229714 0 512 0z m0 48.761905C256.170667 48.761905 48.761905 256.170667 48.761905 512s207.408762 463.238095 463.238095 463.238095 463.238095-207.408762 463.238095-463.238095S767.829333 48.761905 512 48.761905z m-103.448381 325.315047l103.472762 103.424 103.424-103.424a24.380952 24.380952 0 1 1 34.474667 34.474667L546.474667 512l103.448381 103.448381a24.380952 24.380952 0 1 1-34.474667 34.474667L512 546.474667l-103.448381 103.448381a24.380952 24.380952 0 1 1-34.474667-34.474667L477.525333 512l-103.448381-103.448381a24.380952 24.380952 0 1 1 34.474667-34.474667z',
            })),
            contentCenter: false,
            title: Strings.getLang('motion_single_choice'),
            subTitle: Strings.getLang('dialog_sub_title'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            showBack: true,
            onBack: ({ close }) => {
              console.log('I am Popup.list.radio');
              close();
            },
            value: this.state.listValue,
            footerType: 'singleCancel',
            onMaskPress: ({ close }) => {
              close();
            },
            onSelect: (value, { close }) => {
              console.log('radio value :', value);
              this.setState({ listValue: value });
              close();
            },
          });
        },
      },
      {
        key: 'Popup.list.arrow',
        title: 'Popup.list(arrow)',
        onPress: () => {
          Popup.list({
            type: 'arrow',
            maxItemNum: 7,
            dataSource: _.times(7, n => ({
              key: `${n}`,
              title: `${Strings.getLang('content')}${n}`,
              value: `${n}`,
              arrow: true,
              arrowUseIcon: true,
            })),
            contentCenter: false,
            title: Strings.getLang('dialog_title'),
            subTitle: Strings.getLang('dialog_sub_title'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            value: this.state.listValue,
            footerType: 'singleCancel',
            onMaskPress: ({ close }) => {
              close();
            },
            onSelect: (value, { close }) => {
              console.log('radio value :', value);
              this.setState({ listValue: value });
              close();
            },
          });
        },
      },
      {
        key: 'Popup.list.switch',
        title: 'Popup.list(Switch)',
        onPress: () => {
          Popup.list({
            type: 'switch',
            dataSource: _.times(7, n => ({
              key: `${n}`,
              title: `${Strings.getLang("dialog_title")}${n}`,
              value: `${n}`,
            })),
            title: Strings.getLang('motion_multiple_choice'),
            contentCenter: false,
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            subTitle:  Strings.getLang('dialog_sub_title'),
            value: this.state.listValues,
            onMaskPress: ({ close }) => {
              close();
            },
            onSelect: (value, { close }) => {
              console.log('switch select value :', value);
              this.setState({ listValue: value });
            },
            onConfirm: (value, { close }) => {
              console.log('switch confirm value :', value);
              this.setState({ listValues: value });
              close();
            },
          });
        },
      },
      {
        key: 'picker.single',
        title: 'Popup.picker(Single)',
        onPress: () => {
          Popup.picker({
            dataSource: [
              {
                label: '11',
                value: '111',
              },
              {
                label: '22',
                value: '222',
              },
              {
                label: '33',
                value: '3333',
              },
            ],
            title: 'Picker',
            cancelText:  Strings.getLang('dialog_cancel'),
            confirmText:  Strings.getLang('dialog_confirm'),
            value: this.state.pickerValue,
            onBack: () => console.log('////'),
            label: '小时',
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, idx, { close }) => {
              this.setState({ pickerValue: value });
              close();
            },
          });
        },
      },
      {
        key: 'picker.multi',
        title: 'Popup.picker(Multi)',
        onPress: () => {
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
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            pickerFontSize: 27,
            value: this.state.pickerValues,
            label: ['$', '%'],
            onValueChange: (value, idx) => {
              console.log('onValueChange :', value, idx);
            },
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, idx, { close }) => {
              console.log('value :', value);
              console.log('idx :', idx);
              this.setState({ pickerValues: value });
              close();
            },
          });
        },
      },
      {
        key: 'timerPicker',
        title: 'Popup.timerPicker',
        onPress: () => {
          Popup.timerPicker({
            switchValue: false,
            title: Strings.getLang('popup_time_select'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            startTime: this.state.timerPickerValue[0],
            endTime: this.state.timerPickerValue[1],
            startTitle: '开始时间',
            endTitle: '结束时间',
            is12Hours: true,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: ({ startTime, endTime }, { close }) => {
              this.setState({ timerPickerValue: [startTime, endTime] });
              close();
            },
          });
        },
      },
      {
        key: 'tips',
        title: 'Popup.tips',
        onPress: () => {
          Popup.tips({
            show: true,
            bgColor: '#f0f',
            cornerPosition: 'bottomLeft',
            contentStyle: { borderRadius: cx(8) },
            modalChildStyle: { position: 'absolute', top: cx(60) },
            children: <TYText text={Strings.getLang('popup_bubble')} style={{ fontSize: cx(20) }} />,
          });
        },
      },
      {
        key: 'custom',
        title: 'Popup.custom',
        onPress: () => {
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
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (date, { close }) => {
              close();
            },
          });
        },
      },
      {
        key: 'toast',
        title: 'Popup.toast',
        onPress: () => {
          Popup.toast({
            message: 'I am Toast',
          });
        },
      },
      {
        key: 'close',
        title: 'Popup.close(for test)',
        onPress: Popup.close,
      },
    ];
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
