/**
 * @jest-environment jsdom
 */
 import { Text } from 'react-native';
 import React from 'react';
 import { mount } from 'enzyme';
 import renderer from 'react-test-renderer';
 import Tab from '../index';
 
 describe('Tab', () => {
   const origConsole = console.error;
   beforeEach(() => {
     console.error = () => {};
   });
   afterEach(() => {
     console.error = origConsole;
   });
   jest.useFakeTimers();
   it('onPress event', () => {
     const wrapper = mount(
       <Tab defaultActiveKey="1">
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     jest.runAllTimers();
     const target = wrapper.findWhere(c => c.prop('onPress'));
     target.props().onPress();
     target.props().onLayout({ nativeEvent: { layout: { width: 100, height: 100 } } });
   });
 });
 
 describe('Tab Component', () => {
   it('basic render', () => {
     const component = renderer.create(
       <Tab defaultActiveKey="1">
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     expect(component.toJSON()).toMatchSnapshot();
     component.update(
       <Tab>
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     expect(component.toJSON()).toMatchSnapshot();
   });
   it('should props update', () => {
     const component = renderer.create(
       <Tab activeKey="2">
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
         <Tab.TabPane key="2" tab="2">
           <Text>The No.2 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     const { instance } = component.root;
     expect(instance.state.activeKey).toBe('2');
     component.update(
       <Tab activeKey="1">
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
         <Tab.TabPane key="2" tab="2">
           <Text>The No.2 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     expect(instance.state.activeKey).toBe('1');
 
     instance.state.activeKey = '4';
     component.update(
       <Tab defaultActiveKey="4">
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
         <Tab.TabPane key="2" tab="2">
           <Text>The No.2 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     expect(instance.state.activeKey).toBe('1');
   });
   it('should layout', () => {
     jest.useFakeTimers();
     const component = renderer.create(
       <Tab defaultActiveKey="1">
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     const { instance } = component.root;
     instance.onLayout({ nativeEvent: { layout: { width: 375 } } });
     jest.runAllTimers();
     expect(instance.state.containerWidth).toBe(375);
 
     instance.state.containerWidth = 345;
     instance.onLayout({ nativeEvent: { layout: { width: 345 } } });
     expect(instance.state.containerWidth).toBe(345);
   });
   it('should scroll value change', () => {
     const component = renderer.create(
       <Tab defaultActiveKey="1" onChange={jest.fn()}>
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
         <Tab.TabPane key="2" tab="2">
           <Text>The No.2 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     const { instance } = component.root;
     instance.onScrollValueChange(375);
     expect(instance.state.scrollValue._value).toBe(375);
   });
   it('should scroll content', () => {
     let mockRef;
     const component = renderer.create(
       <Tab
         defaultActiveKey="1"
         onChange={jest.fn()}
         ref={ref => {
           mockRef = ref;
         }}
       >
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
         <Tab.TabPane key="2" tab="2">
           <Text>The No.2 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     const { instance } = component.root;
     instance.tabContent.setScrollView(mockRef);
     instance.tabContent.onMomentumScrollEnd({ nativeEvent: { contentOffset: { x: 300 } } });
     expect(instance.state.activeKey).toBe('2');
     expect(instance.props.onChange).toHaveBeenCalled();
 
     instance.tabContent.onMomentumScrollEnd({ nativeEvent: { contentOffset: { x: -50 } } });
 
     instance.tabContent.onScroll();
     instance.tabContent.onScroll({ nativeEvent: { contentOffset: { x: -300 } } });
     expect(instance.tabContent.state.scrollX._value).toBe(0);
   });
   it('should press tab bar', () => {
     let mockRef;
     const component = renderer.create(
       <Tab
         defaultActiveKey="1"
         onChange={jest.fn()}
         ref={ref => {
           mockRef = ref;
         }}
       >
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
         <Tab.TabPane key="2" tab="2">
           <Text>The No.2 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     const { instance } = component.root;
     instance.tabBar.onPress(1);
     expect(instance.state.activeKey).toBe('2');
   });
   it('should tab bar layout', () => {
     let mockRef;
     const component = renderer.create(
       <Tab
         defaultActiveKey="1"
         onChange={jest.fn()}
         ref={ref => {
           mockRef = ref;
         }}
       >
         <Tab.TabPane key="1" tab="1">
           <Text>The No.1 Tab</Text>
         </Tab.TabPane>
         <Tab.TabPane key="2" tab="2">
           <Text>The No.2 Tab</Text>
         </Tab.TabPane>
       </Tab>
     );
     const { instance } = component.root;
     instance.tabBar.scrollView.scrollTo = jest.fn();
     instance.tabBar.onTabLayout(0, { nativeEvent: { layout: { x: 375, width: 375, height: 44 } } });
     instance.tabBar.onTabLayout(1, { nativeEvent: { layout: { x: 375, width: 375, height: 44 } } });
     instance.tabBar.onContainerLayout({ nativeEvent: { layout: { width: 750, height: 44 } } });
     expect(instance.tabBar.state.containerWidth).toBe(750);
     instance.tabBar.onTabContainerLayout({ nativeEvent: { layout: { width: 720, height: 44 } } });
   });
 });
 