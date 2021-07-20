import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import Popup from '../index';

describe(' Popup Toast', () => {
  it('basic render', () => {
    const component = renderer.create(
      Popup.toast({
        message: 'I am Toast',
      })
    );
    expect(component).toMatchSnapshot();
  });
});
