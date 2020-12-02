import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'tuya-panel-kit';

// eslint-disable-next-line
export default ({ navigator }) => (
  <View style={[styles.container, styles.center]}>
    <Text style={styles.welcomeTxt}>Welcome to basic usage of NavigatorLayout</Text>
    {
      [1, 2].map(v => (
        <Button
          style={styles.btnStyle}
          key={v}
          onPress={() => navigator.push({ id: `page${v}` })}
        ><Text style={styles.navTxt}>Go to page {v}</Text>
        </Button>
      ))
    }
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTxt: {
    fontSize: 15,
    color: 'black',
    marginBottom: 30,
  },
  btnStyle: {
    borderWidth: 1,
    borderColor: '#303A4B',
    borderRadius: 3,
    height: 40,
    backgroundColor: 'cyan',
    marginBottom: 2,
  },
  navTxt: {
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    fontSize: 12,
    color: '#303A4B',
  }
});
