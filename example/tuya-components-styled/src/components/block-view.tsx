import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

type ListItem = {
  title: string;
  list: {
    name: string;
    component: React.ReactNode;
    onPress?: VoidFunction;
  }[];
};

export interface BlockListProps {
  list: ListItem['list'];
  nowrap?: boolean;
}

export const BlockList = ({ list, nowrap = false }: BlockListProps) => {
  const content = (
    <View style={styles.block_list}>
      {list.map((subItem, i) => {
        const inner = (
          <>
            <TYText style={styles.item_name}>{subItem.name}</TYText>
            {subItem.component}
          </>
        );
        return (
          <>
            {i > 0 && <View style={styles.item_before} />}
            {subItem?.onPress ? (
              <TouchableOpacity style={styles.item} onPress={subItem?.onPress} key={subItem.name}>
                {inner}
              </TouchableOpacity>
            ) : (
              <View style={styles.item} key={subItem.name}>
                {inner}
              </View>
            )}
          </>
        );
      })}
    </View>
  );
  if (nowrap) {
    return content;
  }
  return <View style={[styles.container, { paddingTop: cx(12) }]}>{content}</View>;
};

export const BlockView = ({ list }: { list: ListItem[] }) => {
  return (
    <View style={styles.container}>
      {list.map(item => (
        <View style={styles.block} key={item.title}>
          <TYText style={styles.block_title}>{item.title}</TYText>
          <View style={styles.block_list}>
            <BlockList nowrap={true} list={item.list} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: cx(24),
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  block: {
    marginBottom: cx(16),
  },
  block_title: {
    paddingHorizontal: cx(16),
    color: '#999999',
  },
  block_list: {
    marginTop: cx(8),
  },
  item_before: {
    backgroundColor: '#F2F2F2',
    height: cx(1),
  },
  item: {
    height: cx(48),
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: cx(16),
  },
  item_name: {
    fontSize: cx(16),
  },
});
