/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Utils } from 'tuya-panel-utils';
import { AcrylicEnumSliderCard } from '../index'
import { mount } from 'enzyme';

const { ThemeProvider } = Utils.ThemeUtils;

const data = [
  {
    label: '关闭',
    key: '0',
  },
  {
    label: '一档',
    key: '1',
  },
  {
    label: '二档',
    key: '2',
  },
  {
    label: '三档',
    key: '3',
  },
];

describe('EnumSliderCard', () => {
  it('Acrylic', () => {
    const wrap = renderer.create(
      <ThemeProvider>
        <AcrylicEnumSliderCard
          data={data}
          title="AcrylicEnumSliderCard"
          bottomPromptTexts={['Off', 'Max']}
        />
      </ThemeProvider>
    ).toJSON();
    expect(wrap).toMatchSnapshot();
  });

  it('activeKey', () => {
    let activeKey = '1';
    const handSlidingComplete = (key, index) => activeKey = key;
    const wrap = mount(
      <ThemeProvider>
        <AcrylicEnumSliderCard
          data={data}
          title="AcrylicEnumSliderCard"
          bottomPromptTexts={['Off', 'Max']}
          handSlidingComplete={handSlidingComplete}
        />
      </ThemeProvider>
    );
    const sliderInstance = wrap.find('Slider');  
    sliderInstance.props().onSlidingComplete(3);
    wrap.update();
    expect(activeKey).toBe('3');
    expect(wrap.find('Slider').props().value).toBe(3);
  });
});