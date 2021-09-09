import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { TYSdk } from 'tuya-panel-core';
import TopBar from 'tuya-panel-topbar';
import WebView from 'tuya-panel-kit/lib/components/webview';

export interface IOfflineWebViewProps {
  title?: string;
  topBarStyle?: StyleProp<ViewStyle>;
  topbarTextStyle?: Omit<TextStyle, 'color'> & { color?: string };
  hideTopbar?: boolean;
  onBack?: () => any;
  source: string;
  appStyle?: StyleProp<ViewStyle>;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  navigator?: {
    getCurrentRoutes?: () => { length: number };
    pop?: () => void;
  };
}

class OfflineWebView extends Component<IOfflineWebViewProps, null> {
  static defaultProps = {
    title: '',
    topBarStyle: null,
    hideTopbar: false,
    onBack: null,
    topbarTextStyle: null,
    appStyle: null,
    barStyle: 'default',
  };

  onBack = tab => {
    const { navigator } = this.props;
    if (!this.props.onBack || !this.props.onBack()) {
      if (tab === 'right') {
        TYSdk.native.showDeviceMenu();
      } else {
        if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.pop();
          return true;
        }
        return false;
      }
    }
  };

  renderTopBar() {
    const { title, topBarStyle, hideTopbar, topbarTextStyle } = this.props;

    if (!hideTopbar) {
      const { color = '#000' } = StyleSheet.flatten(topbarTextStyle) || {};
      return (
        <TopBar
          style={topBarStyle}
          title={title}
          titleStyle={topbarTextStyle}
          color={color}
          actions={null}
          onBack={() => this.onBack('left')}
        />
      );
    }

    return null;
  }

  render() {
    const { source, appStyle, barStyle } = this.props;
    return (
      <View style={[{ flex: 1 }, appStyle]}>
        <StatusBar barStyle={barStyle} />
        {this.renderTopBar()}
        <WebView source={source} />
      </View>
    );
  }
}

export default OfflineWebView;
