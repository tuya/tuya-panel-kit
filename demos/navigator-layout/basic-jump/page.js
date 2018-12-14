import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'tuya-panel-kit';

// eslint-disable-next-line
export default ({ num, navigator }) => (
  <View style={[styles.container, styles.center]}>
    <Text style={styles.welcomeTxt}>This is Page {num}</Text>
    <Button
      style={styles.btnStyle}
      onPress={() => navigator.pop()}
    >
      <Text style={styles.navTxt}>Click to go back!</Text>
    </Button>
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
    backgroundColor: 'green',
    marginBottom: 2,
  },
  navTxt: {
    marginHorizontal: 5,
    backgroundColor: 'transparent',
    fontSize: 12,
    color: '#303A4B',
  }
});
