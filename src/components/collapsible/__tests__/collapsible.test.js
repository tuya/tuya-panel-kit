/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Animated } from 'react-native';
import { mount, shallow } from 'enzyme';
import Collapsible from '../index';
import TYText from '../../TYText';

const setup = props => {
  const wrapper = shallow(
    <Collapsible
      collapsed={false}
      onChange={jest.fn()}
      align="top"
      style={{
        width: 375,
        height: 260,
        backgroundColor: '#ff0',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    >
      <TYText
        style={{
          marginTop: 30,
          textAlign: 'center',
          color: '#666',
          fontSize: 16,
        }}
        text="以不变应万变，无招胜有招。"
      />
    </Collapsible>
  );
  wrapper.instance().content = {
    getNode: () => {
      return {
        measure: jest.fn(callback => {
          callback();
        }),
      };
    },
  };
  Animated.timing = jest.fn((height, config) => {
    return {
      start: jest.fn(callback => callback()),
    };
  });
  wrapper.instance().animation = { stop: jest.fn() };
  wrapper.instance().setState = jest.fn((newState, callback) => {
    typeof callback === 'function' && callback();
  });
  return wrapper;
};
jest.useFakeTimers();
describe('Collapsible', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  it('renders correctly', () => {
    const wrapper = mount(
      <Collapsible
        collapsed={false}
        onChange={jest.fn()}
        align="top"
        style={{
          width: 375,
          height: 260,
          backgroundColor: '#ff0',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TYText
          style={{
            marginTop: 30,
            textAlign: 'center',
            color: '#666',
            fontSize: 16,
          }}
          text="以不变应万变，无招胜有招。"
        />
      </Collapsible>
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
    expect(wrapper).toMatchSnapshot();
  });
  it('componentDidUpdate(prevProps) first', () => {
    const wrapper = setup();
    wrapper.instance().props.onChange();
    wrapper.setProps({ collapsed: true, collapsedHeight: 100, align: 'center' });
    wrapper.setState({ animating: false }, () => {
      const targetNode = wrapper.find(Animated.View).at(1);
      targetNode.simulate('layout', {
        nativeEvent: {
          layout: {
            height: 100,
          },
        },
      });
    });
  });
  it('componentDidUpdate(prevProps) second', () => {
    const wrapper = setup({ collapsed: true });
    wrapper.setProps({ collapsed: true, collapsedHeight: 100, align: 'center' });
    wrapper.setState({ measuring: true });
  });
  it('componentDidUpdate(prevProps) third', () => {
    const wrapper = setup({ collapsed: true });
    wrapper.setProps({ collapsed: false, collapsedHeight: 100, align: 'center' });
    jest.runOnlyPendingTimers();
  });
  it('componentDidUpdate(prevProps) fourth', () => {
    const wrapper = setup({ collapsed: true });
    wrapper.instance().content = false;
    wrapper.setProps({ collapsed: false, collapsedHeight: 100, align: 'center' });
    jest.runOnlyPendingTimers();
  });
  // it('exception', () => {
  //   const wrapper = setup({ easing: 'tuya' });
  //   wrapper.setProps({ collapsed: true, collapsedHeight: 100, align: 'center' });
  // });
});
