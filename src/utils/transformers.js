import { isNumber, get, isUndefined } from 'lodash/fp';

export const pixel = n => (isNumber(n) && n !== 0 ? `${n}px` : n);

export const width = n => (!isNumber(n) || n > 1 ? pixel(n) : `${n * 100}%`);

export const fontSize = (n, scale) => {
  if (!isNumber(n)) {
    return pixel(n);
  }
  const value = get(n, scale);
  if (isUndefined(value)) {
    return pixel(n);
  }
  return pixel(value);
};

export const space = (n, scale) => {
  if (!isNumber(n)) {
    return pixel(n);
  }
  const isNegative = n < 0;
  const absolute = Math.abs(n);
  const value = get(absolute, scale);
  if (isUndefined(value)) {
    return pixel(n);
  }
  if (!isNumber(value)) {
    return isNegative ? `-${value}` : value;
  }
  return pixel(value * (isNegative ? -1 : 1));
};

export const defaultTransformer = value => (isNumber(value) ? `${value}` : value);

export default { pixel, width, space, fontSize, defaultTransformer };
