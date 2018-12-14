import React from 'react';
import { View } from 'react-native';
import { RadialGradient } from 'tuya-panel-kit';

const dimension = { width: 200, height: 300 };

export default () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={dimension}>
      <RadialGradient
        style={dimension}
        stops={[{
          offset: '0%',
          stopColor: '#ff0',
          stopOpacity: '1',
        }, {
          offset: '100%',
          stopColor: '#00f',
          stopOpacity: '1',
        }]}
        rx="50%"
        ry="50%"
        fx="50%"
        fy="50%"
        cx="50%"
        cy="50%"
      />
    </View>
  </View>
);
