import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, imageUpload } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';

const linearBackground = {
  x1: '20%',
  y1: '20%',
  x2: '30%',
  y2: '100%',
  stops: {
    '0%': '#ffff00',
    '100%': '#000',
  },
};

const radialBackground = {
  stops: [
    {
      offset: '40%',
      stopColor: '#ff0',
      stopOpacity: '1',
    },
    {
      offset: '100%',
      stopColor: '#00f',
      stopOpacity: '1',
    },
  ],
};

const row = { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' };

class ButtonScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      icon: '0',
    };
  }

  tapBtn = () => {
    this.setState({ icon: '6' });
    imageUpload();
  };

  render() {
    return (
      <ScrollView>
        <TesterTitle title="文字按钮" />
        <Button text="点击一下我" />
        <TesterTitle title="图片按钮" />
        <Button image={require('../../res/close.png')} />
        <TesterTitle title="图片按钮（大号）" />
        <Button size="large" image={require('../../res/close.png')} />
        <TesterTitle title="图片按钮（不可点击且着色为红）" />
        <Button image={require('../../res/2.png')} imageColor="#ff0000" disabled={true} />
        <TesterTitle title="图标按钮" />
        <Button icon={this.state.icon} />
        <TesterTitle title="图标按钮（带文字）" />
        <Button icon="selected" iconSize={24} text="文字" />
        {/* <TesterTitle title="图标按钮（带徽标）" />
        <Button badgeText="徽标" icon="selected" text="纯文字" /> */}
        <TesterTitle title="图标按钮（带背景色ControllerBar常用）" />
        <Button
          type="primary"
          icon="selected"
          size={48}
          iconSize={28}
          text="点我"
          // onPress={this.tapBtn}
        />
        <TesterTitle title="图标按钮（带背景渐变）" />
        <View style={row}>
          <Button
            textDirection="right"
            size={40}
            icon="selected"
            iconSize={24}
            iconColor="#fff"
            text="文字"
            background={linearBackground}
          />
          <Button
            type="primary"
            icon="selected"
            size={48}
            iconSize={28}
            iconColor="#f0f"
            text="点我"
            background={radialBackground}
          />
        </View>
        <TesterTitle title="图标按钮（多文字顺序）" />
        <View style={row}>
          <Button
            textDirection="top"
            size={40}
            icon="selected"
            iconSize={24}
            iconColor="#fff"
            text="文字"
            background="#ff0000"
          />
          <Button
            textDirection="bottom"
            size={40}
            icon="selected"
            iconSize={24}
            iconColor="#fff"
            text="文字"
            background="#000fff"
          />
          <Button
            type="primary"
            textDirection="right"
            size={40}
            icon="selected"
            iconSize={24}
            iconColor="#fff"
            text="文字"
          />
          <Button
            type="primary"
            textDirection="left"
            size={40}
            icon="selected"
            iconSize={24}
            iconColor="#fff"
            text="文字"
            background="#7ED321"
          />
        </View>
        <TesterTitle title="测试localTheme" />
        <Button
          theme={{
            margin: [6, 8, 14, 20],
            fontSize: 20,
            fontColor: '#000',
            iconSize: 30,
            iconColor: 'blue',
            bgWidth: 50,
            bgHeight: 80,
            bgRadius: 10,
            bgColor: 'red',
          }}
          textDirection="bottom"
          icon="selected"
          text="本地theme测试"
        />
      </ScrollView>
    );
  }
}

export default ButtonScene;
