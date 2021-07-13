import { useState } from 'react';

export const useSetParticalState = <T>(initState: T): [T, (particalState: Partial<T>) => void] => {
  const [state, setState] = useState(initState);
  const setParticalState = (particalState: Partial<T>) => {
    setState({ ...state, ...particalState });
  };
  return [state, setParticalState];
};
