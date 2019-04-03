import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TYSdk, TYSectionList } from 'tuya-panel-kit';

const TYNative = TYSdk.native;

const Res = {
  hue: require('../../res/hue.png'),
};

export default class TYSectionListBasicScene extends Component {
  get sections() {
    return [
      {
        title: null,
        data: new Array(3).fill(0).map((_, idx) => ({
          key: idx,
          title: `S1: title_${idx}`,
          onPress: this._handleItemPress(idx),
        })),
      },
      {
        title: 'With Section Header',
        data: new Array(10).fill(0).map((_, idx) => ({
          key: idx,
          styles: idx === 2 && {
            container: styles.listItem,
            title: styles.title,
            subTitle: styles.subTitle,
          },
          title: `S2: title_${idx}`,
          subTitle: `S2: subTitle_${idx}`,
          arrow: true,
          iconSize: 24,
          Icon: Res.hue,
          onPress: this._handleItemPress(idx),
          renderItem: idx === 1 ? this.renderCustomItem : null,
        })),
      },
    ];
  }

  _handleItemPress = value => () => {
    TYNative.simpleTipDialog(`Click Item ${value}`, () => {});
  };

  renderCustomItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: 'red', height: 100 }}>
        <Text style={styles.title}>
          {`我是定制的列表项${item.title}，我下面那个是更改了样式的列表项`}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <TYSectionList
        style={{ alignSelf: 'stretch' }}
        contentContainerStyle={{ paddingTop: 16 }}
        sections={this.sections}
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
