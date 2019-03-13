import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  Dimensions,
  ViewPropTypes,
  Platform,
} from 'react-native';
import Strings from '../../../i18n/strings';
import RefText from '../../TYText';

const { width, height } = Dimensions.get('window');

// iPhone X
const IphoneX = !!(Platform.OS === 'ios' && height >= 812);

const Res = {
  back: require('./common_back_ios.png'),
  more: require('./common_more.png'),
};

/**
 * header ios
 */
const TopBarHeight = IphoneX ? 88 : 64;

/* eslint-disable prefer-const, react/jsx-no-bind */
export default class HeaderView extends Component {
  static propTypes = {
    ...ViewPropTypes,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    isLeftBack: PropTypes.bool,
    leftImage: PropTypes.number,
    leftText: PropTypes.string,
    centerText: PropTypes.string,
    rightText: PropTypes.string,
    isRightMore: PropTypes.bool,
    rightImage: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
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
    let { isLeftBack, leftImage, leftText } = this.props;

    let source = null;

    const textStyle = StyleSheet.flatten([styles.text, this.props.textStyle]);

    let hasLeftText = leftText !== undefined && leftText !== null;

    if (isLeftBack) {
      source = Res.back;
      leftText = hasLeftText ? leftText : Strings.back;
      hasLeftText = true;
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
                source={source}
                style={{
                  tintColor: textStyle.color,
                  marginRight: 4,
                }}
              />
            }
            <View style={styles.textContainer}>
              <RefText style={[styles.text, textStyle]}>{leftText}</RefText>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
  }

  _renderCenterItem() {
    const { centerText } = this.props;
    if (centerText) {
      return (
        <View
          style={styles.centerItem}
          pointerEvents="none"
        >
          <RefText style={[styles.text, this.props.textStyle]} numberOfLines={1}>
            {centerText}
          </RefText>
        </View>
      );
    }
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
              <View style={styles.textContainer}>
                <RefText style={textStyle}>{rightText}</RefText>
              </View> : null
            }
            {source &&
              <Image
                style={{
                  tintColor: textStyle.color,
                  marginLeft: 4
                }}
                resizeMode="contain"
                source={source}
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
    return (
      <View style={[this.props.style, styles.container]}>
        {this.renderCenterItem()}
        <View style={styles.mainContainer}>
          {this.renderLeftItem()}
          {this.renderRightItem()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: IphoneX ? 88 : 64,
  },

  mainContainer: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: IphoneX ? 44 : 20,
  },

  leftItem: {
    height: 44,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 12,
  },

  centerItem: {
    height: 44,
    width: (width - 70 * 2),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 70,
    right: 70,
    top: IphoneX ? 44 : 20,
  },

  rightItem: {
    height: 44,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
  },

  text: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
  },

  textContainer: {
    alignItems: 'center',
    // backgroundColor: 'red'
  },
});
