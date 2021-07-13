import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Toast from '../index';

describe('Toast.Error Component', () => {
  it('basic render', () => {
    const component = renderer.create(<Toast.Loading show={true} onFinish={jest.fn()} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
