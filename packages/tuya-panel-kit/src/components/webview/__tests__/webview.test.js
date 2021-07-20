import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WebView from '../index';

jest.mock('WebView', () => 'WebView');

describe('WebView Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(<WebView source="https://www.tuya.com" title="Tuya" />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  // it('should get and set ref correctly', () => {
  //   const component = renderer.create(<WebView source="https://www.tuya.com" />);
  //   const instance = component.getInstance();
  //   instance.setInstance('aaa');
  //   expect(instance.__webview).toBe('aaa');
  //   expect(instance.getInstance()).toBe('aaa');
  // });
});
