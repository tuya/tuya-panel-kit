import React, { useMemo } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView key={location.pathname} contentContainerStyle={{ flex: 1 }}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </TuyaWrapper>
  );
};
