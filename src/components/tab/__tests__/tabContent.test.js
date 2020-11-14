/**
 * @jest-environment jsdom
 */
import { Platform } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import TabContent from '../tabContent';

describe('TabContent', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  jest.useFakeTimers();
  it('onPress event', () => {
    Platform.OS = 'android';
    const wrapper = mount(
      <TabContent key="tabContent" useViewPagerOnAndroid={true} onScrollValueChange={jest.fn()} />
    );
    const target = wrapper.findWhere(c => !!c.prop('onPageSelected'));
    target.props().onPageSelected({ nativeEvent: { position: 1 } });
    target.props().onPageScroll({ nativeEvent: { position: 1 } });
    jest.runAllTimers();
  });
});
