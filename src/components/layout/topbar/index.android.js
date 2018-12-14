/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableHighlight,
  ViewPropTypes,
} from 'react-native';
import Strings from '../../../i18n/strings';
import RefText from '../../TYText';

const { width } = Dimensions.get('window');

const Res = {
  back: require('./common_back_android.png'),
  more: require('./common_more.png'),
};

/**
 * header android
 */
const TopBarHeight = 56;

export default class HeaderView extends Component {
  static propTypes = {
    ...ViewPropTypes,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    isLeftBack: PropTypes.bool,
    leftImage: PropTypes.number,
    leftText: PropTypes.string,
    centerText: PropTypes.string,
    alignCenter: PropTypes.bool,
    rightText: PropTypes.string,
    isRightMore: PropTypes.bool,
    rightImage: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    alignCenter: false,
    style: null,
    textStyle: null,
    isLeftBack: true,
    leftImage: null,
    leftText: '',
    centerText: '',
    isRightMore: true,
    rightText: '',
    rightImage: null,
    onChange: null,
  };

  static TopBarHeight = TopBarHeight;

  constructor(props) {
    super(props);

    this.renderLeftItem = this._renderLeftItem.bind(this);
    this.renderCenterItem = this._renderCenterItem.bind(this);
    this.renderRightItem = this._renderRightItem.bind(this);
  }

  _renderLeftItem() {
    let { leftText } = this.props;
    const { isLeftBack, leftImage } = this.props;

    let source = null;

    const textStyle = StyleSheet.flatten([styles.text, this.props.textStyle]);

    const hasLeftText = leftText !== undefined && leftText !== null;

    if (isLeftBack) {
      source = Res.back;
      leftText = hasLeftText ? leftText : Strings.back;
    }

    if (leftImage) {
      source = leftImage;
    }

    if (source || hasLeftText) {
      return (
        <TouchableHighlight
          onPress={this._onChange.bind(this, 'left')}
          underlayColor="transparent"
        >
          <View style={styles.leftItem}>
            {source &&
              <Image
                style={{
                  width: 16,
                  tintColor: textStyle.color,
                  marginRight: 10,
                }}
                resizeMode="contain"
                source={source}
              />
            }
            {hasLeftText &&
              <View style={[styles.textContainer, { marginRight: 20 }]}>
                <RefText style={textStyle}>{leftText}</RefText>
              </View>
            }
          </View>
        </TouchableHighlight>
      );
    }
  }

  _renderCenterItem() {
    const {
      centerText,
      isLeftBack,
      leftText,
      leftItem,
      alignCenter,
      hasLeftText,
      textStyle,
    } = this.props;
    const isPadding = isLeftBack || leftText || leftItem || alignCenter ? {} : { paddingLeft: 10 };

    return (
      <View
        style={[
          styles.centerItem,
          isPadding,
          alignCenter && {
            alignItems: 'center',
            position: 'absolute',
            left: hasLeftText ? 100 : 70,
            top: 0,
            right: 100,
            bottom: 0,
            width: width - (hasLeftText ? 200 : 140),
          },
        ]}
        pointerEvents="none"
      >
        <RefText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.text, textStyle]}
        >{centerText}
        </RefText>
      </View>
    );
  }

  _renderRightItem() {
    const { rightImage, rightText, isRightMore } = this.props;
    let source = null;
    const textStyle = StyleSheet.flatten([styles.text, this.props.textStyle]);
    if (isRightMore) { source = Res.more; }

    if (rightImage) { source = rightImage; }

    if (source || rightText) {
      return (
        <TouchableHighlight
          onPress={this._onChange.bind(this, 'right')}
          underlayColor="transparent"
        >
          <View style={styles.rightItem}>
            {rightText ?
              <View style={[styles.textContainer, { marginLeft: 20 }]}>
                <RefText style={textStyle}>{rightText}</RefText>
              </View> : null
            }
            {source &&
              <Image
                source={source}
                resizeMode="contain"
                style={{
                  tintColor: textStyle.color,
                  marginLeft: 10,
                }}
              />
            }
          </View>
        </TouchableHighlight>
      );
    }
  }

  _onChange(tab) {
    if (this.props.onChange) {
      this.props.onChange(tab);
    }
  }

  render() {
    const { alignCenter } = this.props;
    return (
      <View style={[this.props.style, styles.container]}>
        {alignCenter ? this.renderCenterItem() : this.renderLeftItem()}
        {alignCenter ? this.renderLeftItem() : this.renderCenterItem()}
        {this.renderRightItem()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: TopBarHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  leftItem: {
    height: TopBarHeight,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    paddingLeft: 20,
  },

  centerItem: {
    height: TopBarHeight,
    justifyContent: 'center',
    width: (width - 70 * 2),
  },

  rightItem: {
    height: TopBarHeight,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
  },

  text: {
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'transparent',
  },

  textContainer: {
    // paddingHorizontal: 10,
  },
});
