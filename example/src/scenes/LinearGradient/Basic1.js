import React from 'react';
import { View } from 'react-native';
import { Rect } from 'react-native-svg';
import { LinearGradient } from 'tuya-panel-kit';

const dimension = { width: 200, height: 300 };

export default () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={dimension}>
      <LinearGradient
        style={dimension}
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
        stops={{
          '0%': 'red',
          '100%': 'yellow',
        }}
      ><Rect {...dimension} />
      </LinearGradient>
    </View>
  </View>
);
