import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {
  TYSdk,
  TYFlatList,
} from 'tuya-panel-kit';
import ExplorerLayout from '../../components/ExplorerLayout';
import ControlBoolean from '../../components/ControlBoolean';

const TYNative = TYSdk.native;

const Res = {
  hue: require('../../res/hue.png'),
};

export default class TYFlatListScene extends Component {
  state = {
    arrow: false,
    disabled: false,
    showIcon: false,
    isCustomTheme: false,
    showCustomItem: false,
  }

  get datas() {
    const imgStyle = { width: 24, height: 24 };
    return [1, 2, 3].map(v => ({
      key: v,
      styles: this.state.isCustomTheme && {
        container: styles.listItem,
        title: styles.title,
        subTitle: styles.subTitle,
        valueText: styles.valueText,
      },
      title: `title_${v}`,
      subTitle: `subTitle_${v}`,
      arrow: this.state.arrow,
      disabled: this.state.disabled,
      Icon: this.state.showIcon ? <Image style={imgStyle} source={Res.hue} /> : null,
      onPress: this._handleItemPress(v),
      renderItem: (this.state.showCustomItem && v === 3) ? this.renderCustomItem : null,
    }));
  }

  _handleItemPress = value => () => {
    TYNative.simpleTipDialog(`Click Item ${value}`, () => {});
  }

  _handleBoolChange = key => value => {
    this.setState({ [key]: value });
  }

  renderCustomItem = () => {
    return (
      <View style={{ backgroundColor: 'red', height: 100 }}>
        <Text style={styles.title}>I am custom item</Text>
      </View>
    );
  }

  renderContent = () => {
    return (
      <TYFlatList
        style={{ alignSelf: 'stretch' }}
        data={this.datas}
      />
    );
  }

  renderPlayground = () => {
    return (
      <View>
        <ControlBoolean
          title="Toggle arrow"
          value={this.state.arrow}
          onValueChange={this._handleBoolChange('arrow')}
        />
        <ControlBoolean
          title="Toggle Disabled"
          value={this.state.disabled}
          onValueChange={this._handleBoolChange('disabled')}
        />
        <ControlBoolean
          title="Toggle icon"
          value={this.state.showIcon}
          onValueChange={this._handleBoolChange('showIcon')}
        />
        <ControlBoolean
          title="Toggle custom item 3"
          value={this.state.showCustomItem}
          onValueChange={this._handleBoolChange('showCustomItem')}
        />
        <ControlBoolean
          title="Toggle theme"
          value={this.state.isCustomTheme}
          onValueChange={this._handleBoolChange('isCustomTheme')}
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
  listItem: {
    height: 72,
    marginBottom: 8,
    backgroundColor: '#242831',
  },

  title: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  
  subTitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 4,
  },

  valueText: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
});
