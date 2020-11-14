import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import Modal from '../index';

describe('Modal Component', () => {
  it('basic render', () => {
    const component = renderer.create(<Modal visible={false} onMaskPress={jest.fn()} />);
    expect(component).toMatchSnapshot();
    component.update(<Modal visible={true} onMaskPress={jest.fn()} />);
    component.unmount();
    expect(component).toMatchSnapshot();
  });

  it('render with visible', () => {
    const component = renderer.create(<Modal visible={true} onMaskPress={jest.fn()} />);
    expect(component).toMatchSnapshot();
    component.update(<Modal visible={false} onMaskPress={jest.fn()} />);
    component.unmount();
    expect(component).toMatchSnapshot();
  });

  it('render with visible no changed', () => {
    const component = renderer.create(<Modal visible={true} onMaskPress={jest.fn()} />);
    expect(component).toMatchSnapshot();
    component.update(<Modal visible={true} onMaskPress={jest.fn()} />);
    component.unmount();
    expect(component).toMatchSnapshot();
  });

  it('render with modal.render', () => {
    const component = renderer.create(
      Modal.render(
        <View>
          <Text style={{ color: '#333', textAlign: 'center', backgroundColor: '#fff' }}>
            {'tuya'}
          </Text>
          <TouchableOpacity
            onPress={jest.fn()}
            style={{ height: 44, backgroundColor: '#fff', justifyContent: 'center', marginTop: 20 }}
          >
            <Text style={{ color: '#333', textAlign: 'center', backgroundColor: '#fff' }}>
              {'changeText'}
            </Text>
          </TouchableOpacity>
        </View>
      )
    );
    expect(component).toMatchSnapshot();
  });

  it('render with modal.close', () => {
    const component = renderer.create(Modal.close());
    expect(component).toMatchSnapshot();
  });
});
