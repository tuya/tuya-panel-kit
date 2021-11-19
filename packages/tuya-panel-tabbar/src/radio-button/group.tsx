import React from 'react';
import { View, Animated, StyleSheet, LayoutRectangle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import RadioButton from './radioButton';
import { IGroupProps, IGroupState } from './interface';

const { convertY } = Utils.RatioUtils;

class Group extends React.PureComponent<IGroupProps, IGroupState> {
  static defaultProps = {
    style: {},
    wrapperStyle: {},
    activeColor: '',
    defaultActiveIndex: 0,
    gutter: 2,
    onChange: null,
    type: 'radio',
  };

  constructor(props) {
    super(props);
    const activeIndex =
      props.activeIndex !== undefined ? props.activeIndex : props.defaultActiveIndex;
    this.state = {
      activeLeft: new Animated.Value(0),
      activeIndex,
      activeViewHidden: true,
      wrapperWidth: 0,
      everyWidth: 0,
      containerHeight: 0,
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
    const { tabs, type, tabTextStyle, tabActiveTextStyle } = this.props;
    const buttonStyle = [{ width: this.state.wrapperWidth / tabs.length }];
    const defaultTextStyle = [{ opacity: this.state.activeViewHidden ? 0 : 1 }];
    const circleStyle = tabTextStyle &&
      tabTextStyle.color && { backgroundColor: tabTextStyle.color };
    return tabs.map((item, index) => {
      const { style, textStyle, ...other } = item;
      return (
        <RadioButton
          activeTextStyle={tabActiveTextStyle}
          circleStyle={circleStyle}
          {...other}
          // eslint-disable-next-line react/no-array-index-key
          key={`tab_${index}`}
          type={type}
          style={[buttonStyle, style]}
          textStyle={[defaultTextStyle, tabTextStyle, textStyle]}
          onItemPress={() => this.changeTab(index, item, item.onItemPress)}
          isActive={this.state.activeIndex === index}
        />
      );
    });
  };

  containerSize: LayoutRectangle;
  wrapperSize: LayoutRectangle;

  moveActiveView = index => {
    const { gutter } = this.props;
    const currentLeft = index * this.state.everyWidth + gutter;
    Animated.spring(this.state.activeLeft, {
      toValue: currentLeft,
      useNativeDriver: true,
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
    const { tabs, gutter } = this.props;
    const everyWidth = this.wrapperSize.width / tabs.length;
    this.state.activeLeft.setValue(gutter + everyWidth * this.state.activeIndex);
    this.setState({
      containerHeight: this.containerSize.height,
      wrapperWidth: this.wrapperSize.width,
      activeViewHidden: false,
      everyWidth,
    });
  };

  render() {
    const { style, wrapperStyle, activeColor, tabs, gutter } = this.props;
    const containerPadding =
      StyleSheet.flatten([styles.containerStyle, style]).borderRadius + gutter;
    const containerStyle = [styles.containerStyle, style, { paddingHorizontal: gutter }];
    const customWrapperStyle = [styles.wrapperStyle, wrapperStyle];
    const activeLeft = { left: this.state.activeLeft };
    const activeViewStyle = [
      styles.activeViewStyle,
      {
        width: this.state.wrapperWidth / tabs.length,
        height: this.state.containerHeight - gutter * 2,
      },
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

const styles = StyleSheet.create({
  activeViewStyle: {
    backgroundColor: '#fff',
    position: 'absolute',
  },
  containerStyle: {
    backgroundColor: '#E3E9EE',
    borderColor: '#fff',
    borderRadius: convertY(15),
    height: convertY(30),
    justifyContent: 'center',
  },
  wrapperStyle: {
    flexDirection: 'row',
  },
});
