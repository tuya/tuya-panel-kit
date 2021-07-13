import React from 'react';
import renderer from 'react-test-renderer';
import Alert from '../alert';

describe('Alert Component', () => {
  it('basic render', () => {
    const component = renderer.create(<Alert title="标题" subTitle="副标题" confirmText="确认" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
