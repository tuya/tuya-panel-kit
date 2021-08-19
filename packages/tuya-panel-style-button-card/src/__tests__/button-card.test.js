/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { ClassicButtonCard, NordicButtonCard } from '../index';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { mount } from 'enzyme';
import { View, Text } from 'react-native'

const list = [
  {
    label: '按钮1',
    key: '0',
    disabled: true,
  },
  {
    label: '按钮2',
    key: '1',
  },
  {
    label: '按钮3',
    key: '2',
  },
  {
    label: '按钮4',
    key: '3',
  },
];
const list1 = list.map((item, idx) => ({
  ...item,
  label: `custom_${idx}`
}));

describe('ButtonCard', () => {
  it('Classic', () => {
    const wrap = renderer.create(<ClassicButtonCard
      title="工作模式"
      showIconBg={false}
      icon={TuyaRNSvgs.power}
      list={list}
    />).toJSON();
    expect(wrap).toMatchSnapshot();
  });

  it('Nordic', () => {
    const wrap = renderer.create(<NordicButtonCard
      title="工作"
      showTitle="false"  
      list={list}
    />).toJSON();
    expect(wrap).toMatchSnapshot();
  })

  it('controlled component', () => {
    let activekey = ['0'];
    const changeActiveKey = (key, nextKeys, data) => {
      activekey = nextKeys;
    }
    const wrap = mount(<ClassicButtonCard
      title="工作模式"
      showIconBg={false}
      icon={TuyaRNSvgs.power}
      list={list}
      activeKeys={activekey}
      activeKeyChange={changeActiveKey}
    />);
    const tapInstance = wrap.find('TouchableOpacity').at(1);
    tapInstance.props().onPress();
    expect(activekey).toEqual(['1']);
  });

  it('controlled component multi type', () => {
    let activekey = ['0'];
    const changeActiveKey = (key, nextKeys, data) => {
      activekey = nextKeys;
    }
    const wrap = mount(<ClassicButtonCard
      title="工作模式"
      showIconBg={false}
      icon={TuyaRNSvgs.power}
      list={list}
      activeKeys={activekey}
      activeKeyChange={changeActiveKey}
      type="multi"
    />);
    const tapInstance = wrap.find('TouchableOpacity').at(1);
    tapInstance.props().onPress();
    expect(activekey).toEqual(['0', '1']);
  });

  it('custom button render', () => {
    const renderButtonItem = data => {
      return (
        <View style={styles.buttonStyle}>
          <Text style={{ marginTop: 15 }}>{data.label}</Text>
        </View>
      );
    };
    const wrap = renderer.create(<NordicButtonCard
      list={list1}
      renderButtonItem={renderButtonItem}
      rowCount={4}
      showTitle={false}
      backgroundColor="rgba(255, 255, 255, 0)"
    />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});
