import React from 'react';
import { shallow } from 'enzyme';
import Group from '../group';
import RadioButton from '../radioButton';

const setup = props => {
  const tabs = Array.from(Array(10), (v, k) => k + 1).map(v => {
    return {
      key: `${v}`,
      title: `Tab${v}`,
      textStyle: { color: '#000' },
      activeTextStyle: { color: '#f0f' },
      onItemPress: jest.fn(),
    };
  });
  return shallow(<Group onChange={jest.fn()} tabs={tabs} {...props} />);
};

describe('Group', () => {
  it('basic render', () => {
    const wrapper = setup();
    wrapper.setProps({ activeIndex: 0 });
    const radioButton = wrapper.find(RadioButton).first();
    radioButton.simulate('itemPress', 0, {}, jest.fn());
  });
  it('simulate onItemPress', () => {
    const wrapper = setup();
    wrapper.setState({ activeIndex: 1 });
    const radioButton = wrapper.find(RadioButton).first();
    radioButton.simulate('itemPress', 1, {}, jest.fn());
  });
  it('simulate onItemPress', () => {
    const wrapper = setup();
    wrapper.setProps({ activeIndex: 1 });
    const radioButton = wrapper.find(RadioButton).first();
    radioButton.simulate('itemPress', 1, {}, jest.fn());
  });
  it('mock onLayout', () => {
    const wrapper = setup();
    const target = wrapper.findWhere(node => !!node.prop('onLayout'));
    target.at(0).simulate('layout', { nativeEvent: { layout: {} } });
    target.at(1).simulate('layout', { nativeEvent: { layout: {} } });
  });
});
