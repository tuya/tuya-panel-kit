import { Dimensions, Platform, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('window');
const baseHeight = 667;
const baseWidth = 375;
const baseX = Math.sqrt(baseHeight * baseHeight + baseWidth * baseWidth);
const x = Math.sqrt(height * height + width * width);
const statusHeight = StatusBar.currentHeight || 0;
export const isIos = Platform.OS === 'ios';
export const isIphoneX = isIos && height >= 812;
export const HRatio = width / baseWidth;
export const VRatio = height / baseHeight;
export const winWidth = width;
export const winHeight = height;
export const viewWidth = width;
export const viewHeight =
  height - (isIos ? (isIphoneX ? 88 : 64) : 56 + statusHeight);
let finalRatio = x / baseX;
if (baseWidth === width && finalRatio > 1) {
  finalRatio = 1;
}
export const ratio = finalRatio;
export const convertX = width => width * HRatio;
export const convertY = height => height * VRatio;
export const convert = number => number * ratio;

export const topBarHeight = isIos ? (height >= 812 ? 88 : 64) : 56;
export const statusBarHeight = isIos ? (height >= 812 ? 44 : 20) : statusHeight;

export const isSmallW = width < 375;
export const isSmallH = height < 667;

export default {
  hRatio: HRatio,
  vRatio: VRatio,
  width: winWidth,
  height: winHeight,
  viewWidth: width,
  ratio,
  viewHeight,
  convertX,
  convertY,
  convert,
  isIos,
  isIphoneX,
  iPhoneX: isIphoneX,
  topBarHeight,
  isSmallW,
  isSmallH,
  statusBarHeight,
};
