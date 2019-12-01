/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Modal, TouchableOpacity, Animated, StyleSheet, ViewPropTypes, View } from 'react-native';
import { CoreUtils } from '../../utils';

const { get } = CoreUtils;

const ALIGN = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

const StyledMask = styled(TouchableOpacity)`
  background-color: ${props => get(props, 'theme.global.mask', 'rgba(0, 0, 0, 0.7)')};
`;

class TYModal extends React.Component {
  static propTypes = {
    animationType: PropTypes.oneOf(['fade', 'none']),
    alignContainer: PropTypes.oneOf(['top', 'center', 'bottom']),
    onMaskPress: PropTypes.func,
    maskStyle: ViewPropTypes.style,
    mask: PropTypes.bool,
    /**
     * 是否只显示最后一个弹出的 modal
     */
    onlyLastModalVisible: PropTypes.bool,
  };

  static defaultProps = {
    animationType: 'fade',
    alignContainer: 'bottom',
    onMaskPress: () => {},
    maskStyle: null,
    mask: true,
    onlyLastModalVisible: true,
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
    const { onlyLastModalVisible, activeIdx, children, animationType, alignContainer } = this.props;
    const maskContainer = [
      styles.maskContainer,
      alignContainer && { justifyContent: ALIGN[alignContainer] },
      { opacity: animationType === 'fade' ? this.state.fade : 1 },
    ];
    return children.map((child, idx) => {
      const childStyle = [
        maskContainer,
        onlyLastModalVisible && { display: idx === activeIdx ? 'flex' : 'none' },
      ];
      return (
        <Animated.View key={idx} style={childStyle} pointerEvents="box-none">
          {child}
        </Animated.View>
      );
    });
  };

  renderMaskModal = () => {
    const {
      onlyLastModalVisible,
      activeIdx,
      children,
      animationType,
      onMaskPress,
      alignContainer,
      maskStyle,
      ...props
    } = this.props;
    const maskContainer = [
      styles.maskContainer,
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
        {children.map((child, idx) => {
          const childStyle = [
            maskContainer,
            onlyLastModalVisible && { display: idx === activeIdx ? 'flex' : 'none' },
          ];
          return (
            <StyledMask
              key={Math.random()}
              style={childStyle}
              onPress={onMaskPress}
              activeOpacity={1}
            >
              <View onStartShouldSetResponder={() => true}>{child}</View>
            </StyledMask>
          );
        })}
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
  maskContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TYModal;
