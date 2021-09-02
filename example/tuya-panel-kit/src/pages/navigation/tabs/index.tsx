import React from 'react';
import { IconFont, Tabs, TYListItem, Utils } from 'tuya-panel-kit';
import { TouchableOpacity } from 'react-native';
import { ListView } from '#components';
import Strings from '#i18n';
/* eslint-disable react/no-array-index-key */

import { useSetParticalState } from '../../../hooks/useSetParticalState';

const { convertX: cx } = Utils.RatioUtils;

const Panel = ({ title, largeData = null, ...rest }) => {
  return (
    <Tabs.TabPanel {...rest}>
      {largeData ? (
        new Array(99).fill(0).map((_, idx) => <TYListItem key={idx} title={`${title}_${idx}`} />)
      ) : (
        <TYListItem title={title} styles={{ title: { alignSelf: 'center' } }} />
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
      fullVHeight={false}
      style={{
        backgroundColor: '#F5F5F6',
      }}
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
          contentStyle: {
            display: 'flex',
            flexDirection: 'row',
          },
          content: (
            <>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  left: cx(8),
                  width: cx(24),
                  height: cx(46),
                  paddingTop: cx(18),
                }}
                onPress={() =>
                  setState({ activeIndex: state.activeIndex > 0 ? state.activeIndex - 1 : 0 })
                }
              >
                <IconFont name="backIos" size={cx(12)} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  right: cx(8),
                  width: cx(24),
                  height: cx(46),
                  paddingTop: cx(18),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
                onPress={() =>
                  setState({
                    activeIndex:
                      state.activeIndex < state.d1.length - 2
                        ? state.activeIndex + 1
                        : state.d1.length - 1,
                  })
                }
              >
                <IconFont name="arrow" />
              </TouchableOpacity>

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
            </>
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
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#F5F5F5',
              }}
            >
              <Tabs.TabPanel>
                {new Array(2).fill(0).map((_, n) => (
                  <TYListItem
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#F5F5F5',
                    }}
                    key={n}
                    title={Strings.formatValue('tabs_tabcontenttab_1', `${n}`)}
                    styles={{
                      title: {
                        paddingLeft: cx(8),
                      },
                    }}
                  />
                ))}
              </Tabs.TabPanel>
              <Tabs.TabPanel>
                {new Array(2).fill(0).map((_, n) => (
                  <TYListItem
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#F5F5F5',
                    }}
                    key={n}
                    title={Strings.formatValue('tabs_tabcontenttab_2', `${n}`)}
                    styles={{
                      title: {
                        paddingLeft: cx(8),
                      },
                    }}
                  />
                ))}
              </Tabs.TabPanel>
              <Tabs.TabPanel>
                {new Array(2).fill(0).map((_, n) => (
                  <TYListItem
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#F5F5F5',
                    }}
                    key={n}
                    title={Strings.formatValue('tabs_tabcontenttab_3', `${n}`)}
                    styles={{
                      title: {
                        paddingLeft: cx(8),
                      },
                    }}
                  />
                ))}
              </Tabs.TabPanel>
              <Tabs.TabPanel>
                {new Array(2).fill(0).map((_, n) => (
                  <TYListItem
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#F5F5F5',
                    }}
                    key={n}
                    title={Strings.formatValue('tabs_tabcontenttab_4', `${n}`)}
                    styles={{
                      title: {
                        paddingLeft: cx(8),
                      },
                    }}
                  />
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
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#F5F5F5',
              }}
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
              style={{
                borderTopWidth: 1,
                borderTopColor: '#F5F5F5',
              }}
            >
              <Tabs.TabPanel background="#fff">
                <Tabs
                  activeKey={state.activeKey2}
                  dataSource={state.d2}
                  onChange={tab => setState({ ...state, activeKey2: tab.value })}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#F5F5F5',
                  }}
                >
                  {state.d2.map((data, idx) => (
                    <Panel
                      style={{
                        height: cx(188),
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      key={idx}
                      title={data.label}
                    />
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
