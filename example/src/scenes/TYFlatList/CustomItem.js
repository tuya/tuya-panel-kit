import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TYSdk, TYFlatList } from 'tuya-panel-kit';
import Strings from '../../i18n';

const TYNative = TYSdk.native;

const Res = {
  edit: require('./res/edit.png'),
  delete: require('./res/delete.png'),
  more: require('./res/more.png'),
  cover: require('./res/cover.png'),
};

export default class TYFlatListCustomItemScene extends Component {
  state = {
    showActions: false,
  };

  _handleEdit = () => {
    TYNative.simpleTipDialog('edit', () => {});
  };

  _handleDelete = () => {
    TYNative.simpleTipDialog('delete', () => {});
  };

  renderActions = () =>
    this.state.showActions ? (
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.8} onPress={this._handleEdit}>
          <Image style={{ marginRight: 6 }} source={Res.edit} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={this._handleDelete}>
          <Image source={Res.delete} />
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity
        style={[styles.center, { width: 48, height: 48 }]}
        activeOpacity={0.8}
        onPress={() => this.setState({ showActions: true })}
      >
        <Image source={Res.more} />
      </TouchableOpacity>
    );

  render() {
    return (
      <TYFlatList.Item
        styles={{
          container: styles.listItem,
          subTitle: styles.textSubtitle,
        }}
        title={Strings.getLang('tyflatlist_baby_favorite')}
        subTitle={Strings.getLang('tyflatlist_number')}
        iconSize={60}
        Icon={Res.cover}
        Action={this.renderActions()}
        onPress={() => this.setState({ showActions: false })}
      />
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 76,
  },

  textSubtitle: {
    marginTop: 4,
  },

  row: {
    flexDirection: 'row',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
