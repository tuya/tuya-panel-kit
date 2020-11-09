/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  Modal,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ViewPropTypes,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { CoreUtils, RatioUtils } from '../../utils';

const { get } = CoreUtils;

const ALIGN = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

const { isIphoneX } = RatioUtils;

const ios = Platform.OS === 'ios';

/* istanbul ignore next */
const StyledMask = styled(TouchableOpacity)`
  background-color: ${props => get(props, 'theme.global.mask', 'rgba(0, 0, 0, 0.7)')};
`;

class TYModal extends React.Component {
  static propTypes = {
    /**
     * modal出现的动画效果
     */
    animationType: PropTypes.oneOf(['fade', 'none']),
    /**
     * modal默认出现的位置
     */
    alignContainer: PropTypes.oneOf(['top', 'center', 'bottom']),
    /**
     * 点击遮罩回调
     */
    onMaskPress: PropTypes.func,
    /**
     * modal弹出内容的样式
     */
    modalChildStyle: ViewPropTypes.style,
    /**
     * 遮罩层样式
     */
    maskStyle: ViewPropTypes.style,
    /**
     * 是否有遮罩层
     */
    mask: PropTypes.bool,
    /**
     * 是否只显示最后一个弹出的 modal
     */
    onlyLastModalVisible: PropTypes.bool,
    /**
     * 是否弹出键盘自适应
     */
    useKeyboardView: PropTypes.bool,

    /**
     * Modal 组件销毁回调事件，一般用于在弹窗销毁后跳转新的 native 页面
     * @platform iOS
     */
    onDismiss: PropTypes.func,
  };

  static defaultProps = {
    animationType: 'fade',
    alignContainer: 'bottom',
    onMaskPress: () => {},
    maskStyle: null,
    mask: true,
    modalChildStyle: null,
    onlyLastModalVisible: true,
    useKeyboardView: false,
  };

  constructor(props) {
    super(props);
    this._childRef = {};
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

  _handleMaskPress = () => {
    const { onMaskPress, children } = this.props;
    const childMotionType = get(this, `_childRef.${children.length - 1}.props.motionType`, 'none');
    const childMaskPress = get(this, `_childRef.${children.length - 1}._handleMaskPress`);
    if (childMotionType !== 'none' && typeof childMaskPress === 'function') {
      /* istanbul ignore next */
      childMaskPress();
    } else {
      typeof onMaskPress === 'function' && onMaskPress();
    }
  };

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
      visible,
      onDismiss,
      onlyLastModalVisible,
      activeIdx,
      children,
      animationType,
      onMaskPress,
      alignContainer,
      maskStyle,
      modalChildStyle,
      useKeyboardView,
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
        onRequestClose={this._handleMaskPress}
        visible={onlyLastModalVisible ? visible : true}
        onDismiss={onDismiss}
        {...props}
        transparent={true}
      >
        {children.map((child, idx) => {
          const childStyle = [
            maskContainer,
            onlyLastModalVisible && { display: idx === activeIdx ? 'flex' : 'none' },
          ];
          let modalChild = child;
          if (!Array.isArray(child)) {
            modalChild = React.cloneElement(child, {
              onMaskPress: get(child, 'props.onMaskPress', onMaskPress),
              ref: /* istanbul ignore next */ ref => {
                this._childRef[idx] = ref;
              },
            });
          }
          return (
            <StyledMask
              key={idx}
              style={childStyle}
              onPress={this._handleMaskPress}
              activeOpacity={1}
            >
              {ios && useKeyboardView ? (
                <KeyboardAvoidingView
                  behavior="padding"
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: isIphoneX ? 20 : 0,
                  }}
                >
                  <View onStartShouldSetResponder={() => true} style={modalChildStyle}>
                    {modalChild}
                  </View>
                </KeyboardAvoidingView>
              ) : (
                <View onStartShouldSetResponder={() => true} style={modalChildStyle}>
                  {modalChild}
                </View>
              )}
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
