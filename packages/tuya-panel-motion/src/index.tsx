import Fade from './fade';
import PullUp from './pull-up';
import ScaleFadeIn from './scale-fade-in';
import ScalePullDown from './scale-pull-down';
import Toast from './toast';
import PushDown from './push-down';
import {
  MotionPullUpProps,
  MotionFadeProps,
  MotionPushDownProps,
  MotionScaleFadeInProps,
  MotionScalePullDownProps,
  MotionToastProps,
} from './interface';

const Motion = {
  Fade,
  PullUp,
  ScaleFadeIn,
  ScalePullDown,
  PushDown,
  Toast,
};

export {
  MotionPullUpProps,
  MotionFadeProps,
  MotionPushDownProps,
  MotionScaleFadeInProps,
  MotionScalePullDownProps,
  MotionToastProps,
};

export default Motion;
