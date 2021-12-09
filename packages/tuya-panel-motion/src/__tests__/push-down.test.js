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
        <Motion.PushDown
          show={true}
          onHide={jest.fn()}
          style={{ position: 'absolute', bottom: 0 }}
          dropHeight={200}
        >
          <View style={{ width: 120, height: 48 }} />
        </Motion.PushDown>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('inVisible render', () => {
    const component = renderer
      .create(
        <Motion.PushDown
          show={false}
          onShow={jest.fn()}
          style={{ position: 'absolute', bottom: 0 }}
          dropHeight={200}
        >
          <View style={{ width: 120, height: 48 }} />
        </Motion.PushDown>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('onHide render', () => {
    const onHide = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Motion.PushDown
        show={true}
        onHide={onHide}
        style={{ position: 'absolute', bottom: 0 }}
        dropHeight={200}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.PushDown>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Motion.PushDown
        show={false}
        onHide={onHide}
        style={{ position: 'absolute', bottom: 0 }}
        dropHeight={200}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.PushDown>
    );
    jest.runAllTimers();
    expect(onHide).toHaveBeenCalled();
    component.unmount();
    expect(component).toMatchSnapshot();
  });

  it('onShow render', () => {
    const onShow = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Motion.PushDown
        show={false}
        onShow={onShow}
        style={{ position: 'absolute', bottom: 0 }}
        dropHeight={200}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.PushDown>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Motion.PushDown
        show={true}
        onShow={onShow}
        style={{ position: 'absolute', bottom: 0 }}
        dropHeight={200}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.PushDown>
    );
    jest.runAllTimers();
    expect(onShow).toHaveBeenCalled();
    component.unmount();
    expect(component).toMatchSnapshot();
  });
});
