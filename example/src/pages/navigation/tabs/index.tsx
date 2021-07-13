/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Tabs, TYListItem, Utils } from 'tuya-panel-kit';

import { ListView } from '#components';
import { useSetParticalState } from '#hooks/useSetParticalState';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

const Panel = ({ title, largeData = null, ...rest }) => {
  return (
    <Tabs.TabPanel {...rest}>
      {largeData ? (
        new Array(99).fill(0).map((_, idx) => <TYListItem key={idx} title={`${title}_${idx}`} />)
      ) : (
        <TYListItem title={title} />
      )}
    </Tabs.TabPanel>
  );
};

export default () => {
  const [state, setState] = useSetParticalState({
    activeIndex: 0,
    activeKey1: '1',
    d1: [
      { value: '1', label: Strings.getLang('tabs_basic_1') },
      { value: '2', label: Strings.getLang('tabs_basic_2') },
      { value: '3', label: Strings.getLang('tabs_basic_3') },
      { value: '4', label: Strings.getLang('tabs_basic_4') },
    ],
    activeKey2: '3',
    d2: [
      { value: '1', label: Strings.getLang('tabs_screen_1') },
      { value: '2', label: Strings.getLang('tabs_screen_2') },
      { value: '3', label: Strings.getLang('tabs_screen_3') },
      { value: '4', label: Strings.getLang('tabs_screen_4') },
      { value: '5', label: Strings.getLang('tabs_screen_5') },
      { value: '6', label: Strings.getLang('tabs_screen_6') },
      { value: '7', label: Strings.getLang('tabs_screen_7') },
      { value: '8', label: Strings.getLang('tabs_screen_8') },
    ],
  });
  const handleRelease = (_gestureState, index) => setState({ ...state, activeIndex: index });
  return (
    <ListView
      contentPadding={false}
      contentCenter={true}
      list={[
        {
          title: Strings.getLang('tabs_basic'),
          content: (
            <Tabs
              activeKey={state.activeKey1}
              dataSource={state.d1}
              onChange={tab => setState({ ...state, activeKey1: tab.value })}
            />
          ),
        },
        {
          title: Strings.getLang('tabs_screen'),
          itemStyle: {
            marginTop: cx(40),
          },
          content: (
            <Tabs
              activeKey={state.activeKey2}
              dataSource={state.d2}
              onChange={tab => setState({ ...state, activeKey2: tab.value })}
            />
          ),
        },
        {
          title: Strings.getLang('tabs_basic_stateless'),
          itemStyle: {
            marginTop: cx(40),
          },
          content: <Tabs dataSource={state.d2} />,
        },
        {
          title: Strings.getLang('tabs_tabcontentsin'),
          itemStyle: {
            marginTop: cx(40),
          },
          content: (
            <Tabs.TabContent
              preload={false}
              activeIndex={state.activeIndex}
              onRelease={handleRelease}
            >
              {state.d1.map((data, idx) => (
                <Panel
                  key={idx}
                  title={Strings.formatValue('tabs_tabcontentsin_page_sin', String(idx))}
                />
              ))}
            </Tabs.TabContent>
          ),
        },
        {
          title: Strings.getLang('tabs_tabcontenttab'),
          itemStyle: {
            marginTop: cx(40),
          },
          content: (
            <Tabs
              activeKey={state.activeKey1}
              dataSource={state.d1}
              swipeable={true}
              onChange={tab => setState({ ...state, activeKey1: tab.value })}
            >
              <Tabs.TabPanel>
                {new Array(2).fill(0).map((_, n) => (
                  <TYListItem key={n} title={Strings.formatValue('tabs_tabcontenttab_1', `${n}`)} />
                ))}
              </Tabs.TabPanel>
              <Tabs.TabPanel>
                {new Array(2).fill(0).map((_, n) => (
                  <TYListItem key={n} title={Strings.formatValue('tabs_tabcontenttab_2', `${n}`)} />
                ))}
              </Tabs.TabPanel>
              <Tabs.TabPanel>
                {new Array(2).fill(0).map((_, n) => (
                  <TYListItem key={n} title={Strings.formatValue('tabs_tabcontenttab_3', `${n}`)} />
                ))}
              </Tabs.TabPanel>
              <Tabs.TabPanel>
                {new Array(2).fill(0).map((_, n) => (
                  <TYListItem key={n} title={Strings.formatValue('tabs_tabcontenttab_4', `${n}`)} />
                ))}
              </Tabs.TabPanel>
            </Tabs>
          ),
        },
        {
          title: Strings.getLang('tabs_screen2'),
          itemStyle: {
            marginTop: cx(40),
          },
          content: (
            <Tabs
              activeKey={state.activeKey2}
              dataSource={state.d2}
              onChange={tab => setState({ ...state, activeKey2: tab.value })}
            >
              {state.d2.map((data, idx) => (
                <Panel key={idx} title={data.label} />
              ))}
            </Tabs>
          ),
        },
        {
          title: Strings.getLang('tabs_nested'),
          itemStyle: {
            marginTop: cx(40),
          },
          content: (
            <Tabs
              tabPosition="bottom"
              underlineStyle={{ backgroundColor: 'transparent' }}
              activeKey={state.activeKey1}
              dataSource={state.d1}
              swipeable={false}
              onChange={tab => setState({ ...state, activeKey1: tab.value })}
            >
              <Tabs.TabPanel background="#fff">
                <Tabs
                  activeKey={state.activeKey2}
                  dataSource={state.d2}
                  onChange={tab => setState({ ...state, activeKey2: tab.value })}
                >
                  {state.d2.map((data, idx) => (
                    <Panel key={idx} title={data.label} />
                  ))}
                </Tabs>
              </Tabs.TabPanel>
              <Tabs.TabPanel background="#fff">
                <TYListItem title={Strings.getLang('tabs_basic_2')} />
              </Tabs.TabPanel>
              <Tabs.TabPanel background="#fff">
                <TYListItem title={Strings.getLang('tabs_basic_3')} />
              </Tabs.TabPanel>
              <Tabs.TabPanel background="#fff">
                <TYListItem title={Strings.getLang('tabs_basic_4')} />
              </Tabs.TabPanel>
            </Tabs>
          ),
        },
      ]}
    />
  );
};
