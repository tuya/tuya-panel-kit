import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Motion from '../index';

describe('Motion Render', () => {
  it('componentWillReceiveProps(nextProps)', () => {
    const wrapper = shallow(
      <Motion.ScaleFadeIn
        show={true}
        onHide={jest.fn()}
        style={{ position: 'absolute', bottom: 0 }}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.ScaleFadeIn>
    );
    wrapper.setProps({ width: 100 });
  });
  it('basic render', () => {
    const component = renderer
      .create(
        <Motion.ScaleFadeIn
          show={true}
          onHide={jest.fn()}
          style={{ position: 'absolute', bottom: 0 }}
        >
          <View style={{ width: 120, height: 48 }} />
        </Motion.ScaleFadeIn>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('invisible render', () => {
    const component = renderer
      .create(
        <Motion.ScaleFadeIn
          show={false}
          onHide={jest.fn()}
          style={{ position: 'absolute', bottom: 0 }}
        >
          <View style={{ width: 120, height: 48 }} />
        </Motion.ScaleFadeIn>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('onHide render', () => {
    const onHide = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Motion.ScaleFadeIn show={true} onHide={onHide} style={{ position: 'absolute', bottom: 0 }}>
        <View style={{ width: 120, height: 48 }} />
      </Motion.ScaleFadeIn>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Motion.ScaleFadeIn show={false} onHide={onHide} style={{ position: 'absolute', bottom: 0 }}>
        <View style={{ width: 120, height: 48 }} />
      </Motion.ScaleFadeIn>
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
      <Motion.ScaleFadeIn show={false} onShow={onShow} style={{ position: 'absolute', bottom: 0 }}>
        <View style={{ width: 120, height: 48 }} />
      </Motion.ScaleFadeIn>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Motion.ScaleFadeIn show={true} onShow={onShow} style={{ position: 'absolute', bottom: 0 }}>
        <View style={{ width: 120, height: 48 }} />
      </Motion.ScaleFadeIn>
    );
    jest.runAllTimers();
    expect(onShow).toHaveBeenCalled();
    component.unmount();
    expect(component).toMatchSnapshot();
  });
});
