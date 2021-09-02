import React from 'react';
import { View } from 'react-native';
import { Carousel, TYText, Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  const Content = ({ backgroundColor, text, textBgColor }) => {
    return (
      <View
        style={{
          height: 200,
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: cx(70),
            height: cx(38),
            backgroundColor: textBgColor,
            borderRadius: cx(19),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TYText style={{ color: '#fff' }}>{text}</TYText>
        </View>
      </View>
    );
  };
  return (
    <Carousel
      style={{ height: 200 }}
      selectedIndex={0}
      autoplay={true}
      loop={true}
      carouselChange={index => console.log(index)}
      dotStyle={{
        backgroundColor: '#F9895C',
      }}
    >
      <Content text="1" backgroundColor="#F82B00" textBgColor="#F85B0F" />
      <Content text="2" backgroundColor="#F86016" textBgColor="#F97E4C" />
      <Content text="3" backgroundColor="#F82B00" textBgColor="#F85B0F" />
    </Carousel>
  );
};
