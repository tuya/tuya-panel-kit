import React from 'react';
import { View, Modal, Platform } from 'react-native';
import { shallow, mount } from 'enzyme';
import 'react-native/Libraries/Animated/src/bezier';
import TYModal from '../TYModal';

function setup() {
  const props = {
    mask: true,
    useKeyboardView: false,
  };
  const wrapper = shallow(
    <TYModal {...props}>
      <View />
      <View />
    </TYModal>
  );
  const instance = wrapper.instance();
  return { wrapper, instance };
}

describe('TYModal Component', () => {
  it('renders correctly', () => {
    Platform.OS = 'ios';
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    const secondView = wrapper
      .findWhere(c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true)
      .last();
    secondView.simulate('startShouldSetResponder');
    wrapper.setProps({ mask: false });
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly with useKeyboardView', () => {
    const wrapper = shallow(
      <TYModal mask={true} useKeyboardView={true}>
        <View />
        <View />
      </TYModal>
    );
    expect(wrapper).toMatchSnapshot();
    const firstView = wrapper
      .findWhere(c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true)
      .first();
    firstView.simulate('startShouldSetResponder');
  });
  it('call _handleMaskPress method', () => {
    const { wrapper } = setup();
    const modal = wrapper.find(Modal);
    modal.simulate('requestClose');
  });
});
