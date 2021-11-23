import React from 'react';
import { StyleProp, ViewStyle, TextStyle, ViewProps, Animated } from 'react-native';

export interface TabProps
  extends Omit<TabNavProps, 'panels' | 'page' | 'scrollValue' | 'onTabClick'>,
    Omit<
      TabContentProps,
      'onScrollValueChange' | 'containerWidth' | 'distanceToChangeTab' | 'panels'
    > {
  /**
   * @description.zh 默认的激活值，想成为非受控组件时使用
   * @description.en The default activation value. It is used when it is set to uncontrolled components
   * @default 0
   */
  defaultActiveKey?: string;
  /**
   * @description.zh 嵌套子元素
   * @description.en Nested sub elements
   * @default undefined
   */
  children?: React.ReactElement[];
  /**
   * @description.zh 设置 TabContent 的样式
   * @description.en Set the style of the content area of the TabBar.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default undefined
   */
  tabContentStyle?: StyleProp<ViewStyle>;
}

export interface TabState {
  activeKey: number | string;
  scrollValue: any;
  containerWidth: number;
}

export interface TabContentState {
  scrollX: Animated.Value;
  activeIndex: number;
}

export interface TabContentProps {
  /**
   * @description.zh 包裹 tab 的容器样式
   * @description.en Specify the style of the container that wraps the tab bar.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 切换 tab 的距离
   * @description.en Distance of switching tab
   * @default 0.3
   */
  distanceToChangeTab?: number;
  /**
   * @description.zh 内容宽度
   * @description.en Distance of container width
   * @default null
   */
  containerWidth?: number;
  /**
   * @description.zh 是否可滑动视图
   * @description.en Whether to slide the view.
   * @default true
   */
  swipeable?: boolean;
  /**
   * @description.zh 激活值，如果给定了则成为受控组件，需搭配 onChange 使用
   * @description.en Activation value. If the parameter value is set, it becomes a controlled component. It needs to be used with onChange.
   * @default undefined
   */
  activeKey?: string | number;
  /**
   * @description.zh tab 内容源
   * @description.en The Tab content source
   * @default []
   */
  panels: React.ReactElement[];
  /**
   * @description.zh 切换视图是否有动画
   * @description.en Whether the switching view has animation.
   * @default true
   */
  animated?: boolean;
  /**
   * @description.zh 是否在安卓上使用 viewPager
   * @description.en Whether to use viewPager on Android
   * @default true
   */
  useViewPagerOnAndroid?: boolean;
  /**
   * @description.zh 滚动改变回调函数
   * @description.en Scroll to change the callback function
   * @default () => void
   */
  onScrollValueChange?: (scrollValue: number) => void;
  /**
   * @description.zh 切换视图的回调
   * @description.en The callback of switching the view.
   * @default () => {}
   */
  onChange?: (activeKey?: number | string) => void;
}

export interface TabNavProps {
  /**
   * @description.zh 测试标识
   * @description.en Test identification
   * @default "TabNav"
   */
  tabNavAccessibilityLabel?: string;
  /**
   * @description.zh tab 点击回调
   * @description.en
   * @default null
   */
  onTabClick?: (index: string) => void;
  /**
   * tab滚动数据源
   */
  scrollValue: { addListener: (params: any) => void; _value: Animated.Value };
  /**
   * @description.zh 设置 TabBar 的背景颜色
   * @description.en Set the background color of the TabBar
   * @default undefined
   */
  tabBarBackgroundColor?: string;
  /**
   * @description.zh tab 页
   * @description.en The Tab page
   * @default 5
   */
  page?: number;
  /**
   * @description.zh tab 内容源
   * @description.en The Tab content source
   * @default []
   */
  panels: React.ReactElement[];
  /**
   * @description.zh tab 默认颜色
   * @description.en Default color in tab
   * @default "#333"
   */
  tabDefaultColor?: string;
  /**
   * @description.zh 未激活的文本样式
   * @description.en he text style of the unselected Tab.
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @default undefined
   */
  tabTextStyle?: StyleProp<TextStyle>;
  /**
   * @description.zh 激活的文本样式
   * @description.en The selected text style.
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @default undefined
   */
  tabActiveTextStyle?: StyleProp<TextStyle>;
  /**
   * @description.zh 单个 Tab 的样式
   * @description.en The style of a single tab
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default undefined
   */
  tabStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 设置 TabBar 的下划线样式
   * @description.en Set the underline style of the TabBar.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default undefined
   */
  tabBarUnderlineStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 设置 TabBar 的样式
   * @description.en Set the style of the TabBar
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default undefined
   */
  tabBarStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 设置包裹 TabBar 的容器样式
   * @description.en Set the style of the container that wraps the TabBar
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default undefined
   */
  tabsContainerStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh tabBar 的位置
   * @description.en The position of the tabBar.
   * @default 'top'
   */
  tabBarPosition?: 'top' | 'bottom';
  /**
   * @description.zh 激活值，如果给定了则成为受控组件，需搭配 onChange 使用
   * @description.en Activation value. If the parameter value is set, it becomes a controlled component. It needs to be used with onChange.
   * @default undefined
   */
  activeKey?: string | number;
}

export interface ITabNavState {
  containerWidth: number;
  underlineLeft: Animated.Value;
  underlineWidth: Animated.Value;
}

export interface TabPaneProps extends ViewProps {
  /**
   * @description.zh 嵌套子元素
   * @description.en Nested sub elements
   * @default undefined
   */
  children?: React.ReactNode;
}
