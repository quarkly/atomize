import { Config, CompoundedComponent, Atom, AtomCreateFunction, Tags } from '../types'

import { StyledInterface, AnyStyledComponent } from 'styled-components';
import { isArray, isPlainObject } from 'lodash/fp';
import bootstrap from './bootstrap';
import dict from '../constants/dict';
import normalize from '../utils/normalize-props';
import makePropInfo from '../prop-info';


const defaultStyles = Object.keys(dict);

const defaultConfig = { useAliases: true };

export const isTemplate = arg => isArray(arg);

export const makeComponent = (styled: StyledInterface, tag: AnyStyledComponent, styles, config: Config, other) => {
  const defaultProps = isPlainObject(other) ? other : undefined;
  const rulesCreator = bootstrap(config, defaultProps);
  const rules = isArray(other) ? other : [];

  const Component = normalize(styled(tag)(rules, rulesCreator));
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

export const makeAtom = (styled: StyledInterface): AtomCreateFunction => (tag, config = {}, defaultProps) => {
  const styles = config.styles || defaultStyles;
  if (isTemplate(config)) {
    return makeComponent(styled, tag as AnyStyledComponent, styles, {}, config);
  }
  return makeComponent(styled, tag as AnyStyledComponent, styles, { ...defaultConfig, ...config }, defaultProps);
};

export const wrap = (styled: StyledInterface)  => {
  const atom = makeAtom(styled);
  let acc: Atom
  acc = ((tag: React.ComponentType<any>) => (config, defaultProps?: any) => atom(tag, config, defaultProps)) as Atom 
  Object.keys(styled).forEach((tag: Tags) => {
    acc[tag] = (config, defaultProps) => atom(tag, config, defaultProps)
  })

  return acc;
};


