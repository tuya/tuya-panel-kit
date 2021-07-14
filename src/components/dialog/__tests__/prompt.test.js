import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import jsdom from 'jsdom';
import Prompt from '../prompt';

// const { JSDOM } = jsdom;
// const { window } = new JSDOM('');
// const { document } = new JSDOM(``).window;

// global.document = document;
// global.window = window;

describe('Prompt Component', () => {
  it('basic render defaultValue', () => {
    const component = shallow(
      <Prompt
        title="标题"
        subTitle="副标题"
        confirmText="确认"
        cancelText="取消"
        placeholder="Password"
        defaultValue=""
        onConfirm={jest.fn()}
      />
    );
    // const textInput = component.findWhere(
    //   c => c.name() === StyledInput && !!c.prop('onChangeText') === true
    // );
    // textInput.simulate('changeText', 'tuya');
    // prompt.simulate('confirm');
    expect(component).toMatchSnapshot();
  });

  it('basic render value', () => {
    const component = renderer.create(
      <Prompt
        title="标题"
        subTitle="副标题"
        confirmText="确认"
        cancelText="取消"
        placeholder="Password"
        value=""
        onConfirm={jest.fn()}
        showHelp={true}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
