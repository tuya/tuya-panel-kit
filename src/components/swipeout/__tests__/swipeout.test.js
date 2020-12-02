import { View } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Swipeout from '../index';

describe('Swipeout Component', () => {
  it('onPress', () => {
    const rightArr = [
      {
        text: 'delete',
        type: 'delete',
        fontStyle: { color: '#fff', fontSize: 16 },
        onPress: jest.fn(),
      },
    ];
    const leftArr = [
      {
        text: 'action',
        type: 'action',
        fontStyle: { color: '#fff', fontSize: 16 },
        backgroundColor: 'blue',
        onPress: jest.fn(),
        color: '#fff',
        fontSize: 16,
      },
    ];
    const wrapper = shallow(
      <Swipeout backgroundColor="#fff" right={rightArr} left={leftArr} disabled={true} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({ contentDotNum: -1, swiping: false });
    wrapper.instance().handlePanResponderGrant();
    wrapper.instance().handlePanResponderMove();
    wrapper.instance().handlePanResponderEnd();
    const target = wrapper.findWhere(c => !!c.prop('onPress'));
    target.simulate('press');
    const node = wrapper.findWhere(c => !!c.prop('onStartShouldSetResponder'));
    node.simulate('startShouldSetResponder');
    node.simulate('responderTerminationRequest');
    node.simulate('shouldBlockNativeResponder');
    node.simulate('startShouldSetResponderCapture', {
      nativeEvent: { touches: [] },
      touchHistory: {},
    });
    node.simulate('moveShouldSetResponderCapture', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    const wrapper1 = shallow(
      <Swipeout backgroundColor="#fff" right={rightArr} left={leftArr} disabled={false} />
    );
  });
  it('basic render', () => {
    const component = renderer
      .create(
        <Swipeout backgroundColor="#fff" disabled={true}>
          <View />
        </Swipeout>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should update props', () => {
    const fn = jest.fn();
    const component = renderer.create(
      <Swipeout backgroundColor="#fff" disabled={true}>
        <View />
      </Swipeout>
    );
    const { instance } = component.root;
    instance.onHide = fn;
    component.update(
      <Swipeout close={true}>
        <View />
      </Swipeout>
    );
    expect(instance.onHide).toHaveBeenCalled();
  });
  it('should auto close', () => {
    const rightArr = [
      {
        text: 'delete',
        type: 'delete',
        fontStyle: { color: '#fff', fontSize: 16 },
        onPress: jest.fn(),
      },
    ];
    const fn = jest.fn();
    const component = renderer.create(
      <Swipeout autoClose={true} right={rightArr}>
        <View />
      </Swipeout>
    );
    const { instance } = component.root;
    instance.onHide = fn;
    instance.autoClose(rightArr[0]);
    expect(instance.onHide).toHaveBeenCalled();
    expect(rightArr[0].onPress).toHaveBeenCalled();
  });
  it('should gesture left respond properly', async () => {
    const leftArr = [
      {
        text: 123,
        type: 'primary',
        fontStyle: { color: '#fff', fontSize: 16 },
        backgroundColor: 'blue',
        onPress: jest.fn(),
        color: '#fff',
        fontSize: 16,
      },
    ];
    const fn = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Swipeout autoClose={true} left={leftArr} onOpen={fn} onClose={fn} scroll={() => {}}>
        <View />
      </Swipeout>
    );
    const { instance } = component.root;

    instance.onLayout({ nativeEvent: { layout: { width: 300, height: 44 } } });
    expect(instance.state.contentWidth).toBe(300);

    instance.swipeoutContent.measure = jest.fn(() => {
      instance.grantMeasureCallback(0, 0, 300);
    });
    instance.handlePanResponderGrant();
    expect(instance.props.onOpen).toHaveBeenCalled();
    expect(instance.state.swiping).toBe(true);

    instance.handlePanResponderMove('e', { dx: 10, dy: 20 });
    instance.setState({ swiping: false, openedLeft: true, contentDotNum: 10 });
    instance.handlePanResponderMove('e', { dx: 20, dy: 0 });

    instance.handlePanResponderEnd('e', { dx: 50, dy: 0 });
    jest.runAllTimers();
    expect(instance.state.contentDot._value).toBe(10);
    expect(instance.state.swiping).toBe(false);
    expect(instance.state.openedLeft).toBe(true);

    instance.handlePanResponderGrant();
    instance.handlePanResponderMove('e', { dx: -20, dy: 0 });
    instance.setState({ contentDotNum: 10 });
    instance.handlePanResponderEnd('e', { dx: 10, dy: 0 });
    jest.runAllTimers();
    expect(instance.state.contentDot._value).toBe(60);
    expect(instance.props.onClose).toHaveBeenCalled();
  });

  it('should gesture right respond properly', async () => {
    const rightArr = [
      {
        text: 'delete',
        type: 'delete',
        fontStyle: { color: '#fff', fontSize: 16 },
        onPress: jest.fn(),
      },
      {
        text: 'secondary',
        type: 'secondary',
        fontStyle: { color: '#fff', fontSize: 16 },
        onPress: jest.fn(),
      },
    ];
    const fn = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Swipeout autoClose={true} right={rightArr} onOpen={fn} onClose={fn} scroll={() => {}}>
        <View />
      </Swipeout>
    );
    const { instance } = component.root;

    instance.swipeoutContent.measure = jest.fn(() => {
      instance.grantMeasureCallback(0, 0, 300);
    });
    instance.handlePanResponderGrant();

    instance.handlePanResponderMove('e', { dx: -20, dy: 0 });
    expect(instance.state.contentDot._value).toBe(-20);

    instance.handlePanResponderEnd('e', { dx: -100, dy: 0 });
    jest.runAllTimers();
    expect(instance.state.contentDot._value).toBe(-120);

    instance.handlePanResponderGrant();
    instance.handlePanResponderMove('e', { dx: -20, dy: 0 });
    instance.handlePanResponderEnd('e', { dx: 100, dy: 0 });
    jest.runAllTimers();
    expect(instance.state.contentDot._value).toBe(0);
    expect(instance.props.onClose).toHaveBeenCalled();
  });
});
