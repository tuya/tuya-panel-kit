import { Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MaskView from '../mask-view';

describe('MaskView Component', () => {
  it('basic render', () => {
    const component = renderer.create(<MaskView />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should render and update', () => {
    const ShowMaskView = MaskView.Show;
    ShowMaskView.render(<Text>123</Text>);
    ShowMaskView.updateChild({ style: { backgroundColor: 'red' } });
    const instance = ShowMaskView.modal;
    expect(instance.state.contentNode).toEqual(<Text style={{ backgroundColor: 'red' }}>123</Text>);
  });
  it('should close', () => {
    const ShowMaskView = MaskView.Show;
    const instance = ShowMaskView.modal;
    ShowMaskView.close()
    expect(instance.state.visible).toBe(false);
  });
  it('should custom close', () => {
    const ShowMaskView = MaskView.Show;
    ShowMaskView.render(<Text>123</Text>, { onMaskClick: jest.fn() });
    const instance = ShowMaskView.modal;
    instance.closeModalView();
    expect(instance.state.onMaskClick).toHaveBeenCalled();
  });
  it('should custom close1', () => {
    const ShowMaskView = MaskView.Show;
    const instance = ShowMaskView.modal;
    expect(instance.state.onMaskClick).toHaveBeenCalled();
  });
});

