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
  StyledButton,
  StyledCancelText,
  StyledConfirmText,
  StyledSubTitleText,
  StyledBackView,
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
      wrapperStyle: ViewPropTypes.style,
      title: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
        PropTypes.element,
      ]),
      /**
       * Popup头部副标题
       */
      subTitle: PropTypes.string,
      titleTextStyle: TYText.propTypes.style,
      titleWrapperStyle: ViewPropTypes.style,

      /**
       * 头部栏 Switch 值
       */
      switchValue: PropTypes.bool,
      /**
       * 头部栏 Switch Change事件，不用onValueChange的原因是避免props重复
       */
      onSwitchValueChange: PropTypes.func,
      onCancel: PropTypes.func,
      onConfirm: PropTypes.func,
      cancelText: PropTypes.string,
      confirmText: PropTypes.string,
      cancelTextStyle: TYText.propTypes.style,
      confirmTextStyle: TYText.propTypes.style,
      footer: PropTypes.element,
      footerWrapperStyle: ViewPropTypes.style,
      footerType: PropTypes.oneOf(['singleConfirm', 'singleCancel', 'custom', 'both']),

      /**
       * 动画配置
       */
      motionType: PropTypes.oneOf(MOTION_TYPES),
      motionConfig: PropTypes.object,
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
      motionType: 'none',
      motionConfig: {},
      isAlign: false,
      backIconColor: null,
      onBack: null,
      backText: '返回',
    };

    constructor(props) {
      super(props);
      this.actionTypeFn = null;
      this.extraParams = [];
      this.state = {
        show: withModal ? props.visible : true,
        switchValue: props.switchValue,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.visible !== nextProps.visible) {
        this.setState({ show: nextProps.visible });
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

    _handleSwitchValueChange = switchValue => {
      const { onSwitchValueChange } = this.props;
      this.setState({ switchValue });
      onSwitchValueChange && onSwitchValueChange(switchValue);
    };

    _handleMaskPress = () => {
      const { onMaskPress } = this.props;
      if (this.hasMotion) {
        this.setState({ show: false });
        this.actionTypeFn = () => {
          typeof onMaskPress === 'function' && onMaskPress();
        };
      } else {
        typeof onMaskPress === 'function' && onMaskPress();
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

    _handleConfirmPress = () => {
      const { onConfirm } = this.props;
      if (this.hasMotion) {
        this.setState({ show: false });
        this.actionTypeFn = () => {
          typeof onConfirm === 'function' && onConfirm(this.data, ...this.extraParams);
        };
      } else {
        typeof onConfirm === 'function' && onConfirm(this.data, ...this.extraParams);
      }
    };

    _handleMotionHide = () => {
      if (typeof this.actionTypeFn === 'function') {
        this.actionTypeFn();
      }
    };

    renderTitle = () => {
      const {
        title,
        titleTextStyle,
        titleWrapperStyle,
        subTitle,
        backIconColor,
        onBack,
        backText,
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
          {typeof onBack === 'function' && (
            <StyledBackView>
              <StyledTouchView onPress={onBack}>
                <StyledBackIcon d={backIcon} color={backIconColor} />
              </StyledTouchView>
              <StyledBackText text={backText} />
            </StyledBackView>
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
      const showConfirm = footerType === 'both' || footerType === 'singleConfirm';
      const showCancel = footerType === 'both' || footerType === 'singleCancel';
      return (
        <StyledFooter style={footerWrapperStyle}>
          {showCancel ? (
            <StyledButton
              accessibilityLabel={`${accessPrefix}_Cancel`}
              bordered={footerType === 'both'}
              onPress={this._handleCancelPress}
            >
              <StyledCancelText style={cancelTextStyle} single={footerType === 'singleCancel'}>
                {cancelText}
              </StyledCancelText>
            </StyledButton>
          ) : null}
          {showConfirm ? (
            <StyledButton
              accessibilityLabel={`${accessPrefix}_Confirm`}
              onPress={this._handleConfirmPress}
            >
              <StyledConfirmText style={confirmTextStyle}>{confirmText}</StyledConfirmText>
            </StyledButton>
          ) : null}
        </StyledFooter>
      );
    };

    render() {
      const {
        // ========= 以下为 Modal 通用 props ========== //
        visible,
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
      const { switchValue } = this.state;
      let element = (
        <StyledContainer style={wrapperStyle}>
          {this.renderTitle()}
          <WrappedComponent
            {...props}
            switchValue={typeof switchValue === 'undefined' ? true : switchValue}
            _onDataChange={this._handleDataChange}
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
