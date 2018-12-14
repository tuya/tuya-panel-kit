import { AppState } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UnitText from '../unitText';

jest.mock('AppState', () => {
  return {
    addEventListener: (type, callback) => {},
    removeEventListener: (type, callback) => {}
  }
});

describe('UnitText Component', () => {
  it('basic render', () => {
    const component = renderer.create(<UnitText value='1' unit='℃' />).toJSON();
    expect(component).toMatchSnapshot();

    const noComponent = renderer.create(<UnitText />).toJSON();
    expect(noComponent).toMatchSnapshot();
  });
  it('should update', () => {
    const component = renderer.create(<UnitText value='1' />);
    component.update(<UnitText value='12' />);
    expect(component.root.instance.state.value).toEqual('12');
  });
  it('should set unit', () => {
    const component = renderer.create(<UnitText value='1' />);
    const { instance } = component.root;
    instance.setUnit('℃');
    expect(instance.state.unit).toEqual('℃');
  });
  it('should set value', () => {
    const component = renderer.create(<UnitText value='1' />);
    const { instance } = component.root;
    instance.setValue('34');
    expect(instance.state.value).toEqual('34');
  });
});

