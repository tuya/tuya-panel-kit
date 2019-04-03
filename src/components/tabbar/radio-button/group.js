/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ViewPropTypes, Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { RatioUtils } from '../../../utils';
import RadioButton from './radioButton';

const { convertY } = RatioUtils;

const styles = StyleSheet.create({
  activeViewStyle: {
    backgroundColor: '#fff',
    position: 'absolute',
  },
  containerStyle: {
    height: convertY(30),
    borderRadius: convertY(15),
    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
    justifyContent: 'center',
  },
  wrapperStyle: {
    flexDirection: 'row',
  },
});

class Group extends React.PureComponent {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    style: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    activeColor: PropTypes.string,
    // eslint-disable-next-line react/require-default-props
    activeIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    style: {},
    wrapperStyle: {},
    activeColor: '',
    defaultActiveIndex: 0,
    onChange: () => {},
  };
  constructor(props) {
    super(props);
    const activeIndex =
      props.activeIndex !== undefined ? props.activeIndex : props.defaultActiveIndex;
    this.state = {
      activeLeft: new Animated.Value(0),
      activeIndex,
      activeViewHidden: true,
    };
    this.containerSize = null;
    this.wrapperSize = null;
  }
  componentWillReceiveProps(nextProps) {
    if ('activeIndex' in nextProps) {
      this.moveActiveView(nextProps.activeIndex);
    }
  }
  getItem = () => {
    const { tabs } = this.props;
    const buttonStyle = [{ width: this.state.wrapperWidth / tabs.length }];
    const defaultTextStyle = [{ opacity: this.state.activeViewHidden ? 0 : 1 }];
    return tabs.map((item, index) => {
      const { style, textStyle, ...other } = item;
      return (
        <RadioButton
          {...other}
          // eslint-disable-next-line react/no-array-index-key
          key={`tab_${index}`}
          style={[buttonStyle, style]}
          textStyle={[defaultTextStyle, textStyle]}
          onItemPress={() => this.changeTab(index, item, item.onItemPress)}
          isActive={this.state.activeIndex === index}
        />
      );
    });
  };
  moveActiveView = index => {
    const currentLeft = index * this.state.everyWidth + 2;
    Animated.spring(this.state.activeLeft, {
      toValue: currentLeft,
    }).start();
    this.setState({
      activeIndex: index,
    });
  };
  changeTab = (index, item, func) => {
    if (func) func(index);
    if (index === this.state.activeIndex) return;
    const { onChange } = this.props;
    onChange && onChange(index, item);
    if ('activeIndex' in this.props) return;
    this.moveActiveView(index);
  };
  containerLayout = e => {
    this.containerSize = e.nativeEvent.layout;
    this.completeCalcWidth();
  };
  wrapperLayout = e => {
    this.wrapperSize = e.nativeEvent.layout;
    this.completeCalcWidth();
  };
  completeCalcWidth = () => {
    if (!this.wrapperSize || !this.containerSize) return;
    const { tabs } = this.props;
    const everyWidth = this.wrapperSize.width / tabs.length;
    this.state.activeLeft.setValue(2 + everyWidth * this.state.activeIndex);
    this.setState({
      containerHeight: this.containerSize.height,
      wrapperWidth: this.wrapperSize.width,
      activeViewHidden: false,
      everyWidth,
    });
  };
  render() {
    const { style, wrapperStyle, activeColor, tabs } = this.props;
    const containerPadding = StyleSheet.flatten([styles.containerStyle, style]).borderRadius + 2;
    const containerStyle = [styles.containerStyle, style, { paddingHorizontal: 2 }];
    const customWrapperStyle = [styles.wrapperStyle, wrapperStyle];
    const activeLeft = { left: this.state.activeLeft };
    const activeViewStyle = [
      styles.activeViewStyle,
      { width: this.state.wrapperWidth / tabs.length, height: this.state.containerHeight - 4 },
      activeColor && { backgroundColor: activeColor },
      { borderRadius: containerPadding },
      activeLeft,
    ];
    return (
      <View onLayout={this.containerLayout} style={containerStyle}>
        {!this.state.activeViewHidden && <Animated.View style={activeViewStyle} />}
        <View onLayout={this.wrapperLayout} style={customWrapperStyle}>
          {this.getItem()}
        </View>
      </View>
    );
  }
}

export default Group;
