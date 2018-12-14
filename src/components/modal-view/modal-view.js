import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  PanResponder,
  Platform,
  Dimensions,
  ViewPropTypes,
} from 'react-native';

const shallowCompare = require('react-addons-shallow-compare');

const CONTENT_ALIGN = {
  bottom: 'flex-end',
  center: 'center',
  top: 'flex-start',
};

const { height: winHeight, width: winWidth } = Dimensions.get('window');

export default class ModalView extends Component {
  static propTypes = {
    ...Modal.propTypes,
    onRequestClose: PropTypes.func,
    children: PropTypes.any,
    style: ViewPropTypes.style,
    alignContainer: PropTypes.oneOf(['top', 'center', 'bottom']),
  };

  static defaultProps = {
    // eslint-disable-next-line
    animationType: Platform.OS === 'android' ? 'none' : 'fade',
    // eslint-disable-next-line
    transparent: false,
    // eslint-disable-next-line
    visible: false,
    alignContainer: 'bottom',
    children: undefined,
    style: undefined,
    onRequestClose: undefined,
  };

  constructor(props) {
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.closeModalView = this.closeModalView.bind(this);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderRelease: this.closeModalView,
    });

    this.state = {
      ...this._stateFromProps(props),
      contentNode: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._stateFromProps(nextProps));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  setModalVisible(visible) {
    this.setState({ visible });
  }

  setModalStyle(alignContainer, animationType, transparent) {
    this.setState({
      alignContainer,
      transparent,
      animationType,
    });
  }

  closeModalView() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    } else if (this.state.onMaskClick) {
      this.state.onMaskClick();
    } else {
      this.setModalVisible(false);
    }
  }

  _stateFromProps(props) {
    return {
      alignContainer: props.alignContainer,
      transparent: props.transparent,
      visible: props.visible,
      animationType: props.animationType,
      onShow: props.onShow,
      onRequestClose: this.closeModalView,
    };
  }

  updateChild(props) {
    const child = React.cloneElement(this.state.contentNode ?
      this.state.contentNode : this.props.children, { ...props });
    this.setState({
      contentNode: child,
    });
  }

  renderContent(node) {
    this.setState({ contentNode: node, visible: true });
  }

  render() {
    const { transparent, alignContainer } = this.state;
    // let animationType = Platform.OS === 'android' && this.state.visible ? 'none' : this.state.animationType;
    return (
      <Modal
        animationType={this.state.animationType}
        transparent={true}
        visible={this.state.visible}
        onShow={this.state.onShow}
        onRequestClose={this.state.onRequestClose}
      >
        <View
          style={[
            styles.container,
            {
              justifyContent:
                CONTENT_ALIGN[alignContainer] || CONTENT_ALIGN.bottom,
            },
          ]}
        >
          <View
            style={{
              backgroundColor: transparent
                ? 'transparent'
                : 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: winWidth,
              height: winHeight,
            }}
            {...this._panResponder.panHandlers}
          />
          <View style={(this.props.style, {
            width: winWidth,
            position: 'absolute',
          })}
          >
            {this.state.contentNode
              ? this.state.contentNode
              : this.props.children}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
