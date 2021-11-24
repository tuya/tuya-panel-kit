import React from 'react';
import { View, Dimensions, StyleSheet, Animated, NativeModules } from 'react-native';

import TabContent from './tabContent';
import TabBar from './tabNav';
import TabPane from './tabPane';
import Utils from './utils';
import { TabProps, TabState } from './interface';

class Tabs extends React.Component<TabProps, TabState> {
  static defaultProps = {
    swipeable: true,
    animated: true,
    onChange: () => null,
    tabDefaultColor: '#333',
    tabBarPosition: 'top',
    tabNavAccessibilityLabel: 'TabNav',
    useViewPagerOnAndroid: true,
    isVibration: true,
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
    const { isVibration } = this.props;
    // @ts-ignore
    const activeKey = Utils.toArray(this.props.children)[activeIndex].key;
    if (this.state.activeKey !== activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({
          activeKey,
        });
      }
      if (NativeModules.TYRCTHapticsManager && isVibration) {
        NativeModules.TYRCTHapticsManager.selection();
      }
      this.props.onChange && this.props.onChange(activeKey);
    }
  };

  static TabPane = TabPane;
  tabContent: { scrollTo: (index: number, bool: boolean) => void };
  tabBar: any;

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
        // @ts-ignore
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
