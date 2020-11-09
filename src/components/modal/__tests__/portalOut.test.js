import React from 'react';
import { Platform } from 'react-native';
import { shallow } from 'enzyme';
import { TYSdk } from '@tuya-rn/tuya-native-kit';
import PortalOut from '../portalOut';
import TYModal from '../TYModal';

const TYEvent = TYSdk.event;

function setup() {
  const props = {
    onShow: jest.fn(),
    onHide: jest.fn(),
    onDismiss: jest.fn(),
  };
  const wrapper = shallow(<PortalOut {...props} />);
  const instance = wrapper.instance();
  instance.node = {
    test_uuid: {
      props: {
        onShow: jest.fn(),
        onHide: jest.fn(),
        onDismiss: jest.fn(),
      },
    },
  };
  return { props, wrapper, instance };
}

describe('PortalOut Component', () => {
  it('render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
    expect(wrapper).toMatchSnapshot();
  });
  it('Emit registerPortal', () => {
    const { instance } = setup();
    TYEvent.emit = jest.fn(config => {
      instance.register(config);
    });
    TYEvent.emit({ uuid: 'qwer', isUpdate: true });
  });
  it('Emit showPortal', () => {
    jest.useFakeTimers();
    const { instance } = setup();
    TYEvent.emit = jest.fn((config, isDismiss = false) => {
      instance.show(config, isDismiss);
    });
    Platform.OS = 'android';
    TYEvent.emit({ uuid: '' });
    TYEvent.emit({ uuid: 'test_uuid', show: true });
    TYEvent.emit({ uuid: 'test_uuid', show: false }, true);
    TYEvent.emit({ uuid: 'test_uuid', show: false }, false);
    jest.runAllTimers();
  });
  it('Emit removePortal', () => {
    const { instance } = setup();
    TYEvent.emit = jest.fn(uuid => {
      instance.remove(uuid);
    });
    TYEvent.emit('_test_uuid_');
    TYEvent.emit('test_uuid');
  });
  it('Emit removePortal with uuid', () => {
    const { instance } = setup();
    TYEvent.emit = jest.fn(uuid => {
      instance.remove(uuid);
    });
    instance.setState({ uuidList: ['test_uuid'] });
    TYEvent.emit('test_uuid');
  });
  it('TYModal onDismiss', () => {
    const { wrapper } = setup();
    const tYModal = wrapper.find(TYModal);
    const eventObject = {};
    tYModal.simulate('dismiss', eventObject);
  });
});
