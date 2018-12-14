import { View } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Swipeout from '../index';


describe('Swipeout Component', () => {
  it('basic render', () => {
    const component = renderer.create(<Swipeout backgroundColor='#fff'><View /></Swipeout>).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should update props', () => {
    const fn = jest.fn();
    const component = renderer.create(<Swipeout backgroundColor='#fff'><View /></Swipeout>);
    const { instance } = component.root;
    instance.onHide = fn;
    component.update(<Swipeout close><View /></Swipeout>)
    expect(instance.onHide).toHaveBeenCalled();
  });
  it('should auto close', () => {
    const rightArr = [{
      text: 'delete',
      type: 'delete',
      fontStyle: { color: '#fff', fontSize: 16 },
      onPress: jest.fn(),
    }];
    const fn = jest.fn();
    const component = renderer.create(<Swipeout autoClose right={rightArr}><View /></Swipeout>);
    const { instance } = component.root;
    instance.onHide = fn;
    instance.autoClose(rightArr[0]);
    expect(instance.onHide).toHaveBeenCalled();
    expect(rightArr[0].onPress).toHaveBeenCalled();
  });
  it('should gesture left respond properly', async () => {
    const leftArr = [{
      text: 'action',
      type: 'primary',
      fontStyle: { color: '#fff', fontSize: 16 },
      backgroundColor: 'blue',
      onPress: jest.fn(),
      color: '#fff',
      fontSize: 16,
    }];
    const fn = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Swipeout
        autoClose={true}
        left={leftArr}
        onOpen={fn}
        onClose={fn}
        scroll={() => {}}
      >
        <View />
      </Swipeout>
    );
    const { instance } = component.root;

    instance.onLayout({ nativeEvent: { layout: { width: 300, height: 44 } } });
    expect(instance.state.contentWidth).toBe(300);

    instance.swipeoutContent.measure = jest.fn(() => { instance.grantMeasureCallback(0, 0, 300) });
    instance.handlePanResponderGrant();
    expect(instance.props.onOpen).toHaveBeenCalled();
    expect(instance.state.swiping).toBe(true);

    instance.handlePanResponderMove('e', { dx: 20, dy: 0 });
    expect(instance.state.contentDot._value).toBe(20);

    instance.handlePanResponderMove('e', { dx: 0, dy: 20 });

    instance.handlePanResponderEnd('e', { dx: 50, dy: 0 });
    jest.runAllTimers();
    expect(instance.state.contentDot._value).toBe(60);
    expect(instance.state.swiping).toBe(false);
    expect(instance.state.openedLeft).toBe(true);

    instance.handlePanResponderGrant();
    instance.handlePanResponderMove('e', { dx: -20, dy: 0 });
    instance.handlePanResponderEnd('e', { dx: -50, dy: 0 });
    jest.runAllTimers();
    expect(instance.state.contentDot._value).toBe(0);
    expect(instance.props.onClose).toHaveBeenCalled();
  });

  it('should gesture right respond properly', async () => {
    const rightArr = [{
      text: 'delete',
      type: 'delete',
      fontStyle: { color: '#fff', fontSize: 16 },
      onPress: jest.fn(),
    }, {
      text: 'secondary',
      type: 'secondary',
      fontStyle: { color: '#fff', fontSize: 16 },
      onPress: jest.fn(),
    }];
    const fn = jest.fn();
    jest.useFakeTimers();
    const component = renderer.create(
      <Swipeout
        autoClose={true}
        right={rightArr}
        onOpen={fn}
        onClose={fn}
        scroll={() => {}}
      >
        <View />
      </Swipeout>
    );
    const { instance } = component.root;

    instance.swipeoutContent.measure = jest.fn(() => { instance.grantMeasureCallback(0, 0, 300) });
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

