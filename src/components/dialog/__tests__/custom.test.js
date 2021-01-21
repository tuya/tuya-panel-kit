import React from 'react';
import renderer from 'react-test-renderer';
import { View, Text } from 'react-native';
import Custom from '../custom';

describe('Custom Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <Custom
        title="标题"
        subTitle="副标题"
        confirmText="确认"
        cancelText="取消"
        onConfirm={jest.fn((value, { close: callback }) => callback())}
        onCancel={jest.fn()}
        content={
          <View
            style={{
              height: 300,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 32, color: '#000' }}>自定义内容</Text>
          </View>
        }
      />
    );
    const instance = component.getInstance();
    instance._handleConfirm();
    instance._handleCancel();
    instance._handleHide();
    expect(component).toMatchSnapshot();
  });

  it(' render with footer', () => {
    const component = renderer.create(
      <Custom
        title="标题"
        subTitle="副标题"
        confirmText="确认"
        cancelText="取消"
        onConfirm={jest.fn(() => console.log('Hello'))}
        footer={
          <View
            style={{
              height: 300,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 32, color: '#000' }}>自定义Footer</Text>
          </View>
        }
        content={
          <View
            style={{
              height: 300,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 32, color: '#000' }}>自定义内容</Text>
          </View>
        }
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it(' render with motionType', () => {
    const component = renderer.create(
      <Custom
        title="标题"
        subTitle="副标题"
        confirmText="确认"
        cancelText="取消"
        onConfirm={jest.fn(() => console.log('Hello'))}
        motionType="none"
        content={
          <View
            style={{
              height: 300,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 32, color: '#000' }}>自定义内容</Text>
          </View>
        }
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
