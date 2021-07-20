import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Toast from '../index';

describe('Toast.Error Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(<Toast.Error show={true} text="I'm Iron man" onFinish={jest.fn()} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
