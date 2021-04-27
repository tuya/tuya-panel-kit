import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';
import Strings from '../../i18n';

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
  };

  render() {
    return (
      <ScrollView>
        <TesterTitle title = {Strings.getLang('button_text')} />
        <Button text={Strings.getLang('click_me')}/>
        <TesterTitle title={Strings.getLang('button_picture')} />
        <Button image={require('../../res/close.png')} />
        <TesterTitle title={Strings.getLang('button_pic_large')} />
        <Button size="large" image={require('../../res/close.png')} />
        <TesterTitle title={Strings.getLang('button_pic_noclickable')} />
        <Button image={require('../../res/2.png')} imageColor="#ff0000" disabled={true} />
        <TesterTitle title={Strings.getLang('button_icon')} />
        <Button icon={this.state.icon} />
        <TesterTitle title={Strings.getLang('button_icon_with_text')} />
        <Button icon="selected" iconSize={24} text={Strings.getLang('text')} />
        {/* <TesterTitle title="图标按钮（带徽标）" />
        <Button badgeText="徽标" icon="selected" text="纯文字" /> */}
        <TesterTitle title={Strings.getLang('button_icon_with_background_color')} />
        <Button
          type="primary"
          icon="selected"
          size={48}
          iconSize={28}
          text={Strings.getLang('click_me')}
          // onPress={this.tapBtn}
        />
        <TesterTitle title={Strings.getLang('button_icon_with_background_gradient')}/>
        <View style={row}>
          <Button
            textDirection="right"
            size={40}
            icon="selected"
            iconSize={24}
            iconColor="#fff"
            text={Strings.getLang('text')}
            background={linearBackground}
          />
          <Button
            type="primary"
            icon="selected"
            size={48}
            iconSize={28}
            iconColor="#f0f"
            text={Strings.getLang('click_me')}
            background={radialBackground}
          />
        </View>
        <TesterTitle title={Strings.getLang('button_icon_multi_word')} />
        <View style={row}>
          <Button
            textDirection="top"
            size={40}
            icon="selected"
            iconSize={24}
            iconColor="#fff"
            text={Strings.getLang('text')}
            background="#ff0000"
          />
          <Button
            textDirection="bottom"
            size={40}
            icon="selected"
            iconSize={24}
            iconColor="#fff"
            text={Strings.getLang('text')}
            background="#000fff"
          />
          <Button
            type="primary"
            textDirection="right"
            size={40}
            icon="selected"
            iconSize={24}
            iconColor="#fff"
            text={Strings.getLang('text')}
          />
          <Button
            type="primary"
            textDirection="left"
            size={40}
            icon="selected"
            iconSize={24}
            iconColor="#fff"
            text={Strings.getLang('text')}
            background="#7ED321"
          />
        </View>
        <TesterTitle title={Strings.getLang('button_local_theme_test')} />
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
          text={Strings.getLang('button_local_theme_test')}
        />
      </ScrollView>
    );
  }
}

export default ButtonScene;
