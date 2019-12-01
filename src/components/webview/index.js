import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { WebView, StyleSheet } from 'react-native';
import { RatioUtils } from '../../utils';

const { viewHeight } = RatioUtils;

export default class H5WebView extends Component {
  static propTypes = {
    title: PropTypes.string,
    source: PropTypes.string,
  };

  static defaultProps = {
    title: 'webview',
    source: 'https://www.tuya.com',
  };

  onLeftHandle = () => {
    const inst = this.getInstance();
    inst && inst.goBack();
  };

  setInstance = ref => {
    this.__webview = this.__webview || ref;
  };

  getInstance = ref => {
    this.__webview = ref;
  };

  render() {
    const { source, ...props } = this.props;

    return (
      <WebView
        ref={this.setInstance}
        automaticallyAdjustContentInsets={true}
        style={styles.webView}
        source={{ uri: source }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    height: viewHeight,
    flex: 1,
  },
});
