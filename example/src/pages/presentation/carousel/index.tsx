import React from 'react';
import { View } from 'react-native';
import { Carousel, TYText } from 'tuya-panel-kit';

export default () => {
  return (
    <Carousel
      style={{ height: 200 }}
      selectedIndex={0}
      autoplay={true}
      loop={true}
      carouselChange={index => console.log(index)}
    >
      <View style={{ height: 200, backgroundColor: 'red' }}>
        <TYText style={{ color: '#333' }}>Carousel 1</TYText>
      </View>
      <View style={{ height: 200, backgroundColor: 'blue' }}>
        <TYText style={{ color: '#333' }}>Carousel 2</TYText>
      </View>
      <View style={{ height: 200, backgroundColor: 'yellow' }}>
        <TYText style={{ color: '#333' }}>Carousel 3</TYText>
      </View>
    </Carousel>
  );
};
