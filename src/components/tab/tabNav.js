/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View, ScrollView,
  TouchableOpacity,
  Text, StyleSheet,
  Dimensions, Animated,
  Platform, ViewPropTypes
} from 'react-native';
import Utils from './utils';
import { RatioUtils } from '../../utils';

const { convert } = RatioUtils;

class TabBar extends React.Component {
  static defaultProps = {
    tabBarBackgroundColor: '#fff',
    page: 5,
    tabDefaultColor: '#333',
    tabTextStyle: {},
    tabStyle: {},
    tabActiveTextStyle: {},
    tabBarUnderlineStyle: {},
    tabBarStyle: {},
    tabsContainerStyle: {},
  }

  static propTypes = {
    onTabClick: PropTypes.func.isRequired,
    scrollValue: PropTypes.object.isRequired,
    tabBarBackgroundColor: PropTypes.string,
    page: PropTypes.number,
    panels: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    tabDefaultColor: PropTypes.string,
    tabTextStyle: Text.propTypes.style,
    tabActiveTextStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    tabBarUnderlineStyle: ViewPropTypes.style,
    tabBarStyle: ViewPropTypes.style,
    tabsContainerStyle: ViewPropTypes.style,
  }

  constructor(props) {
    super(props);
    this.state = {
      containerWidth: Dimensions.get('window').width,
      tabContainerWidth: Dimensions.get('window').width,
      underlineLeft: new Animated.Value(0),
      underlineWidth: new Animated.Value(0),
    };
    this._tabsMeasurements = [];
  }

  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
  }

  onPress = index => {
    const { onTabClick } = this.props;
    onTabClick && onTabClick(index);
  }

  onTabLayout = (page, event) => {
    const { x, width, height, } = event.nativeEvent.layout;
    this._tabsMeasurements[page] = { left: x, right: x + width, width, height };
    this.updateView({ value: this.props.scrollValue._value });
  }

  onContainerLayout = e => {
    this._containerLayout = e.nativeEvent.layout;
    this.setState({ containerWidth: this._containerLayout.width });
    this.updateView({ value: this.props.scrollValue._value });
  }

  onTabContainerLayout = e => {
    this._tabContainerLayout = e.nativeEvent.layout;
    let { width } = this._tabContainerLayout;
    if (width < Dimensions.get('window').width) {
      // eslint-disable-next-line prefer-destructuring
      width = Dimensions.get('window').width;
    }
    this.setState({ tabContainerWidth: width });
    this.updateView({ value: this.props.scrollValue._value });
  }

  getTabs = () => {
    const {
      panels, activeKey,
      tabDefaultColor,
      tabTextStyle, tabStyle,
      tabActiveTextStyle,
      page
    } = this.props;
    return React.Children.map(panels, (child, index) => {
      if (!child) return;
      const isActive = activeKey === child.key;
      // eslint-disable-next-line max-len
      const tabWidth = child.props.tabWidth ? child.props.tabWidth : this.state.containerWidth / Math.min(page, panels.length);
      const realTabStyle = [styles.tab, tabStyle, { width: tabWidth }];
      const finalTabTextStyle = [
        styles.tabText,
        tabDefaultColor && { color: tabDefaultColor },
        tabTextStyle,
        isActive && styles.activeText,
        isActive && tabActiveTextStyle,
      ];
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.onPress(index)}
          key={index}
          style={tabStyle}
          onLayout={e => this.onTabLayout(index, e)}
        >
          <View style={realTabStyle}>
            {
              typeof child.props.tab === 'string' ? (
                <Text numberOfLines={1} style={finalTabTextStyle}>{child.props.tab}</Text>
              ) : child.props.tab
            }
          </View>
        </TouchableOpacity>
      );
    });
  }

  getUnderLine = () => {
    const { tabBarUnderlineStyle } = this.props;
    const tabUnderlineStyle = [
      { position: 'absolute', bottom: 0 },
      styles.underline,
      tabBarUnderlineStyle,
      { left: this.state.underlineLeft, width: this.state.underlineWidth },
    ];
    return (
      <Animated.View style={tabUnderlineStyle} />
    );
  }

  updateTabUnderline = (page, offset, count) => {
    const { left, right } = this._tabsMeasurements[page];
    if (page === count - 1) {
      this.state.underlineLeft.setValue(left);
      this.state.underlineWidth.setValue(right - left);
      return;
    }
    if (page >= 0 && page <= count - 1) {
      const nowLeft = left;
      const nextTabLeft = this._tabsMeasurements[page + 1].left;
      const newLineLeft = offset * nextTabLeft + (1 - offset) * nowLeft;

      const nowRight = right;
      const nextTabRight = this._tabsMeasurements[page + 1].right;
      const newLineRight = offset * nextTabRight + (1 - offset) * nowRight;
      this.state.underlineWidth.setValue(newLineRight - newLineLeft);
      this.state.underlineLeft.setValue(newLineLeft);
    }
  }

  updateTabPanel = (page, offset) => {
    const containerWidth = this._containerLayout.width;
    const tabWidth = this._tabsMeasurements[page].width;
    const nextTabMeasurements = this._tabsMeasurements[page + 1];
    const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
    const tabOffset = this._tabsMeasurements[page].left;
    const absolutePageOffset = offset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    newScrollX -= (containerWidth - (1 - offset) * tabWidth - offset * nextTabWidth) / 2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;
    if (Platform.OS === 'android') {
      this.scrollView.scrollTo({ x: newScrollX, y: 0, animated: true });
    } else {
      // eslint-disable-next-line max-len
      const rightBoundScroll = Math.max(this._tabContainerLayout.width - (this._containerLayout.width), 0);
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this.scrollView.scrollTo({ x: newScrollX, y: 0, animated: true });
    }
  }

  measureIsReady = (page, isLastTab) => {
    return this._tabsMeasurements[page] &&
      (isLastTab || this._tabsMeasurements[page + 1]) &&
      this._tabContainerLayout &&
      this._containerLayout;
  }

  updateView = offset => {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = Utils.toArray(this.props.panels).length;
    const lastTabPosition = tabCount - 1;
    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return;
    }
    if (this.measureIsReady(position, position === lastTabPosition)) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  }

  render() {
    const {
      panels, activeKey,
      tabBarStyle,
      tabsContainerStyle,
      tabBarBackgroundColor
    } = this.props;
    const page = Utils.getActiveIndex(panels, activeKey);
    return (
      <View
        onLayout={this.onContainerLayout}
        style={[styles.container, tabBarStyle]}
      >
        <ScrollView
          ref={scrollView => { this.scrollView = scrollView; }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          bounces={false}
          scrollsToTop={false}
          scrollEnabled={panels.length > page}
        >
          <View
            onLayout={this.onTabContainerLayout}
            // eslint-disable-next-line max-len
            style={[styles.tabContainer, tabsContainerStyle, { backgroundColor: tabBarBackgroundColor }]}
          >
            { this.getTabs() }
            { this.getUnderLine() }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: convert(43.5),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    height: convert(43.5),
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  tab: {
    height: convert(43.5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: convert(2),
    paddingLeft: convert(2),
    flexDirection: 'row'
  },
  tabText: {
    fontSize: convert(15),
    color: '#000',
  },
  activeText: {
    color: '#108ee9'
  },
  underline: {
    height: convert(2),
    backgroundColor: '#108ee9',
  }
});

export default TabBar;
