import React from 'react';
import { TimerPicker } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  const [time, setTime] = React.useState({ startTime: 0, endTime: 0 });
  return (
    <ListView
      contentPadding={false}
      list={[
        {
          title: Strings.getLang('timepicker_basic'),
          content: (
            <TimerPicker
              style={{ marginTop: 10 }}
              startTime={time.startTime}
              endTime={time.endTime}
              prefixPosition="right"
              onTimerChange={(startTime, endTime) => setTime({ startTime, endTime })}
            />
          ),
        },
        {
          title: Strings.getLang('timepicker_prefix'),
          content: (
            <TimerPicker
              style={{ marginTop: 10 }}
              startTime={time.startTime}
              endTime={time.endTime}
              prefixPosition="left"
              onTimerChange={(startTime, endTime) => setTime({ startTime, endTime })}
            />
          ),
        },
      ]}
    />
  );
};
