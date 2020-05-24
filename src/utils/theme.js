import { get, isUndefined, memoize } from 'lodash/fp';
import themeDefault from '../constants/themeDefault';

export const getFromTheme = (props, key) => get(key, props.theme) || get(key, themeDefault);

export const variantGet = (props, key, name) => {
  const variants = getFromTheme(props, key);
  if (isUndefined(variants)) return name;
  const value = get(name, variants);
  return isUndefined(value) ? name : value;
};

export const themeGet = (props, key, def) => {
  const value = getFromTheme(props, key);
  return isUndefined(value) ? def : value;
};

export const createBreakpointRule = point =>
  point
    .map(({ type, value }) => (value === true ? `(${type})` : `(${type}: ${value}px)`))
    .join(' and ');

export const getBreakpoints = memoize(props => {
  const breakpoints = getFromTheme(props, 'breakpoints');
  return Object.entries(breakpoints).reduce((acc, [key, point]) => {
    acc[key] = `@media ${createBreakpointRule(point)}`;
    return acc;
  }, {});
});

export default themeDefault;
