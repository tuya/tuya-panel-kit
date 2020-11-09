import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Motion from '../index';

describe('Motion Render', () => {
  it('onLayout', () => {
    const wrapper = shallow(
      <Motion.PullUp
        show={true}
        onHide={jest.fn()}
        style={{ position: 'absolute', bottom: 0 }}
        dropHeight={200}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.PullUp>
    );
    const target = wrapper.findWhere(c => c.prop('onLayout'));
    wrapper.setState({ measuredHeight: undefined });
    wrapper.setProps({ show: false });
    target.simulate('layout', { nativeEvent: { layout: { height: 100, width: 100 } } });
  });
  it('basic render', () => {
    const component = renderer
      .create(
        <Motion.PullUp
          show={true}
          onHide={jest.fn()}
          style={{ position: 'absolute', bottom: 0 }}
          dropHeight={200}
        >
          <View style={{ width: 120, height: 48 }} />
        </Motion.PullUp>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('invisible render', () => {
    const component = renderer
      .create(
        <Motion.PullUp
          show={false}
          onHide={jest.fn()}
          style={{ position: 'absolute', bottom: 0 }}
          dropHeight={200}
        >
          <View style={{ width: 120, height: 48 }} />
        </Motion.PullUp>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it('onHide render', () => {
    const onHide = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Motion.PullUp
        show={true}
        onHide={onHide}
        style={{ position: 'absolute', bottom: 0 }}
        dropHeight={200}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.PullUp>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Motion.PullUp
        show={false}
        onHide={onHide}
        style={{ position: 'absolute', bottom: 0 }}
        dropHeight={200}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.PullUp>
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
      <Motion.PullUp
        show={false}
        onShow={onShow}
        style={{ position: 'absolute', bottom: 0 }}
        dropHeight={200}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.PullUp>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Motion.PullUp
        show={true}
        onShow={onShow}
        style={{ position: 'absolute', bottom: 0 }}
        dropHeight={200}
      >
        <View style={{ width: 120, height: 48 }} />
      </Motion.PullUp>
    );
    jest.runAllTimers();
    expect(onShow).toHaveBeenCalled();
    component.unmount();
    expect(component).toMatchSnapshot();
  });
});
