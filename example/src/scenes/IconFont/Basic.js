import React from 'react';
import { View } from 'react-native';
import { IconFont, UnitText, TYText } from 'tuya-panel-kit';

const IconScene = () => (
  <View style={{ padding: 16 }}>
    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
      <TYText style={{ color: '#333' }}>IconFont: </TYText>
      <IconFont name="0" size={50} color="red" />
    </View>
    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
      <TYText style={{ color: '#333' }}>UnitText: </TYText>
      <UnitText value="99" size={50} unit="celsius" valueColor="red" unitColor="red" />
    </View>
  </View>
);

export default IconScene;
