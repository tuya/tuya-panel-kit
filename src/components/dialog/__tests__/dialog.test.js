import React from 'react';
import { View, Text } from 'react-native';
import renderer from 'react-test-renderer';
import Dialog from '../index';

describe('Dialog Component', () => {
  it('Dialog.alert render', () => {
    const component = renderer
      .create(
        Dialog.alert({
          title: '标题',
          subTitle: '副标题',
          confirmText: '确认',
          onConfirm: jest.fn(),
        })
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('Dialog.confirm render', () => {
    const component = renderer
      .create(
        Dialog.confirm({
          title: '标题',
          subTitle: '副标题',
          cancelText: '取消',
          confirmText: '确认',
          onConfirm: jest.fn(),
        })
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('Dialog.prompt(defaultValue) render', () => {
    const component = renderer
      .create(
        Dialog.prompt({
          title: '非受控输入框',
          subTitle: '副标题',
          cancelText: '取消',
          confirmText: '确认',
          placeholder: 'Password',
          defaultValue: '',
          onConfirm: jest.fn(),
        })
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('Dialog.prompt(value) render', () => {
    const component = renderer
      .create(
        Dialog.prompt({
          title: '非受控输入框',
          subTitle: '副标题',
          cancelText: '取消',
          confirmText: '确认',
          placeholder: 'Password',
          value: '',
          onConfirm: jest.fn(),
        })
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('Dialog.checkbox(Radio) render', () => {
    const component = renderer
      .create(
        Dialog.checkbox({
          title: 'Required',
          cancelText: '取消',
          confirmText: '确认',
          type: 'radio',
          value: 'code1',
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
              iconSize: 24,
              Icon: 'warning',
              reverse: true,
              hideOnUnselect: true,
            },
          ],
        })
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('Dialog.checkbox(Switch) render', () => {
    const component = renderer
      .create(
        Dialog.checkbox({
          title: 'Required',
          cancelText: '取消',
          confirmText: '确认',
          type: 'switch',
          value: ['code1'],
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
        })
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('Dialog.list render', () => {
    const component = renderer
      .create(
        Dialog.list({
          title: '这是标题',
          subTitle: '这是内容',
          dataSource: new Array(6).fill(1).map((_, idx) => ({
            title: idx === 0 ? '点我关闭' : `选项${idx}`,
            onPress: jest.fn(),
          })),
          cancelText: '取消',
          confirmText: '确认',
          onConfirm: jest.fn(),
        })
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('Dialog.custom render', () => {
    const component = renderer
      .create(
        Dialog.custom({
          title: 'Custom',
          cancelText: '取消',
          confirmText: '确认',
          content: (
            <View
              style={{
                height: 300,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 32, color: '#000' }}>自定义内容</Text>
            </View>
          ),
          onConfirm: jest.fn(),
        })
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
