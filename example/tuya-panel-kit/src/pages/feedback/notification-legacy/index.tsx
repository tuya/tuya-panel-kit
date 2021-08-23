import React from 'react';
import { NotificationLegacy } from 'tuya-panel-kit';

import Strings from '#i18n';

export default () => {
  return <NotificationLegacy message={Strings.getLang('notificationlegacy_content')} />;
};
