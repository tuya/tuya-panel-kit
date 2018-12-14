import { Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ModalView from '../modal-view';

describe('ModalView Component', () => {
  it('basic render', () => {
    const component = renderer.create(<ModalView />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should update props', () => {
    const component = renderer.create(<ModalView transparent />);
    component.update(<ModalView alignContainer='top' />);
    const { instance } = component.root;
    expect(instance.state.alignContainer).toEqual('top');
  });
  it('should set style', () => {
    const component = renderer.create(<ModalView />);
    const { instance } = component.root;
    instance.setModalStyle('top');
    expect(instance.state.alignContainer).toEqual('top');

    instance.setModalStyle('xxx');
    expect(instance.state.alignContainer).toEqual('xxx');
  });
  it('should set panresponder', () => {
    const component = renderer.create(<ModalView />);
    const { instance } = component.root;
    expect(instance._panResponder.panHandlers.onStartShouldSetResponder()).toBe(true);
    expect(instance._panResponder.panHandlers.onMoveShouldSetResponder()).toBe(false);
  });
  it('should close', () => {
    const component = renderer.create(<ModalView />);
    const { instance } = component.root;
    component.update(<ModalView visible={true} />);
    expect(instance.state.visible).toBe(true);
    instance.closeModalView();
    expect(instance.state.visible).toBe(false);
  });
  it('should custom close', () => {
    const fn = jest.fn();
    const component = renderer.create(<ModalView visible={true} onRequestClose={fn} />);
    const { instance } = component.root;
    instance.closeModalView();
    expect(instance.props.onRequestClose).toHaveBeenCalled();
  });
  it('should update child', () => {
    const fn = jest.fn();
    const component = renderer.create(
      <ModalView visible={true} onRequestClose={fn}>
        <Text>123</Text>
      </ModalView>
    );
    const { instance } = component.root;
    instance.updateChild({ style: { color: '#fff' } });
    expect(instance.state.contentNode).toEqual(<Text style={{ color: '#fff' }}>123</Text>);
  });
});

