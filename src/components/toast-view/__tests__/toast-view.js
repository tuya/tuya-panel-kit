import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ToastView from '../index';

describe('ToastView Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(<ToastView show={true} text="I'm Iron man" onFinish={jest.fn()} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should render invisible', () => {
    const component = renderer
      .create(<ToastView show={false} onFinish={jest.fn()} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should render position right', () => {
    const commonProps = {
      text: "I'm Iron man",
      show: true,
      onFinish: jest.fn(),
    };
    const top = renderer
      .create(<ToastView {...commonProps} showPosition="top" />)
      .toJSON();
    const bottom = renderer
      .create(<ToastView {...commonProps} showPosition="bottom" />)
      .toJSON();
    const center = renderer
      .create(<ToastView {...commonProps} showPosition="center" />)
      .toJSON();
    expect(top).toMatchSnapshot();
    expect(bottom).toMatchSnapshot();
    expect(center).toMatchSnapshot();
  });

  it('should called onFinish after show', () => {
    jest.useFakeTimers();
    const onFinish = jest.fn();
    const commonProps = {
      text: "I'm Iron man",
      onFinish,
    };
    const component = renderer.create(<ToastView show={false} {...commonProps} />)
    component.update(<ToastView show={true} {...commonProps} />);
    jest.runAllTimers();
    expect(onFinish).toHaveBeenCalled();
  });

  it('should update state correctly', () => {
    const commonProps = {
      key: "some-key",
      text: "I'm Iron man",
      show: true,
      onFinish: jest.fn(),
    };
    const component = renderer.create(<ToastView {...commonProps} />);
    const instance = component.getInstance(); 
    jest.useFakeTimers();
    component.update(<ToastView {...commonProps} show={false} />);
    jest.runAllTimers();
    expect(instance.state.show).toBe(false);
    expect(instance.state.text).toBe("I'm Iron man");
    expect(instance.state.fadeValue._value).toBe(0);
    component.update(<ToastView {...commonProps} text="I'm Spider man" />);
    jest.runAllTimers();
    expect(instance.state.show).toBe(true);
    expect(instance.state.text).toBe("I'm Spider man");
    expect(instance.state.fadeValue._value).toBe(1);
  });

  it('should trigger function correctly', () => {
    const commonProps = {
      key: "some-key",
      text: "I'm Iron man",
      show: true,
      onFinish: jest.fn(),
    };
    const component = renderer.create(<ToastView {...commonProps} />);
    const instance = component.getInstance();
    instance.startShowAnimation = jest.fn();
    instance.startHideAnimation = jest.fn();
    component.update(<ToastView {...commonProps} show={false} />);
    expect(instance.startHideAnimation).toHaveBeenCalled();
    component.update(<ToastView {...commonProps} text="I'm Spider man" />);
    expect(instance.startShowAnimation).toHaveBeenCalled();
    component.unmount();
    expect(instance.startHideAnimation).toHaveBeenCalled();
  });
});
