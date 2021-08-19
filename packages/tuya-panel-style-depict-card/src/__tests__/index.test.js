/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import renderer from 'react-test-renderer';
 import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
 import { ClassicDepictCard, NordicDepictCard, AcrylicDepictCard, AcrylicDepictIconCard } from '../index';
 
 describe('DepictCard', () => {
   it('ClassicDepictCard', () => {
     const wrapper = renderer
       .create(<ClassicDepictCard backgroundColor="#fff" />)
       .toJSON();
     expect(wrapper).toMatchSnapshot();
   });
   it('NordicDepictCard', () => {
    const wrapper = renderer
    .create(<NordicDepictCard backgroundColor="#fff" />)
    .toJSON();
  expect(wrapper).toMatchSnapshot();
   })
   it('AcrylicDepictCard', () => {
     const wrapper = renderer.create(<AcrylicDepictCard />).toJSON();
     expect(wrapper).toMatchSnapshot();
   });
   it('AcrylicDepictIconCard', () => {
    const wrapper = renderer.create(<AcrylicDepictIconCard icon={TuyaRNSvgs.power} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
 });
 