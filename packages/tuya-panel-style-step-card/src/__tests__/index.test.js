/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import { mount } from 'enzyme';
 import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
 import { ClassicStepCard, NordicStepCard } from '../index';
 
describe('StepCard', () => {
  it('ClassicStepCard', () => {
    jest.useFakeTimers();
    const wrapper = mount(<ClassicStepCard value={10} onValueChange={value => console.log({ value })} />)
    const touchable = wrapper
      .findWhere(c => c.name() === 'TouchableOpacity' && !!c.prop('onPressIn')).at(0);
      const touchable2 = wrapper
      .findWhere(c => c.name() === 'TouchableOpacity' && !!c.prop('onPressIn')).at(1);
    jest.runAllTimers();
    touchable.props().onPressIn(true);
    touchable.props().onPressOut();
    wrapper.update(<ClassicStepCard value={25} onValueChange={value => console.log({ value })} />)
    touchable2.props().onPressIn(false);
    touchable2.props().onPressOut();
    wrapper.unmount();
    expect(wrapper).toMatchSnapshot();
  });

   it('NordicStepCard', () => {
    jest.useFakeTimers();
    const wrapper = mount(<NordicStepCard value={10} icon={TuyaRNSvgs.power} />)
    const touchable = wrapper
      .findWhere(c => c.name() === 'TouchableOpacity' && !!c.prop('onPressIn')).at(0);
      const touchable2 = wrapper
      .findWhere(c => c.name() === 'TouchableOpacity' && !!c.prop('onPressIn')).at(1);
    jest.runAllTimers();
    touchable.props().onPressIn(true);
    touchable.props().onPressOut();
    wrapper.update(<NordicStepCard value={25} icon={TuyaRNSvgs.power} />);
    touchable2.props().onPressIn(false);
    touchable2.props().onPressOut();
    wrapper.unmount();
    expect(wrapper).toMatchSnapshot();
   })
});
 