/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import renderer from 'react-test-renderer';
 import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
 import { AcrylicEnumButtonGroup } from '../index';
 import { mount } from 'enzyme';

const data = {
  label: '开关1',
  icon: TuyaRNSvgs.power,
  activeIcon: TuyaRNSvgs.plus,
  key: '1',
};

const dataSource1 = new Array(15).fill(0).map((_, idx) => {
  return {
    ...data,
    label: `开关${idx + 1}`,
    key: String(idx + 1),
    disable: idx === 0,
  };
});

describe('EnumButtonGroup', () => {
  it('Acrylic', () => {
    const wrap = renderer.create(
      <AcrylicEnumButtonGroup data={dataSource1} defaultActiveKeys={['1']} />
    ).toJSON();
    expect(wrap).toMatchSnapshot();
  });

  it('radio select', () => {
    let activeKeys = ['1'];
    const changeActiveKeys = (key, next, data) => activeKeys = next;
    const wrap = mount(
      <AcrylicEnumButtonGroup handActiveKeyChange={changeActiveKeys} data={dataSource1} activeKeys={['1']} />
    );
    const touchInstance = wrap.find('TouchableOpacity').at(1);
    touchInstance.props().onPress();
    expect(activeKeys).toEqual(['2']);
  })

  it('multi select', () => {
    let activeKeys = ['1'];
    const changeActiveKeys = (key, next, data) => activeKeys = next;
    const wrap = mount(
      <AcrylicEnumButtonGroup type="multi" handActiveKeyChange={changeActiveKeys} data={dataSource1} activeKeys={['1']} />
    );
    const touchInstance = wrap.find('TouchableOpacity').at(1);
    touchInstance.props().onPress();
    expect(activeKeys).toEqual(['1', '2']);
  })
});