import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Animated, StyleSheet, TouchableOpacity, ViewPropTypes, View } from 'react-native';

const ALIGN = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

class TYModal extends React.Component {
  static propTypes = {
    animationType: PropTypes.oneOf(['fade', 'none']),
    alignContainer: PropTypes.oneOf(['top', 'center', 'bottom']),
    onMaskPress: PropTypes.func,
    maskStyle: ViewPropTypes.style,
    mask: PropTypes.bool,
  };

  static defaultProps = {
    animationType: 'fade',
    alignContainer: 'bottom',
    onMaskPress: () => {},
    maskStyle: null,
    mask: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      fade: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fade, {
      duration: 200,
      toValue: 1,
    }).start();
  }

  renderNoMaskModal = () => {
    const { children, animationType, alignContainer } = this.props;
    const noMaskContanier = [
      styles.noMaskContanier,
      alignContainer && { justifyContent: ALIGN[alignContainer] },
      { opacity: animationType === 'fade' ? this.state.fade : 1 },
    ];
    return (
      <Animated.View style={noMaskContanier} pointerEvents="box-none">
        {children}
      </Animated.View>
    );
  };

  renderMaskModal = () => {
    const {
      children,
      animationType,
      onMaskPress,
      alignContainer,
      maskStyle,
      ...props
    } = this.props;
    const maskContanier = [
      styles.maskContanier,
      alignContainer && { justifyContent: ALIGN[alignContainer] },
      maskStyle,
    ];
    return (
      <Modal
        animationType={animationType}
        onRequestClose={onMaskPress}
        {...props}
        visible={true}
        transparent={true}
      >
        <TouchableOpacity style={maskContanier} onPress={onMaskPress} activeOpacity={1}>
          <View onStartShouldSetResponder={() => true}>{children}</View>
        </TouchableOpacity>
      </Modal>
    );
  };

  render() {
    const { mask } = this.props;
    if (!mask) {
      return this.renderNoMaskModal();
    }
    return this.renderMaskModal();
  }
}

const styles = StyleSheet.create({
  maskContanier: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  noMaskContanier: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TYModal;
