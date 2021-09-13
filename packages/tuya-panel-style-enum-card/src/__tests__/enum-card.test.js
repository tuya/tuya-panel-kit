/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { ClassicEnumCard, NordicEnumCard, AcrylicEnumCard } from '../index';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { mount } from 'enzyme';

const IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';
const list = [
  {
    label: '状态1',
    icon: TuyaRNSvgs.power,
    key: '0',
  },
  {
    label: '状态2状态2状态2',
    icon: TuyaRNSvgs.power,
    key: '1',
  },
  {
    label: '状态3',
    icon: TuyaRNSvgs.power,
    key: '2',
  },
  {
    label: '状态4',
    icon: TuyaRNSvgs.power,
    key: '3',
  },
  {
    label: '状态5',
    icon: TuyaRNSvgs.power,
    key: '4',
  },
  {
    label: '状态6',
    icon: TuyaRNSvgs.power,
    key: '5',
  },
];
const list1 = list.map(item => {
  return {
    ...item,
    isImage: true,
    icon: IMAGE,
  };
});

describe('EnumCard', () => {
  it('Classic', () => {
    const wrap = mount(<ClassicEnumCard
      style={{ marginTop: 20 }}
      title="工作模式"
      data={list}
      defaultActiveKey="5"
      activeIconColor="#ff6700"
      activeTextColor="#ff6700"
      showText={false}
      padding={[8, 8, 8, 8]}
    />);
    expect(wrap.find('Carousel').at(0).props().selectedIndex).toBe(1);
    expect(wrap).toMatchSnapshot();
  });

  it('NordicEnumCard', () => {
    const warp = renderer.create(<NordicEnumCard
      style={{ marginTop: 20 }}
      title="传入图片"
      showTitle={false}
      data={list1.slice(0, 4)}
      defaultActiveKey="1"
    />).toJSON();
    expect(warp).toMatchSnapshot();
  });

  it('AcrylicEnumCard', () => {
    const warp = renderer.create(<AcrylicEnumCard title="工作模式" data={list}/>).toJSON();
    expect(warp).toMatchSnapshot();
  });

  it('hand key change controlled', () => {
    let activeKey = '0';
    const onActiveKeyChange = key => { activeKey = key };
    const wrap = mount(<ClassicEnumCard data={list} activeKey={activeKey} activeIconBgColor="#888999" onActiveKeyChange={onActiveKeyChange} />);
    const touchInstance = wrap
      .find('TouchableOpacity')
      .at(1);
    touchInstance.props().onPress();
    expect(activeKey).toBe(list[1].key);
  });

  it('hand key change controlled and no onActiveKeyChange', () => {
    let activeKey = '0';
    const wrap = mount(<ClassicEnumCard data={list} activeKey={activeKey} activeIconBgColor="#888999" />);
    const touchInstance = wrap
      .find('TouchableOpacity')
      .at(1);
    touchInstance.props().onPress();
    expect(activeKey).toBe('0');
  });

  it('hand key change uncontrolled', () => {
    const iconBgColor = "#222333";
    const activeIconBgColor = "#888999";
    const wrap = mount(<ClassicEnumCard 
      data={list.slice(0,3)} 
      // defaultActiveKey="0" 
      iconBgColor={iconBgColor} 
      activeIconBgColor={activeIconBgColor} />);
    const touchInstance = wrap
      .find('TouchableOpacity')
      .at(1);
    touchInstance.props().onPress();
    wrap.update()
    expect(wrap.find('ClassicIconBackground').at(0).props().iconBgColor).toBe(iconBgColor);
    expect(wrap.find('ClassicIconBackground').at(1).props().iconBgColor).toBe(activeIconBgColor);
  });
});


