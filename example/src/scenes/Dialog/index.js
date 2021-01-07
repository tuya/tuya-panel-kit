import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TYFlatList, Dialog, TYSdk } from 'tuya-panel-kit';

export default class DialogScene extends Component {
  state = {
    promptUnControlled: '',
    promptControlled: '',
    checkValueRadio: 'code1',
    checkValueSwitch: ['code1'],
  };

  get data() {
    return [
      {
        key: 'alert',
        title: 'Dialog.alert',
        onPress: () => {
          Dialog.alert(
            {
              title: '标题',
              subTitle: '副标题',
              confirmText: '确认',
              onConfirm: (data, { close }) => {
                close();
              },
            },
            {
              onShow: () => console.log('onShow'),
              onHide: () => console.log('onHide'),
              onDismiss: () => {
                console.log('onDismiss');
                TYSdk.mobile.jumpTo('https://www.baidu.com');
              },
            }
          );
        },
      },
      {
        key: 'confirm',
        title: 'Dialog.confirm',
        onPress: () => {
          Dialog.confirm({
            titleNumberOfLines: 1,
            title:
              '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题',
            subTitle:
              '这是内容这是内容这是内容这是内容这这是内容这是内容是内容这是内容这是内容这是内容这是内容这这是内容这是内容是内容这是内容这是内容这是内容这是内容这这是内容这是内容是内容',
            cancelText: '取消',
            confirmText: '确认',
            onConfirm: (data, { close }) => {
              close();
            },
          });
        },
      },
      {
        key: 'prompt.uncontrolled',
        title: 'Dialog.prompt(UnControlled)',
        onPress: () => {
          Dialog.prompt({
            title: '非受控输入框',
            cancelText: '取消',
            confirmText: '确认',
            defaultValue: this.state.promptUnControlled,
            placeholder: 'Password',
            onConfirm: text => {
              console.log('uncontrolled text :', text);
              this.setState({ promptUnControlled: text });
              Dialog.close();
            },
          });
        },
      },
      {
        key: 'prompt.controlled',
        title: 'Dialog.prompt(Controlled)',
        onPress: () => {
          Dialog.prompt({
            title: '受控输入框',
            subTitle: '副标题',
            cancelText: '取消',
            confirmText: '确认',
            value: this.state.promptControlled,
            placeholder: 'Password',
            onChangeText: text => {
              // 使用value props 可令prompt成为受控组件，控制其输入框内容
              const t = +text;
              if (typeof t === 'number' && !Number.isNaN(t)) {
                return text;
              }
            },
            onConfirm: (text, { close }) => {
              console.log('controlled text :', text);
              this.setState({ promptControlled: text });
              if (text.length < 2) {
                return;
              }
              close();
            },
          });
        },
      },
      {
        key: 'checkbox.radio',
        title: 'Dialog.checkbox(radio)',
        onPress: () => {
          Dialog.checkbox({
            title: 'Required',
            cancelText: '取消',
            confirmText: '确认',
            type: 'radio',
            value: this.state.checkValueRadio,
            dataSource: [
              {
                value: 'code1',
                title: '传感器选择',
              },
              {
                value: 'code2',
                title: '房间传感器校准',
              },
              {
                value: 'code3',
                title: '地板传感器校准',
                iconSize: 20,
                Icon: 'warning',
                reverse: true,
                hideOnUnselect: true,
              },
            ],
            onConfirm: (value, { close }) => {
              this.setState({ checkValueRadio: value });
              close();
            },
          });
        },
      },
      {
        key: 'checkbox.switch',
        title: 'Dialog.checkbox(switch)',
        onPress: () => {
          Dialog.checkbox({
            title: 'Required',
            cancelText: '取消',
            confirmText: '确认',
            type: 'switch',
            value: this.state.checkValueSwitch,
            dataSource: [
              {
                value: 'code1',
                title: '传感器选择',
              },
              {
                value: 'code2',
                title: '房间传感器校准',
              },
              {
                value: 'code3',
                title: '地板传感器校准',
              },
              {
                value: 'code4',
                title: '自适应功能',
              },
              {
                value: 'code5',
                title: '防冻保护功能',
                iconSize: 20,
                Icon: 'warning',
                reverse: true,
                hideOnUnselect: true,
              },
              {
                value: 'code6',
                title: '测试滚动功能',
                reverse: true,
              },
            ],
            onConfirm: (value, { close }) => {
              this.setState({ checkValueSwitch: value });
              close();
            },
          });
        },
      },
      {
        key: 'list.',
        title: 'Dialog.list',
        onPress: () => {
          Dialog.list({
            title: '这是标题',
            subTitle: '这是内容',
            dataSource: new Array(6).fill(1).map((_, idx) => ({
              title: idx === 0 ? '点我关闭' : `选项${idx}`,
              onPress: () => {
                idx === 0 && Dialog.close();
                console.log('Press', idx);
              },
            })),
            cancelText: '取消',
            confirmText: '确认',
            onConfirm: (value, { close }) => {
              close();
            },
          });
        },
      },
      // {
      //   key: 'password.',
      //   title: 'Dialog.password',
      //   onPress: () => {
      //     Dialog.password({
      //       title: '请输入密码',
      //       cancelText: '取消',
      //       confirmText: '确认',
      //       onConfirm: () => {
      //         Dialog.close();
      //       },
      //     });
      //   },
      // },
      {
        key: 'custom',
        title: 'Dialog.custom',
        onPress: () => {
          Dialog.custom({
            title: 'Custom',
            cancelText: '取消',
            confirmText: '确认',
            content: (
              <View style={{ height: 300, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 32, color: '#000' }}>自定义内容</Text>
              </View>
            ),
            onConfirm: (value, { close }) => {
              close();
            },
          });
        },
      },
      {
        key: 'Dialog.close',
        title: 'Dialog.close(for test)',
        onPress: Dialog.close,
      },
      {
        key: 'Dialog.withMultipleDialog',
        title: 'Dialog.withMultipleDialog',
        onPress: () => {
          Dialog.alert(
            {
              title: '这是第一个弹框标题',
              subTitle: '这是第一个弹框副标题',
              confirmText: '确认',
              onConfirm: (data, { close }) => {
                close();
              },
            },
            {
              onShow: () => console.log('onShow'),
              onHide: () => console.log('onHide'),
            }
          );

          Dialog.confirm({
            titleNumberOfLines: 1,
            title: '这是第二个弹框标题',
            subTitle: '这是第二个弹框副标题',
            cancelText: '取消',
            confirmText: '确认',
            onConfirm: (data, { close }) => {
              close();
            },
          });
        },
      },
    ];
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
