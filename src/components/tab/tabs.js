/* eslint-disable prettier/prettier */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, StyleSheet, ViewPropTypes, Animated, Text } from 'react-native';

import TabContent from './tabContent';
import TabBar from './tabNav';
import TabPane from './tabPane';
import Utils from './utils';

class Tabs extends React.Component {
  static TabPane = TabPane;
  static defaultProps = {
    swipeable: true,
    animated: true,
    onChange: () => {},
    tabDefaultColor: '#333',
    tabBarPosition: 'top',
    tabNavAccessibilityLabel: 'TabNav',
    useViewPagerOnAndroid: true,
  };

  static propTypes = {
    /**
     * 是否可滑动视图
     */
    swipeable: PropTypes.bool,
    /**
     * 切换视图是否有动画
     */
    animated: PropTypes.bool,
    /**
     * 所激活视图的key
     */
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * 默认激活视图的key
     */
    defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * 切换视图的回调
     */
    onChange: PropTypes.func,
    /**
     * 嵌套子元素
     */
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    /**
     * 设置tabContent的样式
     */
    tabContentStyle: ViewPropTypes.style,
    /**
     * tab默认颜色
     */
    tabDefaultColor: PropTypes.string,
    /**
     * 设置tabBar的背景颜色
     */
    tabBarBackgroundColor: PropTypes.string,
    /**
     * 设置tabBar的下划线样式
     */
    tabBarUnderlineStyle: ViewPropTypes.style,
    /**
     * 设置tabBar的样式
     */
    tabBarStyle: ViewPropTypes.style,
    /**
     * 设置tab内文字样式
     */
    tabTextStyle: Text.propTypes.style,
    /**
     * 设置激活的tab内文字样式
     */
    tabActiveTextStyle: Text.propTypes.style,
    /**
     * 设置包裹tabBar的容器样式
     */
    tabsContainerStyle: ViewPropTypes.style,
    /**
     * 设置每个tab的样式
     */
    tabStyle: ViewPropTypes.style,
    /**
     * 包裹tab的容器样式
     */
    style: ViewPropTypes.style,
    /**
     * tabBar的位置
     */
    tabBarPosition: PropTypes.oneOf(['top', 'bottom']),
    /**
     * 测试标志
     */
    tabNavAccessibilityLabel: PropTypes.string,
    /**
     * 是否在安卓上使用viewPager
     */
    useViewPagerOnAndroid: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    let activeKey;
    if ('activeKey' in props) {
      // eslint-disable-next-line prefer-destructuring
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    }
    const containerWidth = Dimensions.get('window').width;
    const activeIndex = Utils.getActiveIndex(props.children, activeKey);
    this.state = {
      activeKey,
      scrollValue: new Animated.Value(activeIndex > 0 ? activeIndex : 0),
      containerWidth,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: nextProps.activeKey,
      });
    } else if (!Utils.activeKeyIsValid(nextProps.children, this.state.activeKey)) {
      this.setState({
        activeKey: Utils.getDefaultActiveKey(nextProps.children),
      });
    }
  }

  onScrollValueChange = scrollValue => {
    this.state.scrollValue.setValue(scrollValue);
  };

  onLayout = e => {
    const { width } = e.nativeEvent.layout;
    let { containerWidth } = this.state;
    if (Math.round(width) !== Math.round(this.state.containerWidth)) {
      containerWidth = width;
    }
    this.setState(
      {
        containerWidth,
      },
      () => {
        const index = Utils.getActiveIndex(this.props.children, this.state.activeKey);
        // eslint-disable-next-line no-undef
        requestAnimationFrame(() => {
          this.tabContent && this.tabContent.scrollTo(index, false);
        });
      }
    );
  };

  setActiveTab = activeIndex => {
    const activeKey = Utils.toArray(this.props.children)[activeIndex].key;
    if (this.state.activeKey !== activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({
          activeKey,
        });
      }
      this.props.onChange && this.props.onChange(activeKey);
    }
  };

  renderTabContent() {
    const { children, animated, swipeable, useViewPagerOnAndroid, tabContentStyle } = this.props;
    return (
      <TabContent
        ref={content => {
          this.tabContent = content;
        }}
        key="tabContent"
        panels={children}
        activeKey={this.state.activeKey}
        onScrollValueChange={this.onScrollValueChange}
        onChange={this.setActiveTab}
        containerWidth={this.state.containerWidth}
        animated={animated}
        swipeable={swipeable}
        scrollValue={this.state.scrollValue}
        useViewPagerOnAndroid={useViewPagerOnAndroid}
        style={tabContentStyle}
      />
    );
  }

  renderTabBar() {
    const {
      children,
      tabDefaultColor,
      tabBarUnderlineStyle,
      tabBarBackgroundColor,
      tabsContainerStyle,
      tabTextStyle,
      tabStyle,
      tabBarStyle,
      tabActiveTextStyle,
      tabBarPosition,
      tabNavAccessibilityLabel,
    } = this.props;
    return (
      <TabBar
        ref={bar => {
          this.tabBar = bar;
        }}
        key="tabBar"
        onTabClick={this.setActiveTab}
        panels={children}
        activeKey={this.state.activeKey}
        scrollValue={this.state.scrollValue}
        tabDefaultColor={tabDefaultColor}
        tabTextStyle={tabTextStyle}
        tabBarUnderlineStyle={tabBarUnderlineStyle}
        tabBarBackgroundColor={tabBarBackgroundColor}
        tabsContainerStyle={tabsContainerStyle}
        tabStyle={tabStyle}
        tabBarStyle={tabBarStyle}
        tabActiveTextStyle={tabActiveTextStyle}
        tabBarPosition={tabBarPosition}
        tabNavAccessibilityLabel={tabNavAccessibilityLabel}
      />
    );
  }

  render() {
    const { tabBarPosition } = this.props;
    const content = [this.renderTabBar(), this.renderTabContent()];
    return (
      <View onLayout={this.onLayout} style={[styles.container, this.props.style]}>
        {tabBarPosition === 'top' ? content : content.reverse()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Tabs;
