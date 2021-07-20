import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { Svg } from '#components';

import { routes } from '../routes';

const { convertX } = Utils.RatioUtils;

export interface PageHomeProps {
  navigate: (href: string) => void;
}

export const PageHome: React.FC<PageHomeProps> = ({ navigate }) => {
  const goto = (href: string) => {
    navigate(href);
  };
  return (
    <>
      <View style={styles.head}>
        <Image
          style={styles.head_logo}
          source={{
            uri:
              'https://images.tuyacn.com/rms-static/3dec3ee0-b3d9-11eb-9adb-1b12f902f79d-1620903119310.png?tyName=210513tuya.png',
          }}
        />
        <Text style={styles.head_title}>Tuya Design</Text>
      </View>
      <View style={styles.list}>
        {routes.map(item => (
          <TouchableOpacity
            key={item.name}
            style={styles.list_item}
            onPress={() => {
              goto(item.href);
            }}
          >
            <Text>{item.name}</Text>
            {Svg.right}
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  head: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: convertX(100),
    paddingBottom: convertX(44),
  },
  head_logo: {
    width: convertX(98),
    height: convertX(49),
    resizeMode: 'contain',
  },
  head_title: {
    fontSize: convertX(16),
    marginTop: convertX(16),
  },
  list: {
    paddingHorizontal: convertX(24),
    paddingBottom: 50,
  },
  list_item: {
    height: convertX(58),
    backgroundColor: '#F5F5F5',
    borderRadius: convertX(8),
    marginBottom: convertX(8),
    paddingHorizontal: convertX(16),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PageHome;
