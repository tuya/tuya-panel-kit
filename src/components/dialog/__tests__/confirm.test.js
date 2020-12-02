import React from 'react';
import renderer from 'react-test-renderer';
import Confirm from '../confirm';

describe('Confirm Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <Confirm title="标题" subTitle="副标题" confirmText="确认" cancelText="取消" />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
