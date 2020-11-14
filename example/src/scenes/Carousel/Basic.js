import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Carousel, TYText } from 'tuya-panel-kit';

class CarouselScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        <Carousel
          style={{ height: 180 }}
          selectedIndex={this.state.index}
          autoplay={true}
          loop={true}
          carouselChange={index => console.log(index)}
        >
          <View style={{ flex: 1, backgroundColor: 'red' }}>
            <TYText style={{ color: '#333' }}>Carousel 1</TYText>
          </View>
          <View style={{ flex: 1, backgroundColor: 'blue' }}>
            <TYText style={{ color: '#333' }}>Carousel 2</TYText>
          </View>
          <View style={{ flex: 1, backgroundColor: 'yellow' }}>
            <TYText style={{ color: '#333' }}>Carousel 3</TYText>
          </View>
        </Carousel>
        <TouchableOpacity onPress={() => this.setState({ index: 1 })}>
          <TYText>Click Me!</TYText>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CarouselScene;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
