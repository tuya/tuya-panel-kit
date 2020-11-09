import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { TouchableOpacity, ColorPropType, StyleSheet, Animated } from 'react-native';
import TopBar from '../../topbar';
import Custom from '../../../dialog/custom';
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
      style: { borderRadius: cx(16), paddingTop: cx(24) },
      headerStyle: { borderBottomWidth: 0 },
      titleStyle: { fontSize: cx(16), fontWeight: '500' },
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
          <Custom {...confirmStyle} {...confirmProps} />
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
