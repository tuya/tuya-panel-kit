import Color from 'color';
import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, ViewPropTypes } from 'react-native';
import TYText from '../../TYText';
import { isIos } from '../../../utils/ratio';

const TopBarContent = ({
  style,
  color,
  title,
  titleStyle,
  subTitle,
  subTitleStyle,
  position,
  children,
  onPress,
}) => {
  const alignItemsMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };
  const titleColor = color;
  // eslint-disable-next-line new-cap
  const subTitleColor = Color(color)
    .alpha(0.6)
    .rgbString();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.wrapper, { alignItems: alignItemsMap[position] }, style]}>
        {!!title && (
          <TYText style={[styles.title, { color: titleColor }, titleStyle]} numberOfLines={1}>
            {title}
          </TYText>
        )}
        {!!subTitle && (
          <TYText
            style={[styles.subTitle, { color: subTitleColor }, subTitleStyle]}
            numberOfLines={1}
          >
            {subTitle}
          </TYText>
        )}
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

TopBarContent.displayName = 'TopBar.Content';

TopBarContent.propTypes = {
  style: ViewPropTypes.style,
  color: PropTypes.string,
  title: PropTypes.string,
  titleStyle: TYText.propTypes.style,
  subTitle: PropTypes.string,
  subTitleStyle: TYText.propTypes.style,
  position: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.any,
  onPress: PropTypes.func,
};

TopBarContent.defaultProps = {
  style: null,
  color: '#fff',
  title: '',
  titleStyle: null,
  subTitle: '',
  subTitleStyle: null,
  position: 'center',
  children: null,
  onPress: null,
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },

  title: {
    fontSize: isIos ? 16 : 18,
    color: '#fff',
  },

  subTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default TopBarContent;
