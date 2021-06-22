import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Divider, TYText, SliderWithLine, Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

class SliderWithLineScene extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View>
          <TYText style={{ marginVertical: 20 }}>horizontal</TYText>
          <SliderWithLine
            stepValue={1}
            onSlidingComplete={value => console.log(value, 'res')}
            style={{ marginBottom: 20 }}
            nounWidth={4}
          />
          <SliderWithLine
            stepValue={10}
            minValue={10}
            maxValue={80}
            minDisabled={false}
            onSlidingComplete={value => console.log(value, 'res')}
            activeNounColor="#f00"
          />
        </View>

        <TYText style={{ marginVertical: 20 }}>vertical</TYText>
        <View style={{ flexDirection: 'row' }}>
          <SliderWithLine
            horizontal={false}
            // onSlidingStart={value => console.log(value, 'res')}
            onSlidingComplete={value => console.log(value, 'res')}
            activeNounColor="#f00"
            nounWidth={cx(14)}
            nounHeight={cx(1)}
            width={cx(60)}
            height={cx(327)}
            style={{ marginRight: 20 }}
          />
          <SliderWithLine
            minDisabled={false}
            stepValue={10}
            horizontal={false}
            minValue={10}
            maxValue={80}
            onSlidingComplete={value => console.log(value, 'res')}
            nounWidth={cx(14)}
            nounHeight={cx(1)}
            width={cx(60)}
            height={cx(327)}
          />
        </View>
      </View>
    );
  }
}

export default SliderWithLineScene;
