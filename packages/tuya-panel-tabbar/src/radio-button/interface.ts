import { StyleProp, ViewStyle, TextStyle, Animated } from 'react-native';

export interface TabBarArr {
  /**
   * @description.zh 标识符
   * @description.en Tab content style
   * @default undefined
   */
  accessibilityLabel?: string;
  /**
   * @description.zh 文字标识符
   * @description.en Tab content style
   * @default undefined
   */
  textAccessibilityLabel?: string;
  /**
   * @description.zh Tab 内容样式
   * @description.en Tab content style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 激活的 Tab 样式
   * @description.en Active tab style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default undefined
   */
  activeStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 文本样式
   * @description.en Text style
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @default undefined
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * @description.zh 激活状态下的文本样式
   * @description.en Active text style
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @default undefined
   */
  activeTextStyle?: StyleProp<TextStyle>;
  /**
   * @description.zh 索引值
   * @description.en Key Value
   * @default undefined
   */
  key: string;
  /**
   * @description.zh Tab 里文本
   * @description.en Text in tab
   * @default undefined
   */
  title: string;
  /**
   * @description.zh 触发单个 Tab 点击回调
   * @description.en Trigger a single tab click callback
   * @default () => {}
   */
  onPress?: (index: string) => void;
  /**
   * @description.zh 当 type: 'radio' 时，触发单个 Tab 点击回调
   * @description.en When type: 'radio', a single tab click callback is triggered
   * @default () => {}
   */
  onItemPress?: () => void;
}

export interface IGroupProps {
  /**
   * @description.zh 数据源
   * @description.en data Source
   * @types <a target='_blank' href='https://github.com/tuya/DefinitelyTyped/blob/3a07a00d4e5e3400adeee9c4857b5799d41e53d7/types/tuya-panel-kit/index.d.ts#L7047'>TabBarArr[]</a>
   * @default []
   */
  tabs: TabBarArr[];
  /**
   * @description.zh Tab 内容样式
   * @description.en Tab content style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh Tab 内层容器样式
   * @description.en Tab inner container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default {}
   */
  wrapperStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 当 type: 'radio' 时，激活 Tab 的背景色
   * @description.en When type: 'radio', activate the background color of tab
   * @default ''
   */
  activeColor?: string;
  /**
   * @description.zh 当 type: 'radio' 时，激活索引值 （如果给定了则成为受控组件）
   * @description.en When type: 'radio', activate the index value (if given, it becomes a controlled component)
   * @default 0
   */
  activeIndex?: number;
  /**
   * @description.zh 当 type: 'radio' 时，默认高亮 tab 的索引值
   * @description.en When type: 'radio', the index value of the highlighted tab is highlighted by default
   * @default 0
   */
  defaultActiveIndex?: number;
  /**
   * @description.zh 制表符间距
   * @description.en The spacing between tab
   * @default 2
   */
  gutter?: number;
  /**
   * @description.zh Tab 切换的回调
   * @description.en Callback of tab switching.
   * @default () => {}
   */
  onChange?: (index: string, tab: TabBarArr) => void;
  /**
   * @description.zh 类型
   * @description.en Tab type
   * @default undefined
   */
  type?: 'radio' | 'radioCircle' | string;
  /**
   * @description.zh 未激活的文本样式
   * @description.en he text style of the unselected Tab.
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @default {}
   */
  tabTextStyle?: TextStyle;
  /**
   * @description.zh 激活的文本样式
   * @description.en The selected text style.
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue {}
   */
  tabActiveTextStyle?: StyleProp<TextStyle>;
}

export interface IRadioButtonProps {
  title?: string;
  isActive?: boolean;
  accessibilityLabel?: string;
  textAccessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  onItemPress?: () => void;
  type?: 'radio' | 'radioCircle' | string;
  circleStyle?: StyleProp<TextStyle>;
}

export interface IGroupState {
  activeLeft: Animated.Value;
  activeIndex: number;
  activeViewHidden: boolean;
  wrapperWidth: number;
  everyWidth: number;
  containerHeight: number;
}
