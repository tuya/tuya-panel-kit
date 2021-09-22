/**
 * @jest-environment jsdom
 */
import React from 'react';
import { View, Image, Animated } from 'react-native';
import { shallow } from 'enzyme';
import Drawer from '../index';

const winWidth = 375;
const winHeight = 667;
const imgUrlList =
  'https://images.tuyacn.com/rms-static/3f5ccbb0-94bc-11ea-8e3b-e3ecba4013ec-1589334682603.png?tyName=speed1.png';
const renderContent = (
  <View
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'red',
    }}
  >
    <View
      style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      key={imgUrlList}
    >
      <Image source={{ uri: imgUrlList }} style={{ width: 100, height: 100 }} />
    </View>
  </View>
);

jest.mock('Animated', () => {                                                                                                                                                                         
  const ActualAnimated = require.requireActual('Animated');                                                                                                                                           
  return {                                                                                                                                                                                            
    ...ActualAnimated,                                                                                                                                                                                
    parallel: (value, config) => {                                                                                                                                                                      
      return {                                                                                                                                                                                        
        start: jest.fn(),                                                                                                                                                  
      };                                                                                                                                                                                              
    },                                                                                                                                                                                                
  };                                                                                                                                                                                                  
}); 

describe('Drawer components', () => {
  it('basic render', () => {
    let placement = 'left';
    let visible = true;
    const wrapper = shallow(
      <Drawer
        width={winWidth / 3}
        height={winHeight}
        placement={'left'}
        visible={visible}
        onMaskPress={jest.fn()}
        onStateChange={jest.fn()}
        renderContent={renderContent}
      />
    );
    const pander = wrapper.findWhere(
      c => c.name() === 'AnimatedComponent' && !!c.prop('onStartShouldSetResponder') === true
    );
    const instance = wrapper.instance();
    instance.range = 375;
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(wrapper).toMatchSnapshot();
    placement = 'right';
    visible = false;
    wrapper.setProps({ placement, visible });
  });
});
