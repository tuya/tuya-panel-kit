import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { TouchableOpacity, ColorPropType, StyleSheet, Animated } from 'react-native';
import TopBar from '../../topbar';
import Confirm from '../../../dialog/confirm';
import { RatioUtils } from '../../../../utils';

const { convertX: cx, convertY: cy } = RatioUtils;

export default class BleOfflineModal extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    maskColor: ColorPropType,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    maskColor: 'rgba(0, 0, 0, 0.4)',
    onClose: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.show();
  }

  show = () => {
    Animated.spring(this.state.value, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  hide = () => {
    Animated.spring(this.state.value, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      typeof this.props.onClose === 'function' && this.props.onClose();
    });
  };

  render() {
    const { disabled, maskColor, ...confirmProps } = this.props;
    const { value } = this.state;
    const confirmStyle = {
      style: { borderRadius: cx(16) },
      contentStyle: { paddingTop: 32, paddingBottom: 24 },
      titleStyle: { fontSize: cx(16), color: '#22242C', fontWeight: '500' },
      subTitleStyle: {
        fontSize: cx(13),
        textAlign: 'left',
        color: '#495054',
        marginTop: 20,
        lineHeight: 20,
      },
      cancelTextStyle: { color: '#495054', fontWeight: '400' },
      confirmTextStyle: { color: '#495054', fontWeight: '400' },
    };
    return (
      <TouchableOpacity
        style={styles.modal}
        activeOpacity={1}
        disabled={disabled}
        onPress={this.hide}
      >
        <Animated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }]}
        />
        <Animated.View style={{ marginTop: cy(153), opacity: this.state.value }}>
          <Confirm {...confirmStyle} {...confirmProps} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: TopBar.height,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
