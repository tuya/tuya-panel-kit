import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SwitchButton from '../index';

describe('SwitchButton Component', () => {
  it('basic render', () => {
    const component = renderer.create(<SwitchButton active={true} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('SwitchButton size&theme conflict', function() {
    const component = renderer.create(
      <SwitchButton
        value={true}
        active={true}
        size={{ height: 60 }}
        theme={{ width: 120, thumbSize: 55 }}
        onChange={data => {
          console.log(data);
        }}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('SwitchButton render width viewBox', function() {
    const onPress = jest.fn();

    const component = renderer.create(
      <SwitchButton
        value={true}
        active={true}
        onChange={data => {
          console.log(data);
        }}
      />
    );

    expect(component.root.instance.props.value).toBe(true);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
