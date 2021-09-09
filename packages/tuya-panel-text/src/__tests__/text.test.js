/**
 * @jest-environment jsdom
 */
import  'react-native';
import React from 'react';
import { mount } from 'enzyme';
import TYText from '../index';

describe('TYText Component', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  it('basic render', () => {
    const wrapper = mount(<TYText size={10} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ text: 'tuya' });
    wrapper.instance().setText('tuya');
    wrapper.instance().setNativeProps('tuya');
    mount(<TYText />);
    mount(<TYText type="icon" size="small" />);
  });
});
