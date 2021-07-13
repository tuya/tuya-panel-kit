import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';

const { convertX } = Utils.RatioUtils;

type ListItem = {
  title: string;
  content: React.ReactNode;
  itemStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export interface ListViewProps {
  list: ListItem[];
  contentPadding?: boolean;
  contentCenter?: boolean;
  nthItemStyle?: StyleProp<ViewStyle>;
}

export const ListView = ({
  list,
  contentPadding = true,
  contentCenter = false,
  nthItemStyle: itemStyle,
}: ListViewProps) => {
  return (
    <View style={styles.list}>
      {list.map((item, i) => (
        <View style={[styles.list_item, i > 0 ? itemStyle : {}, item.itemStyle]} key={item.title}>
          <TYText style={styles.list_item_title}>{`· ${item.title}`}</TYText>
          <View
            style={[
              styles.list_item_content,
              contentPadding ? { paddingHorizontal: convertX(24) } : {},
              contentCenter ? { flex: 1, justifyContent: 'center', flexDirection: 'row' } : {},
              item.contentStyle,
            ]}
          >
            {item.content}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: convertX(24),
  },
  list_item: {
    marginBottom: convertX(24),
  },
  list_item_title: {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: convertX(14),
    paddingHorizontal: convertX(24),
  },
  list_item_content: {
    marginTop: convertX(16),
  },
});
