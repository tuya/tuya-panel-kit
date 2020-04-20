import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ColorPropType, ViewPropTypes, StyleSheet, TouchableOpacity } from 'react-native';
import IconFont from '../iconfont';
import svgs from '../iconfont/svg/defaultSvg';
import { ThemeUtils, RatioUtils } from '../../utils';
import {
  StyledNotification,
  StyledNotificationContent,
  StyledTitle,
  StyledIconFont,
  StyledImage,
} from './styled';
import Motion from '../motion';
import TYSdk from '../../TYNativeApi';

const { ThemeConsumer } = ThemeUtils;
const { convertX: cx } = RatioUtils;
const closeIcon =
  'M329.557333 281.9072a32.8704 32.8704 0 0 1 0.887467 0.853333l177.527467 178.449067 161.6896-171.281067a33.1776 33.1776 0 0 1 47.581866-0.682666l0.682667 0.682666a34.133333 34.133333 0 0 1 0.682667 47.581867l-162.474667 172.100267 162.269867 163.157333a34.133333 34.133333 0 0 1 0.750933 47.377067l-0.853333 0.9216a32.8704 32.8704 0 0 1-46.455467 1.604266l-0.887467-0.853333-161.6896-162.577067-155.7504 165.034667a33.1776 33.1776 0 0 1-46.865066 1.365333l-1.365334-1.365333a34.133333 34.133333 0 0 1-0.682666-47.581867l156.501333-165.853866L282.999467 331.776a34.133333 34.133333 0 0 1-0.750934-47.342933l0.853334-0.9216a32.8704 32.8704 0 0 1 46.455466-1.604267z';

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
      backIcon,
      onPress,
      imageSource,
      imageStyle,
      backIconSize,
      backIconCenter,
      ...rest
    } = this.props;
    const disable = typeof onPress === 'function';
    return (
      <Motion.PushDown {...motionConfig} show={show} style={[styles.notification, motionStyle]}>
        <ThemeConsumer>
          {t => {
            const iconPath = icon || ICONS[variant] || ICONS.warning;
            const iconColor =
              theme.iconColor || theme[`${variant}Icon`] || t.global[variant] || theme.warningIcon;
            const isOneLine = this.state.height === 44;
            return (
              <StyledNotification
                disabled={!disable}
                {...rest}
                style={style}
                accessibilityLabel={accessibilityLabel}
                activeOpacity={1}
                onPress={onPress}
              >
                <StyledNotificationContent
                  style={{
                    alignItems: isOneLine ? 'center' : backIconCenter ? 'center' : 'flex-start',
                    ...shadowStyles,
                  }}
                  background={theme.background}
                  onLayout={this._handleLayout}
                >
                  {imageSource ? (
                    <StyledImage source={imageSource} style={imageStyle} />
                  ) : (
                    <StyledIconFont d={iconPath} color={iconColor} size={20} />
                  )}
                  {children || (
                    <StyledTitle
                      color={theme.text}
                      numberOfLines={3}
                      backIconCenter={backIconCenter}
                    >
                      {message}
                    </StyledTitle>
                  )}
                  {enableClose && (
                    <TouchableOpacity
                      accessibilityLabel={`${accessibilityLabel}_Close`}
                      activeOpacity={0.6}
                      onPress={onClose}
                      style={backIconCenter ? styles.center : styles.touchStyle}
                    >
                      <IconFont d={backIcon} color={theme.closeIcon} size={backIconSize} />
                    </TouchableOpacity>
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
   * Notification 文案后面的 IconPath
   */
  backIcon: PropTypes.string,
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
  /**
   * 点击整块区域触发的函数
   */
  onPress: PropTypes.func,
  /**
   * 图片资源
   */
  imageSource: PropTypes.number,
  /**
   * 图片样式
   */
  imageStyle: ViewPropTypes.style,
  /**
   * 文案后面图标大小
   */
  backIconSize: PropTypes.number,
  /**
   * 文案后面图标是否垂直居中
   */
  backIconCenter: PropTypes.bool,
};

Notification.defaultProps = {
  accessibilityLabel: 'Notification',
  style: null,
  theme: DEFAULT_THEME,
  show: false,
  icon: undefined,
  backIcon: closeIcon,
  variant: 'warning',
  enableClose: true,
  autoCloseTime: 1500,
  message: '',
  onClose: null,
  children: null,
  motionConfig: {},
  motionStyle: null,
  onPress: null,
  imageSource: null,
  imageStyle: null,
  backIconSize: 24,
  backIconCenter: false,
};

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  center: {
    width: cx(24),
    height: cx(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchStyle: {
    width: cx(24),
    height: cx(24),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 16,
  },
});

Notification.show = props => {
  TYEvent.emit('showNotification', { show: true, ...props });
};

Notification.hide = () => {
  TYEvent.emit('hideNotification', { show: false });
};
