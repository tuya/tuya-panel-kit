import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Divider from '../index';

enzyme.configure({ adapter: new Adapter() });

describe('Divider Component', () => {
  it('basic render', () => {
    const component = shallow(<Divider />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('render with props', () => {
    const component = shallow(
      <Divider
        width={200}
        style={{
          flexDirection: 'column',
        }}
        height={2}
        color="#ff0000"
        visible={false}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
