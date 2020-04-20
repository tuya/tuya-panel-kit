import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ColorPropType, ViewPropTypes } from 'react-native';
import { Rect } from 'react-native-svg';
import TopBar from '../layout/topbar';
import LinearGradient from '../gradient/linear-gradient';
import IconFont from '../iconfont';
import svgs from '../iconfont/svg/defaultSvg';
import { RatioUtils, ThemeUtils } from '../../utils';
import { StyledNotification, StyledNotificationContent, StyledButton, StyledTitle } from './styled';

const { ThemeConsumer } = ThemeUtils;

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

export default class NotificationLegacy extends PureComponent {
  constructor(props) {
    super(props);
    this._autoCloseId = null;
    this.state = {
      height: 56,
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
    this.setState({ height: layout.height || 56 });
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
      onPress,
      ...rest
    } = this.props;
    const disable = typeof onPress === 'function';
    return (
      <ThemeConsumer>
        {t => {
          const iconPath = icon || ICONS[variant] || ICONS.warning;
          const iconColor =
            theme.iconColor || theme[`${variant}Icon`] || t.global[variant] || theme.warningIcon;
          const shadowSize = {
            width: RatioUtils.winWidth,
            height: this.state.height + TopBar.height + 40,
          };
          const isOneLine = this.state.height === 56;
          return (
            <StyledNotification
              disabled={!disable}
              {...rest}
              style={[shadowSize, style]}
              accessibilityLabel={accessibilityLabel}
              activeOpacity={1}
              onPress={onPress}
            >
              <LinearGradient
                style={shadowSize}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
                stops={{
                  '0%': 'rgba(0, 0, 0, 0.6)',
                  '100%': 'rgba(0, 0, 0, 0)',
                }}
              >
                <Rect {...shadowSize} />
              </LinearGradient>
              <StyledNotificationContent
                style={{
                  alignItems: isOneLine ? 'center' : 'flex-start',
                  borderRadius: isOneLine ? 30 : 16,
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
    );
  }
}

NotificationLegacy.propTypes = {
  /**
   * 测试标识符
   */
  accessibilityLabel: PropTypes.string,
  /**
   * 容器样式
   */
  style: ViewPropTypes.style,
  /**
   * NotificationLegacy主题配置
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
   * NotificationLegacy 自定义 IconPath
   */
  icon: PropTypes.string,
  /**
   * NotificationLegacy类型
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
   * NotificationLegacy 文案内容
   */
  message: PropTypes.string,
  /**
   * 关闭回调
   */
  onClose: PropTypes.func,
  /**
   * NotificationLegacy 文案自定义内容
   */
  children: PropTypes.any,
  /**
   * 点击整块区域触发的函数
   */
  onPress: PropTypes.func,
};

NotificationLegacy.defaultProps = {
  accessibilityLabel: 'NotificationLegacy',
  style: null,
  theme: DEFAULT_THEME,
  icon: undefined,
  variant: 'warning',
  enableClose: true,
  autoCloseTime: 1500,
  message: '',
  onClose: null,
  children: null,
  onPress: null,
};
