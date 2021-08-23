import React from 'react';

import { usePostedPush } from '#hooks';

import PageHome from './home';

const HomePage: React.FC = () => {
  const push = usePostedPush();

  return <PageHome navigate={push} />;
};

export default HomePage;
