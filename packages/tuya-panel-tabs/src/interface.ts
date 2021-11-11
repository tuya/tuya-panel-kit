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
   * @language zh-CN
   * @description 索引值
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Index
   * @defaultValue undefined
   */
  value: string;
  /**
   * @language zh-CN
   * @description Tab 标签里的文本
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Text in tab
   * @defaultValue undefined
   */
  label?: string;
  /**
   * @language zh-CN
   * @description 是否可以点击切换 Tab
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Can I click switch tab
   * @defaultValue undefined
   */
  disabled?: boolean;
  /**
   * @language zh-CN
   * @description 自定义 Tab 渲染
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Custom tab rendering
   * @defaultValue undefined
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
   * @language zh-CN
   * @description 测试标识
   * @defaultValue "Tabs"
   */
  /**
   * @language en-US
   * @description Test identification
   * @defaultValue "Tabs"
   */
  accessibilityLabel?: string;
  /**
   * @language zh-CN
   * @description Tabs 的样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The style of Tabs.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 存在 TabContent 时，包裹着 Tabs 以及 TabContent 的容器样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The container style that wraps Tabs and TabContent. It only takes effect when TabContent is configured.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  wrapperStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 单个 Tab 的样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The style of a single tab
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  tabStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 单个激活 Tab 的样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The style of a single active tab
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  tabActiveStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 未激活的文本样式
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description he text style of the unselected Tab.
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  tabTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 激活的文本样式
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The selected text style.
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  tabActiveTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 存在 TabContent 时才有效，TabContent 的样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The style of TabContent. It only takes effect when TabContent is configured.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  tabContentStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 下划线的样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Style of the underline.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  underlineStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 下环线的宽度，不设置则默认跟随文字大小
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description The width of the underline. If not set, it will follow the text width by default.
   * @defaultValue undefined
   */
  underlineWidth?: number;
  /**
   * @language zh-CN
   * @description 默认的激活值，想成为非受控组件时使用
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description The default activation value. It is used when it is set to uncontrolled components
   * @defaultValue 0
   */
  defaultActiveKey?: number | string;
  /**
   * @language zh-CN
   * @description 激活值，如果给定了则成为受控组件，需搭配 onChange 使用
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Activation value. If the parameter value is set, it becomes a controlled component. It needs to be used with onChange.
   * @defaultValue undefined
   */
  activeKey?: number | string;
  /**
   * @language zh-CN
   * @description 数据源
   * @types <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/3a07a00d4e5e3400adeee9c4857b5799d41e53d7/types/tuya-panel-kit/index.d.ts#L7699">TabDataSource</a>
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Data source
   * @types <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/3a07a00d4e5e3400adeee9c4857b5799d41e53d7/types/tuya-panel-kit/index.d.ts#L7699">TabDataSource</a>
   * @defaultValue undefined
   */
  dataSource: TabDataSource[];
  /**
   * @language zh-CN
   * @description 是否禁用 Tabs 标签页（注意只针对 Tabs，不针对 TabContent）
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Whether to disable the Tabs page.
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * @language zh-CN
   * @description 一屏下最多可存在的 tab 数量
   * @defaultValue 4
   */
  /**
   * @language en-US
   * @description The maximum number of Tab labels supported on a screen.
   * @defaultValue 4
   */
  maxItem?: number;
  /**
   * @language zh-CN
   * @description Tab 与 TabContent 同时存在时，Tab 的排列位置
   * @defaultValue 'top'
   */
  /**
   * @language en-US
   * @description When Tab and TabContent exist at the same time, the arrangement position of Tab
   * @defaultValue 'top'
   */
  tabPosition?: 'top' | 'bottom';
  /**
   * @language zh-CN
   * @description Tab Content 是否可滚动
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Is tab content scrollEnable
   * @defaultValue true
   */
  swipeable?: boolean;
  /**
   * @language zh-CN
   * @description Tabs 和下划线激活时的颜色
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description The color when activated.
   * @defaultValue undefined
   */
  activeColor?: string;
  /**
   * @language zh-CN
   * @description Tabs 的背景色
   * @defaultValue '#fff'
   */
  /**
   * @language en-US
   * @description The background color of Tab page.
   * @defaultValue '#fff'
   */
  background?: string;
  /**
   * @language zh-CN
   * @description TabContent 是否需要预加载
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Whether TabContent needs to be preloaded.
   * @defaultValue true
   */
  preload?: boolean;
  /**
   * @language zh-CN
   * @description TabContent 预加载延时时间
   * @defaultValue 375
   */
  /**
   * @language en-US
   * @description The preload delay time of TabContent.
   * @defaultValue 375
   */
  preloadTimeout?: number;
  /**
   * @language zh-CN
   * @description 加速度阈值，滑动速率超过该阈值直接判断为下一页
   * @defaultValue 0.5
   */
  /**
   * @language en-US
   * @description The acceleration threshold of TabContent in px. If the sliding rate exceeds the threshold, it is directly judged as the next page.
   * @defaultValue 0.5
   */
  velocityThreshold?: number;
  /**
   * @language zh-CN
   * @description 自定义渲染预加载中的占位容器
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Custom rendering of the placeholder container in the preload.
   * @defaultValue undefined
   */
  renderPlaceholder?: (activeIndex: number, child: React.ReactNode) => React.ReactNode;
  /**
   * @language zh-CN
   * @description Tab 变更回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Callback for tab change.
   * @defaultValue undefined
   */
  onChange?: (tab: TabDataSource, idx: number) => void;
  /**
   * @language zh-CN
   * @description Tab 的子元素，一般为 TabContent
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description The child element of Tab, generally TabContent.
   * @defaultValue undefined
   */
  children?: React.ReactElement[];
  /**
   * @language zh-CN
   * @description 右边额外的留白距离
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description The extra white space on the right, in px.
   * @defaultValue 0
   */
  extraSpace?: number;
  /**
   * @language zh-CN
   * @description 动画配置
   * @defaultValue { duration: 200, easing: Easing.linear, delay: 0, isInteraction: true, useNativeDriver: true }
   */
  /**
   * @language en-US
   * @description Animation configuration
   * @defaultValue { duration: 200, easing: Easing.linear, delay: 0, isInteraction: true, useNativeDriver: true }
   */
  animationConfig?: {
    duration?: number;
    easing?: () => number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver?: boolean;
  };
}
export interface TabContentProps {
  /**
   * @description.zh 测试标识
   * @description Test identification
   * @defaultValue "TabContent"
   */
  accessibilityLabel?: string;
  /**
   * @description.zh 嵌套子元素
   * @description Nested sub elements
   * @defaultValue undefined
   */
  children: React.ReactElement[];
  /**
   * @description.zh 内容样式
   * @description Container style
   * <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 是否禁用 TabContent
   * @description Whether to disable TabContent.
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * @description.zh 当前激活所处的索引
   * @description Current activation index
   * @defaultValue undefined
   */
  activeIndex: number;
  /**
   * @description.zh TabContent 是否需要预加载
   * @description Whether TabContent needs to be preloaded.
   * @defaultValue true
   */
  preload?: boolean;
  /**
   * @description.zh TabContent 预加载延时时间
   * @description The preload delay time of TabContent.
   * @defaultValue 375
   */
  preloadTimeout?: number;
  /**
   * @description.zh 加速度阈值，滑动速率超过该阈值直接判断为下一页
   * @description The acceleration threshold of TabContent in px. If the sliding rate exceeds the threshold, it is directly judged as the next page.
   * @defaultValue 0.5
   */
  velocityThreshold?: number;
  /**
   * @description.zh TabContent 滑动回调
   * @description TabContent sliding callback.
   * @defaultValue undefined
   */
  onMove?: (gestureState: PanResponderGestureState, index: number, percent: number) => void;
  /**
   * @description.zh TabContent 滑动结束时回调
   * @description Callback of TabContent sliding end.
   * @defaultValue undefined
   */
  onRelease?: (gestureState: PanResponderGestureState, index: number, percent: number) => void;
  /**
   * @description.zh 自定义渲染预加载中的占位容器
   * @description Custom rendering of the placeholder container in the preload.
   * @defaultValue undefined
   */
  renderPlaceholder?: (activeIndex: number, child: React.ReactNode) => React.ReactNode;
  /**
   * @description.zh 动画配置
   * @description Animation configuration
   * @defaultValue { duration: 200, easing: Easing.linear, delay: 0, isInteraction: true, useNativeDriver: true }
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
