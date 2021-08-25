import { NativeModules, UIManager, StyleSheet, Dimensions } from 'react-native';
import 'react-native-mock-render/mock';
import 'react-native/Libraries/Animated/src/bezier'; // for https://github.com/facebook/jest/issues/4710
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'react-native-gesture-handler';
import { Utils } from 'tuya-panel-utils';

const { winWidth, winHeight } = Utils.RatioUtils;

NativeModules.TYRCTPublicModule = {};
NativeModules.TYRCTDeviceModule = {};
NativeModules.TYRCTPublicManager = {};
NativeModules.TYRCTPanelManager = {};
NativeModules.RNGestureHandlerModule = {
  Direction: {},
};
UIManager.getViewManagerConfig = () => {};
StyleSheet.compose = () => {};
Dimensions.get = () => ({
  width: winWidth,
  height: winHeight,
});

jest.mock('react-native-gesture-handler', () => {
  return {
    BaseButton: () => 'BaseButton',
  };
});

// jest.mock('Dimensions', () => {
//   return Dimensions;
// });

Enzyme.configure({ adapter: new Adapter() });
