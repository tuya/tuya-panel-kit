import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';
import IconFont from '../iconfont';
import { RatioUtils } from '../../utils';

const {
  convertX: cx,
  convertY: cy,
} = RatioUtils;

/* eslint-disable max-len, new-cap */
const icons = {
  arrow:
    'M225.63428295 804.43206399l76.86470558 76.86470558 499.4418311-499.44183112-499.4418311-499.44183111-76.86470558 76.86470558 422.57712554 422.57712553-422.57712554 422.57712554z',
};

export default class TYListItem extends Component {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    styles: PropTypes.shape({
      container: ViewPropTypes.style,
      content: ViewPropTypes.style,
      contentLeft: ViewPropTypes.style,
      contentCenter: ViewPropTypes.style,
      contentRight: ViewPropTypes.style,
      title: Text.propTypes.style,
      subTitle: Text.propTypes.style,
    }),
    arrow: PropTypes.bool,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    Icon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
    Action: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
    needUpdate: PropTypes.bool,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    styles: {},
    arrow: false,
    disabled: false,
    title: null,
    subTitle: null,
    Icon: null,
    Action: null,
    needUpdate: true,
    onPress: null,
  };

  constructor(props) {
    super(props);
    this._styles = [
      'container',
      'content',
      'contentLeft',
      'contentCenter',
      'contentRight',
      'title',
      'subTitle',
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.needUpdate) {
      return false;
    }
    return shallowCompare(this, nextProps, nextState);
  }

  // merge style
  getStyle(key) {
    const { styles } = this.props;
    const defaultStyle = defaultStyles[key];
    const style = styles && styles[key];
    return [defaultStyle, style];
  }

  render() {
    const {
      styles, // eslint-disable-line no-unused-vars
      arrow,
      disabled,
      Icon,
      title,
      subTitle,
      Action,
      onPress,
      onActionPress,
      ...touchProps
    } = this.props;
    const [
      containerStyle,
      contentStyle,
      contentLeftStyle,
      contentCenterStyle,
      contentRightStyle,
      titleStyle,
      subTitleStyle,
    ] = this._styles.map(key => this.getStyle(key));
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={containerStyle}
        disabled={disabled}
        onPress={onPress}
        {...touchProps}
      >
        <View style={contentStyle}>
          {Icon && (
            <View style={contentLeftStyle}>{typeof Icon === 'function' ? Icon() : Icon}</View>
          )}
          <View style={contentCenterStyle}>
            {!!title && (
              <Text numberOfLines={1} style={titleStyle}>
                {title}
              </Text>
            )}
            {!!subTitle && <Text style={subTitleStyle}>{subTitle}</Text>}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={contentRightStyle}
            onPress={onActionPress || onPress}
          >
            {typeof Action === 'function' ? Action() : Action}
            {arrow && <IconFont d={icons.arrow} color="#C5CDD3" />}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

/* eslint-disable react-native/no-unused-styles */
const defaultStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    minHeight: cy(48),
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: cx(16),
  },

  contentLeft: {
    justifyContent: 'center',
    marginRight: cx(12),
  },

  contentCenter: {
    flex: 1,
    justifyContent: 'center',
  },

  contentRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: cx(14),
    color: '#22242C',
  },

  subTitle: {
    fontSize: cx(12),
    color: '#A2A3AA',
  },
});
