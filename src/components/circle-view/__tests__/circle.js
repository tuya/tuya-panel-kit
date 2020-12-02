import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CircleView from '../index';

describe('CircleView Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <CircleView radius={5} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });


  it('render with background', () => {
    const component = renderer.create(
      <CircleView
        radius={25}
        color={'red'}
        borderColor="#fefefe"
        style={{ backgroundColor: 'yellow' }}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

});
