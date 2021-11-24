import React from 'react';
import {
  View,
  ScrollView,
  Animated,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import { Utils } from 'tuya-panel-utils';
import TYText from 'tuya-panel-text';
import wrapper from './tabHoc';
import { TabBarProps, ITabBarState, CompositeAnimation } from './interface';

const { convertX, winWidth } = Utils.RatioUtils;

class TabBar extends React.PureComponent<TabBarProps, ITabBarState> {
  static defaultProps = {
    underlineStyle: {},
    defaultActiveKey: 0,
    tabs: [],
    tabStyle: {},
    tabActiveStyle: {},
    tabTextStyle: {},
    tabActiveTextStyle: {},
    wrapperStyle: {},
    style: {},
    onChange: null,
    isUnderlineCenter: true,
    isVibration: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.activeKey || props.defaultActiveKey,
      underlineLeft: new Animated.Value(0),
      underlineWidth: new Animated.Value(0),
    };
    this.tab = [];
    this.tabBar = null;
    this.getActiveIndexByKey(this.state.activeKey);
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      if (nextProps.activeKey === this.state.activeKey) return;
      this.getActiveIndexByKey(nextProps.activeKey);
      this.setState({ activeKey: nextProps.activeKey }, () => {
        this.updateView(false);
      });
    }
  }

  onTabClick = (key, callback) => {
    const { onChange, isVibration } = this.props;
    if (!('activeKey' in this.props)) {
      this.setState({ activeKey: key }, () => {
        this.updateView(false);
      });
    }
    if (NativeModules.TYRCTHapticsManager && isVibration) {
      NativeModules.TYRCTHapticsManager.selection();
    }
    onChange && onChange(key);
    callback && callback(key);
  };

  getTabs = () => {
    const { tabs, tabStyle, tabActiveStyle, tabTextStyle, tabActiveTextStyle } = this.props;
    const { activeKey } = this.state;
    return tabs.map((tab, index) => {
      const tabKey = typeof tab.key === 'undefined' ? `tab_${index}` : tab.key;
      const isActive = tabKey === activeKey;
      const style = [
        styles.tabStyle,
        tabStyle,
        tab.style && tab.style,
        isActive && tabActiveStyle,
        isActive && tab.activeStyle && tab.activeStyle,
      ];
      const textStyle = [
        styles.tabTextStyle,
        tabTextStyle,
        tab.textStyle && tab.textStyle,
        isActive && styles.tabTextActiveStyle,
        isActive && tabActiveTextStyle,
        isActive && tab.activeTextStyle && tab.activeTextStyle,
      ];
      const { title } = tab;
      return (
        <TouchableOpacity
          key={tabKey}
          style={style}
          onPress={() => this.onTabClick(tabKey, tab.onPress)}
          onLayout={e => this.tabLayout(index, e)}
          accessibilityLabel={tab.accessibilityLabel}
        >
          {typeof title !== 'string' ? (
            title
          ) : (
            <TYText style={textStyle} accessibilityLabel={tab.textAccessibilityLabel}>
              {title}
            </TYText>
          )}
        </TouchableOpacity>
      );
    });
  };

  getUnderline = () => {
    const { underlineStyle } = this.props;
    const { underlineLeft, underlineWidth } = this.state;
    const style = [
      styles.underlineStyle,
      { width: underlineWidth },
      underlineStyle,
      { left: underlineLeft },
    ];
    return <Animated.View style={style} />;
  };

  setRef = ref => {
    this.scrollView = ref;
  };

  getActiveIndexByKey = activeKey => {
    const { tabs } = this.props;
    let activeIndex = 0;
    for (let i = 0; i < tabs.length; i++) {
      const tabKey = typeof tabs[i].key !== 'undefined' ? tabs[i].key : `tab_${i}`;
      if (activeKey === tabKey) {
        activeIndex = i;
        break;
      }
    }
    this.activeIndex = activeIndex;
  };

  tab: { left: number; width: number; right: number; height: number }[];
  activeIndex: number;
  tabBarContainerWidth: number;
  scrollView: any;
  tabBar: { width: number };
  underlineLeftAnimation: CompositeAnimation;
  underlineWidthAnimation: CompositeAnimation;

  updateScrollView = isSysUpdate => {
    const { left, width } = this.tab[this.activeIndex];
    const tempWidth = this.tabBarContainerWidth - width;
    const newScrollX = Math.max(Math.min(left - tempWidth / 2, this.tabBar.width - winWidth), 0);
    this.scrollView.scrollTo({ x: newScrollX, y: 0, animated: !isSysUpdate });
  };

  updateUnderline = isSysUpdate => {
    const { underlineStyle, isUnderlineCenter } = this.props;
    const underLineWidth = StyleSheet.flatten([styles.underlineStyle, underlineStyle]).width;
    this.underlineLeftAnimation && this.underlineLeftAnimation.stop();
    this.underlineWidthAnimation && this.underlineWidthAnimation.stop();
    let { left } = this.tab[this.activeIndex];
    const { width } = this.tab[this.activeIndex];
    if (isUnderlineCenter) {
      left += (width - Number(underLineWidth)) / 2;
    }
    if (isSysUpdate) {
      this.state.underlineLeft.setValue(left);
      this.state.underlineWidth.setValue(width);
    } else {
      this.underlineLeftAnimation = Animated.timing(this.state.underlineLeft, {
        toValue: left,
        duration: 200,
        useNativeDriver: false,
      });
      this.underlineWidthAnimation = Animated.timing(this.state.underlineWidth, {
        toValue: width,
        duration: 200,
        useNativeDriver: false,
      });
      this.underlineLeftAnimation.start();
      this.underlineWidthAnimation.start();
    }
  };

  updateView = isSysUpdate => {
    const { tabs } = this.props;
    if (!this.tabBar) return;
    if (!this.tabBarContainerWidth) return;
    if (this.tab.length <= 0) return;
    const tabIsReady = this.tab.filter(value => value).length === tabs.length;
    if (tabIsReady) {
      this.updateScrollView(isSysUpdate);
      this.updateUnderline(isSysUpdate);
    }
  };

  tabBarContainerLayout = e => {
    this.tabBarContainerWidth = e.nativeEvent.layout.width;
    this.updateView(true);
  };

  tabBarLayout = e => {
    this.tabBar = e.nativeEvent.layout;
    this.updateView(true);
  };

  tabLayout = (index, e) => {
    const { x, width, height } = e.nativeEvent.layout;
    this.tab[index] = { left: x, right: x + width, width, height };
    this.updateView(true);
  };

  render() {
    const { wrapperStyle, style } = this.props;
    const cWrapperStyle = [styles.tabContainerStyle, wrapperStyle];
    const cStyle = [styles.tabWrapperStyle, style];
    return (
      <View style={cStyle} onLayout={this.tabBarContainerLayout}>
        <ScrollView ref={this.setRef} showsHorizontalScrollIndicator={false} horizontal>
          <View onLayout={this.tabBarLayout} style={cWrapperStyle}>
            {this.getTabs()}
          </View>
          {this.getUnderline()}
        </ScrollView>
      </View>
    );
  }
}

export default wrapper(TabBar);

const styles = StyleSheet.create({
  tabContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabStyle: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 43,
    justifyContent: 'center',
    width: convertX(80),
  },
  tabTextActiveStyle: {
    color: '#108ee9',
  },
  tabTextStyle: {
    color: '#333',
    fontSize: 16,
  },
  tabWrapperStyle: {
    backgroundColor: '#fff',
  },
  underlineStyle: {
    backgroundColor: '#108ee9',
    bottom: 0,
    height: 2,
    position: 'absolute',
    width: convertX(80),
  },
});
