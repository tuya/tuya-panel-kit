import React from 'react';
import PageHome from './home';

interface INavigatorProps {
  navigate: (name: string) => void;
}

const HomePage = (props: { navigation: INavigatorProps }) => {
  const goto = (componentName: string) => {
    props.navigation.navigate(componentName);
  };

  return <PageHome navigate={goto} />;
};

export default HomePage;
