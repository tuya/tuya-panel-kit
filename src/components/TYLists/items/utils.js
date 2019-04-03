/* eslint-disable no-param-reassign */

/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_pick
 */
export const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object[key]) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const omit = (object, keys) => {
  const shallowCopy = {
    ...object,
  };
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
};
