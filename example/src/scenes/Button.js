import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'tuya-panel-kit';
import ExplorerLayout from '../components/ExplorerLayout';

const dimension = { width: 200, height: 300 };
const gradient = {
  '3%': '#4facfe',
  '90%': '#00f2fe',
};

export default class ButtonScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: false,
    };
  }

  tapCodeBtn = () => {
    this.setState({ code: !this.state.code });
  }

  renderContent = () => (
    <View style={[styles.container, dimension]}>
      <Text style={styles.clearText}>Basic Usage</Text>
      <Button
        style={[styles.format, this.state.code ? { backgroundColor: '#F5A623' } : null]}
        onPress={this.tapCodeBtn}
      ><Text style={styles.clearText}>Tap to change background color</Text>
      </Button>

      <Text style={[styles.clearText, { marginTop: 20 }]}>LinearGradient background Button</Text>
      <Button
        background={gradient}
        style={[styles.format2]}
      ><Text style={styles.clearText}>LinearGradient button</Text>
      </Button>

      <Text style={styles.clearText}>Image background Button</Text>
      <Button
        background={require('../res/button.png')}
        style={[styles.format2]}
      ><Text style={styles.clearText}>Image button</Text>
      </Button>
    </View>
  )

  render() {
    return (
      <ExplorerLayout
        renderContent={this.renderContent}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  format: {
    borderWidth: 1,
    borderColor: '#303A4B',
    borderRadius: 3,
    padding: 5,
    marginTop: 10,
  },

  format2: {
    borderColor: '#303A4B',
    borderRadius: 3,
    padding: 5,
    marginTop: 10,
  },

  clearText: {
    backgroundColor: 'transparent',
    fontSize: 12,
    color: '#303A4B',
  },

});
