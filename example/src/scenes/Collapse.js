import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Collapsible } from 'tuya-panel-kit';

class CollapseScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }
  onChange = () => {
    console.log('Change');
  };

  tapBtn = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={this.tapBtn}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#fff',
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ color: '#333' }}>Click it</Text>
        </TouchableOpacity>
        <Collapsible
          collapsed={this.state.collapsed}
          onChange={this.onChange}
          align="top"
          // style={{ position: 'absolute', bottom: 0 }}
        >
          <View
            style={{
              borderRadius: 50,
              width: 375,
              height: 300,
              backgroundColor: '#fff',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                backgroundColor: '#fff',
                textAlign: 'center',
                color: '#333',
              }}
            >
              I am content
            </Text>
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default CollapseScene;
