/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Animated,
  ViewPropTypes,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { RatioUtils } from '../../utils';
import TYText from '../TYText';
import wrapper from './tabHoc';

const { convertX } = RatioUtils;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  underlineStyle: {
    height: 2,
    backgroundColor: '#108ee9',
    width: convertX(80),
    position: 'absolute',
    bottom: 0,
  },
  tabContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 43,
    backgroundColor: '#fff',
    width: convertX(80),
  },
  tabTextStyle: {
    color: '#333',
    fontSize: 16,
  },
  tabTextActiveStyle: {
    color: '#108ee9',
  },
  tabWrapperStyle: {
    backgroundColor: '#fff',
  },
});

class TabBar extends React.PureComponent {
  static propTypes = {
    underlineStyle: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    tabActiveStyle: ViewPropTypes.style,
    tabTextStyle: Text.propTypes.style,
    tabActiveTextStyle: Text.propTypes.style,
    wrapperStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,

    // eslint-disable-next-line react/require-default-props
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tabs: PropTypes.array,
    isUnderlineCenter: PropTypes.bool,

    onChange: PropTypes.func,
  };
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
    onChange: () => {},
    isUnderlineCenter: true,
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
      console.log(nextProps.activeKey);
      this.getActiveIndexByKey(nextProps.activeKey);
      console.log(this.activeIndex);
      this.setState({ activeKey: nextProps.activeKey }, () => {
        this.updateView(false);
      });
    }
  }
  onTabClick = (key, callback) => {
    const { onChange } = this.props;
    if (!('activeKey' in this.props)) {
      this.setState({ activeKey: key }, () => {
        this.updateView(false);
      });
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
  updateScrollView = isSysUpdate => {
    const { left, width } = this.tab[this.activeIndex];
    const tempWidth = this.tabBarContainerWidth - width;
    const newScrollX = Math.max(Math.min(left - tempWidth / 2, this.tabBar.width - WIDTH), 0);
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
      left += (width - underLineWidth) / 2;
    }
    if (isSysUpdate) {
      this.state.underlineLeft.setValue(left);
      this.state.underlineWidth.setValue(width);
    } else {
      this.underlineLeftAnimation = Animated.timing(this.state.underlineLeft, {
        toValue: left,
        duration: 200,
      });
      this.underlineWidthAnimation = Animated.timing(this.state.underlineWidth, {
        toValue: width,
        duration: 200,
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
        <ScrollView ref={this.setRef} showsHorizontalScrollIndicator={false} horizontal={true}>
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
