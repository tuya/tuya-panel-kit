/**
 * @jest-environment jsdom
 */
import React from 'react';
import 'react-native';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import BrickButton from '../index';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

const linearBackground = {
  x1: '20%',
  y1: '20%',
  x2: '30%',
  y2: '100%',
  stops: {
    '0%': '#ffff00',
    '100%': '#000',
  },
};
describe('BrickButton', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  it('basic render', () => {
    const wrapper = mount(
      <ThemeProvider>
        <BrickButton
          text="loading"
          textStyle={{ fontSize: 14, color: '#333' }}
          loading={false}
          loadingStrokeWidth={4}
          loadingSize={22}
          type="primary"
          wrapperStyle={{ width: 36, height: 36 }}
        />
      </ThemeProvider>
    );
    const target = wrapper.findWhere(c => !!c.prop('onPress'));
    target.at(1).props().onPress();
    target.at(1).props().onShowUnderlay();
    target.at(1).props().onHideUnderlay();
    target.at(1).props().onPressIn();
    const target1 = wrapper.findWhere(c => !!c.prop('onLayout'));
    target1
      .at(1)
      .props()
      .onLayout({
        nativeEvent: {
          layout: {},
        },
      });
  });
});

describe('BrickButton Component', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  const onPress = jest.fn();
  const onChange = jest.fn();
  it('basic render', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <BrickButton
            onPress={onPress}
            text="loading"
            textStyle={{ fontSize: 14, color: '#333' }}
            loading={true}
            loadingStrokeWidth={4}
            loadingSize={22}
            type="primary"
            wrapperStyle={{ width: 36, height: 36 }}
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('BrickButton render LinearBackground', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <BrickButton
            text="loading"
            loading={true}
            loadingStrokeWidth={4}
            type="primaryGradient"
            background={linearBackground}
            onChange={onChange}
            showUnderlay={true}
            backgroundColorTouched="#f0f"
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('BrickButton render Theme', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <BrickButton
            text="loading"
            loading={true}
            loadingStrokeWidth={4}
            type="normal"
            theme={{
              fontSize: 12,
              fontColor: '#fff',
              bgRadius: 24,
              bgColor: '#353535', // 跟随主色
              bgBorder: 'transparent',
              bgBorderWidth: 0,
              loadingColor: '#fff',
              loadingBackground: 'rgba(0,0,0,.1)',
            }}
            disabled={false}
            loadingColor="#ff0"
            loadingSize="small"
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
