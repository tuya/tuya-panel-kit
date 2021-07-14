import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Battery, TYText, Utils } from 'tuya-panel-kit';
import Strings from '../../i18n';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

export default class BatteryScreen extends Component {
  // 自定义电量颜色分配规则
  calcColor = (top: number, highColor: string, middleColor: string, lowColor: string) => {
    // 0-10%: 红色   10%-60%: 黑色    60%-100%: 绿色
    if (top <= 8.4 && top >= 3) {
      return highColor;
    } else if (top <= 15.6 && top > 8.4) {
      return middleColor;
    }
    return lowColor;
  };

  by_default = Strings.getLang('battery_default');
  power = Strings.getLang('battery_power');
  local_theme = Strings.getLang('battery_theme');
  rule = Strings.getLang('battery_rule');
  p1 = this.power + '100%:  ';
  p2 = this.power + '60%:  ';
  p22 = this.power + '60%';
  p3 = this.power + '40%';
  p4 = this.power + '19%:  ';
  p5 = this.power + '9%:  ';
  p6 = this.power + '0%:  ';
  native = this.p3 + "  --- " + this.local_theme;
  modify_rule = this.p22 + "  --- "+ this.rule;

  render() {
    return (
      <View style={styles.containerStyle}>
        <TYText text= {this.by_default} />
        <View style={{ height: 320 }}>
          <View style={styles.row}>
            <TYText text= {this.p1}/>
            <Battery value={100} />
          </View>
          <View style={styles.row}>
            <TYText text={this.p2} />
            <Battery value={60} />
          </View>
          <View style={styles.row}>
            <TYText text={this.p4}/>
            <Battery value={19} />
          </View>
          <View style={styles.row}>
            <TYText text={this.p5} />
            <Battery value={9} />
          </View>
          <View style={styles.row}>
            <TYText text={this.p6}/>
            <Battery value={0} />
          </View>
        </View>
        <View style={{ height: 100 }}>
          <TYText text={this.native} />
          <Battery value={40} size={30} theme={{ batteryColor: 'rgba(167,98,43,.5)' }} />
        </View>
        <View style={{ height: 100 }}>
          <TYText text={this.modify_rule} />
          <Battery value={60} size={cx(30)} onCalcColor={this.calcColor} middleColor="#999" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
