import React from 'react';
// import { Text } from 'react-native';
import { Tab, TYText } from 'tuya-panel-kit';

class TabScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab: '1'
    };
  }
  render() {
    const tabPaneArr = [1, 2, 3, 4];
    const contentStyle = {
      height: 200,
      color: '#333',
      textAlign: 'center',
      lineHeight: 200,
      backgroundColor: '#fff'
    };
    const tabPanes = tabPaneArr.map(item => (
      <Tab.TabPane key={`${item}`} tab={`${item}`}>
        <TYText style={contentStyle}>{`The No.${item} Tab`}</TYText>
      </Tab.TabPane>
    ));
    return (
      <Tab
        activeKey={this.state.tab}
        onChange={value => this.setState({ tab: value })}
      >
        { tabPanes }
      </Tab>
    );
  }
}

export default TabScene;
