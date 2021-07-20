/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import Battery from '../index'
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

const setup = props => {
  const wrapper = mount(
    <ThemeProvider>
      <Battery {...props}/>
    </ThemeProvider>
    );
  return wrapper;
};

describe('Battery', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  it('basic render', () => {
    const wrapper = setup({ onCalcColor: () => {return null},value: 10 });
    expect(wrapper.component).toMatchSnapshot();
  });
  it('render with color prop', () => {
    setup({ onCalcColor: () => {return {}} });
  });
  it('render with value == 50', () => {
    const wrapper = setup({ onCalcColor: () => {return null},value: 50 });
      expect(wrapper.component).toMatchSnapshot();
  });
  it('render with value == 0.5', () => {
    const wrapper = setup({ onCalcColor: () => {return null},value: 0.5 });
      expect(wrapper.component).toMatchSnapshot();
  });
});
