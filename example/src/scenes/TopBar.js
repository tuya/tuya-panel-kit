import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { TYSdk, TopBar } from 'tuya-panel-kit';
import ExplorerLayout from '../components/ExplorerLayout';
import ControlBoolean from '../components/ControlBoolean';

const TYNative = TYSdk.native;

export default class TopBarScene extends Component {
  state = {
    isLeftBack: true,
    isRightMore: true,
    isAlignCenter: true,
  }

  _handleTopBarChange = tab => {
    TYNative.simpleTipDialog(`press '${tab}'`, () => {});
  }

  _handleBoolChange = key => value => {
    this.setState({ [key]: value });
  }

  renderContent = () => {
    return (
      <TopBar
        style={styles.topBar}
        textStyle={styles.topBarText}
        centerText="Title"
        isLeftBack={this.state.isLeftBack}
        alignCenter={this.state.isAlignCenter}
        isRightMore={this.state.isRightMore}
        onChange={this._handleTopBarChange}
      />
    );
  }

  renderPlayground = () => {
    return (
      <View>
        <ControlBoolean
          title="Toggle isLeftBack"
          value={this.state.isLeftBack}
          onValueChange={this._handleBoolChange('isLeftBack')}
        />
        <ControlBoolean
          title="Toggle isRightMore"
          value={this.state.isRightMore}
          onValueChange={this._handleBoolChange('isRightMore')}
        />
        <ControlBoolean
          title="Toggle isAlignCenter"
          value={this.state.isAlignCenter}
          onValueChange={this._handleBoolChange('isAlignCenter')}
        />
      </View>
    );
  }

  render() {
    return (
      <ExplorerLayout
        renderContent={this.renderContent}
        renderPlayground={this.renderPlayground}
      />
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },

  topBarText: {
    color: '#333',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
});
