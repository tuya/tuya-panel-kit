import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import Popup from '../index';
import _ from 'lodash';
import Picker from '../picker';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

describe('Popup Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      Popup.picker({
        dataSource: [
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
        ],
        title: 'Picker',
        cancelText: '取消',
        confirmText: '确认',
        value: '1',
        label: 'haha',
      })
    );
  });
});

describe('Picker Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Picker
          value="1"
          title="生日"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          label="haha"
          dataSource={[
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
          ]}
        />
      </ThemeProvider>
    );
    component.update(
      <ThemeProvider>
        <Picker
          value="2"
          title="生日"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          label="haha"
          dataSource={[
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
          ]}
        />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('basic render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Picker
          label={['$', '%']}
          value={['b', '2', 'm']}
          title="生日"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          singlePicker={false}
          dataSource={[
            [
              {
                label: 'a',
                value: 'a',
              },
              {
                label: 'b',
                value: 'b',
              },
              {
                label: 'c',
                value: 'c',
              },
            ],
            [
              {
                label: '1',
                value: '1',
              },
              {
                label: '2',
                value: '2',
              },
              {
                label: '3',
                value: '3',
              },
            ],
            [
              {
                label: 'm',
                value: 'm',
              },
              {
                label: 'x',
                value: 'x',
              },
              {
                label: 'd',
                value: 'd',
              },
            ],
          ]}
        />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('basic render with label', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Picker
          value={undefined}
          title="生日"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          singlePicker={false}
          dataSource={[
            [
              {
                label: 'a',
                value: 'a',
              },
              {
                label: 'b',
                value: 'b',
              },
              {
                label: 'c',
                value: 'c',
              },
            ],
            [
              {
                label: '1',
                value: '1',
              },
              {
                label: '2',
                value: '2',
              },
              {
                label: '3',
                value: '3',
              },
            ],
            [
              {
                label: 'm',
                value: 'm',
              },
              {
                label: 'x',
                value: 'x',
              },
              {
                label: 'd',
                value: 'd',
              },
            ],
          ]}
        />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
