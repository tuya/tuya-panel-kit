import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TYSectionList, TYText } from 'tuya-panel-kit';
import { sections } from '../config';

const Res = {
  logo: require('../res/Logo.png'),
};

const Home = () => (
  <TYSectionList
    style={{ backgroundColor: '#fff' }}
    ListHeaderComponent={
      <View style={styles.header}>
        <Image source={Res.logo} />
        <TYText style={styles.text} text="Tuya Design" weight="500" color="#000" size={16} />
      </View>
    }
    contentContainerStyle={styles.container}
    separatorStyle={{ opacity: 0 }}
    headerStyle={{ marginLeft: 0 }}
    sections={sections}
  />
);

const styles = StyleSheet.create({
  header: {
    marginTop: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: 16,
  },
  container: {
    marginHorizontal: 24,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
});

export default Home;
