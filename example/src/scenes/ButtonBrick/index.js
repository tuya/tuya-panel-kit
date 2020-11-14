/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { ScrollView } from 'react-native';
import { BrickButton } from 'tuya-panel-kit';

class ButtonBrickScene extends React.PureComponent {
  render() {
    return (
      <ScrollView>
        <BrickButton text="loading" loading={true} />
      </ScrollView>
    );
  }
}

export default ButtonBrickScene;
