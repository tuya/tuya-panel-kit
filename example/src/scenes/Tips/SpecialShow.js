import React, { PureComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Tips, Button, Utils, TYText } from 'tuya-panel-kit';
import Strings from '../../i18n';

const { convertX: cx } = Utils.RatioUtils;
const Res = require('../../res/button.png');

class TipsView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#EAEAEA',
        }}
      >
        <Button
          style={styles.button}
          wrapperStyle={{ position: 'absolute', top: cx(500), left: cx(20) }}
          text={Strings.getLang('tips_component')}
          textStyle={styles.text}
          onPress={() => this.setState({ show: !this.state.show })}
        />
        <Tips
          show={this.state.show}
          cornerPosition="bottomLeft"
          contentStyle={{ borderRadius: cx(8) }}
          tipStyle={{ position: 'absolute', top: cx(430), left: cx(20) }}
        >
          <TYText
            text={Strings.getLang('tips_bubble_component')}
            style={{ alignItems: 'center', justifyContent: 'center', fontSize: cx(28) }}
          />
        </Tips>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: cx(66),
    height: cx(44),
    backgroundColor: '#666',
  },
  text: {
    color: '#fff',
  },
});

export default TipsView;
