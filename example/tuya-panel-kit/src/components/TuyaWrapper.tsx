/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/static-property-placement */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
  Dimensions,
  Platform,
  StyleProp,
  StyleSheet,
  TextProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Provider } from 'react-redux';
import {
  GlobalToast,
  Notification,
  Theme as ThemeProvider,
  TopBar,
  TYSdk,
  Utils,
} from 'tuya-panel-kit';
// @ts-ignore
import MaskView from 'tuya-panel-kit/lib/components/modal/portalOut';
import { store } from '#models';

const TYEvent = TYSdk.event;

const { get } = Utils.CoreUtils;
const { withTheme } = Utils.ThemeUtils;
const { isIphoneX } = Utils.RatioUtils;
const isIos = Platform.OS === 'ios';
const dropHeight = isIos ? (isIphoneX ? 88 : 64) : 56;

interface Props {
  style?: StyleProp<ViewProps>;
  topbarStyle?: StyleProp<ViewProps>;
  topbarTextStyle?: StyleProp<TextProps>;
  hideTopbar?: boolean;
  background?: string | number | object;
  theme?: { [key: string]: any };
  title?: string;
  onBack?: () => void;
  capability?: number;
  showMenu?: boolean;
  /**
   * 蓝牙离线提示是否覆盖整个面板(除头部栏外)
   */
  isBleOfflineOverlay?: boolean;
  renderTopBar?: null | (() => React.ReactNode | null);
}

interface State {
  showNotification: boolean;
  showToast: boolean;
  information: { [key: string]: any };
  motionStyle: StyleProp<ViewProps>;
  successInformation: { [key: string]: any };
  successStyle: StyleProp<ViewProps>;
}

class FullView extends React.Component<Props, State> {
  static defaultProps = {
    theme: null,
    title: '',
    style: null,
    topbarStyle: null,
    hideTopbar: false,
    showMenu: true,
    background: null,
    onBack: null,
    capability: 0,
    isBleOfflineOverlay: true,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      // background: props.background,
      showNotification: false,
      showToast: false,
      information: {},
      motionStyle: {},
      successInformation: {},
      successStyle: {},
    };
  }

  componentDidMount() {
    TYEvent.on('showNotification', this.showNotification);
    TYEvent.on('hideNotification', this.hideNotification);
    TYEvent.on('showToast', this.showToast);
    TYEvent.on('hideToast', this.hideToast);
  }

  componentWillUnmount() {
    TYEvent.off('showNotification', this.showNotification);
    TYEvent.off('hideNotification', this.hideNotification);
    TYEvent.off('showToast', this.showToast);
    TYEvent.off('hideToast', this.hideToast);
  }

  onBack = (tab: string) => {
    if (typeof this.props.onBack === 'function' && tab === 'left') {
      this.props.onBack();
      return;
    }
    if (tab === 'right') {
      TYSdk.native.showDeviceMenu();
    } else {
      TYSdk.mobile.back();
    }
  };

  get topBarMoreIconName() {
    return (
      (TYSdk.devInfo.panelConfig &&
        TYSdk.devInfo.panelConfig.fun &&
        TYSdk.devInfo.panelConfig.fun.topBarMoreIconName) ||
      'pen'
    );
  }

  showNotification = (data: any) => {
    const { motionStyle, ...rest } = data;
    this.setState({ showNotification: true, information: rest, motionStyle });
  };

  showToast = (data: any) => {
    const { style, ...rest } = data;
    this.setState({
      showToast: true,
      successInformation: rest,
      successStyle: style,
    });
  };

  hideNotification = () => {
    this.setState({ showNotification: false });
  };

  hideToast = () => {
    this.setState({ showToast: false });
  };

  // 渲染 Notification
  renderNotification() {
    return (
      // @ts-ignore
      <Notification
        onClose={() => this.setState({ showNotification: false })}
        motionConfig={{ dropHeight }}
        {...this.state.information}
        show={this.state.showNotification}
        motionStyle={[{ zIndex: 99 }, this.state.motionStyle]}
      />
    );
  }

  // 渲染全局成功 Toast
  renderGlobalToast() {
    return (
      // @ts-ignore
      <GlobalToast
        onFinish={() => this.setState({ showToast: false })}
        {...this.state.successInformation}
        show={this.state.showToast}
        style={[{ zIndex: 999 }, this.state.successStyle]}
      />
    );
  }

  renderTopBar() {
    const { title, topbarStyle, hideTopbar, renderTopBar, topbarTextStyle, showMenu } = this.props;

    if (!hideTopbar) {
      if (renderTopBar) {
        return renderTopBar();
      }
      const uiPhase = TYSdk.devInfo.uiPhase || 'release';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { color } = StyleSheet.flatten(topbarTextStyle) || {
        color: '#000',
      };
      const actions = [
        {
          accessibilityLabel: 'TopBar_Btn_RightItem',
          name: this.topBarMoreIconName,
          onPress: () => this.onBack('right'),
        },
        uiPhase !== 'release' && {
          accessibilityLabel: 'TopBar_Preview',
          style: {
            backgroundColor: '#57DD43',
            borderWidth: 1,
          },
          contentStyle: { fontSize: 12 },
          color: '#000',
          source: 'Preview',
          disabled: true,
        },
      ].filter(v => !!v);
      return (
        <TopBar
          style={[{ zIndex: 999 }, topbarStyle]}
          title={title}
          titleStyle={topbarTextStyle}
          color={color}
          // @ts-ignore
          actions={showMenu ? actions : []}
          onBack={() => this.onBack('left')}
        />
      );
    }

    return null;
  }

  render() {
    const { style, theme } = this.props;
    // @ts-ignore
    const background = this.props.background || get(theme, 'global.background', '#f8f8f8');
    const isBgColor = typeof background === 'string';
    return (
      <View style={[{ flex: 1 }, isBgColor && { backgroundColor: background }, style]}>
        {this.renderNotification()}
        {this.renderTopBar()}
        {this.renderGlobalToast()}
        {this.props.children}
        <div id="root" style={{}}>
          <MaskView key={location?.hash} />
        </div>
      </View>
    );
  }
}

// @ts-ignore
const Wrapper = withTheme(FullView);

export interface TuyaWrapperProps {
  onBack: VoidFunction;
  children: React.ReactNode;
  hideTopbar?: boolean;
  title?: string;
}

const { width, height } = Dimensions.get('window');

export const TuyaWrapper = ({ onBack, children, hideTopbar, title }: TuyaWrapperProps) => (
  <Provider store={store}>
    <ThemeProvider
      theme={{
        button: {
          fontSize: 16,
        },
      }}
    >
      <Wrapper
        style={{
          // @ts-ignore
          overflow: 'hidden',
          scrollbarWidth: 'none' as const,
          width,
          height,
        }}
        title={title}
        showMenu={false}
        background="transparent"
        // @ts-ignore
        topbarStyle={
          {
            backgroundColor: 'transparent',
            borderBottomColor: '#F5F5F6',
            borderBottomWidth: 1,
          } as StyleProp<ViewStyle>
        }
        renderTopBar={null}
        hideTopbar={hideTopbar}
        onBack={onBack}
      >
        {children}
        {/* <DebugView /> */}
      </Wrapper>
    </ThemeProvider>
  </Provider>
);
