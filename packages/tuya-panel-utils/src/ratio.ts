import { Dimensions, Platform, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('window');
const baseHeight = 667;
const baseWidth = 375;
const baseX = Math.sqrt(baseHeight * baseHeight + baseWidth * baseWidth);
const x = Math.sqrt(height * height + width * width);
const statusHeight = StatusBar.currentHeight || 0;
export const isIos = Platform.OS === 'ios';
export const isWeb = Platform.OS === 'web';
export const isIphoneX = isIos && height >= 812;
export const HRatio = width / baseWidth;
export const VRatio = height / baseHeight;
export const winWidth = width;
export const winHeight = height;
export const viewWidth = width;
export const viewHeight = height - (isIos ? (isIphoneX ? 88 : 64) : 56 + statusHeight);
let finalRatio = x / baseX;
if (baseWidth === width && finalRatio > 1) {
  finalRatio = 1;
}
export const ratio = finalRatio;
export const convertX: (width: number) => number = (width: number) =>
  isWeb ? width : width * HRatio;
export const convertY: (height: number) => number = (height: number) =>
  isWeb ? height : height * VRatio;
export const convert: (number: number) => number = (number: number) =>
  isWeb ? number : number * ratio;
export const topBarHeight = isIos ? (isIphoneX ? 88 : 64) : 56;
export const statusBarHeight = isIos ? (isIphoneX ? 44 : 20) : statusHeight;

export const isSmallW = width < 375;
export const isSmallH = height < 667;

const getDimension = () => {
  if (isWeb) {
    try {
      return Dimensions.get('osWindow');
    } catch (error) {
      return Dimensions.get('window');
    }
  }
  return Dimensions.get('window');
};

/**
 * 安卓或 Web 环境下，屏幕宽度等参数是动态的;
 */
export default {
  get hRatio(): number {
    const { width: actualWidth } = getDimension();
    return actualWidth / baseWidth;
  },
  get vRatio(): number {
    const { height: actualHeight } = getDimension();
    return actualHeight / baseHeight;
  },
  get ratio(): number {
    const actualX = Math.sqrt(height * height + width * width);
    const { width: actualWidth } = getDimension();
    let actualRatio = actualX / baseX;
    if (baseWidth === actualWidth && actualRatio > 1) {
      actualRatio = 1;
    }
    return actualRatio;
  },
  get width(): number {
    return getDimension().width;
  },
  get height(): number {
    return getDimension().height;
  },
  get winWidth(): number {
    return getDimension().width;
  },
  get winHeight(): number {
    return getDimension().height;
  },
  get viewWidth(): number {
    return getDimension().width;
  },
  get viewHeight(): number {
    return getDimension().height - (isIos ? (isIphoneX ? 88 : 64) : 56 + statusHeight);
  },
  convertX: (number: number): number => {
    const { width: actualWidth } = getDimension();
    const hRatio = actualWidth / baseWidth;
    return number * hRatio;
  },
  convertY: (number: number): number => {
    const { height: actualHeight } = getDimension();
    const vRatio = actualHeight / baseHeight;
    return number * vRatio;
  },
  convert: (number: number): number => {
    const actualX = Math.sqrt(height * height + width * width);
    const { width: actualWidth } = getDimension();
    let actualRatio = actualX / baseX;
    if (baseWidth === actualWidth && actualRatio > 1) {
      actualRatio = 1;
    }
    return number * actualRatio;
  },
  get isSmallW(): boolean {
    return getDimension().width < 375;
  },
  get isSmallH(): boolean {
    return getDimension().height < 667;
  },
  isIos,
  isIphoneX,
  iPhoneX: isIphoneX,
  topBarHeight,
  statusBarHeight,
};
