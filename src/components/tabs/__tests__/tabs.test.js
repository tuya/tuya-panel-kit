/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Tabs from '../index';
import Panel from '../tab-panel';
import TYListItem from '../../TYLists/list-item';
import { StyledTabBtn } from '../styled';

describe('Tabs Component', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  const dataResource = [
    { value: '1', label: '探测器' },
    { value: '2', label: '遥控器' },
    { value: '3', label: 'RFID' },
    { value: '4', label: '有限探测器' },
  ];

  const dataResource2 = [
    { value: '1', label: '姓名' },
    { value: '2', label: '年龄' },
    { value: '3', label: '家庭住址' },
    { value: '4', label: '房间' },
    { value: '5', label: '小区' },
    { value: '6', label: '单元' },
    { value: '7', label: '毕业院校' },
    { value: '8', label: '户籍' },
  ];
  it('basic.render', () => {
    const component = renderer.create(
      <Tabs activeKey="1" dataSource={dataResource} underlineWidth={30} />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('TabContent.render', () => {
    const component = renderer.create(
      <Tabs.TabContent preload={false} activeIndex={0} onRelease={jest.fn()}>
        {dataResource.map((data, idx) => (
          <Panel key={idx} title={`第 ${idx} 页`} />
        ))}
      </Tabs.TabContent>
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('Tabs.TabPanel', () => {
    const component = renderer.create(
      <Tabs activeKey="1" dataSource={dataResource} swipeable={true} onChange={jest.fn}>
        <Tabs.TabPanel>
          {new Array(2).fill(0).map((_, n) => (
            <TYListItem key={n} title={`测试_${n}`} />
          ))}
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          {new Array(2).fill(0).map((_, n) => (
            <TYListItem key={n} title={`Test_${n}`} />
          ))}
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          {new Array(2).fill(0).map((_, n) => (
            <TYListItem key={n} title={`校舍_${n}`} />
          ))}
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          {new Array(2).fill(0).map((_, n) => (
            <TYListItem key={n} title={`模版_${n}`} />
          ))}
        </Tabs.TabPanel>
      </Tabs>
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('Tabs + Panel', () => {
    const component = renderer.create(
      <Tabs activeKey="3" dataSource={dataResource} onChange={jest.fn()}>
        {dataResource.map((data, idx) => (
          <Panel key={idx} title={data.label} />
        ))}
      </Tabs>
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('Tabs + Tabs.TabPanel + Tabs', () => {
    const component = renderer.create(
      <Tabs
        tabPosition="bottom"
        underlineStyle={{ backgroundColor: 'transparent' }}
        activeKey="1"
        dataSource={dataResource}
        swipeable={false}
        onChange={jest.fn()}
      >
        <Tabs.TabPanel background="#fff">
          <Tabs
            activeKey="3"
            dataSource={dataResource2}
            onChange={tab => setState({ ...state, activeKey2: tab.value })}
          >
            {dataResource2.map((data, idx) => (
              <Panel key={idx} title={data.label} />
            ))}
          </Tabs>
        </Tabs.TabPanel>
        <Tabs.TabPanel background="#fff">
          <TYListItem title="遥控器" />
        </Tabs.TabPanel>
        <Tabs.TabPanel background="#fff">
          <TYListItem title="模拟器" />
        </Tabs.TabPanel>
        <Tabs.TabPanel background="#fff">
          <TYListItem title="有限探测器" />
        </Tabs.TabPanel>
      </Tabs>
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('render with shallow', () => {
    const wrapper = shallow(
      <Tabs activeKey="1" dataSource={dataResource} underlineWidth={30} disabled={false} />
    );
    const pander = wrapper.find(StyledTabBtn).at(0);
    const pander1 = wrapper.find(StyledTabBtn).at(1);
    const pander2 = wrapper.find(StyledTabBtn).at(2);
    const pander3 = wrapper.find(StyledTabBtn).at(3);
    pander.simulate('layout', {
      nativeEvent: { locationX: 45, locationY: 3, layout: { width: 100 } },
    });
    pander1.simulate('layout', {
      nativeEvent: { locationX: 45, locationY: 3, layout: { width: 100 } },
    });
    pander2.simulate('layout', {
      nativeEvent: { locationX: 45, locationY: 3, layout: { width: 100 } },
    });
    pander3.simulate('layout', {
      nativeEvent: { locationX: 45, locationY: 3, layout: { width: 100 } },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('render with TabContent', () => {
    const wrapper = shallow(
      <Tabs
        tabPosition="bottom"
        underlineStyle={{ backgroundColor: 'transparent' }}
        activeKey={undefined}
        dataSource={dataResource}
        swipeable={false}
        onChange={jest.fn()}
      >
        <Tabs.TabPanel background="#fff">
          <Tabs activeKey="3" dataSource={dataResource2}>
            {dataResource2.map((data, idx) => (
              <Panel key={idx} title={data.label} />
            ))}
          </Tabs>
        </Tabs.TabPanel>
        <Tabs.TabPanel background="#fff">
          <TYListItem title="遥控器" />
        </Tabs.TabPanel>
        <Tabs.TabPanel background="#fff">
          <TYListItem title="模拟器" />
        </Tabs.TabPanel>
        <Tabs.TabPanel background="#fff">
          <TYListItem title="有限探测器" />
        </Tabs.TabPanel>
      </Tabs>
    );
    const pander = wrapper.findWhere(c => c.name() === 'TabContent' && !!c.prop('onMove') === true);
    pander.simulate('move', { gestureState: { dx: 20, dy: 20 }, idx: 0, percent: 0.2 });
    pander.simulate('move', { gestureState: { dx: -5, dy: 20 }, idx: 0 });
    pander.simulate('release', { gestureState: { dx: 20, dy: 20 }, idx: 0 });
    expect(wrapper).toMatchSnapshot();
  });
  it('PanResponder', () => {
    const wrapper = mount(
      <Tabs activeKey="1" dataSource={dataResource} underlineWidth={30} disabled={false} />
    );

    const target = wrapper.findWhere(c => !!c.prop('onStartShouldSetResponder')).at(1);
    target.props().onStartShouldSetResponder();
    target.props().onMoveShouldSetResponder();
    target.props().onResponderGrant({
      nativeEvent: { locationX: 60, locationY: 0 },
      touchHistory: { touchBank: [] },
    });
    target.props().onResponderMove({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.props().onResponderRelease({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.props().onStartShouldSetResponderCapture({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.props().onResponderTerminationRequest();
    target.props().onResponderTerminate({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    wrapper.instance()._tabIsReady = true;
    wrapper.instance()._moveTo(10);
    wrapper.setProps({ activeKey: 10 });
    wrapper.unmount();
  });
});
