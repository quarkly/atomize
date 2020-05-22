import React from 'react';
import { isString, isObject } from 'lodash/fp';

const normalizeMap = {
  as(value) {
    return isString(value) || isObject(value);
  },
};

export const applynormalizer = (key, value) => {
  if (!normalizeMap[key]) return value;
  if (normalizeMap[key](value)) return value;
  return null;
};

export const normalizer = props => {
  return Object.keys(props).reduce((acc, key) => {
    acc[key] = applynormalizer(key, props[key]);
    return acc;
  }, {});
};

export default Tag =>
  React.forwardRef((props, ref) =>
    React.createElement(Tag, {
      ref,
      ...normalizer(props),
    }),
  );
