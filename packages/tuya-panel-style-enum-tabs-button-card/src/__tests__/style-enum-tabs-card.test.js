/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { ClassicEnumTabsButtonCard } from '../index'
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { TabBar } from 'tuya-panel-kit'

const IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

const data = [
  {
    label: '1',
    key: '1',
    disabled: true,
  },
  {
    label: '2',
    key: 'two',
  },
  {
    label: '3',
    key: '3',
  },
  {
    label: '4',
    key: '5',
  },
  {
    label: '5',
    key: '6',
  },
  {
    label: '6',
    key: '7',
  },
];

describe('EnumTabsCard', () => {
  it ('Classic', () => {
    const wrap = renderer.create(
      <ClassicEnumTabsButtonCard
        data={data}
        title="Classic"
        icon={TuyaRNSvgs.power}
        unit="档"
      />
    ).toJSON();

    expect(wrap).toMatchSnapshot();  
  });

  it('Classic set props', () => {
    const wrap = renderer.create(
      <ClassicEnumTabsButtonCard
        data={data}
        title="Classic"
        icon={IMAGE}
        iconIsImage={true}
        unit="档"
      />
    ).toJSON();

    expect(wrap).toMatchSnapshot(); 
  })

  it('in controll', () => {
    let activeKey = '1';
    const changeActiveKey = (key) => activeKey = key;
    const wrap = mount(
      <ClassicEnumTabsButtonCard
        data={data}
        title="Classic"
        icon={TuyaRNSvgs.power}
        unit="档"
        activeKey={activeKey}
        onChange={changeActiveKey}
      />
    );
    const tabInstance = wrap.find(TabBar).at(0);
    tabInstance.props().tabs[2].onItemPress();
    wrap.update();
    expect(wrap.find(TabBar).at(0).props().activeKey).toBe('1');
    expect(activeKey).toBe('3');
  });

  it('not controll', () => {
    const wrap = mount(
      <ClassicEnumTabsButtonCard
        data={data}
        title="Classic"
        defaultActiveKey="1"
      />
    );
    const tabInstance = wrap.find(TabBar).at(0);
    tabInstance.props().tabs[2].onItemPress();
    wrap.update();
    expect(wrap.find(TabBar).at(0).props().activeKey).toBe('3');
  })

  it('disabled', () => {
    const wrap = mount(
      <ClassicEnumTabsButtonCard
        data={data}
        title="Classic"
        icon={TuyaRNSvgs.power}
        unit="档"
        defaultActiveKey="3"
      />
    );
    const tabInstance = wrap.find(TabBar).at(0);
    tabInstance.props().tabs[0].onItemPress();
    wrap.update();
    expect(wrap.find(TabBar).at(0).props().activeKey).toBe('3');
  })
});

