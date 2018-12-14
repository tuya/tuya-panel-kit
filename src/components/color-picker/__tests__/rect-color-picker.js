import { View } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import RectColorPicker from '../rect-color-picker';

describe('RectColorPicker Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <RectColorPicker style={{ width: 340, height: 44 }} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should disabled', () => {
    const component = renderer.create(
      <RectColorPicker
        style={{ width: 340, height: 44 }}
        disabled={true}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with style', () => {
    const component = renderer.create(
      <RectColorPicker
        style={{ width: 340, height: 44 }}
        hueStyle={{ width: 300, height: 20 }}
        thumbStyle={{ width: 20, height: 20, borderRadius: 10 }}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with kelvin', () => {
    const component = renderer.create(
      <RectColorPicker
        style={{ width: 44, height: 300 }}
        position={{ x: 0.5, y: 0 }}
        kelvin={true}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with children', () => {
    const component = renderer.create(
      <RectColorPicker style={{ width: 340, height: 44 }}>
        <View style={{
          position: 'absolute',
          width: 44,
          height: 44,
          backgroundColor: 'red',
          alignSelf: 'center'
        }}
        />
      </RectColorPicker>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render thumb direction correctly', () => {
    const horizontal = renderer.create(
      <RectColorPicker
        style={{ width: 340, height: 44 }}
        overstep={true}
        direction="horizontal"
        axis="x"
      />
    );
    const vertical = renderer.create(
      <RectColorPicker
        style={{ width: 44, height: 300 }}
        direction="vertical"
        axis="y"
      />
    );
    const all = renderer.create(
      <RectColorPicker
        style={{ width: 340, height: 44 }}
        direction="all"
      />
    );
    expect(horizontal.toJSON()).toMatchSnapshot();
    expect(vertical.toJSON()).toMatchSnapshot();
    expect(all.toJSON()).toMatchSnapshot();
  });

  it('should thumb have backgroundColor with withFollowColor', () => {
    const component = renderer.create(
      <RectColorPicker
        style={{ width: 340, height: 44 }}
        withFollowColor={true}
      />
    );
    instance = component.getInstance();
    instance.setThumbStyle = jest.fn();
    instance.onMove(null, { locationX: 0, locationY: 22 });
    expect(instance.setThumbStyle).toHaveBeenCalled();
    const args = instance.setThumbStyle.mock.calls[0];
    expect(args[0]).toHaveProperty('backgroundColor');
  });

  it('should update position correctly', () => {
    const component = renderer.create(
      <RectColorPicker
        key="some-key"
        style={{ width: 340, height: 44 }}
        position={{ x: 0, y: 0 }}
      />
    );
    const instance = component.getInstance();
    instance.setThumbStyle = jest.fn();
    component.update(
      <RectColorPicker
        key="some-key"
        style={{ width: 340, height: 44 }}
        position={{ x: 0.5, y: 0 }}
      />
    )
    expect(instance.setThumbStyle).toHaveBeenCalled();
    // const args = instance.setThumbStyle.mock.calls[0];
    // expect(args[0]).toEqual({
    //   left: 0,
    //   top: 6,
    // });
  });

  it('should gesture respond correctly', () => {
    const onStart = jest.fn();
    const onValueChange = jest.fn();
    const onComplete = jest.fn();
    const component = renderer.create(
      <RectColorPicker
        style={{ width: 340, height: 44 }}
        onStart={onStart}
        onValueChange={onValueChange}
        onComplete={onComplete}
      />
    );
    const instance = component.getInstance();
    instance.setThumbStyle = jest.fn();
      
    instance.onGrant({}, { locationX: 0, locationY: 0 });
    expect(instance.setThumbStyle).toHaveBeenCalled();
    expect(onStart).toHaveBeenCalled();
    // TODO
    // const args = instance.setThumbStyle.mock.calls[0];
    // expect(args[0]).toEqual({
    //   left: 0,
    //   top: 6,
    // });
    instance.onMove(null, { locationX: 0, locationY: 22 });
    expect(instance.setThumbStyle).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalled();

    instance.onRelease(null, { locationX: 227, locationY: 22 });
    expect(instance.setThumbStyle).toHaveBeenCalled();
    expect(onComplete).toHaveBeenCalled();
  });
});
