import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import TopBarMallIndicator from '../index';

jest.mock('UIManager', () => {
  return {
    getViewManagerConfig: jest.fn(),
  };
});

jest.mock('react-native-gesture-handler', () => {
  return {
    BaseButton: () => 'BaseButton',
  };
});

jest.mock('NativeEventEmitter', () => {
  return class {
    addListener = jest.fn();
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('Dimensions', () => {
  return {
    get: jest.fn(() => {
      return {
        width: 375,
        height: 812,
      };
    }),
  };
});

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => {
  const actualNav = jest.requireActual('@react-navigation/core');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('TopBarMallIndicator Component', () => {
  it('basic render', () => {
    const component = renderer.create(<TopBarMallIndicator title="Home" />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
