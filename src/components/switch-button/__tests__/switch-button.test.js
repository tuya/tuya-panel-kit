/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SwitchButton from '../index';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

describe('SwitchButton Component', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  it('onSwitchChange disabled=false', () => {
    const wrapper = mount(
      <ThemeProvider>
        <SwitchButton onValueChange={jest.fn()} />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
    const target = wrapper.findWhere(c => !!c.prop('onPress'));
    target.props().onPress();
  });
  it('onSwitchChange disabled = true', () => {
    const wrapper = mount(
      <ThemeProvider>
        <SwitchButton onValueChange={jest.fn()} disabled={true} />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
    const target = wrapper.findWhere(c => !!c.prop('onPress'));
    target.props().onPress();
  });
  it('basic render', () => {
    const onValueChange = jest.fn();
    const component = renderer.create(
      <ThemeProvider>
        <SwitchButton active={true} value={true} onValueChange={onValueChange} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
    component.update(
      <ThemeProvider>
        <SwitchButton active={true} value={false} onValueChange={onValueChange} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it(' render width no value', () => {
    const onValueChange = jest.fn();
    const component = renderer.create(
      <ThemeProvider>
        <SwitchButton onValueChange={onValueChange} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <ThemeProvider>
        <SwitchButton onValueChange={onValueChange} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('render width disabled', () => {
    const onValueChange = jest.fn();
    const component = renderer.create(
      <ThemeProvider>
        <SwitchButton disabled={true} value={true} onValueChange={onValueChange} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('render width thumbMore', () => {
    const onValueChange = jest.fn();
    const component = renderer.create(
      <ThemeProvider>
        <SwitchButton switchType="thumbMore" value={true} onValueChange={onValueChange} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('render width Text', () => {
    const onValueChange = jest.fn();
    const component = renderer.create(
      <ThemeProvider>
        <SwitchButton
          switchType="thumbMore"
          onText="ON"
          offText="OFF"
          value={true}
          onValueChange={onValueChange}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('SwitchButton size&theme conflict', function() {
    const component = renderer.create(
      <ThemeProvider>
        <SwitchButton
          value={true}
          active={true}
          size={{ height: 60 }}
          theme={{ width: 120, thumbSize: 55 }}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('SwitchButton render width onTintColor', function() {
    const onValueChange = jest.fn();
    const component1 = renderer.create(
      <ThemeProvider>
        <SwitchButton
          value={true}
          onText=""
          offText=""
          tintColor="#E5E5E5"
          onTintColor={{
            '0%': '#FA709A',
            '100%': '#FEDD44',
          }}
          onValueChange={onValueChange}
          style={{ marginRight: 14 }}
        />
      </ThemeProvider>
    );
    expect(component1.toJSON()).toMatchSnapshot();

    const component2 = renderer.create(
      <ThemeProvider>
        <SwitchButton
          value={true}
          tintColor="#E5E5E5"
          onTintColor={{
            '0%': '#FA709A',
            '100%': '#FEDD44',
          }}
          onValueChange={onValueChange}
          style={{ marginRight: 14 }}
        />
      </ThemeProvider>
    );
    expect(component2.toJSON()).toMatchSnapshot();
  });
});
