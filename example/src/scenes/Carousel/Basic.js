import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Carousel } from 'tuya-panel-kit';

const CarouselScene = () => {
  return (
    <View style={styles.containerStyle}>
      <Carousel
        style={{ height: 180 }}
        selectedIndex={0}
        autoplay={true}
        loop={true}
        carouselChange={index => console.log(index)}
      >
        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <Text>Carousel 1</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
          <Text>Carousel 2</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'yellow' }}>
          <Text>Carousel 3</Text>
        </View>
      </Carousel>
    </View>
  );
};

export default CarouselScene;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
