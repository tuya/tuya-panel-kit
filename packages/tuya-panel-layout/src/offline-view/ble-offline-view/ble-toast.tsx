import React from 'react';
import { StyleProp, TouchableOpacity, Image, StyleSheet, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import TopBar from 'tuya-panel-topbar';
import TYText from 'tuya-panel-text';

const { convertX: cx } = Utils.RatioUtils;

export interface IBleToastProps {
  style?: StyleProp<ViewStyle>;
  text?: string;
  image?: number;
  onPress?: () => void;
}

const Res = {
  bleAlert: require('../../res/bleAlert.png'),
};

const BleToast: React.FC<IBleToastProps> = ({ style, text, image, onPress }) => (
  <TouchableOpacity style={[styles.shareTip, style]} activeOpacity={1} onPress={onPress}>
    <Image source={Res.bleAlert} />
    <TYText style={styles.shareText} text={text} />
    <Image source={image} />
  </TouchableOpacity>
);

BleToast.defaultProps = {
  style: null,
  onPress: null,
};

const styles = StyleSheet.create({
  shareText: {
    color: '#22242C',
    flex: 1,
    fontSize: cx(14),
    marginLeft: cx(6),
    textAlign: 'left',
  },

  shareTip: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: cx(24),
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    marginHorizontal: cx(24),
    paddingHorizontal: cx(16),
    paddingVertical: 10,
    position: 'absolute',
    right: 0,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    top: 16 + TopBar.height,
  },
});

export default BleToast;
