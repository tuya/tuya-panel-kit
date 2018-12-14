import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TYText from '../index';

describe('TYText Component', () => {
  it('basic render', () => {
    const component = renderer.create(<TYText/>).toJSON();
    expect(component).toMatchSnapshot();
  });
});
