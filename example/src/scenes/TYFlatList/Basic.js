import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import Strings from '../../i18n';

const TYNative = TYSdk.native;

const Res = {
  hue: require('../../res/hue.png'),
};

export default class TYFlatListBasicScene extends Component {
  get data() {
    return new Array(15).fill(0).map((_, idx) => ({
      key: idx,
      styles: idx === 2 && {
        container: styles.listItem,
        title: styles.title,
        subTitle: styles.subTitle,
      },
      title: `title_${idx}`,
      subTitle: `subTitle_${idx}`,
      arrow: true,
      iconSize: 24,
      Icon: idx === 0 ? '1' : Res.hue,
      onPress: this._handleItemPress(idx),
      renderItem: idx === 1 ? this.renderCustomItem : null,
    }));
  }

  _handleItemPress = value => () => {
    TYNative.simpleTipDialog(`Click Item ${value}`, () => {});
  };

  renderCustomItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: 'red', height: 100 }}>
        <Text style={styles.title}>
          {`${Strings.getLang('tyflatlist_customized')}${item.title}${Strings.getLang('tyflatlist_changedstyle')}`}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <TYFlatList
        style={{ alignSelf: 'stretch' }}
        contentContainerStyle={{ paddingTop: 16 }}
        data={this.data}
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
});
