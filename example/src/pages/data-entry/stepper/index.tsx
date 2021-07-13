import React from 'react';
import { Stepper } from 'tuya-panel-kit';

import { BlockView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <BlockView
      list={[
        {
          title: Strings.getLang('stepper_style1'),
          list: [
            {
              name: Strings.getLang('stepper_style1_def'),
              component: <Stepper value={0} editable={false} />,
            },
            {
              name: Strings.getLang('stepper_style1_disable'),
              component: <Stepper value={21} disabled={true} />,
            },
            {
              name: Strings.getLang('stepper_style1_point'),
              component: (
                <Stepper value={93.5} stepValue={0.5} inputStyle={{ width: 40 }} editable={false} />
              ),
            },
            {
              name: Strings.getLang('stepper_style1_input'),
              component: <Stepper value={99} stepValue={5} />,
            },
          ],
        },
        {
          title: Strings.getLang('stepper_style2'),
          list: [
            {
              name: Strings.getLang('stepper_style2_def'),
              component: <Stepper buttonType="triangle" value={0} editable={false} />,
            },
            {
              name: Strings.getLang('stepper_style2_disable'),
              component: <Stepper value={24} buttonType="triangle" disabled={true} />,
            },
            {
              name: Strings.getLang('stepper_style2_point'),
              component: (
                <Stepper
                  value={93.5}
                  stepValue={0.5}
                  inputStyle={{ width: 40 }}
                  buttonType="triangle"
                  editable={false}
                />
              ),
            },
            {
              name: Strings.getLang('stepper_style2_input'),
              component: <Stepper value={99} stepValue={5} buttonType="triangle" />,
            },
          ],
        },
      ]}
    />
  );
};
