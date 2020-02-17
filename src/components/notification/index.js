import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ColorPropType, ViewPropTypes, StyleSheet } from 'react-native';
import IconFont from '../iconfont';
import svgs from '../iconfont/svg/defaultSvg';
import { ThemeUtils } from '../../utils';
import { StyledNotification, StyledNotificationContent, StyledButton, StyledTitle } from './styled';
import Motion from '../motion';
import TYSdk from '../../../TYNativeApi';

const { ThemeConsumer } = ThemeUtils;

const TYEvent = TYSdk.event;

const ICONS = {
  success: svgs.selected,
  warning: svgs.warning,
  error: svgs.error,
};

const DEFAULT_THEME = {
  background: '#fff',
  text: '#495054',
  iconColor: undefined,
  successIcon: undefined,
  warningIcon: undefined,
  errorIcon: undefined,
  closeIcon: '#81828B',
};

const shadowStyles = {
  shadowColor: 'rgba(0,0,0,0.16)',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 1,
  shadowRadius: 8,
  elevation: 2,
};

export default class Notification extends PureComponent {
  constructor(props) {
    super(props);
    this._autoCloseId = null;
    this.state = {
      height: 44,
    };
  }

  componentDidMount() {
    const { enableClose, autoCloseTime, onClose } = this.props;
    if (!enableClose) {
      this._autoCloseId = setTimeout(() => {
        typeof onClose === 'function' && onClose();
      }, autoCloseTime);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._autoCloseId);
  }

  get theme() {
    return { ...DEFAULT_THEME, ...this.props.theme };
  }

  _handleLayout = ({ nativeEvent: { layout } }) => {
    this.setState({ height: layout.height || 44 });
  };

  render() {
    const { theme } = this;
    const {
      accessibilityLabel,
      style,
      icon,
      variant,
      message,
      enableClose,
      onClose,
      children,
      motionConfig,
      show,
      motionStyle,
      ...rest
    } = this.props;
    return (
      <Motion.PushDown {...motionConfig} show={show} style={[styles.notification, motionStyle]}>
        <ThemeConsumer>
          {t => {
            const iconPath = icon || ICONS[variant] || ICONS.warning;
            const iconColor =
              theme.iconColor || theme[`${variant}Icon`] || t.global[variant] || theme.warningIcon;
            const isOneLine = this.state.height === 44;
            return (
              <StyledNotification {...rest} style={[style]} accessibilityLabel={accessibilityLabel}>
                <StyledNotificationContent
                  style={{
                    alignItems: isOneLine ? 'center' : 'flex-start',
                    ...shadowStyles,
                  }}
                  background={theme.background}
                  onLayout={this._handleLayout}
                >
                  <IconFont d={iconPath} color={iconColor} size={20} />
                  {children || (
                    <StyledTitle color={theme.text} numberOfLines={3}>
                      {message}
                    </StyledTitle>
                  )}
                  {enableClose && (
                    <StyledButton
                      accessibilityLabel={`${accessibilityLabel}_Close`}
                      activeOpacity={0.6}
                      onPress={onClose}
                    >
                      <IconFont name="close" color={theme.closeIcon} size={15} />
                    </StyledButton>
                  )}
                </StyledNotificationContent>
              </StyledNotification>
            );
          }}
        </ThemeConsumer>
      </Motion.PushDown>
    );
  }
}

Notification.propTypes = {
  /**
   * 测试标识符
   */
  accessibilityLabel: PropTypes.string,
  /**
   * 容器样式
   */
  style: ViewPropTypes.style,
  /**
   * Notification主题配置
   */
  theme: PropTypes.shape({
    background: ColorPropType,
    text: ColorPropType,
    iconColor: ColorPropType,
    successIcon: ColorPropType,
    warningIcon: ColorPropType,
    errorIcon: ColorPropType,
    closeIcon: ColorPropType,
    radius: PropTypes.number,
  }),
  /**
   * 是否显示Notification
   */
  show: PropTypes.bool,
  /**
   * Notification 自定义 IconPath
   */
  icon: PropTypes.string,
  /**
   * Notification类型
   */
  variant: PropTypes.oneOf(['success', 'warning', 'error']),
  /**
   * 是否显示关闭按钮，若为`false`，则会在`autoCloseTime`后自动触发`onClose`回调
   */
  enableClose: PropTypes.bool,
  /**
   * 自动关闭时间，需配合`enableClose: false`使用
   */
  autoCloseTime: PropTypes.number,
  /**
   * Notification 文案内容
   */
  message: PropTypes.string,
  /**
   * 关闭回调
   */
  onClose: PropTypes.func,
  /**
   * Notification 自定义文案内容
   */
  children: PropTypes.any,
  /**
   * Notification 动画配置,参考PushDown属性
   */
  motionConfig: PropTypes.object,
  /**
   * Notification 样式
   */
  motionStyle: ViewPropTypes.style,
};

Notification.defaultProps = {
  accessibilityLabel: 'Notification',
  style: null,
  theme: DEFAULT_THEME,
  show: false,
  icon: undefined,
  variant: 'warning',
  enableClose: true,
  autoCloseTime: 1500,
  message: '',
  onClose: null,
  children: null,
  motionConfig: {},
  motionStyle: null,
};

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

Notification.show = props => {
  TYEvent.emit('showNotification', { show: true, ...props });
};

Notification.hide = () => {
  TYEvent.emit('hideNotification', { show: false });
};
