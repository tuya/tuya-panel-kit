/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Checkbox from '../index';

describe('Checkbox', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  const onChange = jest.fn();
  it('onPress _handleToggleCheck', () => {
    const wrapper = mount(
      <Checkbox checked={true} onChange={onChange} style={{ width: 54, height: 36 }}>
        复选框
      </Checkbox>
    );
    const target = wrapper.findWhere(c => !!c.prop('onPress'));
    target.first().props().onPress();
    expect(wrapper).toMatchSnapshot();
  });
  it('basic render', () => {
    const component = renderer
      .create(
        <Checkbox checked={true} onChange={onChange} style={{ width: 54, height: 36 }}>
          复选框
        </Checkbox>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('disabled render', () => {
    const component = renderer
      .create(
        <Checkbox
          checked={true}
          color="red"
          checked={false}
          disabled={true}
          disabledColor="#666"
          hideOnUnselect={true}
          theme={{ size: 36, fontColor: '#999' }}
        >
          复选框
        </Checkbox>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('reverse render', () => {
    const component = renderer
      .create(
        <Checkbox
          size={30}
          reverse={true}
          checked={false}
          onChange={onChange}
          unCheckedIcon="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0z m0 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333z"
          checkedIcon="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m279.04 362.8032a51.2 51.2 0 0 0-72.3968 0l-253.44 253.3888-108.6464-108.544a51.2 51.2 0 0 0-72.3968 72.3456l144.2304 144.1792 0.6144 0.6656a51.2 51.2 0 0 0 72.3968 0L791.04 435.2a51.2 51.2 0 0 0 0-72.3968z"
        >
          复选框
        </Checkbox>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
