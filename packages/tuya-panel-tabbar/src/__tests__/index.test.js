/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import renderer from 'react-test-renderer';
 import { mount } from 'enzyme';
 import TabBar from '../index';
 
 const tabs = Array.from(Array(10), (v, k) => k + 1).map(v => {
   return {
     key: `${v}`,
     title: `Tab${v}`,
     textStyle: { color: '#000' },
     activeTextStyle: { color: '#f0f' },
   };
 });
 
 const tabRadios = Array.from(Array(3), (v, k) => k + 1).map(v => {
   return {
     key: `${v}`,
     title: `Tab${v}`,
     tabStyle: { alignItems: 'center', justifyContent: 'center' },
     textStyle: { fontSize: 16 },
   };
 });
 
 describe('Tabbar Component', () => {
   const origConsole = console.error;
   beforeEach(() => {
     console.error = () => {};
   });
   afterEach(() => {
     console.error = origConsole;
   });
   it('onChange', () => {
     const wrapper = mount(<TabBar tabs={tabs} type="radio" />);
     const target2 = wrapper.findWhere(c => !!c.prop('onChange'));
     target2
       .at(0)
       .props()
       .onChange(1);
   });
   it('events trigger', () => {
     const wrapper = mount(<TabBar tabs={tabs} />);
     const target = wrapper.findWhere(c => !!c.prop('onPress'));
     target
       .first()
       .props()
       .onPress();
     target
       .first()
       .props()
       .onLayout({
         nativeEvent: {
           layout: { height: 100, width: 100 },
         },
       });
     const target1 = wrapper.findWhere(c => !!c.prop('onPress') === false && !!c.prop('onLayout'));
     target1
       .at(0)
       .props()
       .onLayout({
         nativeEvent: {
           layout: { height: 100, width: 100 },
         },
       });
     target1
       .at(2)
       .props()
       .onLayout({
         nativeEvent: {
           layout: { height: 100, width: 100 },
         },
       });
   });
   it('componentWillReceiveProps with activeKey', () => {
     const wrapper = mount(<TabBar tabs={tabs} />);
     wrapper.instance().activeIndex = '1';
     wrapper.instance().tabBar = { height: 100, width: 100 };
     wrapper.instance().tab = { 1: { height: 100, width: 100 } };
     wrapper.instance().scrollView = { scrollTo: jest.fn() };
     wrapper.instance().updateScrollView(true);
     wrapper.instance().updateUnderline(true);
     wrapper.instance().updateUnderline(false);
     wrapper.instance().tabBar = true;
     wrapper.setState({ activeKey: 1 });
     wrapper.setProps({ activeKey: 1 });
     wrapper.instance().tabBar = true;
     wrapper.setState({ activeKey: 0 });
     wrapper.setProps({ activeKey: 1 });
   });
 
   it('basic render', () => {
     const component = renderer
       .create(
         <TabBar
           tabs={tabs}
           activeKey="2"
           onChange={jest.fn()}
           underlineStyle={{ width: 20 }}
           isUnderlineCenter={true}
         />
       )
       .toJSON();
     expect(component).toMatchSnapshot();
   });
 
   it('type radio', () => {
     const component = renderer
       .create(
         <TabBar
           type="radio"
           tabTextStyle={{
             color: '#F84803',
           }}
           tabActiveTextStyle={{
             color: '#F84803',
           }}
           tabs={tabRadios}
           activeKey="2"
           onChange={jest.fn()}
           underlineStyle={{ width: 20 }}
           style={{
             borderColor: 'red',
             backgroundColor: '#000',
             height: 54,
             borderRadius: 27,
             marginTop: 10,
           }}
           isUnderlineCenter={false}
         />
       )
       .toJSON();
     expect(component).toMatchSnapshot();
   });
   it('type radioCircle', () => {
     const component = renderer
       .create(
         <TabBar
           type="radioCircle"
           tabTextStyle={{
             color: '#F84803',
           }}
           tabActiveTextStyle={{
             color: '#F84803',
           }}
           tabs={tabRadios}
           activeKey="2"
           onChange={jest.fn()}
           activeColor="#57BCFB"
         />
       )
       .toJSON();
     expect(component).toMatchSnapshot();
   });
 });
 