/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import WaveView from '../index';

describe('WaveView components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <WaveView
        style={{ width: 120, height: 120, borderRadius: 60 }}
        H={60}
        waveParams={[
          { A: 15, T: 120, fill: '#bde1dd' },
          { A: 10, T: 100, fill: '#239c8e' },
        ]}
        animated={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let animated = false;
    const wrapper = shallow(
      <WaveView
        style={{ width: 120, height: 120, borderRadius: 60 }}
        H={60}
        waveParams={[
          { A: 15, T: 120, fill: '#bde1dd' },
          { A: 10, T: 100, fill: '#239c8e' },
        ]}
        animated={animated}
      />
    );
    animated = true;
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ wrapper });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
