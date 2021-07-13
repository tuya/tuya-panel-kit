import React from 'react';
import { View, Platform, ViewPagerAndroid, ScrollView } from 'react-native';
import { shallow } from 'enzyme';
import Carousel from '../index';
import TYText from '../../TYText';

const carouselChange = jest.fn();

function setup(props = {}) {
  const wrapper = shallow(
    <Carousel
      style={{ height: 180 }}
      selectedIndex={0}
      hasDots={true}
      loop={true}
      carouselChange={carouselChange}
      dotStyle={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' }}
      dotActiveStyle={{ backgroundColor: '#ff0' }}
      {...props}
    >
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <TYText style={{ color: '#333' }}>Carousel 1</TYText>
      </View>
      <View style={{ flex: 1, backgroundColor: 'blue' }}>
        <TYText style={{ color: '#333' }}>Carousel 2</TYText>
      </View>
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        <TYText style={{ color: '#333' }}>Carousel 3</TYText>
      </View>
    </Carousel>
  );
  const instance = wrapper.instance();
  return { wrapper, instance };
}

describe('Carousel Component', () => {
  jest.useFakeTimers();
  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
    expect(wrapper).toMatchSnapshot();
  });
  it('autoplay methods with count(2) and os(ios)', () => {
    Platform.OS = 'ios';
    const { wrapper, instance } = setup({
      autoplay: true,
      loop: false,
      onMomentumScrollEnd: jest.fn(),
    });
    instance.count = 2;
    wrapper.setState({ isScrolling: true }, () => {
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
    });
  });
  it('autoplay methods with count(2) and os(android)', () => {
    Platform.OS = 'android';
    let wrapper = setup({
      autoplay: true,
      loop: false,
      onMomentumScrollEnd: jest.fn(),
      useViewPagerOnAndroid: false,
    });
    wrapper.instance.count = 2;
    wrapper.instance.scrollview = {
      setPageWithoutAnimation: jest.fn(),
      setPage: jest.fn(),
      scrollTo: jest.fn(),
    };
    wrapper.wrapper.setState({ loopJump: true }, () => {
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
    });
    wrapper = setup({
      autoplay: true,
      loop: false,
      onMomentumScrollEnd: jest.fn(),
      useViewPagerOnAndroid: true,
    });
    wrapper.instance.count = 2;
    wrapper.instance.scrollview = {
      setPageWithoutAnimation: jest.fn(),
      setPage: jest.fn(),
      scrollTo: jest.fn(),
    };
    wrapper.wrapper.setState({ loopJump: true }, () => {
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
    });
  });
  it('autoplay methods with count(1)', () => {
    const { instance } = setup({ autoplay: true, loop: false });
    instance.count = 1;
    jest.runOnlyPendingTimers();
  });
  it('componentWillReceiveProps with selectedIndex(100) ', () => {
    const { wrapper } = setup();
    wrapper.setProps({ selectedIndex: 100 });
  });
  it('componentWillReceiveProps with selectedIndex(0) ', () => {
    const { wrapper, instance } = setup();
    instance.count = 100;
    wrapper.setProps({ selectedIndex: 0 });
  });
  it('trigger onPageScrollStateChanged', () => {
    Platform.OS = 'android';
    const { wrapper } = setup({ onScrollBeginDrag: jest.fn() });
    const viewPagerAndroid = wrapper.find(ViewPagerAndroid);
    viewPagerAndroid.simulate('pageScrollStateChanged', 'dragging');
  });
  it('trigger onScrollEndDrag', () => {
    Platform.OS = 'ios';
    const { wrapper } = setup({ onScrollEndDrag: jest.fn() });
    const scrollView = wrapper.find(ScrollView);
    wrapper.setState({ selectedIndex: 0 }, () => {
      scrollView.simulate('scrollEndDrag', { nativeEvent: { contentOffset: { x: 0 } } });
    });
  });
  it('trigger onLayout', () => {
    Platform.OS = 'android';
    const { wrapper, instance } = setup({ useViewPagerOnAndroid: false });
    const targetNode = wrapper.findWhere(
      node => node.name() === 'View' && !!node.prop('onLayout') === true
    );
    instance.scrollview = { scrollTo: jest.fn() };
    targetNode.simulate('layout', { nativeEvent: { layout: { width: 100 } } });
    jest.runOnlyPendingTimers();
  });
  it('trigger onScrollEnd', () => {
    Platform.OS = 'android';
    const { wrapper } = setup({ useViewPagerOnAndroid: true });
    const targetNode = wrapper.find(ViewPagerAndroid);
    targetNode.simulate('pageSelected', {
      nativeEvent: {
        contentOffset: { x: -1 },
      },
    });
    wrapper.setState({ width: 1 }, () => {
      targetNode.simulate('pageSelected', {
        nativeEvent: {
          contentOffset: { x: 1 },
        },
      });
    });
  });
  it('renders correctly with one child', () => {
    const wrapper = shallow(
      <Carousel
        style={{ height: 180 }}
        selectedIndex={0}
        hasDots={true}
        loop={true}
        carouselChange={carouselChange}
        dotStyle={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' }}
        dotActiveStyle={{ backgroundColor: '#ff0' }}
      >
        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <TYText style={{ color: '#333' }}>Carousel 1</TYText>
        </View>
      </Carousel>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly with no child', () => {
    const wrapper = shallow(
      <Carousel
        style={{ height: 180 }}
        selectedIndex={0}
        hasDots={true}
        loop={true}
        carouselChange={carouselChange}
        dotStyle={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' }}
        dotActiveStyle={{ backgroundColor: '#ff0' }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
