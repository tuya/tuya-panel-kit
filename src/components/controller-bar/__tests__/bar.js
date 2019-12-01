import React from 'react';
import renderer from 'react-test-renderer';
import Bar from '../index';

jest.mock('tuya-panel-kit', () => ({
  Button: 'Button',
  Utils: { RatioUtils: { convert: i => i } },
  Carousel: 'Carousel',
}));

describe('bar', () => {
  it('basic render', () => {
    const component = renderer.create(<Bar button={[{ text: '1' }]} />);
    const { instance } = component.root;
    instance.wrapperLayout({ nativeEvent: { layout: { width: 375, height: 44 } } });
    expect(instance.state.wrapperWidth).toEqual(375);
    expect(component.toJSON()).toMatchSnapshot();
  });
});

describe('bar Group', () => {
  it('basic render', () => {
    const component = renderer.create(
      <Bar.Group>
        <Bar button={[{ text: '1' }]} />
        <Bar button={[{ text: '2' }]} backgroundType="alpha" />
      </Bar.Group>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('divide', () => {
    const component = renderer.create(
      <Bar.Group type="divide">
        <Bar button={[{ text: '1' }]} />
        <Bar button={[{ text: '2' }]} />
      </Bar.Group>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('swiper', () => {
    const component = renderer.create(
      <Bar.Group type="swiper">
        <Bar button={[{ text: '1' }]} />
        <Bar button={[{ text: '2' }]} />
      </Bar.Group>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
