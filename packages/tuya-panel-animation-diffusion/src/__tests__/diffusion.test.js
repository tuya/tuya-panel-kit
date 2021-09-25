/**
 * @jest-environment jsdom
 */
import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import Diffusion from '../index';

describe('Diffusion components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Diffusion
        children={
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff' }} />
        }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    jest.useFakeTimers();
    let startAnimated = false;
    const wrapper = shallow(
      <Diffusion
        startAnimated={startAnimated}
        children={
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff' }} />
        }
      />
    );
    startAnimated = true;
    wrapper.setProps({ startAnimated });
    const instance = wrapper.instance();
    instance.timeHandle.push(jest.runOnlyPendingTimers());
    expect(wrapper).toMatchSnapshot();
    startAnimated = false;
    wrapper.setProps({ startAnimated });
    wrapper.unmount();
  });
});
