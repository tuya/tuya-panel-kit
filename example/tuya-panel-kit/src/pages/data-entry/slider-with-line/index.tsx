/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { View } from 'react-native';
import { SliderWithLine, Utils } from 'tuya-panel-kit';
import Strings from '#i18n';
import { ListView } from '#components';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  const [value, setValue] = React.useState(20);
  return (
    <ListView
      contentCenter={true}
      list={[
        {
          title: Strings.getLang('slider_with_line_horizontal'),
          content: (
            <View>
              <SliderWithLine
                stepValue={1}
                onSlidingComplete={value => console.log(value, 'res')}
                style={{ marginBottom: 20 }}
                // @ts-ignore
                nounWidth={2}
                nounColor="#F84803"
                activeNounColor="#fff"
                backgroundColor="#E5E5E5"
                activeBackgroundColor="#F84803"
              />
              <SliderWithLine
                stepValue={10}
                // @ts-ignore
                maxValue={80}
                minDisabled={false}
                onSlidingComplete={value => console.log(value, 'res')}
                nounColor="#F84803"
                activeNounColor="#fff"
                backgroundColor="#E5E5E5"
                activeBackgroundColor="#F84803"
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('slider_with_line_vertical'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <SliderWithLine
                horizontal={false}
                // onSlidingStart={value => console.log(value, 'res')}
                onSlidingComplete={value => console.log(value, 'res')}
                // @ts-ignore
                nounColor="#F84803"
                activeNounColor="#fff"
                backgroundColor="#E5E5E5"
                activeBackgroundColor="#F84803"
                nounWidth={cx(14)}
                nounHeight={cx(1)}
                width={cx(60)}
                height={cx(327)}
                style={{ marginRight: 20 }}
              />
              <SliderWithLine
                // @ts-ignore
                minDisabled={false}
                stepValue={10}
                horizontal={false}
                minValue={10}
                nounColor="#F84803"
                activeNounColor="#fff"
                backgroundColor="#E5E5E5"
                activeBackgroundColor="#F84803"
                maxValue={80}
                onSlidingComplete={value => console.log(value, 'res')}
                nounWidth={cx(14)}
                nounHeight={cx(1)}
                width={cx(60)}
                height={cx(327)}
              />
            </View>
          ),
        },
      ]}
    />
  );
};
