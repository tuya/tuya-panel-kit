/**
 * @jest-environment jsdom
 */
import React from 'react';
import { View } from 'react-native';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import NotificationLegacy from '../index';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;
describe('NotificationLegacy', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  jest.useFakeTimers();
  it('basic render', () => {
    const wrapper = mount(
      <ThemeProvider>
        <NotificationLegacy
          message="I am Notification"
          style={{ width: 240, height: 36, borderRadius: 18 }}
          onPress={jest.fn()}
          theme={{
            iconColor: '#00f',
          }}
          enableClose={false}
        />
      </ThemeProvider>
    );
    jest.runOnlyPendingTimers();
    const target = wrapper.findWhere(c => !!c.prop('onLayout'));
    target
      .first()
      .props()
      .onLayout({ nativeEvent: { layout: { height: 44 } } });
    wrapper.unmount();
  });
});
describe('NotificationLegacy Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <NotificationLegacy
            message="I am Notification"
            style={{ width: 240, height: 36, borderRadius: 18 }}
            onPress={jest.fn()}
            theme={{
              iconColor: '#00f',
            }}
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('enableClose render', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <NotificationLegacy
            message="I am Notification"
            style={{ width: 240, height: 36, borderRadius: 18 }}
            enableClose={false}
            autoCloseTime={1200}
            onClose={jest.fn()}
            theme={{
              iconColor: '#00f',
            }}
          >
            <View style={{ width: 240, height: 36, borderRadius: 18, backgroundColor: '#0f0' }} />
          </NotificationLegacy>
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
