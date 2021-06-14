/* eslint-disable @typescript-eslint/ban-types */
import { StyledInterface, AnyStyledComponent } from 'styled-components';
import { isArray, isPlainObject } from 'lodash/fp';

import { Atom, Config } from '../types/Atom';

import bootstrap from './bootstrap';
import dict from '../constants/dict';
import normalize from '../utils/normalize-props';
import makePropInfo from '../prop-info';

import { CompoundedComponent } from '../types/CompoundedComponent';

const defaultStyles = Object.keys(dict);

const defaultConfig = { useAliases: true };

export const isTemplate = arg => isArray(arg);

export const makeComponent = <
  T extends AnyStyledComponent | keyof JSX.IntrinsicElements | React.ComponentType<any>,
  P extends object,
  U extends boolean
>(
  styled: StyledInterface,
  tag: T,
  styles: any,
  config: Config<U>,
  other: any,
): CompoundedComponent<T, P, U> => {
  const defaultProps = isPlainObject(other) ? other : undefined;
  const rulesCreator = bootstrap(config, defaultProps);
  const rules = isArray(other) ? other : [];
  const Component = normalize(styled(tag)<P>(rules as any, rulesCreator)) as CompoundedComponent<
    T,
    P,
    typeof config['useAliases']
  >;
  if (config.name) {
    Component.displayName = config.name;
  }
  if (config.description) {
    Component.description = config.description;
  }
  if (config.effects) {
    Component.effects = config.effects;
  }
  if (config.overrides) {
    Component.overrides = config.overrides;
  }
  Component.propInfo = makePropInfo(config.propInfo || {});
  Component.defaultProps = defaultProps;
  return Component;
};

export const makeAtom = (styled: StyledInterface) => <
  T extends AnyStyledComponent | keyof JSX.IntrinsicElements | React.ComponentType<any>,
  P extends object,
  U extends boolean
>(
  tag: T,
  config: Config<U> = {},
  defaultProps: { [K in React.ComponentProps<T>]: unknown },
): CompoundedComponent<T, P, U> => {
  const styles = config.styles || defaultStyles;
  if (isTemplate(config)) {
    return makeComponent(styled, tag, styles, {}, config);
  }

  return makeComponent(styled, tag, styles, { ...defaultConfig, ...config }, defaultProps);
};

export const wrap = (styled: StyledInterface): Atom => {
  const atom = makeAtom(styled);
  const acc: Atom = (((
    tag: AnyStyledComponent | keyof JSX.IntrinsicElements | React.ComponentType<any>,
  ) => <U extends boolean>(config: Config<U>, defaultProps) =>
    atom(tag, config, defaultProps)) as unknown) as Atom;
  Object.keys(styled).forEach((tag: keyof JSX.IntrinsicElements) => {
    acc[tag] = <P extends object, U extends boolean = true>(config: Config<U>, defaultProps) =>
      atom(tag, config, defaultProps);
  });

  return acc;
};
