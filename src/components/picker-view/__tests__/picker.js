import { requireNativeComponent, Picker } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PickerIos from '../index.ios';
import PickerAndroid from '../index.android';

describe('Picker Component', () => {
  it('basic render', () => {
    const ios = renderer.create(<PickerIos />).toJSON();
    expect(ios).toMatchSnapshot();

    const android = renderer.create(<PickerAndroid />).toJSON();
    expect(android).toMatchSnapshot();
  });
  it('should picker ios value change', () => {
    const fn = jest.fn();
    const component = renderer.create(
      <PickerIos>
        <PickerIos.Item label="Java" value="java" />
        <PickerIos.Item label="JavaScript" value="js" />
      </PickerIos>
    );
    const { instance } = component.root;
    instance.onValueChange('java');

    component.update(
      <PickerIos selectedValue='js' onValueChange={fn}>
        <PickerIos.Item label="Java" value="java" />
        <PickerIos.Item label="JavaScript" value="js" />
      </PickerIos>
    );
    expect(instance.state.selectedValue).toBe('js');

    instance.onValueChange('java');
    expect(instance.state.selectedValue).toBe('java');
    expect(instance.props.onValueChange).toHaveBeenCalled();

  });
  it('should picker android value change', () => {
    let mockRef = undefined;
    const fn = jest.fn();
    const component = renderer.create(
      <PickerAndroid>
        <PickerAndroid.Item label="Java" value="java" />
        <PickerAndroid.Item label="JavaScript" value="js" />
      </PickerAndroid>
    );
    const { instance } = component.root;
    instance._onChange({ nativeEvent: { newIndex: 0 } });

    component.update(
      <PickerAndroid selectedValue='js' onValueChange={fn} ref={ref => { mockRef = ref; }}>
        <PickerAndroid.Item label="Java" value="java" />
        <PickerAndroid.Item label="JavaScript" value="js" />
      </PickerAndroid>
    );
    expect(instance.state.selectedIndex).toBe(1);

    instance._picker = mockRef;
    instance._picker.setNativeProps = fn;
    instance._onChange({ nativeEvent: { newIndex: 0 } });
    expect(instance._picker.setNativeProps).toHaveBeenCalled();

  });
  it('should picker android item render', () => {
    const component = renderer.create(<PickerAndroid.Item label="Java" value="java" />).toJSON();
    expect(component).toMatchSnapshot();
  });
});

