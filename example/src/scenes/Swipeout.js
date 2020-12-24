import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Swipeout, TYText } from 'tuya-panel-kit';

const SwipeoutScene = () => (
  <Swipeout
    autoClose={true}
    right={[
      {
        text: 'delete',
        type: 'delete',
        fontStyle: { color: '#fff', fontSize: 16 },
      },
    ]}
    left={[
      {
        text: 'action',
        type: 'primary',
        fontStyle: { color: '#fff', fontSize: 16 },
      },
    ]}
  >
    <View style={styles.contentStyle}>
      <TYText style={styles.textStyle}>Swipeout</TYText>
    </View>
  </Swipeout>
);

const styles = StyleSheet.create({
  contentStyle: {
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  textStyle: {
    color: '#333',
  },
});

export default SwipeoutScene;
