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
        <Motion.ScalePullDown show={true} onHide={jest.fn()}>
          <View style={{ width: 120, height: 48 }} />
        </Motion.ScalePullDown>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('invisible render', () => {
    const component = renderer
      .create(
        <Motion.ScalePullDown show={false} onHide={jest.fn()}>
          <View style={{ width: 120, height: 48 }} />
        </Motion.ScalePullDown>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('onHide render', () => {
    const onHide = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Motion.ScalePullDown show={true} onHide={onHide}>
        <View style={{ width: 120, height: 48 }} />
      </Motion.ScalePullDown>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Motion.ScalePullDown show={false} onHide={onHide}>
        <View style={{ width: 120, height: 48 }} />
      </Motion.ScalePullDown>
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
      <Motion.ScalePullDown show={false} onShow={onShow}>
        <View style={{ width: 120, height: 48 }} />
      </Motion.ScalePullDown>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Motion.ScalePullDown show={true} onShow={onShow}>
        <View style={{ width: 120, height: 48 }} />
      </Motion.ScalePullDown>
    );
    jest.runAllTimers();
    expect(onShow).toHaveBeenCalled();
    component.unmount();
    expect(component).toMatchSnapshot();
  });
});
