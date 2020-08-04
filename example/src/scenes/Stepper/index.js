import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Stepper, TYText } from 'tuya-panel-kit';

export default class StepperScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 99,
    };
  }

  handleValue = value => {
    console.log(value, 'value');
  };

  render() {
    const { value } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginTop: 30,
          }}
        >
          <TYText size={16} text="乘客人数" style={{ marginRight: 16 }} />
          <Stepper value={0} />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginTop: 30,
          }}
        >
          <TYText size={16} text="乘客人数" style={{ marginRight: 16 }} />
          <Stepper
            value={value}
            stepValue={0.1}
            onValueChange={this.handleValue}
            inputStyle={{ width: 40 }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginTop: 30,
          }}
        >
          <TYText size={16} text="乘客人数" style={{ marginRight: 16 }} />
          <Stepper buttonType="triangle" value={0} />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginTop: 30,
          }}
        >
          <TYText size={16} text="乘客人数" style={{ marginRight: 16 }} />
          <Stepper buttonType="triangle" editable={false} value={99} />
        </View>
      </View>
    );
  }
}
