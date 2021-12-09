/**
 * @jest-environment jsdom
 */
import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import Motion from '../index';

describe('Motion Render', () => {
  it('basic render', () => {
    const component = renderer
      .create(
        <Motion.Toast show={true} style={{ position: 'absolute', bottom: 0 }} fadeOpacity={0.8}>
          <View style={{ width: 120, height: 48 }} />
        </Motion.Toast>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('no children render', () => {
    const component = renderer
      .create(<Motion.Toast show={true} style={{ position: 'absolute', bottom: 0 }} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('inVisible render', () => {
    const component = renderer
      .create(
        <Motion.Toast show={false} style={{ position: 'absolute', bottom: 0 }}>
          <View style={{ width: 120, height: 48 }} />
        </Motion.Toast>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('onFinish render', () => {
    const onFinish = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Motion.Toast
        show={false}
        style={{ position: 'absolute', bottom: 0 }}
        onFinish={onFinish}
        fadeOpacity={0.8}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.Toast>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Motion.Toast
        show={true}
        style={{ position: 'absolute', bottom: 0 }}
        onFinish={onFinish}
        fadeOpacity={0.8}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.Toast>
    );
    jest.runAllTimers();
    expect(onFinish).toHaveBeenCalled();
    component.unmount();
    expect(component).toMatchSnapshot();
  });

  it('onFinish render', () => {
    const component = renderer.create(
      <Motion.Toast
        show={true}
        onFinish={jest.fn()}
        style={{ position: 'absolute', bottom: 0 }}
        fadeOpacity={0.8}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.Toast>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Motion.Toast
        show={false}
        style={{ position: 'absolute', bottom: 0 }}
        onFinish={jest.fn()}
        fadeOpacity={0.8}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.Toast>
    );
    component.unmount();
    expect(component).toMatchSnapshot();
  });
});
