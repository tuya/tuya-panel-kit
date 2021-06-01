import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Divider, TYText, SliderWithLine } from 'tuya-panel-kit';
import Strings from '../../i18n';

class SliderWithLineScene extends PureComponent {
  setText1 = data => {
    this.text1Ref.setText(
      `value: ${data.min.value} - ${data.max.value}, percent: ${data.min.percent}%~${data.max.percent}%`
    );
  };

  setText2 = data => {
    this.text2Ref.setText(
      `value: ${data.min.value}-${data.max.value}, percent: ${data.min.percent}%~${data.max.percent}%`
    );
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TYText>{Strings.getLang('slider_bilateral')}</TYText>
        <TYText
          ref={ref => {
            this.text1Ref = ref;
          }}
        >
          {' '}
        </TYText>
        <SliderWithLine
          onValueChange={this.setText1}
          min={10}
          max={1000}
          values={[10, 600]}
          style={{ width: 330, height: 68, borderRadius: 16 }}
        />
        <Divider style={{ marginVertical: 20 }} />
        <TYText>{Strings.getLang('slider_unilateral')}</TYText>
        <TYText
          ref={ref => {
            this.text2Ref = ref;
          }}
        >
          {' '}
        </TYText>
        <SliderWithLine
          minDisabled={true}
          onValueChange={this.setText2}
          min={10}
          max={1000}
          values={[10, 600]}
          style={{ width: 330, height: 68, borderRadius: 16 }}
        />
      </View>
    );
  }
}

export default SliderWithLineScene;
