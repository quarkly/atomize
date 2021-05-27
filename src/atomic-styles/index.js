import { isArray, isPlainObject } from 'lodash/fp';
import bootstrap from './bootstrap';
import dict from '../constants/dict';
import normalize from '../utils/normalize-props';
import makePropInfo from '../prop-info';

const defaultStyles = Object.keys(dict);

const defaultConfig = { useAliases: true };

export const isTemplate = arg => isArray(arg);

export const makeComponent = (styled, tag, styles, config, other) => {
  const defaultProps = isPlainObject(other) ? other : undefined;
  const rulesCreator = bootstrap(config, defaultProps);
  const rules = isArray(other) ? other : [];
  const cleanProps = typeof tag === 'string';

  const denieList = ['cssObject'];
  if (cleanProps) denieList.push('theme');

  const Component = normalize(
    styled(tag).withConfig({
      shouldForwardProp: prop => !denieList.includes(prop),
    })(rules, props => {
      const { cssObject } = props;
      return cssObject;
    }),
    rulesCreator,
    cleanProps,
  );

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

export const makeAtom = styled => (tag, config = {}, defaultProps) => {
  const styles = config.styles || defaultStyles;
  if (isTemplate(config)) {
    return makeComponent(styled, tag, styles, {}, config);
  }
  return makeComponent(styled, tag, styles, { ...defaultConfig, ...config }, defaultProps);
};

export const wrap = styled => {
  const atom = makeAtom(styled);
  return Object.keys(styled).reduce(
    (acc, tag) => {
      acc[tag] = atom.bind(null, tag);
      return acc;
    },
    tag => atom.bind(null, tag),
  );
};
