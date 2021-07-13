import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { getCornerDirection } from './config';

export default class Select extends Component {
  static propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
    cornerSize: PropTypes.string,
    customCornerSize: PropTypes.string,
    cornerDirection: PropTypes.string,
    cornerDirectionValue: PropTypes.string,
    cornerColor: PropTypes.string,
    corner: PropTypes.bool,
    listStyle: PropTypes.object,
    cornerStyle: PropTypes.object,
    touchViewStyle: PropTypes.object,
    textStyle: PropTypes.object,
  };

  static defaultProps = {
    data: [],
    onSelect: () => {},
    corner: true,
    cornerSize: 'normal',
    cornerDirection: 'top',
    cornerDirectionValue: '',
    listStyle: {},
    cornerStyle: {},
    touchViewStyle: {},
    textStyle: {},
    cornerColor: '',
    customCornerSize: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      haveImage: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      if (nextProps.data.imageRes) {
        this.setState({
          haveImage: true,
        });
      }
    }
  }

  onSelect(item) {
    this.props.onSelect(item.value);
  }
  renderList() {
    const { data, listStyle, touchViewStyle, textStyle } = this.props;
    return data.map((item, index) => (
      <TouchableOpacity
        accessibilityLabel={`dropdown-listOnclick-${index}`}
        key={item.key}
        onPress={() => this.onSelect(item)}
        style={{
          width: listStyle.width ? listStyle.width : 120,
          height: 40,
          alignItems: 'center',
          borderBottomColor: index === data.length - 1 ? 'transparent' : '#eee',
          borderBottomWidth: 1,
          justifyContent: 'center',
          ...touchViewStyle,
        }}
      >
        <View style={styles.itemStyle}>
          {this.state.haveImage && (
            <View style={styles.imageStyle}>
              {item.imageRes && <Image source={item.imageRes} />}
            </View>
          )}
          <Text style={[styles.textStyle, textStyle]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    ));
  }
  renderCorner() {
    const { cornerDirection, cornerDirectionValue, cornerColor, customCornerSize } = this.props;

    const borderList = getCornerDirection(cornerDirection, cornerColor);
    const { cornerSize, cornerStyle } = this.props;
    const cornerSizeList = {
      small: 0,
      large: 2,
      normal: 1,
    };
    const multiple = customCornerSize ? Number(customCornerSize) : cornerSizeList[cornerSize];
    return (
      <View
        style={[
          {
            width: 0,
            height: 0,
            borderTopWidth: borderList.top + multiple * 2,
            borderTopColor: borderList.topColor,
            borderRightWidth: borderList.right + multiple * 2,
            borderRightColor: borderList.rightColor,
            borderLeftWidth: borderList.left + multiple * 2,
            borderLeftColor: borderList.leftColor,
            borderBottomWidth: borderList.bottom + multiple * 2,
            borderBottomColor: borderList.bottomColor,
            [borderList.cornerDirectionValue.key]:
              cornerDirectionValue === ''
                ? borderList.cornerDirectionValue.value
                : Number(cornerDirectionValue),
          },
          {
            ...cornerStyle,
          },
        ]}
      />
    );
  }
  render() {
    const borderList = getCornerDirection(this.props.cornerDirection);
    const { corner, listStyle, cornerDirection } = this.props;
    return (
      <View style={[borderList.flexValue]}>
        {corner && cornerDirection !== 'right' && this.renderCorner()}
        <View
          style={{
            width: 120,
            backgroundColor: '#fff',
            borderRadius: 6,
            ...listStyle,
          }}
        >
          {this.renderList()}
        </View>
        {this.props.corner && this.props.cornerDirection === 'right' && this.renderCorner()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  imageStyle: {
    width: 40,
    height: 40,
  },
});
