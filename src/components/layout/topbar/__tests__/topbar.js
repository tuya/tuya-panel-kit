import 'react-native';
import _ from 'lodash';
import React from 'react';
import { Platform } from 'react-native';
import renderer from 'react-test-renderer';
import TopBar from '../index';

const backIcon = Platform.OS === 'ios' ? 'backIos' : 'backAndroid';

describe('TopBar Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(
        <TopBar.Container background="#000">
          <TopBar.Action name={backIcon} color="red" onPress={() => {}} />
          <TopBar.Content title="Title" />
          <TopBar.Action name="pen" color="yellow" onPress={() => {}} />
        </TopBar.Container>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('render gradient', () => {
    const linearBackground = {
      stops: {
        '0%': 'red',
        '100%': 'yellow',
      },
    };
    const radialBackground = {
      stops: [
        {
          offset: '0%',
          stopColor: '#ff0',
          stopOpacity: '1',
        },
        {
          offset: '100%',
          stopColor: '#00f',
          stopOpacity: '1',
        },
      ],
    };
    const Linear = renderer
      .create(
        <TopBar.Container background={linearBackground}>
          <TopBar.Action name={backIcon} onPress={() => {}} />
          <TopBar.Content title="Title" />
        </TopBar.Container>
      )
      .toJSON();
    const Radial = renderer.create(
      <TopBar
        style={{ marginTop: 24 }}
        background={radialBackground}
        title="Title"
        onBack={() => {}}
      />
    );
    expect(Linear).toMatchSnapshot();
    expect(Radial).toMatchSnapshot();
  });

  it('render multiple actions', () => {
    const linearBackground = {
      stops: {
        '0%': 'red',
        '100%': 'yellow',
      },
    };
    const radialBackground = {
      stops: [
        {
          offset: '0%',
          stopColor: '#ff0',
          stopOpacity: '1',
        },
        {
          offset: '100%',
          stopColor: '#00f',
          stopOpacity: '1',
        },
      ],
    };
    const C1 = renderer
      .create(
        <TopBar.Container background="blue">
          <TopBar.Action name={backIcon} onPress={() => {}} />
          <TopBar.Action source="定时" color="red" onPress={() => {}} />
          <TopBar.Content
            title="Very Very Very Very Very Long Title"
            subTitle="SubTitle"
            onPress={() => {}}
          />
          {['plus', 'warning', 'edit'].map(v => (
            <TopBar.Action key={v} name={v} onPress={() => {}} />
          ))}
        </TopBar.Container>
      )
      .toJSON();
    const C2 = renderer.create(
      <TopBar
        style={{ marginTop: 24 }}
        background="blue"
        title="Very Very Very Very Very Long Title"
        subTitle="SubTitle"
        onPress={() => {}}
        leftActions={[
          {
            name: backIcon,
            onPress: () => {},
          },
          {
            source: '定时',
            color: 'red',
            onPress: () => {},
          },
        ]}
        actions={['plus', 'warning', 'edit'].map(v => ({
          name: v,
          onPress: () => {},
        }))}
      />
    );
    expect(C1).toMatchSnapshot();
    expect(C2).toMatchSnapshot();
  });
});
