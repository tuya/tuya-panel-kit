import { Platform } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import TopBar from '../index';
import { ThemeUtils } from '../../../../utils';

const { ThemeProvider } = ThemeUtils;

const backIcon = Platform.OS === 'ios' ? 'backIos' : 'backAndroid';
describe('TopBarContainer', () => {
  it('basic render', () => {
    const wrapper = shallow(<TopBar.Container background="#000">123</TopBar.Container>);
    wrapper.setState({ background: '#fff' });
  });
});
describe('TopBar Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <TopBar.Container background="#000">
          <TopBar.Action name={backIcon} color="red" onPress={() => {}} />
          <TopBar.Content title="Title" />
          <TopBar.Action name="pen" color="yellow" onPress={() => {}} />
        </TopBar.Container>
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
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
        <ThemeProvider>
          <TopBar.Container background={linearBackground}>
            <TopBar.Action name={backIcon} onPress={() => {}} />
            <TopBar.Content title="Title" />
          </TopBar.Container>
        </ThemeProvider>
      )
      .toJSON();
    const Radial = renderer.create(
      <ThemeProvider>
        <TopBar
          style={{ marginTop: 24 }}
          background={radialBackground}
          title="Title"
          onBack={() => {}}
        />
      </ThemeProvider>
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
        <ThemeProvider>
          <TopBar.Container background="blue">
            <TopBar.Action name={backIcon} onPress={() => {}} />
            <TopBar.Action source={123} color="red" onPress={() => {}} />
            <TopBar.Content
              title="Very Very Very Very Very Long Title"
              subTitle="SubTitle"
              onPress={() => {}}
            />
            {['plus', 'warning', 'edit'].map(v => (
              <TopBar.Action key={v} name={v} onPress={() => {}} />
            ))}
          </TopBar.Container>
        </ThemeProvider>
      )
      .toJSON();
    const C2 = renderer.create(
      <ThemeProvider>
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
      </ThemeProvider>
    );
    expect(C1).toMatchSnapshot();
    expect(C2).toMatchSnapshot();
  });
});
