/* eslint-disable react/no-array-index-key */
import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Modal from '../modal';
import TYModal from '../modal/TYModal';
import Motion from '../motion';
import TYText from '../TYText';
import {
  StyledContainer,
  StyledTitle,
  StyledTitleText,
  StyledSwitch,
  StyledFooter,
  StyledConfirmButton,
  StyledCancelButton,
  StyledCancelText,
  StyledConfirmText,
  StyledSubTitleText,
  StyledBackIcon,
  StyledTouchView,
  backIcon,
  StyledBackText,
} from './styled';

export const MOTION_TYPES = Object.keys(Motion)
  .concat('none')
  .filter(v => {
    return v !== 'Toast' && v !== 'PushDown';
  });

/**
 *
 * @param {ReactElement} WrappedComponent
 * @param {Boolean} withModal - 是否包含在Modal组件内
 */
const withSkeleton = (WrappedComponent, withModal = false) => {
  // 同步1.x
  const name = WrappedComponent.displayName || '';
  const ACCESSIBILITY_LABEL_MAP = {
    CountdownPopup: 'Popup_CountdownPicker',
    DatePickerPopup: 'Popup_DatePicker',
    TimerPickerPopup: 'Popup_TimerPicker',
    NumberSelectorPopup: 'Popup_NumberSelector',
    ListPopup: 'Popup_List',
    PickerPopup: 'Popup_Picker',
    Custom: 'Popup_Custom',
  };
  const accessPrefix = ACCESSIBILITY_LABEL_MAP[name] || 'Popup';
  return class WrapperComponent extends React.Component {
    static propTypes = {
      ...TYModal.propTypes,
      /**
       * 容器样式
       */
      wrapperStyle: ViewPropTypes.style,
      /**
       * Popup头部标题
       */
      title: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
        PropTypes.element,
      ]),
      /**
       * Popup头部副标题
       */
      subTitle: PropTypes.string,
      /**
       * Popup头部标题样式
       */
      titleTextStyle: TYText.propTypes.style,
      /**
       * Popup头部样式
       */
      titleWrapperStyle: ViewPropTypes.style,
      /**
       * 头部栏 Switch 值
       */
      switchValue: PropTypes.bool,
      /**
       * 头部栏 Switch Change事件，不用onValueChange的原因是避免props重复
       */
      onSwitchValueChange: PropTypes.func,
      /**
       * 取消点击回调
       */
      onCancel: PropTypes.func,
      /**
       * 确认点击回调
       */
      onConfirm: PropTypes.func,
      /**
       * 取消文案
       */
      cancelText: PropTypes.string,
      /**
       * 确认文案
       */
      confirmText: PropTypes.string,
      /**
       * 取消文字样式
       */
      cancelTextStyle: TYText.propTypes.style,
      /**
       * 确认文字样式
       */
      confirmTextStyle: TYText.propTypes.style,
      /**
       * 自定义footer
       */
      footer: PropTypes.element,
      /**
       * footer容器样式
       */
      footerWrapperStyle: ViewPropTypes.style,
      /**
       * footer容器显示状态
       */
      footerType: PropTypes.oneOf(['singleConfirm', 'singleCancel', 'custom', 'both']),
      /**
       * 动画类型
       */
      motionType: PropTypes.oneOf(MOTION_TYPES),
      /**
       * 动画配置
       */
      motionConfig: PropTypes.object,
      /**
       * 是否竖直居中
       */
      isAlign: PropTypes.bool,
      /**
       * 返回Icon颜色
       */
      backIconColor: PropTypes.string,
      /**
       * 返回回调函数
       */
      onBack: PropTypes.func,
      /**
       * 返回文案
       */
      backText: PropTypes.string,
      /**
       * 是否显示返回按钮
       */
      showBack: PropTypes.bool,
    };

    static defaultProps = {
      title: 'Modal',
      titleTextStyle: null,
      titleWrapperStyle: null,
      wrapperStyle: null,
      subTitle: '',
      switchValue: undefined,
      onSwitchValueChange: null,
      onCancel: () => {},
      onConfirm: () => {},
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      cancelTextStyle: null,
      confirmTextStyle: null,
      footer: null,
      footerWrapperStyle: null,
      footerType: 'both',
      motionType: 'PullUp',
      motionConfig: {},
      isAlign: false,
      backIconColor: null,
      onBack: null,
      backText: 'Back',
      showBack: false,
    };

    constructor(props) {
      super(props);
      this.actionTypeFn = null;
      this.extraParams = [];
      this.state = {
        show: withModal ? props.visible : true,
        switchValue: props.switchValue,
        visible: withModal ? props.visible : true,
        pressConfirmActive: false,
        pressCancelActive: false,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.visible !== nextProps.visible) {
        this.setState({ show: nextProps.visible });
      }

      if (nextProps.visible) {
        this.setState({ visible: true });
      }
    }

    get hasMotion() {
      const { motionType } = this.props;
      return motionType !== 'none' && typeof Motion[motionType] === 'function';
    }

    getData = () => {
      return this.data;
    };

    _handleDataChange = (data, ...extraParams) => {
      this.data = data;
      this.extraParams = extraParams;
    };

    // 针对Popup.list
    _handleSelect = value => {
      const { onSelect } = this.props;
      if (this.hasMotion) {
        typeof onSelect === 'function' &&
          onSelect(value, {
            close: this._handleModalClose,
          });
      } else {
        typeof onSelect === 'function' &&
          onSelect(value, {
            close: this._handleModalClose,
          });
      }
    };

    _handleSwitchValueChange = switchValue => {
      const { onSwitchValueChange } = this.props;
      this.setState({ switchValue });
      onSwitchValueChange && onSwitchValueChange(switchValue);
    };

    _handleMaskPress = () => {
      const { onMaskPress } = this.props;
      if (this.hasMotion) {
        // 将关闭弹框内容函数暴露出去，开发者根据需求是否调用close来决定是否关闭弹框
        typeof onMaskPress === 'function' &&
          onMaskPress({
            close: this._handleModalClose,
          });
      } else {
        typeof onMaskPress === 'function' && onMaskPress({ close: this._handleModalClose });
      }
    };

    _handleCancelPress = () => {
      const { onCancel } = this.props;
      if (this.hasMotion) {
        this.setState({ show: false });
        this.actionTypeFn = () => {
          typeof onCancel === 'function' && onCancel();
        };
      } else {
        typeof onCancel === 'function' && onCancel();
      }
    };

    _handleBack = () => {
      const { onBack } = this.props;
      if (this.hasMotion) {
        // 将关闭弹框内容函数暴露出去，开发者根据需求是否调用close来决定是否关闭弹框
        typeof onBack === 'function' &&
          onBack({
            close: this._handleModalClose,
          });
      } else {
        typeof onBack === 'function' && onBack({ close: this._handleModalClose });
      }
    };

    _handleConfirmPress = () => {
      const { onConfirm } = this.props;
      if (this.hasMotion) {
        // 将关闭弹框内容函数暴露出去，开发者根据需求是否调用close来决定是否关闭弹框
        typeof onConfirm === 'function' &&
          onConfirm(this.data, ...this.extraParams, {
            close: this._handleModalClose,
          });
      } else {
        typeof onConfirm === 'function' &&
          onConfirm(this.data, ...this.extraParams, {
            close: this._handleModalClose,
          });
      }
    };

    _handleMotionHide = () => {
      if (typeof this.actionTypeFn === 'function') {
        this.actionTypeFn();
      }
      this.setState({ visible: false });
    };

    // 关闭弹框函数抽离
    _handleModalClose = () => {
      if (this.hasMotion) {
        this.setState({ show: false });
        this.actionTypeFn = () => {
          Modal.close();
        };
      } else {
        Modal.close();
      }
    };

    _handlePressIn = isConfirm => {
      if (isConfirm) {
        this.setState({
          pressConfirmActive: true,
        });
      } else {
        this.setState({
          pressCancelActive: true,
        });
      }
    };

    _handlePressOut = isConfirm => {
      if (isConfirm) {
        this.setState({
          pressConfirmActive: false,
        });
      } else {
        this.setState({
          pressCancelActive: false,
        });
      }
    };

    renderTitle = () => {
      const {
        title,
        titleTextStyle,
        titleWrapperStyle,
        subTitle,
        backIconColor,
        backText,
        showBack,
      } = this.props;
      if (React.isValidElement(title)) return title;
      const titleArray = Array.isArray(title) ? title : [title];
      return (
        <StyledTitle
          style={[
            titleWrapperStyle,
            subTitle && { flexDirection: 'column', justifyContent: 'center' },
          ]}
        >
          {showBack && (
            <StyledTouchView onPress={this._handleBack}>
              <StyledBackIcon d={backIcon} color={backIconColor} />
              <StyledBackText text={backText} />
            </StyledTouchView>
          )}
          {titleArray.map((t, idx) => (
            <StyledTitleText key={idx} style={titleTextStyle}>
              {t}
            </StyledTitleText>
          ))}
          {!!subTitle && <StyledSubTitleText>{subTitle}</StyledSubTitleText>}
          {typeof this.state.switchValue === 'boolean' && (
            <StyledSwitch
              style={{ position: 'absolute', right: 16 }}
              accessibilityLabel={`${accessPrefix}_Switch`}
              useNativeDriver={false} // 与 Modal 共用暂时有bug
              value={this.state.switchValue}
              onValueChange={this._handleSwitchValueChange}
            />
          )}
        </StyledTitle>
      );
    };

    renderFooter = () => {
      const {
        footer,
        footerType,
        cancelText,
        confirmText,
        footerWrapperStyle,
        cancelTextStyle,
        confirmTextStyle,
      } = this.props;
      if (footer) return footer;
      const { pressCancelActive, pressConfirmActive } = this.state;
      const showConfirm = footerType === 'both' || footerType === 'singleConfirm';
      const showCancel = footerType === 'both' || footerType === 'singleCancel';
      return (
        <StyledFooter style={footerWrapperStyle}>
          {showCancel ? (
            <StyledCancelButton
              accessibilityLabel={`${accessPrefix}_Cancel`}
              bordered={footerType === 'both'}
              onPress={this._handleCancelPress}
              onPressIn={() => this._handlePressIn(false)}
              onPressOut={() => this._handlePressOut(false)}
              pressActive={pressCancelActive}
            >
              <StyledCancelText style={cancelTextStyle} single={footerType === 'singleCancel'}>
                {cancelText}
              </StyledCancelText>
            </StyledCancelButton>
          ) : null}
          {showConfirm ? (
            <StyledConfirmButton
              accessibilityLabel={`${accessPrefix}_Confirm`}
              onPress={this._handleConfirmPress}
              onPressIn={() => this._handlePressIn(true)}
              onPressOut={() => this._handlePressOut(true)}
              pressActive={pressConfirmActive}
            >
              <StyledConfirmText style={confirmTextStyle}>{confirmText}</StyledConfirmText>
            </StyledConfirmButton>
          ) : null}
        </StyledFooter>
      );
    };

    render() {
      const {
        // ========= 以下为 Modal 通用 props ========== //

        animationType,
        alignContainer,
        mask,
        maskStyle,
        onMaskPress,
        onShow,
        onHide,
        onDismiss,
        // =========== 以上为 Modal 通用 props ========= //

        // ========= 以下为 skeleton 通用 props ========== //
        title,
        titleTextStyle,
        titleWrapperStyle,
        footer,
        cancelText,
        confirmText,
        onCancel,
        footerWrapperStyle,
        cancelTextStyle,
        confirmTextStyle,
        // ========= 以上为 skeleton 通用 props ========== //
        wrapperStyle,
        motionType,
        motionConfig,
        isAlign,
        ...props
      } = this.props;
      const { visible, switchValue } = this.state;
      let element = (
        <StyledContainer style={wrapperStyle}>
          {this.renderTitle()}
          <WrappedComponent
            {...props}
            switchValue={typeof switchValue === 'undefined' ? true : switchValue}
            _onDataChange={this._handleDataChange}
            onSelect={this._handleSelect}
          />
          {this.renderFooter()}
        </StyledContainer>
      );
      if (this.hasMotion) {
        const MotionComp = Motion[motionType];
        element = (
          <MotionComp
            {...motionConfig}
            show={this.state.show}
            onHide={this._handleMotionHide}
            isAlign={isAlign}
          >
            {element}
          </MotionComp>
        );
      }
      return withModal ? (
        <Modal
          visible={visible}
          animationType={animationType}
          alignContainer={alignContainer}
          mask={mask}
          maskStyle={maskStyle}
          onMaskPress={this._handleMaskPress}
          onShow={onShow}
          onHide={onHide}
          onDismiss={onDismiss}
        >
          {element}
        </Modal>
      ) : (
        element
      );
    }
  };
};

export default withSkeleton;
