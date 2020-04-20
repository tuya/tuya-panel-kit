import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TYFlatList, Popup, Utils, TYText } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;
export default class PopupScene extends Component {
  state = {
    countdown: 60,
    countdownSwitchValue: true,
    date: new Date(),
    numberValue: 0,
    listValue: '1',
    listValues: ['1'],
    pickerValue: '1',
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
              title: '倒计时',
              cancelText: '取消',
              confirmText: '确认',
              hourText: '小时',
              minuteText: '分钟',
              max: 1466,
              value: this.state.countdown,
              switchValue: this.state.countdownSwitchValue,
              onSwitchValueChange: value => this.setState({ countdownSwitchValue: value }),
              onConfirm: data => {
                console.log('data', data);
                this.setState({ countdown: data.value });
                Popup.close();
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
            title: '生日',
            cancelText: '取消',
            confirmText: '确认',
            hourText: '小时',
            minuteText: '分钟',
            defaultDate: this.state.date,
            mode: 'datetime',
            minDate: new Date(1918, 0, 1, 0, 0, 0),
            maxDate: new Date(2018, 11, 31, 23, 59, 59),
            onConfirm: date => {
              this.setState({ date });
              Popup.close();
            },
          });
        },
      },
      {
        key: 'numberSelector.basic',
        title: 'Popup.numberSelector(Basic)',
        onPress: () => {
          Popup.numberSelector({
            title: '温度调节 (℃)',
            cancelText: '取消',
            confirmText: '确认',
            value: this.state.numberValue,
            min: 0,
            max: 50,
            onConfirm: value => {
              this.setState({ numberValue: value });
              Popup.close();
            },
          });
        },
      },
      {
        key: 'numberSelector.slider',
        title: 'Popup.numberSelector(Slider)',
        onPress: () => {
          Popup.numberSelector({
            title: '温度调节 (℃)',
            cancelText: '取消',
            confirmText: '确认',
            type: 'slider',
            value: this.state.numberValue,
            min: 0,
            max: 50,
            onConfirm: value => {
              this.setState({ numberValue: value });
              Popup.close();
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
            maxItemNum: 7,
            dataSource: _.times(7, n => ({
              key: `${n}`,
              title: `${n}`,
              value: `${n}`,
            })),
            title: ['单选', '测试'],
            cancelText: '取消',
            confirmText: '确认',
            value: this.state.listValue,
            footerType: 'singleCancel',
            onConfirm: value => {
              console.log('radio value :', value);
              this.setState({ listValue: value });
              Popup.close();
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
              title: `标题${n}`,
              value: `${n}`,
            })),
            title: '多选',
            cancelText: '取消',
            confirmText: '确认',
            subTitle: '副标题',
            value: this.state.listValues,
            onConfirm: value => {
              console.log('switch value :', value);
              this.setState({ listValues: value });
              Popup.close();
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
                label: '1',
                value: '1',
              },
              {
                label: '2',
                value: '2',
              },
            ],
            title: 'Picker',
            cancelText: '取消',
            confirmText: '确认',
            value: this.state.pickerValue,
            onBack: () => console.log('////'),
            label: 'haha',
            onConfirm: (value, idx) => {
              this.setState({ pickerValue: value });
              Popup.close();
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
            cancelText: '取消',
            confirmText: '确认',
            value: this.state.pickerValues,
            label: ['$', '%'],
            onValueChange: (value, idx) => {
              console.log('onValueChange :', value, idx);
            },
            onConfirm: (value, idx) => {
              console.log('value :', value);
              console.log('idx :', idx);
              this.setState({ pickerValues: value });
              Popup.close();
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
            title: '时间段选择',
            cancelText: '取消',
            confirmText: '确认',
            startTime: this.state.timerPickerValue[0],
            endTime: this.state.timerPickerValue[1],
            is12Hours: true,
            onConfirm: ({ startTime, endTime }) => {
              this.setState({ timerPickerValue: [startTime, endTime] });
              Popup.close();
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
            children: <TYText text="我是气泡,点击遮罩空白处退出哦" style={{ fontSize: cx(20) }} />,
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
            cancelText: '取消',
            confirmText: '确认',
            onConfirm: () => {
              Popup.close();
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
