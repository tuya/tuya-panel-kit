import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useLocation } from 'umi';
import { useMessagePush, usePostedPush } from '#hooks';

import { TuyaWrapper } from '../components';
import { routes } from '../routes';

export default ({ children }) => {
  const push = usePostedPush();
  useMessagePush();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const title = useMemo(() => routes.find(route => route.href === location.pathname)?.name, [
    location.pathname,
  ]);
  return (
    <TuyaWrapper
      title={title}
      hideTopbar={isHome}
      onBack={() => {
        push('/');
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          // @ts-ignore
          overflowY: 'scroll',
        }}
      >
        {children}
      </ScrollView>
    </TuyaWrapper>
  );
};
