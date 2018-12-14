import React from 'react';
import { StyleSheet } from 'react-native';
import { TYSectionList } from 'tuya-panel-kit';
import { sections } from '../config';

const Home = () => (
  <TYSectionList
    contentContainerStyle={styles.container}
    sections={sections}
  />
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop: 16,
  },
});

export default Home;
