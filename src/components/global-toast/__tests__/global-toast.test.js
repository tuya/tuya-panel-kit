import React from 'react';
import renderer from 'react-test-renderer';
import GlobalToast from '../index';
import { TYSdk } from '@tuya-rn/tuya-native-kit';

describe('GlobalToast Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(
        GlobalToast.show({
          text: '提示性文案建议最多展示十六个字符',
          showIcon: false,
          textStyle: { fontSize: 18, color: '#333' },
          contentStyle: {},
          onFinish: jest.fn(),
        })
      )
      .toJSON();
  });

  it('render width loading', () => {
    const component = renderer
      .create(
        GlobalToast.show({
          text: '设置成功',
          textStyle: { fontSize: 18, color: '#333' },
          showPosition: 'center',
          onFinish: jest.fn(),
        })
      )
      .toJSON();
  });

  it('render width update', () => {
    const component = renderer.create(
      GlobalToast.show({
        text: '设置成功',
        showPosition: 'center',
        onFinish: jest.fn(),
      })
    );
    component.update(GlobalToast.hide());
  });
});

describe('GlobalToast', () => {
  it('basic render', () => {
    const onFinish = jest.fn();
    const component = renderer.create(<GlobalToast show={true} onFinish={onFinish} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
