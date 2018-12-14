import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ColorPicker from '../color-picker';

describe('ColorPicker Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <ColorPicker
        style={{}}
        hsb={[360, 100, 100]}
        disabled={false}
        onValueChangeComplete={jest.fn()}
      />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('component update', () => {
    const component = renderer.create(
      <ColorPicker
        style={{}}
        hsb={[360, 100, 100]}
        disabled={false}
        onValueChangeComplete={jest.fn()}
      />
    );

    component.update(
      <ColorPicker
        style={{}}
        width={400}
        height={400}
        hsb={[360, 100, 100]}
        disabled={true}
        onValueChangeComplete={jest.fn()}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

});
