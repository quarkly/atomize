import React from 'react';
import { isString, isObject } from 'lodash/fp';
import { useTheme } from 'styled-components';

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

export default (Tag, cb, cleanProps) =>
  React.forwardRef((props, ref) => {
    const theme = useTheme(props);
    const { cssObject, cleanedProps } = cb({ theme, ...props });
    return React.createElement(Tag, {
      ref,
      ...normalizer(cleanProps ? cleanedProps : props),
      cssObject,
    });
  });
