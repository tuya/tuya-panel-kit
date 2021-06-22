import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FullView, SwitchButton } from 'tuya-panel-kit';

const backgrounds = {
  [true]: '#ffffff',
  [false]: {
    '3%': '#FF7E38',
    '90%': '#FF624C',
  },
};

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideTopbar: false,
      showMenu: true,
      showOfflineView: false,
      title: 'Basic FullView Usage',
      topbarStyle: {},
      background: backgrounds.true,
    };
  }

  render() {
    const ControlBoolean = ({ txt, fn }) => (
      <View style={styles.controlBoolean}>
        <Text style={styles.controlBooleanTxt}>{txt}</Text>
        <SwitchButton
          value={true}
          onValueChange={fn}
        />
      </View>
    );
    return (
      <FullView
        {...this.state}
      >
        <Text>This is a baisc FullView Children</Text>
        {
          [
            { txt: '切换显示TopBar', fn: v => this.setState({ hideTopbar: v }) },
            { txt: '切换显示Menu', fn: v => this.setState({ showMenu: v }) },
            { txt: '切换显示OfflineView', fn: v => this.setState({ showOfflineView: v }) },
          ].map(({ txt, fn }) => (
            <ControlBoolean key={txt} txt={txt} fn={fn} />
          ))
        }
      </FullView>
    );
  }
}


const styles = StyleSheet.create({
  controlBoolean: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlBooleanTxt: {
    fontSize: 15,
    color: 'black',
  }
});
