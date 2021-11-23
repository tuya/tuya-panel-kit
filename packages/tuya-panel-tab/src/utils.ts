import React from 'react';

const toArray = (children: React.ReactNode): React.ReactNode[] => {
  const arr = [];
  React.Children.forEach(children, child => {
    if (child) {
      arr.push(child);
    }
  });
  return arr;
};

const getActiveIndex = (children: React.ReactElement[], activeKey: string | number): number => {
  const arr = toArray(children);
  for (let i = 0; i < arr.length; i++) {
    // @ts-ignore
    if (arr[i].key === activeKey) {
      return i;
    }
  }
  return -1;
};

const activeKeyIsValid = (children: React.ReactElement, key: string | number): boolean => {
  const keys = React.Children.map(children, child => child && child.key);
  return keys.indexOf(key) >= 0;
};

const getDefaultActiveKey = (children: React.ReactElement): string => {
  let activeKey;
  React.Children.forEach(children, child => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
};

export default {
  toArray,
  getActiveIndex,
  activeKeyIsValid,
  getDefaultActiveKey,
};
