import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TYFlatList, Dialog, TYSdk } from 'tuya-panel-kit';
import Strings from '../../i18n';

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
              title: Strings.getLang('dialog_title'),
              subTitle: Strings.getLang('dialog_sub_title'),
              confirmText: Strings.getLang('dialog_confirm'),
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
            title:
              Strings.getLang('dialog_long_title'),
            subTitle:
              Strings.getLang('dialog_long_sub_title'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            onConfirm: (data, { close }) => {
              close();
            },
          });
        },
      },
      {
        key: 'confirm-picture',
        title: 'Dialog.confirm(WithPicture)',
        onPress: () => {
          Dialog.confirm({
            imageSource: require('../../res/Logo.png'),
            title: Strings.getLang('dialog_title_name'),
            subTitle: Strings.getLang('dialog_supplementary_information'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
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
            title: Strings.getLang('dialog_uncontrolled_input_box'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
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
            title: Strings.getLang('dialog_controlled_input_box'),
            subTitle: Strings.getLang('dialog_sub_title'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
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
        title: 'Dialog.checkbox(Radio)',
        onPress: () => {
          Dialog.checkbox({
            title: 'Required',
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            type: 'radio',
            value: this.state.checkValueRadio,
            dataSource: [
              {
                value: 'code1',
                title: Strings.getLang('dialog_sensor_selection'),
              },
              {
                value: 'code2',
                title: Strings.getLang('dialog_room_sensor'),
              },
              {
                value: 'code3',
                title: Strings.getLang('dialog_floor_sensor'),
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
        title: 'Dialog.checkbox(Switch)',
        onPress: () => {
          Dialog.checkbox({
            title: 'Required',
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            type: 'switch',
            value: this.state.checkValueSwitch,
            dataSource: [
              {
                value: 'code1',
                title: Strings.getLang('dialog_sensor_selection'),
              },
              {
                value: 'code2',
                title: Strings.getLang('dialog_room_sensor'),
              },
              {
                value: 'code3',
                title: Strings.getLang('dialog_floor_sensor'),
              },
              {
                value: 'code4',
                title: Strings.getLang('dialog_adaptive_function'),
              },
              {
                value: 'code5',
                title: Strings.getLang('dialog_frost_protection_function'),
                iconSize: 20,
                Icon: 'warning',
                reverse: true,
                hideOnUnselect: true,
              },
              {
                value: 'code6',
                title: Strings.getLang('dialog_scrolling_function'),
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
            title: Strings.getLang('dialog_title'),
            subTitle: Strings.getLang('dialog_sub_title'),
            dataSource: new Array(6).fill(1).map((_, idx) => ({
              title: idx === 0 ? Strings.getLang('click_me') : `${Strings.getLang('dialog_option')}${idx}`,
              onPress: () => {
                idx === 0 && Dialog.close();
                console.log('Press', idx);
              },
            })),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
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
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
            content: (
              <View style={{ height: 300, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 32, color: '#000' }}> {Strings.getLang('dialog_custom_content')} </Text>
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
              title: Strings.getLang('dialog_bullet_title1'),
              subTitle: Strings.getLang('dialog_bullet_subtitle1'),
              confirmText: Strings.getLang('dialog_confirm'),
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
            title: Strings.getLang('dialog_bullet_title2'),
            subTitle: Strings.getLang('dialog_bullet_subtitle2'),
            cancelText: Strings.getLang('dialog_cancel'),
            confirmText: Strings.getLang('dialog_confirm'),
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
