import React from 'react';
import { View } from 'react-native';
import { SwitchButton } from 'tuya-panel-kit';

const SwitchScene = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SwitchButton />
    </View>
  );
};

export default SwitchScene;
