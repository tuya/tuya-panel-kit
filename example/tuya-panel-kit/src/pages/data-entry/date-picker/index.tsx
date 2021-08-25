/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { DatePicker } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  const [selectDate, setDate] = React.useState(new Date());
  return (
    <ListView
      contentPadding={false}
      list={[
        {
          title: Strings.getLang('datepicker_control'),
          content: (
            // @ts-ignore
            <DatePicker
              style={{ marginTop: 30 }}
              date={selectDate}
              onDateChange={date => setDate(date)}
            />
          ),
        },
        {
          title: Strings.getLang('datepicker_uncontrol'),
          content: (
            // @ts-ignore
            <DatePicker
              style={{ marginTop: 50 }}
              defaultDate={new Date()}
              onDateChange={date => console.log(date)}
            />
          ),
        },
      ]}
    />
  );
};
