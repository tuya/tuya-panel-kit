import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CircularPicker from '../circular-picker';

describe('CircularPicker Component', () => {
  it('basic render', () => {
    const component = renderer.create(<CircularPicker />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should render picker', () => {
    const component = renderer.create(
      <CircularPicker
        degree={0}
        radius={115}
        frontStrokeColor="blue"
        strokeColor="red"
        strokeWidth={1}
        startDegree={30}
        endDegree={330}
        disabled={false}
        TrackComponent={null}
        onValueChange={() => { }}
        onComplete={() => { }}
      />
    );
    const instance = component.root.instance;
    instance._thumbRef.setNativeProps = jest.fn()
    instance.updateThumbStyle({ color: 'red' });
    expect(component.toJSON()).toMatchSnapshot();
  })

  it('should adjust svg coords properly', () => {
    const component = renderer.create(<CircularPicker />);
    const instance = component.root.instance;
    expect(instance.adjustSvgCoordinates(30, 30, Math.PI)).toEqual(Math.PI)
    expect(instance.adjustSvgCoordinates(-30, 30, Math.PI)).toEqual(Math.PI)
    expect(instance.adjustSvgCoordinates(-30, -30, -Math.PI)).toEqual(Math.PI)
    expect(instance.adjustSvgCoordinates(30, -30, -Math.PI)).toEqual(Math.PI)
    expect(instance.adjustSvgCoordinates(0, 30, -Math.PI)).toEqual(Math.PI * 3 / 2)
    expect(instance.adjustSvgCoordinates(0, -30, -Math.PI)).toEqual(Math.PI / 2)
    expect(instance.adjustSvgCoordinates(0, 0, -Math.PI)).toEqual(0)
  });

  it('should not set panresponder', () => {
    const component = renderer.create(<CircularPicker />);
    const instance = component.root.instance;
    expect(instance.shouldSetResponder()).toEqual(true)
  })

  it('should move correctly', () => {
    const component = renderer.create(<CircularPicker />);
    const instance = component.root.instance;
    instance._thumbRef.setNativeProps = jest.fn()
    instance._moveTo(100, 100);
    expect(instance._thumbRef.setNativeProps).toHaveBeenCalled();

    const x = instance._centerPoint + instance._thumbRadius;
    instance._moveTo(x, x + 100);
    expect(instance._thumbRef.setNativeProps).toHaveBeenCalled();
  })

  it('should gesture respond properly', () => {
    const component = renderer.create(<CircularPicker />);
    const instance = component.root.instance;
    instance._thumbRef.setNativeProps = jest.fn();

    instance._handleGrant({ nativeEvent: { locationX: 100, locationY: 100 } });
    expect(instance.xRelativeOriginStart).toEqual(100);
    expect(instance.yRelativeOriginStart).toEqual(100);

    instance._handleMove({}, { dx: 100, dy: 100 });
    expect(instance._thumbRef.setNativeProps).toHaveBeenCalled();

    instance._handleRelease({}, { dx: 150, dy: 150 })
    expect(instance._thumbRef.setNativeProps).toHaveBeenCalled();
  })

  it('should component update property', () => {
    const component = renderer.create(<CircularPicker key={'some-key'}/>);
    const instance = component.root.instance;
    const radius = 1000;
    const strokeWidth = 1000;
    component.update(<CircularPicker key={'some-key'} radius={radius} strokeWidth={strokeWidth}/>)
    expect({
      r: instance._thumbRadius,
      w: instance._centerPoint
    }).toEqual({
      r: strokeWidth * 0.5 + 2,
      w: radius + strokeWidth * 0.5 + 2
    })
  });

  it('should render disabled picker', () => {
    const component = renderer.create(
      <CircularPicker
        degree={0}
        radius={115}
        frontStrokeColor="blue"
        strokeColor="red"
        strokeWidth={1}
        startDegree={30}
        endDegree={330}
        disabled={true}
        TrackComponent={null}
        onValueChange={() => { }}
        onComplete={() => { }}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  })
});

