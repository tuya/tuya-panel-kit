import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Battery, TYText, Utils } from 'tuya-panel-kit';

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

  render() {
    return (
      <View style={styles.containerStyle}>
        <TYText text="默认情况下" />
        <View style={{ height: 320 }}>
          <View style={styles.row}>
            <TYText text="电量100%:  " />
            <Battery value={100} />
          </View>
          <View style={styles.row}>
            <TYText text="电量60%:  " />
            <Battery value={60} />
          </View>
          <View style={styles.row}>
            <TYText text="电量19%:  " />
            <Battery value={19} />
          </View>
          <View style={styles.row}>
            <TYText text="电量9%:  " />
            <Battery value={9} />
          </View>
          <View style={styles.row}>
            <TYText text="电量0%:  " />
            <Battery value={0} />
          </View>
        </View>
        <View style={{ height: 100 }}>
          <TYText text="电量40%  --- 本地主题" />
          <Battery value={40} size={30} theme={{ batteryColor: 'rgba(167,98,43,.5)' }} />
        </View>
        <View style={{ height: 100 }}>
          <TYText text="电量60% --- 修改电量颜色分配规则" />
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
