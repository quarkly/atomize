import * as React from 'react';
import { isString, isObject } from 'lodash/fp';
import styled from 'styled-components';
import { CompoundedComponent } from '../types/CompoundedComponent';

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

export default (Tag: keyof JSX.IntrinsicElements | React.ComponentType<any>) =>
  (React.forwardRef<typeof Tag>((props, ref) =>
    React.createElement(Tag, {
      ref,
      ...normalizer(props),
    }),
  ) as unknown) as CompoundedComponent<typeof Tag>;
