declare module 'tuya-panel-kit' {
  import { StyleProp, ViewStyle, TextStyle, TextProps, TouchableOpacityProps } from 'react-native';

  // Button
  export interface ButtonProps {
    stretch?: boolean;
    disabled?: boolean;
    size?: 'large' | 'normal' | 'small' | 'noSet' | number;
    type?: 'primary' | 'normal';
    background?: string | { x1?: string; x2?: string; y1?: string; y2?: string; stops?: {} };
    text?: string;
    textSingleLine?: boolean;
    textDirection?: 'left' | 'top' | 'right' | 'bottom' | 'center';
    icon?: string;
    iconPath?: string;
    iconSize?: number;
    iconColor?: string;
    image?: string;
    imageColor?: string;
    imageStyle?: StyleProp<ViewStyle>;
    badgeText?: string;
    disabledOpacity?: number;
    style?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;
    border?: string | boolean | number;
    textStyle?: StyleProp<ViewStyle>;
    badgeStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    onLayout?: () => void;
    useART?: boolean;
    theme?: {
      fontSize?: number;
      fontColor?: string;
      iconSize?: number;
      bgWidth?: number;
      bgHeight?: number;
      bgColor?: string;
    };
  }

  export class Button extends React.Component<ButtonProps> {}

  export interface BrickButtonProps {
    style?: StyleProp<ViewStyle>;
    onPress?: (...args: any) => void;
    onChange?: (eventName: string, ...args: any) => void;
    loading?: boolean;
    text?: string;
    textStyle?: StyleProp<ViewStyle>;
    type?: 'primary' | 'primaryGradient' | 'primaryBorder' | 'normal' | 'small';
    wrapperStyle?: StyleProp<ViewStyle>;
    backgroundColorTouched?: string;
    disabled?: true;
    underlayColor?: string;
    activeOpacity?: number;
    showUnderlay?: boolean;
    loadingColor?: string;
    loadingBackground?: string;
    loadingSize?: 'small' | 'large' | number;
    loadingStyle?: StyleProp<ViewStyle>;
    loadingStrokeWidth?: number;
    background?: { x1?: string; x2?: string; y1?: string; y2?: string; stops?: {} };
  }

  export class BrickButton extends React.Component<BrickButtonProps> {}

  // Carousel
  export interface CarouselProps {
    style?: StyleProp<ViewStyle>;
    loop?: boolean;
    bounces?: boolean;
    hasDots?: boolean;
    autoplay?: boolean;
    autoplayInterval?: number;
    selectedIndex?: number;
    dots?: React.ElementType<any> | Function;
    dotStyle?: StyleProp<ViewStyle>;
    dotActiveStyle?: StyleProp<ViewStyle>;
    pageStyle?: StyleProp<ViewStyle>;
    useViewPagerOnAndroid?: boolean;
    carouselChange?: (index: number) => void;
  }

  export class Carousel extends React.Component<CarouselProps> {}

  // Checkout
  export interface CheckoutProps {
    style?: StyleProp<ViewStyle>;
    size?: number;
    disabled?: boolean;
    disabledColor?: string;
    checked?: boolean;
    checkedIcon?: string;
    unCheckedIcon?: string;
    reverse?: boolean;
    hideOnUnselect?: boolean;
    color?: string;
    onChange?: (checked: boolean) => void;
    children?: any;
  }

  export class Checkout extends React.Component<CheckoutProps> {}

  // CircleView

  export interface CircleViewProps {
    style?: StyleProp<ViewStyle>;
    children?: any;
    color?: string;
    borderColor?: string;
    borderWidth?: number;
    radius: number;
  }

  export class CircleView extends React.Component<CircleViewProps> {}

  // Collapsible
  export interface CollapsibleProps {
    style?: StyleProp<ViewStyle>;
    children?: any;
    align?: 'top' | 'center' | 'bottom';
    collapsed?: boolean;
    collapsedHeight?: number;
    duration?: number;
    easing?: string | Function;
    onChange?: () => void;
  }

  export class Collapsible extends React.Component<CollapsibleProps> {}

  // ControllerBar
  export interface ControllerBarProps {
    style?: StyleProp<ViewStyle>;
    type?: 'primary' | 'normal';
    size?: 'large' | 'normal' | 'small' | number;
    stretch?: boolean;
    backgroundType?: 'alpha' | 'pure';
    backgroundColor?: string;
    hasBottomBorder?: boolean;
    button: ControlButtonProps[];
    wrapperStyle?: StyleProp<ViewStyle>;
  }

  interface ControlButtonProps extends ButtonProps {
    key?: string;
    text: string;
    type: 'primary' | 'normal';
    disabled?: boolean;
    onPress?: () => void;
  }

  interface BarGroupProps {
    type?: 'primary' | 'normal';
    size?: 'large' | 'normal' | 'small' | number;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;
  }

  export class ControllerBar extends React.Component<ControllerBarProps> {
    static Group: React.ElementType<BarGroupProps>;
  }
  // DatePicker
  export interface DatePickerProps {
    locale?: string | {};
    mode?: string;
    loop?: boolean;
    use12Hours?: boolean;
    isPlusZero?: boolean;
    minDate?: Date;
    maxDate?: Date;
    onDateChange?: (value?: Date) => void;
    onValueChange?: (value?: Date, index?: number) => void;
    isAmpmFirst?: boolean;
    isTimeFirst?: boolean;
    date?: Date;
    defaultDate?: Date;
    style?: StyleProp<ViewStyle>;
    pickerFontColor?: string;
  }

  export class DatePicker extends React.Component<DatePickerProps> {}

  // Dialog
  export interface DialogProps {
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    titleNumberOfLines?: number;
    title: string;
    titleStyle?: StyleProp<ViewStyle>;
    subTitle?: string;
    subTitleStyle?: StyleProp<ViewStyle>;
  }

  interface DialogAlertProps extends DialogProps {
    footerWrapperStyle?: StyleProp<ViewStyle>;
    confirmText: string;
    confirmTextStyle?: StyleProp<ViewStyle>;
    onConfirm?: () => void;
  }

  interface DialogCheckboxProps extends DialogProps {
    type?: 'radio' | 'switch';
    value: string | number | undefined;
    maxItemNum?: number;
    dataSource: DialogCheckbox[];
    onChange?: (value: string | number) => void;
    headerStyle?: StyleProp<ViewStyle>;
    cancelText: string;
    cancelTextStyle?: StyleProp<ViewStyle>;
    onCancel?: () => void;
    footerWrapperStyle?: StyleProp<ViewStyle>;
    confirmText: string;
    confirmTextStyle?: StyleProp<ViewStyle>;
    onConfirm?: (value: string | number) => void;
  }
  interface DialogCheckbox {
    value?: string | number;
    title?: string;
  }

  interface DialogConfirmProps extends DialogProps {
    cancelText: string;
    cancelTextStyle?: StyleProp<ViewStyle>;
    onCancel?: () => void;
    footerWrapperStyle?: StyleProp<ViewStyle>;
    confirmText: string;
    confirmTextStyle?: StyleProp<ViewStyle>;
    onConfirm?: () => void;
  }

  interface DialogListProps extends DialogProps {
    maxItemNum?: number;
    dataSource: DialogList[];
    listStyle?: StyleProp<ViewStyle>;
  }

  interface DialogList {
    title: string;
  }

  interface DialogPromptProps extends DialogProps {
    showHelp?: boolean;
    onHelpPress?: () => void;
    inputWrapperStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    footerWrapperStyle?: StyleProp<ViewStyle>;
    textContentType?: string;
    cancelText: string;
    cancelTextStyle?: StyleProp<ViewStyle>;
    onCancel?: () => void;
    confirmText: string;
    confirmTextStyle?: StyleProp<ViewStyle>;
    onConfirm?: (value: string | number) => void;
  }

  interface DialogCustomProps extends DialogProps {
    content?: any;
    header?: React.ElementType<any> | Function;
    footer?: React.ElementType<any> | Function;
    headerStyle?: StyleProp<ViewStyle>;
    footerWrapperStyle?: StyleProp<ViewStyle>;
    cancelText: string;
    cancelTextStyle?: StyleProp<ViewStyle>;
    onCancel?: () => void;
    confirmText: string;
    confirmTextStyle?: StyleProp<ViewStyle>;
    onConfirm?: () => void;
  }

  export class Dialog extends React.Component<DialogProps> {
    static alert: (option: DialogAlertProps) => void;
    static checkbox: (option: DialogCheckboxProps) => void;
    static confirm: (option: DialogConfirmProps) => void;
    static list: (option: DialogListProps) => void;
    static prompt: (option: DialogPromptProps) => void;
    static custom: (option: DialogCustomProps) => void;
    static close: () => void;
  }

  // Divider
  export interface DividerProps {
    style?: StyleProp<ViewStyle>;
    flexDirection?: 'row' | 'column';
    visible?: boolean;
    color?: string;
    width?: number;
    height?: number;
  }

  export class Divider extends React.Component<DividerProps> {}

  // GlobalToast
  export interface GlobalToastProps {
    text?: string;
    size?: number;
    d?: string | undefined;
    iconfontStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    showPosition?: string;
    color?: string;
  }

  export class GlobalToast extends React.Component<GlobalToastProps> {
    static show: (option: GlobalToastProps) => void;
    static hide: () => void;
  }

  // IconFont
  export interface IconFontProps {
    style?: StyleProp<ViewStyle>;
    viewBox?: string;
    name?: string;
    color?: string;
    size?: number;
    hFlip?: boolean;
    vFlip?: boolean;
    d?: string | undefined;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeJoin?: 'round' | 'miter' | 'bevel';
    strokeCap?: 'round' | 'butt' | 'square';
    strokeDash?: Array<number>;
  }

  export class IconFont extends React.Component<IconFontProps> {}

  // LinearGradient
  export interface LinearGradientProps {
    children?: any;
    gradientId?: string;
    stops?: {};
    style?: StyleProp<ViewStyle>;
    x1?: string;
    x2?: string;
    y1?: string;
    y2?: string;
  }

  export class LinearGradient extends React.Component<LinearGradientProps> {}

  // Modal
  export interface ModalProps {
    animationType?: 'fade' | 'none';
    alignContainer?: 'top' | 'center' | 'bottom';
    onMaskPress?: () => void;
    modalChildStyle?: StyleProp<ViewStyle>;
    mask?: boolean;
    maskStyle?: StyleProp<ViewStyle>;
    onlyLastModalVisible?: boolean;
    visible?: boolean;
    onShow?: () => void;
    onHide?: () => void;
    // 高阶
    titleTextStyle?: StyleProp<ViewStyle>;
    titleWrapperStyle?: StyleProp<ViewStyle>;
    title?: string;
    cancelText?: string;
    confirmText?: string;
    cancelTextStyle?: StyleProp<ViewStyle>;
    confirmTextStyle?: StyleProp<ViewStyle>;
    footerWrapperStyle?: StyleProp<ViewStyle>;
    footer?: React.ElementType<any>;
    onCancel?: () => void;
    onConfirm?: () => void;
  }

  export class Modal extends React.Component<ModalProps> {}

  // Motion

  export interface MotionProps {
    style?: StyleProp<ViewStyle>;
    show?: boolean;
    children?: React.ElementType<any>;
    showDuration?: number;
    hideDuration?: number;
    onShow?: () => void;
    onHide?: () => void;
    animationConfig?: {
      duration?: number;
      delay?: number;
      isInteraction?: boolean;
      useNativeDriver?: boolean;
    };
  }

  interface MotionFadeProps extends MotionProps {
    fadeOpacity?: number;
  }

  interface MotionPullUpProps extends MotionProps {
    dropHeight?: number;
    fadeOpacity?: number;
  }

  interface MotionScaleFadeInProps extends MotionProps {
    initScale?: number;
    finalScale?: number;
    isAlign?: boolean;
    width?: number;
    height?: number;
  }

  interface MotionScalePullDownProps extends MotionProps {
    initScale?: number;
    isAlign?: boolean;
  }

  interface MotionPushDownProps extends MotionProps {
    dropHeight?: number;
    isAlign?: boolean;
  }

  interface MotionToastProps extends MotionProps {
    initScale?: number;
    onFinish?: () => void;
  }

  export class Motion extends React.Component<MotionProps> {
    static Fade: React.ElementType<MotionFadeProps>;
    static PullUp: React.ElementType<MotionPullUpProps>;
    static ScaleFadeIn: React.ElementType<MotionScaleFadeInProps>;
    static ScalePullDown: React.ElementType<MotionScalePullDownProps>;
    static PushDown: React.ElementType<MotionPushDownProps>;
    static Toast: React.ElementType<MotionToastProps>;
  }

  // Notification
  export interface NotificationProps {
    style?: StyleProp<ViewStyle>;
    theme?: {
      background?: string;
      text?: string;
      iconColor?: string;
      successIcon?: string;
      warningIcon?: string;
      errorIcon?: string;
      closeIcon?: string;
      radius?: number;
    };
    show?: boolean;
    icon?: string;
    backIcon?: string;
    variant?: string;
    enableClose?: string;
    autoCloseTime?: number;
    message: string;
    onClose?: () => void;
  }

  export class Notification extends React.Component<NotificationProps> {
    static show: (option: NotificationProps) => void;
    static hide: () => void;
  }

  // NotificationLegacy
  export interface NotificationLegacyProps {
    style?: StyleProp<ViewStyle>;
    theme?: {
      background?: string;
      text?: string;
      iconColor?: string;
      successIcon?: string;
      warningIcon?: string;
      errorIcon?: string;
      closeIcon?: string;
      radius?: number;
    };
    icon?: string;
    variant?: string;
    enableClose?: string;
    autoCloseTime?: number;
    message?: string;
    children?: any;
    onClose?: () => void;
    onPress?: () => void;
  }

  export class NotificationLegacy extends React.Component<NotificationLegacyProps> {}

  // PickerView
  export interface PickerViewProps {
    style?: StyleProp<ViewStyle>;
    loop?: boolean;
    children: React.ReactNode;
    theme?: {
      fontSize?: number;
      fontColor?: string;
    };
    itemTextColor?: string;
    selectedItemTextColor?: string;
    dividerColor?: string;
    visibleItemCount?: number;
    onValueChange?: (value: string | number, index: number) => void;
    selectedValue?: string | number | boolean;
  }

  export class Picker extends React.Component<PickerViewProps> {
    static Item: React.ElementType<any>;
  }

  // Popup
  export interface PopupProps {
    wrapperStyle?: any;
    title?: string;
    titleTextStyle?: StyleProp<ViewStyle>;
    titleWrapperStyle?: StyleProp<ViewStyle>;
    switchValue?: boolean;
    onSwitchValueChange?: (v: boolean) => void;
    footer?: React.ElementType<any>;
    footerType?: 'both' | 'singleConfirm' | 'singleCancel';
    footerWrapperStyle?: StyleProp<ViewStyle>;
    motionType?: 'none' | 'ScaleFadeIn' | 'Fade' | 'PullUp' | 'ScalePullDown';
    motionConfig?: MotionProps;
    isAlign?: boolean;
    backIconColor?: string;
    backText?: string;
    cancelText?: string;
    cancelTextStyle?: StyleProp<ViewStyle>;
    confirmText?: string;
    confirmTextStyle?: StyleProp<ViewStyle>;
    onCancel?: () => void;
    onConfirm?: (data: any, ...extraParams: any[]) => void;
  }

  interface PopUpListProps extends PopupProps {
    listWrapperStyle?: StyleProp<ViewStyle>;
    dataSource?: ListDate[];
    type?: 'radio' | 'switch';
    maxItemNum?: number;
    selectedIcon?: React.ElementType<any> | null;
    iconTintColor?: string;
    contentCenter?: boolean;
    value?: string | number;
    listItemStyle?: StyleProp<ViewStyle>;
    onSelect?: (value: string | number) => void;
  }

  interface ListDate {
    styles?: StyleProp<ViewStyle>;
    title?: string;
    Icon?: React.ElementType<any>;
    value: any;
  }

  interface PopUpCountdownProps extends PopupProps {
    countdownWrapperStyle?: StyleProp<ViewStyle>;
    onlyone?: boolean;
    min?: number;
    max?: number;
    step?: number;
    value: number;
    pickerFontColor?: string;
    pickerUnitColor?: string;
    hourText?: string;
    minuteText?: string;
    onValueChange?: (data?: valueChangeProps) => void;
    hourPickerStyle?: StyleProp<ViewStyle>;
    hourUnitStyle?: StyleProp<ViewStyle>;
    minutePickerStyle?: StyleProp<ViewStyle>;
    minuteUnitStyle?: StyleProp<ViewStyle>;
  }
  interface valueChangeProps {
    hour?: number;
    minute?: number;
    value?: number;
  }

  interface PopupDatePickerProps extends PopupProps, DatePickerProps {
    onDateChange?: (date: Date) => void;
  }

  interface PopupNumberSelectorProps extends PopupProps {
    numberSelectorWrapperStyle?: StyleProp<ViewStyle>;
    type?: 'basic' | 'slider';
    min?: number;
    max?: number;
    step?: number;
    scale?: number;
    value: number;
    onValueChange?: (value?: number) => void;
  }

  interface PopupPickerProps extends PopupProps {
    label?: string | undefined;
    spacing?: number;
    labelOffset?: number;
    pickerWrapperStyle?: StyleProp<ViewStyle>;
    pickerStyle?: StyleProp<ViewStyle>;
    value?: string | number | boolean | undefined;
    dataSource?: PickerDataProps[];
    singlePicker?: boolean;
    pickerFontColor?: string;
    pickerUnitColor?: string;
    onValueChange?: (newValue?: string | number, idx?: number) => void;
  }

  interface PickerDataProps {
    label: string;
    value: string;
  }

  interface PopupTimerPickerProps extends PopupProps, TimerPickerProps {}

  interface PopupCustomProps extends PopupProps {
    content: any;
  }

  export class Popup extends React.Component<PopupProps> {
    static list: (option: PopUpListProps) => void;
    static countdown: (option: PopUpCountdownProps) => void;
    static numberSelector: (option: PopupNumberSelectorProps) => void;
    static close: () => void;
    static datePicker: (option: PopupDatePickerProps) => void;
    static timerPicker: (option: PopupTimerPickerProps) => void;
    static picker: (option: PopupPickerProps) => void;
    static custom: (option: PopupCustomProps) => void;
  }

  // Progress
  export interface ProgressProps {
    gradientId?: string;
    style?: StyleProp<ViewStyle>;
    value?: number;
    startDegree?: number;
    andDegree?: number;
    min?: number;
    max?: number;
    stepValue?: number;
    backStrokeOpacity?: number;
    foreStrokeOpacity?: number;
    scaleHeight?: number;
    disabled?: boolean;
    backColor?: string;
    foreColor?:
      | string
      | StopsProps[]
      | {
          x1: string;
          x2: string;
          y1: string;
          y2: string;
        };
    onValueChange?: (value?: number) => void;
    onSlidingComplete?: (value?: number) => void;
    x1?: string;
    x2?: string;
    y1?: string;
    y2?: string;
    thumbFill?: string;
    thumbStrokeWidth?: number;
    thumbStroke?: string;
    thumbRadius?: number;
    needMaxCircle?: boolean;
    needMinCircle?: boolean;
    startColor?: string;
    endColor?: string;
    renderCenterView?: React.ElementType<any>;
    pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  }

  interface SpaceProps extends ProgressProps {}

  interface DoubleProps extends ProgressProps {
    maxValue?: number;
    minValue?: number;
    onValueChange?: (minValue?: number, maxValue?: number) => void;
    onSlidingComplete?: (minValue?: number, maxValue?: number) => void;
    minThumbFill?: string;
    minThumbStroke?: string;
  }

  interface ComposeProps extends ProgressProps {
    value1?: number;
    value2?: number;
    startDegree1?: number;
    andDegree1?: number;
    min1?: number;
    max1?: number;
    startDegree2?: number;
    reduceDegree2?: number;
    min2?: number;
    max2?: number;
    onValueChange?: (value1: number, value2?: number) => void;
    onSlidingComplete?: (value1?: number, value2?: number) => void;
    thumbRadius1?: number;
    thumbRadius2?: number;
    needCircle1?: boolean;
    needCircle2?: boolean;
  }

  export class Progress extends React.Component<ProgressProps> {
    static Space: React.ElementType<SpaceProps>;
    static Double: React.ElementType<DoubleProps>;
    static Compose: React.ElementType<ComposeProps>;
  }

  // RadialGradient
  export interface RadialGradientProps {
    style?: StyleProp<ViewStyle>;
    gradientId?: string;
    cx?: string;
    cy?: string;
    fx?: string;
    fy?: string;
    rx?: string;
    ry?: string;
    stops?: StopsProps[];
  }

  interface StopsProps {
    offset: string;
    stopColor?: string;
    stopOpacity?: string;
  }

  export class RadialGradient extends React.Component<RadialGradientProps> {}

  // RotationView
  export interface RotationViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    active?: boolean;
    duration?: number;
    useNativeDriver?: boolean;
  }

  export class RotationView extends React.Component<RotationViewProps> {}

  // Slider
  export interface SliderProps {
    onLayout?: (x?: number) => void;
    value?: number;
    disabled?: boolean;
    minimumValue?: number;
    maximumValue?: number;
    stepValue?: number;
    reverseValue?: boolean;
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbTintColor?: string;
    thumbTouchSize?: {
      width: number;
      height: number;
    };
    onValueChange?: (newValue?: number) => void;
    onSlidingStart?: (newValue?: number) => void;
    onSlidingComplete?: (newValue?: number) => void;
    onScrollEvent?: (value?: number) => void;
    style?: StyleProp<ViewStyle>;
    trackStyle?: StyleProp<ViewStyle>;
    thumbStyle?: StyleProp<ViewStyle>;
    debugTouchArea?: boolean;
    onlyMaximumTrack?: boolean;
    canTouchTrack?: boolean;
    animateTransitions?: boolean;
    animationType?: 'spring' | 'timing';
    animationConfig?: {
      friction?: number;
      tension?: number;
      duration?: number;
      easing?: () => void;
      delay?: number;
    };
    renderMinimumTrack?: () => void;
    renderMaximumTrack?: () => void;
    renderThumb?: () => void;
    horizontal?: boolean;
  }

  export class Slider extends React.Component<SliderProps> {}

  // Swipeout
  export interface SwipeoutProps {
    autoClose?: boolean;
    disabled?: boolean;
    left?: SwipeoutAction[];
    right?: SwipeoutAction[];
    buttonWidth?: number;
    onOpen?: (sectionID?: number | string, rowID?: number | string) => void;
    onClose?: (sectionID?: number | string, rowID?: number | string) => void;
    sensitivity?: number;
    scroll?: (value?: boolean) => void;
    style?: StyleProp<ViewStyle>;
    close?: boolean;
  }

  interface SwipeoutAction {
    text: string;
    type: string;
    fontStyle: {
      fontSize: number;
      color: string;
    };
  }

  export class Swipeout extends React.Component<SwipeoutProps> {}

  // SwitchButton
  export interface SwitchButtonProps {
    theme?: {
      width?: number;
      height?: number;
      thumbSize?: number;
      margin?: number;
      tintColor?: string;
      onTintColor?: string;
      thumbTintColor?: string;
      onThumbTintColor?: string;
    };
    style?: StyleProp<ViewStyle>;
    accessibilityLabel?: string;
    disabled?: boolean;
    value?: boolean;
    defaultValue?: boolean;
    size?: object;
    onValueChange: (value?: boolean) => void;
    tintColor?:
      | string
      | {
          x1: string;
          x2: string;
          y1: string;
          y2: string;
        };
    onTintColor?: string | {};
    thumbTintColor?: string;
    onThumbTintColor?: string;
    borderColor?: string;
    thumbStyle?: StyleProp<ViewStyle>;
    useNativeDriver?: boolean;
    onText?: string;
    offText?: string;
    onTextStyle?: StyleProp<ViewStyle>;
    offTextStyle?: StyleProp<ViewStyle>;
  }

  export class SwitchButton extends React.Component<SwitchButtonProps> {}

  // TYFlatList
  export interface TYFlatListProps {
    style?: StyleProp<ViewStyle>;
    data: DataProps[];
    separatorStyle?: StyleProp<ViewStyle>;
    flatListRef?: () => void;
    useART?: boolean;
  }
  interface DataProps {
    key?: string | number;
    Action?: string;
    title?: string;
    subTitle?: string;
    checked?: boolean;
    onChange?: () => void;
  }
  export class TYFlatList extends React.Component<TYFlatListProps> {}

  // TYListItem
  export interface TYListItemProps extends TouchableOpacityProps {
    styles?: {
      container?: StyleProp<ViewStyle>;
      content?: StyleProp<ViewStyle>;
      contentLeft?: StyleProp<ViewStyle>;
      contentCenter?: StyleProp<ViewStyle>;
      contentRight?: StyleProp<ViewStyle>;
      title?: StyleProp<TextStyle>;
      subTitle?: StyleProp<TextStyle>;
    };
    theme?: {
      boardBg?: string;
      fontColor?: string;
      subFontColor?: string;
      descFontColor?: string;
      cellLine?: string;
      cellBg?: string;
      cellRadius?: string;
    };
    arrow?: boolean;
    arrowColor?: string;
    arrowUseIcon?: boolean;
    disabled?: boolean;
    actionDisabled?: boolean;
    title?: string;
    subTitle?: string;
    children?: React.ReactNode;
    imageFollowIconColor?: boolean;
    iconType?: 'auto' | 'image' | 'iconfont' | 'text';
    actionType?: 'auto' | 'image' | 'iconfont' | 'text';
    iconSize?: number;
    iconColor?: string;
    Icon?: React.ReactNode;
    Action?: React.ReactNode;
    needUpdate?: boolean;
    useART?: boolean;
    onPress?: () => void;
  }

  export class TYListItem extends React.Component<TYListItemProps> {}

  interface SectionProps {
    title?: string;
    data: DataProps[];
  }

  // TYSectionList
  export interface TYSectionListProps {
    style?: StyleProp<ViewStyle>;
    sections: SectionProps[];
    headerStyle?: StyleProp<ViewStyle>;
    separatorStyle?: StyleProp<ViewStyle>;
    sectionListRef?: () => void;
    useART?: boolean;
  }
  export class TYSectionList extends React.Component<TYSectionListProps> {}

  // TYText
  export interface TYTextProps extends TextProps {
    style?: StyleProp<ViewStyle>;
    type?: 'heading' | 'title' | 'paragraph';
    size?: string | number;
    text?: string;
    align?: 'left' | 'center' | 'right';
    weight?: number | string;
    color?: string;
  }

  export class TYText extends React.Component<TYTextProps> {}

  // Tab
  export interface TabProps {
    swipeable?: boolean;
    animated?: boolean;
    activeKey?: string | number;
    defaultActiveKey?: string | number;
    onChange?: (activeKey?: number | string) => void;
    children?: React.ElementType<any>;
    tabContentStyle?: StyleProp<ViewStyle>;
    tabDefaultColor?: string;
    tabBarBackgroundColor?: string;
    tabBarUnderlineStyle?: StyleProp<ViewStyle>;
    tabBarStyle?: StyleProp<ViewStyle>;
    tabTextStyle?: StyleProp<ViewStyle>;
    tabActiveTextStyle?: StyleProp<ViewStyle>;
    tabsContainerStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    tabBarPosition?: 'top' | 'bottom';
    useViewPagerOnAndroid?: boolean;
  }

  interface TabPaneProps extends TabProps {
    tabWidth?: number;
    tab?: React.ReactNode;
  }

  export class Tab extends React.Component<TabProps> {
    static TabPane: React.ElementType<TabPaneProps>;
  }

  // TabBar
  export interface TabBarProps {
    underlineStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    tabActiveStyle?: StyleProp<ViewStyle>;
    tabTextStyle?: StyleProp<ViewStyle>;
    tabActiveTextStyle?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    activeKey?: string | number;
    defaultActiveKey?: string | number;
    tabs: TabBarArr[];
    isUnderlineCenter?: boolean;
    onChange?: (index?: number, item?: TabBarArr) => void;
  }

  interface TabBarArr {
    [index: number]: {
      key: string;
      title: string;
      onItemPress?: () => void;
    };
  }

  export class TabBar extends React.Component<TabBarProps> {}

  // Tabs
  export interface TabsProps {
    style?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    tabActiveStyle?: StyleProp<ViewStyle>;
    tabTextStyle?: StyleProp<ViewStyle>;
    tabActiveTextStyle?: StyleProp<ViewStyle>;
    tabContentStyle?: StyleProp<ViewStyle>;
    underlineStyle?: StyleProp<ViewStyle>;
    underlineWidth?: number;
    activeKey?: number | string;
    dataSource: TabDateArr[];
    disabled?: boolean;
    maxItem?: number;
    tabPosition?: 'top' | 'bottom';
    swipeable?: boolean;
    activeColor?: string;
    background?: string;
    preload?: boolean;
    preloadTimeout?: number;
    velocityThreshold?: number;
    renderPlaceholder?: () => void;
    onChange?: (tab?: string, idx?: number) => void;
    children?: TabContentArr[];
    extraSpace?: number;
    animationConfig?: {
      duration: number;
      easing: () => void;
      delay: number;
      isInteraction: boolean;
      useNativeDriver: boolean;
    };
  }

  interface TabDateArr {
    [index: number]: {
      value: string;
      label: string;
    };
  }
  interface TabContentArr {
    [index: number]: React.ElementType<any>;
  }

  interface TabContentProps extends TabsProps {
    activeIndex: number;
    onMove?: (gestureState?: {}, index?: number, percent?: number) => void;
    onRelease?: (gestureState?: {}, index?: number, percent?: number) => void;
    children: TabContentArr[];
  }

  interface TabPanelProps extends TabsProps {}

  export class Tabs extends React.Component<TabsProps> {
    static TabContent: React.ElementType<TabContentProps>;
    static TabPanel: React.ElementType<TabPanelProps>;
  }

  // TimerPicker
  export interface TimerPickerProps {
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    startTime?: number;
    endTime?: number;
    onTimerChange?: (startTime?: number, endTime?: number) => void;
    is12Hours?: boolean;
    singlePicker?: boolean;
    prefixPosition?: undefined | 'left' | 'right';
    pickerFontColor?: string;
    symbol?: string;
    loop?: boolean;
  }

  export class TimerPicker extends React.Component<TimerPickerProps> {}

  // Tips
  export interface TipsProps {
    contentStyle?: StyleProp<ViewStyle>;
    tipStyle?: StyleProp<ViewStyle>;
    bgColor?: string;
    show?: boolean;
    children?: React.ElementType<any>;
    showCorner?: boolean;
    motionType?: string;
    cornerPosition?:
      | 'topLeft'
      | 'topCenter'
      | 'topRight'
      | 'bottomLeft'
      | 'bottomCenter'
      | 'bottomRight';
    motionConfig?: MotionProps;
    withModal?: boolean;
  }

  export class Tips extends React.Component<TipsProps> {}

  // Toast
  export interface ToastProps {
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ViewStyle>;
    text?: string;
    show: boolean;
    onFinish: () => void;
    showPosition?: 'top' | 'bottom' | 'center';
    image?: number;
    children?: React.ElementType<any>;
  }

  interface ToastSuccessProps extends ToastProps {
    size?: number;
    d?: string | undefined;
    iconfontStyle?: StyleProp<ViewStyle>;
    color?: string;
  }

  interface ToastWarningProps extends ToastProps {
    size?: number;
    d?: string | undefined;
    iconfontStyle?: StyleProp<ViewStyle>;
    color?: string;
  }

  interface ToastErrorProps extends ToastProps {
    size?: number;
    d?: string | undefined;
    iconfontStyle?: StyleProp<ViewStyle>;
    color?: string;
  }

  interface ToastLoadingProps extends ToastProps {
    size?: number;
    color?: string;
    loading?: boolean;
    strokeWidth?: number;
    loadingBackgroundColor?: string;
    loadingStyle?: StyleProp<ViewStyle>;
  }

  export class Toast extends React.Component<ToastProps> {
    static Success: React.ElementType<ToastSuccessProps>;
    static Warning: React.ElementType<ToastWarningProps>;
    static Error: React.ElementType<ToastErrorProps>;
    static Loading: React.ElementType<ToastLoadingProps>;
  }

  // TopBar
  export interface TopBarProps {
    theme?: {
      background?: string;
      color?: string;
    };
  }

  export interface TopBarContainerProps extends TopBarProps {
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    background?:
      | string
      | {
          x1?: string;
          x2?: string;
          y1?: string;
          y2?: string;
          stops?: StopsProps[];
        };
  }

  interface TopBarContentProps extends TopBarProps {
    color?: string;
    title?: string;
    titleStyle?: StyleProp<ViewStyle>;
    subTitle?: string;
    subTitleStyle?: StyleProp<ViewStyle>;
    position?: 'left' | 'center' | 'right';
    onPress?: () => void;
  }

  interface TopBarActionProps extends TopBarProps, IconFontProps {
    size?: number;
    spacing?: number;
    color?: string;
    source?: string | number | { url: string };
    disabled?: boolean;
    children?: React.ElementType<any>;
    onPress?: () => void;
  }

  export class TopBar extends React.Component<TopBarProps> {
    static Container: React.ElementType<TopBarContainerProps>;
    static Content: React.ElementType<TopBarContentProps>;
    static Action: React.ElementType<TopBarActionProps>;
  }

  // UnitText
  export interface UnitTextProps {
    style?: StyleProp<ViewStyle>;
    size?: number;
    valueSize?: number;
    valueColors?: ArrayLabels[];
    valueColor?: string;
    unit?: string;
    unitSize?: number;
    unitColor?: string;
    unitPaddingLeft?: number;
    unitPaddingTop?: number;
    value: string | number;
    letterWidth?: number;
    symbolWidth?: number;
    symbols?: ArrayLabels[];
    svgMap?: {};
  }

  interface ArrayLabels {
    [index: number]: string;
  }

  export class UnitText extends React.Component<UnitTextProps> {}

  export let Utils: {
    CoreUtils: {
      get(object: object, pathString: string, defaultValue?: any): any;
      toFixed(str: string | number, count: number): string;
      toFilled(str: string | number, count: number): string;
      partition(str: string, chunk: number): string[];
      isObject(obj: any): boolean;
      isArray(obj: any): boolean;
      isDate(obj: any): boolean;
      isRegExp(obj: any): boolean;
      isBoolean(obj: any): boolean;
      isNumerical(obj: any): boolean;
      isUndefined(obj: any): boolean;
      isNil(obj: any): boolean;
      pick(object: object, keys: string): object;
      omit(object: object, keys: string): object;
      chunk(arr: [], chunkSize: number, cache: []): [];
      compareVersion(v1: string, v2: string): number;
    };
    RatioUtils: {
      isIphoneX: boolean;
      width: number;
      height: number;
      isIos: boolean;
      statusBarHeight: number;
      convert(d: any): number;
      convertX(d: any): number;
      convertY(d: any): number;
      winWidth: number;
      winHeight: number;
      viewWidth: number;
      viewHeight: number;
    };
    ColorUtils: {
      color: {
        hex2RgbString(hex: string, alpha?: number): string;
        hsb2hex(h: number, s: number, v: number): string;
        kelvin2rgb(kelvin: number): number[];
        rgb2hsv(...args: number[]): number[];
        temp2rgb(
          kelvin: number,
          option?: { temperatureMin?: number; temperatureMax?: number }
        ): string;
        brightKelvin2rgb(
          bright: number,
          kelvin?: number,
          option?: { temperatureMin?: number; temperatureMax?: number }
        ): string;
        rgb2hsb(...rgb: number[]): number[];
        bright2Opacity(bright: number, option: { min?: number; max?: number }): number;
        hsv2rgba(h: number, s: number, v: number): string;
        brightKelvin2rgba(bright: number, kelvin: number): string;
      };
    };
    NumberUtils: {
      toFixedString(num: number, count: number): string;
      toFilledString(num: number, count: number): string;
      getBitValue(num: number, count: number): number;
      changeBitValue(num: number, count: number): number;
      setBitValueWithOne(num: number, count: number): number;
      setBitValueWithZero(num: number, count: number): number;
      bytesToHexString(arr: []): string;
      numToHexString(num: number, padding: number): string;
      numToByteNumbers(num: number, bytes: number): [];
      highLowToInt(high: number, low: number): number;
      intToHighLow(num: number): [];
      inMaxMin(min: number, max: number, value: number): number;
      scaleNumber(scale: number, value: number): number;
      range(start: number, end: number, step: number): number;
      calcPosition(value: number, min: number, max: number, newMin: number, newMax: number): number;
      calcPercent(min: number, max: number, value: number, offset: number): number;
    };
    ThemeUtils: {
      ThemeConsumer: any;
      deepMerge(target: object, ...args: object[]): object;
      withTheme<P extends { theme?: T }, T>(
        component: React.ComponentType<P>
      ): React.ComponentType<P>;
      parseToCss: (values: number[], key: string) => { [styleKey: string]: number };
      parseToStyle: (values: number[], key: string) => { [styleKey: string]: number };
      getTheme: (props: object, type: string, defaultValue: any) => any;
    };
    TemperatureUtils: {
      c2f(value: number): number;
      f2c(value: number): number;
    };
    TimeUtils: {
      parseSecond(t: number, n?: number): [];
      parseTimer(second: number): [];
      parseTimers(second: number): [];
      parseHour12(second: number): [];
      stringToSecond(timeStr: string): number;
      dateToTimer(dateString: string): number;
      dateFormat(mt: string, date: string): string;
      timezone(): string;
    };
    JsonUtils: {
      parseJSON(value: string): object;
    };
    StringUtils: {
      codePointAt();
    };
  };

  export let defaultTheme: { [key: string]: any };

  export let TYSdk: {
    DeviceEventEmitter: {
      addListener: (type: string, cb: Function) => void;
      removeListener: (type: string, cb: Function) => void;
      removeAllListeners: (type: string) => void;
    };

    event: {
      on(event: string, callback: (d: any) => any): void;
      off(event: string, callback: (d: any) => any): void;
      emit(event: string, data: any): void;
      remove(event: string, callback: (d: any) => any): void;
    };

    device: {
      getDpIdByCode(code: string | number): string | number;
      getDpCodeById(id: string | number): string | number;
      putDeviceData(cmd: any): any;
      isMeshDevice(): boolean;
      isWifiDevice(): boolean;
      getDeviceInfo(): any;
      formatDps(data: any): any;
    };

    mobile: {
      getMobileInfo(): any;
      showLoading(): void;
    };

    native: {
      apiRNRequest(
        data: { a: string; postData: any; v: string },
        success: Function,
        error: Function
      ): Promise<any>;
      apiRequest(
        data: { a: string; postData: any; v: string },
        success: Function,
        error: Function
      ): Promise<any>;
      gotoDpAlarm(
        category: string,
        repeat: number,
        data: {
          dpId: number | string;
          dpName: string;
          selected: number;
          rangeKeys: [];
          rangeValues: [];
        }[]
      ): void;
      simpleConfirmDialog(
        title: string,
        msg: string,
        confirm: () => void,
        cancel: () => void
      ): void;
      showPromptDialog(
        confirmText: string,
        cancelText: string,
        title: string,
        message: string,
        defaultValue: string,
        onConfirmed: () => void,
        onCanceled: () => void
      ): void;
      showEditDialog(
        title: string,
        editString: string,
        onConfirmed: () => void,
        onCanceled: () => void
      ): void;
      bottomListDialog(itemList: [], selected: number, onConfirmed: () => void): void;
      simpleTipDialog(msg: string, onConfirmed: () => void): void;
      hideLoading(): void;
      showLoading(title: string): void;
      is24Hour(): boolean;
      jumpTo(routeId: string): void;
      back(): void;
      disablePopGesture(): void;
      enablePopGesture(): void;
    };

    Navigator: {
      pop(): void;
      push(d: {}): void;
      getCurrentRoutes: () => any[];
    };
  };
}
