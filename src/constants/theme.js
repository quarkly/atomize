import { kebabCase } from 'lodash';

export const themePrefixes = [
  'filter',
  'animation',
  'background',
  'boxShadow',
  'color',
  'font',
  'fontFamily',
  'transition',
  'transform',
  'transitionTimingFunction',
  'transitionDuration',
];

export const themeProps = themePrefixes.map(kebabCase);
