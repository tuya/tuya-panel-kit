import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Notification from '../index';
import { StyledNotificationContent } from '../styled';

// Shallow with New React Context API. Consumer not getting context: https://github.com/enzymejs/enzyme/issues/1636
jest.mock('../../../utils/theme', () => ({
  ThemeProvider: require.requireActual('../../../utils/theme').ThemeProvider,
  ThemeConsumer: props => props.children({ theme: { color: 'red' } }),
}));

describe('Notification Component', () => {
  jest.useFakeTimers();
  it('onLayout', () => {
    const wrapper = shallow(
      <Notification enableClose={false} show={true} theme={{ color: 'red' }} />
    );
    jest.runOnlyPendingTimers();
    // expect(wrapper).toMatchSnapshot();
    const target = wrapper.find('ThemeConsumer').dive().find(StyledNotificationContent);
    target.simulate('layout', { nativeEvent: { layout: { height: 44 } } });
  });
  it('componentWillReceiveProps(nextProps)', () => {
    const wrapper = shallow(
      <Notification enableClose={false} show={false} theme={{ color: 'red' }} />
    );
    jest.runOnlyPendingTimers();
    wrapper.setProps({ show: true });
  });
  it('basic render', () => {
    const component = renderer
      .create(
        Notification.show({
          message: '警告提示框',
          onClose: () => {
            Notification.hide();
          },
          theme: {
            successIcon: 'red',
            errorIcon: 'yellow',
            warningIcon: 'black',
          },
        })
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('render width update', () => {
    const component = renderer.create(
      Notification.show({
        message: '警告提示框',
        style: { width: 240, height: 36, borderRadius: 18 },
        enableClose: false,
        autoCloseTime: 1500,
        onPress: jest.fn(),
        theme: {
          iconColor: '#00f',
        },
      })
    );
    expect(component).toMatchSnapshot();
    component.update(Notification.hide());
    expect(component).toMatchSnapshot();
  });
});

describe('Notification', () => {
  it('basic render', () => {
    jest.useFakeTimers();
    const component = renderer.create(<Notification show={true} enableClose={false} />);
    jest.runOnlyPendingTimers();
    // expect(component).toMatchSnapshot();
    component.update(<Notification show={false} />);
    // expect(component).toMatchSnapshot();
  });

  it('basic render width enableClose', () => {
    const onClose = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Notification show={false} enableClose={false} autoCloseTime={1200} onClose={onClose} />
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Notification show={true} enableClose={false} autoCloseTime={1200} onClose={onClose} />
    );
    jest.runAllTimers();
    expect(onClose).toHaveBeenCalled();
    component.unmount();
    expect(component).toMatchSnapshot();
  });
});
