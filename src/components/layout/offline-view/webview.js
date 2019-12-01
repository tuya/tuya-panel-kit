/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, ViewPropTypes, View, StatusBar } from 'react-native';
import TYSdk from '../../../TYNativeApi';
import WebView from '../../webview';
import TopBar from '../topbar';

const TYNative = TYSdk.native;

class OfflineWebView extends Component {
  static propTypes = {
    title: PropTypes.string,
    topBarStyle: ViewPropTypes.style,
    topbarTextStyle: Text.propTypes.style,
    hideTopbar: PropTypes.bool,
    onBack: PropTypes.func,
    source: PropTypes.string.isRequired,
    appStyle: ViewPropTypes.style,
    barStyle: PropTypes.string,
  };
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
        TYNative.showDeviceMenu();
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
