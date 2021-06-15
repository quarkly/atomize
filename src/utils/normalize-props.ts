import * as React from 'react';
import { isString, isObject, T } from 'lodash/fp';
import { AnyStyledComponent } from 'styled-components';
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

export default <
  T extends AnyStyledComponent | keyof JSX.IntrinsicElements | React.ComponentType<any>,
  P extends object,
  U extends boolean,
>(
  Tag: T,
) =>
  React.forwardRef<T, P>((props, ref) =>
    React.createElement(Tag, {
      ref,
      ...normalizer(props),
    }),
  ) as unknown as CompoundedComponent<T, P, U>;
