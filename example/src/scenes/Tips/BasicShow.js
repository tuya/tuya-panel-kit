import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tips, Button, Utils, TYText } from 'tuya-panel-kit';

const { winWidth, convertX: cx } = Utils.RatioUtils;

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
          text="Tips气泡组件"
          textStyle={styles.text}
          onPress={() => this.setState({ show: !this.state.show })}
        />
        <View style={styles.center}>
          <Tips show={this.state.show} cornerPosition="topLeft" contentStyle={styles.bigTips} />
          <Tips
            show={this.state.show}
            cornerPosition="topCenter"
            contentStyle={styles.bigTips}
            bgColor="#0ff"
            tipStyle={{ marginHorizontal: cx(16) }}
          />
          <Tips show={this.state.show} cornerPosition="topRight" contentStyle={styles.bigTips} />
        </View>
        <View style={[styles.center, { marginTop: cx(30) }]}>
          <Tips show={this.state.show} cornerPosition="bottomLeft" contentStyle={styles.bigTips} />
          <Tips
            show={this.state.show}
            cornerPosition="bottomCenter"
            bgColor="#0ff"
            contentStyle={styles.bigTips}
            tipStyle={{ marginHorizontal: cx(16) }}
          />
          <Tips show={this.state.show} cornerPosition="bottomRight" contentStyle={styles.bigTips} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    width: winWidth,
    height: 44,
    backgroundColor: '#666',
  },
  bigTips: {
    width: cx(105),
    height: cx(66),
    borderRadius: cx(8),
  },

  text: {
    color: '#fff',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TipsView;
