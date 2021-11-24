import React from 'react';
import {
  ViewProps,
  ViewStyle,
  StyleProp,
  ScrollViewProps,
  PanResponderGestureState,
  TextStyle,
  Animated,
} from 'react-native';

export interface TabDataSource extends ViewProps {
  /**
   * @description.zh 索引值
   * @description.en Index
   * @default undefined
   */
  value: string;
  /**
   * @description.zh Tab 标签里的文本
   * @description.en Text in tab
   * @default undefined
   */
  label?: string;
  /**
   * @description.zh 是否可以点击切换 Tab
   * @description.en Can I click switch tab
   * @default undefined
   */
  disabled?: boolean;
  /**
   * @description.zh 自定义 Tab 渲染
   * @description.en Custom tab rendering
   * @default undefined
   */
  renderTab?: (isActive: boolean, state: ITabsState, props: TabsProps) => React.ReactNode;
}

export interface ITabsState {
  activeIndex: number;
  scrollX: Animated.Value;
  underlineLeft: Animated.Value;
  underlineWidth: Animated.Value;
}

export interface TabsProps {
  /**
   * @description.zh 测试标识
   * @description.en Test identification
   * @default "Tabs"
   */
  accessibilityLabel?: string;
  /**
   * @description.zh Tabs 的样式
   * @description.en The style of Tabs.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 存在 TabContent 时，包裹着 Tabs 以及 TabContent 的容器样式
   * @description.en The container style that wraps Tabs and TabContent. It only takes effect when TabContent is configured.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  wrapperStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 单个 Tab 的样式
   * @description.en The style of a single tab
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  tabStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 单个激活 Tab 的样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  tabActiveStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 未激活的文本样式
   * @description.en he text style of the unselected Tab.
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @default null
   */
  tabTextStyle?: StyleProp<TextStyle>;
  /**
   * @description.zh 激活的文本样式
   * @description.en The selected text style.
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @default null
   */
  tabActiveTextStyle?: StyleProp<TextStyle>;
  /**
   * @description.zh 存在 TabContent 时才有效，TabContent 的样式
   * @description.en The style of TabContent. It only takes effect when TabContent is configured.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  tabContentStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 下划线的样式
   * @description.en Style of the underline.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  underlineStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 下环线的宽度，不设置则默认跟随文字大小
   * @description.en The width of the underline. If not set, it will follow the text width by default.
   * @default undefined
   */
  underlineWidth?: number;
  /**
   * @description.zh 默认的激活值，想成为非受控组件时使用
   * @description.en The default activation value. It is used when it is set to uncontrolled components
   * @default 0
   */
  defaultActiveKey?: number | string;
  /**
   * @description.zh 激活值，如果给定了则成为受控组件，需搭配 onChange 使用
   * @description.en Activation value. If the parameter value is set, it becomes a controlled component. It needs to be used with onChange.
   * @default undefined
   */
  activeKey?: number | string;
  /**
   * @description.zh 数据源
   * @description.en Data source
   * @types <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/3a07a00d4e5e3400adeee9c4857b5799d41e53d7/types/tuya-panel-kit/index.d.ts#L7699">TabDataSource</a>
   * @default undefined
   */
  dataSource: TabDataSource[];
  /**
   * @description.zh 是否禁用 Tabs 标签页（注意只针对 Tabs，不针对 TabContent）
   * @description.en Whether to disable the Tabs page.
   * @default false
   */
  disabled?: boolean;
  /**
   * @description.zh 一屏下最多可存在的 tab 数量
   * @description.en The maximum number of Tab labels supported on a screen.
   * @default 4
   */
  maxItem?: number;
  /**
   * @description.zh Tab 与 TabContent 同时存在时，Tab 的排列位置
   * @description.en When Tab and TabContent exist at the same time, the arrangement position of Tab
   * @default 'top'
   */
  tabPosition?: 'top' | 'bottom';
  /**
   * @description.zh Tab Content 是否可滚动
   * @description.en Is tab content scrollEnable
   * @default true
   */
  swipeable?: boolean;
  /**
   * @description.zh Tabs 和下划线激活时的颜色
   * @description.en The color when activated.
   * @default undefined
   */
  activeColor?: string;
  /**
   * @description.zh Tabs 的背景色
   * @description.en The background color of Tab page.
   * @default '#fff'
   */
  background?: string;
  /**
   * @description.zh TabContent 是否需要预加载
   * @description.en Whether TabContent needs to be preloaded.
   * @default true
   */
  preload?: boolean;
  /**
   * @description.zh TabContent 预加载延时时间
   * @description.en The preload delay time of TabContent.
   * @default 375
   */
  preloadTimeout?: number;
  /**
   * @description.zh 加速度阈值，滑动速率超过该阈值直接判断为下一页
   * @description.en The acceleration threshold of TabContent in px. If the sliding rate exceeds the threshold, it is directly judged as the next page.
   * @default 0.5
   */
  velocityThreshold?: number;
  /**
   * @description.zh 自定义渲染预加载中的占位容器
   * @description.en Custom rendering of the placeholder container in the preload.
   * @default undefined
   */
  renderPlaceholder?: (activeIndex: number, child: React.ReactNode) => React.ReactNode;
  /**
   * @description.zh Tab 变更回调
   * @description.en Callback for tab change.
   * @default undefined
   */
  onChange?: (tab: TabDataSource, idx: number) => void;
  /**
   * @description.zh Tab 的子元素，一般为 TabContent
   * @description.en The child element of Tab, generally TabContent.
   * @default undefined
   */
  children?: React.ReactElement[];
  /**
   * @description.zh 右边额外的留白距离
   * @description.en The extra white space on the right, in px.
   * @default 0
   */
  extraSpace?: number;
  /**
   * @description.zh 动画配置
   * @description.en Animation configuration
   * @default { duration: 200, easing: Easing.linear, delay: 0, isInteraction: true, useNativeDriver: true }
   */
  animationConfig?: {
    duration?: number;
    easing?: () => number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver?: boolean;
  };
  /**
   * @description.en Whether to support click vibration
   * @description.zh 是否支持点按震动
   * @default true
   */
  isVibration?: boolean;
}
export interface TabContentProps {
  /**
   * @description.zh 测试标识
   * @description.en Test identification
   * @default "TabContent"
   */
  accessibilityLabel?: string;
  /**
   * @description.zh 嵌套子元素
   * @description.en Nested sub elements
   * @default undefined
   */
  children: React.ReactElement[];
  /**
   * @description.zh 内容样式
   * @description.en Container style
   * <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 是否禁用 TabContent
   * @description.en Whether to disable TabContent.
   * @default false
   */
  disabled?: boolean;
  /**
   * @description.zh 当前激活所处的索引
   * @description.en Current activation index
   * @default undefined
   */
  activeIndex: number;
  /**
   * @description.zh TabContent 是否需要预加载
   * @description.en Whether TabContent needs to be preloaded.
   * @default true
   */
  preload?: boolean;
  /**
   * @description.zh TabContent 预加载延时时间
   * @description.en The preload delay time of TabContent.
   * @default 375
   */
  preloadTimeout?: number;
  /**
   * @description.zh 加速度阈值，滑动速率超过该阈值直接判断为下一页
   * @description.en The acceleration threshold of TabContent in px. If the sliding rate exceeds the threshold, it is directly judged as the next page.
   * @default 0.5
   */
  velocityThreshold?: number;
  /**
   * @description.zh TabContent 滑动回调
   * @description.en TabContent sliding callback.
   * @default undefined
   */
  onMove?: (gestureState: PanResponderGestureState, index: number, percent: number) => void;
  /**
   * @description.zh TabContent 滑动结束时回调
   * @description.en Callback of TabContent sliding end.
   * @default undefined
   */
  onRelease?: (gestureState: PanResponderGestureState, index: number, percent: number) => void;
  /**
   * @description.zh 自定义渲染预加载中的占位容器
   * @description.en Custom rendering of the placeholder container in the preload.
   * @default undefined
   */
  renderPlaceholder?: (activeIndex: number, child: React.ReactNode) => React.ReactNode;
  /**
   * @description.zh 动画配置
   * @description.en Animation configuration
   * @default { duration: 200, easing: Easing.linear, delay: 0, isInteraction: true, useNativeDriver: true }
   */
  animationConfig?: {
    duration?: number;
    easing?: () => number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver: boolean;
  };
}
export interface TabPanelProps extends ViewProps {
  /**
   * @description.zh 容器样式
   * @description.en Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 背景色
   * @description.en Background color
   * @default 'transparent'
   */
  background?: string;
  /**
   * @description.zh 子组件
   * @description.en Children
   * @default null
   */
  children?: React.ReactNode;
}

export interface ITabMask {
  visible?: boolean;
  color?: string;
}

export class Tabs extends React.Component<TabsProps> {
  static TabContent: React.ElementType<TabContentProps>;
  static TabPanel: React.ElementType<TabPanelProps>;
  static TabScrollView: React.ElementType<ScrollViewProps>;
}
