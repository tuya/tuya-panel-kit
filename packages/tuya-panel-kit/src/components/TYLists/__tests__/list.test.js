/**
 * @jest-environment jsdom
 */
import { View, Text, Image } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import List from '../list';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

const Res = {
  color: require('../../color-picker/color-picker.png'),
};

jest.mock('../../../utils', () => ({
  ...require.requireActual('../../../utils'),
  ThemeConsumer: props => props.children({ theme: { color: 'red' } }),
}));

const setup = (props = {}) => {
  return mount(<List {...props} />);
};

describe('TYList', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  it('basic render', () => {
    const onChange = jest.fn();
    const data = [1, 2].map((v, index) => ({
      key: v,
      title: `title_${v}`,
      theme: { descFontColor: '#7ED321' },
      Action: '清扫成功',
      subTitle: `清扫 0平方米 | 工作 5分钟`,
      checked: true,
      onChange,
      renderItem: ({ item }) => <List.CheckboxItem {...item} />,
      value: 1,
    }));
    const wrapper = setup({ data });
    expect(wrapper).toMatchSnapshot();
    const target = wrapper.findWhere(c => c.prop('onPress'));
    target.first().props().onPress();
  });
  it('basic render value != undefined', () => {
    const onChange = jest.fn();
    const data = [1, 2].map((v, index) => ({
      key: v,
      title: `title_${v}`,
      theme: { descFontColor: '#7ED321' },
      Action: '清扫成功',
      subTitle: `清扫 0平方米 | 工作 5分钟`,
      onChange,
      value: 1,
    }));
    const wrapper = setup({ data });
    expect(wrapper).toMatchSnapshot();
  });
  it('basic render value = undefined', () => {
    const onChange = jest.fn();
    const data = [1, 2].map(v => ({
      key: v,
      title: `title_${v}`,
      theme: { descFontColor: '#7ED321' },
      Action: '清扫成功',
      subTitle: `清扫 0平方米 | 工作 5分钟`,
      onChange,
      value: undefined,
    }));
    const wrapper = setup({ data });
    expect(wrapper).toMatchSnapshot();
  });
});

describe('List Component', () => {
  it('basic render', () => {
    const data = [1].map(v => ({
      key: v,
      styles: {
        container: { height: 64 },
        content: { backgroundColor: 'red' },
        contentLeft: { width: 48, height: 48 },
        contentCenter: { backgroundColor: 'blue' },
        contentRight: { width: 48, height: 48 },
        title: { color: 'yellow' },
        subTitle: { color: '#000' },
        valueText: { color: 'pink' },
      },
      title: `title_${v}`,
      subTitle: `subTitle_${v}`,
      Icon: <Image style={{}} source={Res.color} />,
      onPress: jest.fn(),
    }));
    const component = renderer.create(<List data={data} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with Checkbox', () => {
    const onChange = jest.fn();
    const data1 = [1, 2].map(v => ({
      key: v,
      title: `title_${v}`,
      theme: { descFontColor: '#7ED321' },
      Action: '清扫成功',
      subTitle: `清扫 0平方米 | 工作 5分钟`,
      checked: true,
      onChange,
      renderItem: ({ item }) => (
        <ThemeProvider>
          <List.CheckboxItem {...item} />
        </ThemeProvider>
      ),
    }));
    const component = renderer.create(
      <ThemeProvider>
        <List data={data1} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with SliderItem', () => {
    const onSlidingComplete = jest.fn();
    const data1 = [1, 2, 3, 4].map((v, index) => ({
      key: index.toString(),
      actionType: 'iconfont',
      Icon:
        index === 0
          ? { uri: 'https://tuya.com' }
          : index === 1
          ? []
          : index === 2
          ? 'volume-sharp-off'
          : 2,
      Action: index === 0 ? <View /> : 'volume-sharp-max',
      value: 40,
      minimumValue: 0,
      maximumValue: 100,
      canTouchTrack: true,
      onSlidingComplete,
      renderItem: ({ item }) => (
        <ThemeProvider>
          <List.SliderItem {...item} />
        </ThemeProvider>
      ),
    }));
    const data2 = [1, 2].map(v => ({
      key: v,
      actionType: 'text',
      Icon: () => <Image source={Res.color} />,
      Action: 4,
      value: 40,
      minimumValue: 0,
      maximumValue: 100,
      canTouchTrack: true,
      onSlidingComplete,
      renderItem: ({ item }) => (
        <ThemeProvider>
          <List.SliderItem {...item} />
        </ThemeProvider>
      ),
    }));

    const data3 = [1, 2].map(v => ({
      key: v,
      actionType: 'image',
      Icon: false,
      Action: { uri: '../../color-picker/color-picker.png' },
      value: 40,
      minimumValue: 0,
      maximumValue: 100,
      canTouchTrack: true,
      onSlidingComplete,
      renderItem: ({ item }) => (
        <ThemeProvider>
          <List.SliderItem {...item} />
        </ThemeProvider>
      ),
    }));
    const component1 = renderer.create(
      <ThemeProvider>
        <List data={data1} />
      </ThemeProvider>
    );
    const component2 = renderer.create(
      <ThemeProvider>
        <List data={data2} />
      </ThemeProvider>
    );

    const component3 = renderer.create(
      <ThemeProvider>
        <List data={data3} />
      </ThemeProvider>
    );
    expect(component1.toJSON()).toMatchSnapshot();
    expect(component2.toJSON()).toMatchSnapshot();
    expect(component3.toJSON()).toMatchSnapshot();
  });

  it('should render with SwitchButton', () => {
    const data = [1, 2].map(v => ({
      key: v,
      title: `title_${v}`,
      value: true,
    }));
    const component = renderer.create(
      <ThemeProvider>
        <List data={data} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with InputItem', () => {
    const data = [1, 2, 3].map(v => ({
      key: 0,
      title: `名字`,
      value: 'TUYA',
      placeholder: '输入名字',
      renderItem: ({ item }) => (
        <ThemeProvider>
          <List.InputItem {...item} />
        </ThemeProvider>
      ),
    }));
    const component = renderer.create(
      <ThemeProvider>
        <List data={data} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with custom item', () => {
    const data = [1, 2, 3].map(v => ({
      key: v,
      title: `title_${v}`,
      value: true,
      renderItem:
        v === 3
          ? () => (
              <View>
                <Text>custom item</Text>
              </View>
            )
          : null,
    }));
    const component = renderer.create(
      <ThemeProvider>
        <List data={data} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should able to use FlatList props', () => {
    const data = [1].map(v => ({
      key: v,
      title: `title_${v}`,
      value: `${v}`,
      Action: () => (
        <View>
          <Text>Action</Text>
        </View>
      ),
    }));
    const component = renderer.create(<List data={data} ListHeaderComponent={<View />} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
