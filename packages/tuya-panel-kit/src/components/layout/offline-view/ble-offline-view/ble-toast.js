import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TYText from '../../../TYText';
import TopBar from '../../topbar';
import { RatioUtils } from '../../../../utils';

const { convertX: cx } = RatioUtils;

const Res = {
  bleAlert: require('../../../res/bleAlert.png'),
};

const BleToast = ({ style, text, image, onPress }) => (
  <TouchableOpacity style={[styles.shareTip, style]} activeOpacity={1} onPress={onPress}>
    <Image source={Res.bleAlert} />
    <TYText style={styles.shareText} text={text} />
    <Image source={image} />
  </TouchableOpacity>
);

BleToast.propTypes = {
  style: ViewPropTypes.style,
  text: PropTypes.string.isRequired,
  image: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

BleToast.defaultProps = {
  style: null,
  onPress: null,
};

const styles = StyleSheet.create({
  shareTip: {
    position: 'absolute',
    top: 16 + TopBar.height,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: cx(24),
    marginHorizontal: cx(24),
    paddingVertical: 10,
    paddingHorizontal: cx(16),
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },

  shareText: {
    flex: 1,
    marginLeft: cx(6),
    textAlign: 'left',
    fontSize: cx(14),
    color: '#22242C',
  },
});

export default BleToast;
