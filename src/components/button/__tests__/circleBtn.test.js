import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';
import Button from '../button';
import { StyledBtn, StyledBadge } from '../styled';

const setup = props => {
  const wrapper = shallow(<Button size="small" icon="selected" {...props} />);
  return wrapper;
};

describe('CircleButton', () => {
  it('renders correctly', () => {
    const wrapper = setup();
    wrapper.instance().props.onPress();
    wrapper.instance().props.onLayout();
    wrapper.instance().badgePosition = false;
    wrapper.setState({ iconLayout: true, badgeLayout: true });
  });
  it('renders with one child', () => {
    const wrapper = shallow(
      <Button size="small" icon={<Text>tuya icon</Text>} badgeText="tuya">
        <Text>tuya</Text>
      </Button>
    );
    const styledBtn = wrapper.find(StyledBtn);
    styledBtn.simulate('layout', { nativeEvent: { layout: {} } });
    const styledBadge = wrapper.find(StyledBadge);
    styledBadge.simulate('layout', { nativeEvent: { layout: {} } });
  });
  it('renders with two child', () => {
    shallow(
      <Button>
        <Text>tuya</Text>
        {/* <Text>tuya</Text> */}
      </Button>
    );
  });
});
