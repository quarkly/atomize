import * as React from 'react';
import { isString, isObject, T } from 'lodash/fp';
import { AnyStyledComponent, useTheme } from 'styled-components';
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
  cb: any,
  cleanProps: any,
) =>
  React.forwardRef<T, P>((props, ref) => {
    // https://github.com/quarkly/atomize/commit/4588e6b637f491d84d8533f33039ac5d14afd876#diff-0bcc59f525125c4175f4b9a0453fada0d6493c41eff1decc408be3799e4b5c4fR26
    // ??? const theme = useTheme(props);
    const theme = useTheme();
    const { cssObject, cleanedProps } = cb({ theme, ...props });
    return React.createElement(Tag, {
      ref,
      ...normalizer(cleanProps ? cleanedProps : props),
      cssObject,
    });
  }) as unknown as CompoundedComponent<T, P, U>;
