/* eslint-disable @typescript-eslint/ban-ts-comment */
import { flow, merge, get, memoize, sortBy, camelCase } from 'lodash';
import dict, { CSSProperty, Dict, hashPropsWithAliases } from '../constants/dict';
import { themeProps, themePrefixes } from '../constants/theme';
import { themeGet, getBreakpoints } from '../utils/theme';
import splitCSSRule from './split-css-rule';
import validate from '../utils/validate';
import transformers, { defaultTransformer } from '../utils/transformers';
import { variants, themed, mixins } from '../utils/modifiers';
import {
  searchRuleInKey as searchRule,
  searchBreakpointInKey,
  searchEffectInKey,
} from './search-rule';
import { Config } from '../types/Atom';

export const getTransformer = name => get(transformers, name, defaultTransformer);

export const getThemePrefix = (key: string): string => {
  if (key.endsWith('-color')) return 'color';
  if (themeProps.includes(key)) return camelCase(key);

  return '';
};

export const trimComma = (value: string): string => {
  if (typeof value !== 'string') return value;

  return splitCSSRule(value)
    .filter(v => v)
    .join(',');
};

export const testExistPrefix = (name: string): boolean => {
  const splited = name.split('-') || [];
  if (splited.length <= 1) return false;

  return themePrefixes.includes(splited[0]);
};

export const transformVar = (key: string, value: string) => {
  if (typeof value !== 'string' || value.indexOf('--') === -1) return value;
  const prefix = getThemePrefix(key);

  return value.replace(/(^|\s|,|calc\()(?:var\()?--([^,\s]*)/gi, (res, before, name) => {
    if (res.includes('var(')) return res;
    if (prefix && !testExistPrefix(name)) return `${before}var(--qtheme-${prefix}-${name})`;
    return `${before}var(--qtheme-${name})`;
  });
};

export const ruleExists = <T extends boolean>(key: keyof Dict, config: Config<T>): CSSProperty => {
  if (!config) return hashPropsWithAliases[key];
  if (config.useAliases) return hashPropsWithAliases[key];
  return dict[key];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createCssRule = <T extends boolean>({
  propKey,
  value,
  props,
  config,
}: {
  propKey: any;
  value: any;
  props: any;
  config: Config<T>;
}) => {
  const [currentKey, ...otherKeys] = propKey;
  if (!ruleExists(currentKey, config)) return {};
  const { transformer, compose } = hashPropsWithAliases[currentKey];
  const transform = getTransformer(transformer);
  const createCss = (n, key) => {
    const resultValue = trimComma(transformVar(key, transform(n, [])));
    const isValid = typeof resultValue === 'string' ? validate(resultValue) : true;

    if (!isValid) return null;
    return { [key]: resultValue };
  };
  const css = compose
    ? compose.reduce((acc, composeKey) => {
        const cCss = createCss(value, composeKey);
        return merge(acc, cCss);
      }, {})
    : createCss(value, hashPropsWithAliases[currentKey].name);

  return { propKey: otherKeys, value, css, props, config };
};
export const createEffectWrapper = ({ propKey, value, props, css, config }) => {
  if (!css) return {};
  const [currentKey, ...otherKeys] = propKey;
  const { effects } = config;
  if (!effects) {
    return { propKey, value, css, props, config };
  }
  const effectNames = Object.keys(effects);
  if (!effectNames || !effectNames.length) {
    return { propKey, value, css, props, config };
  }
  // текущий ключ - не медиа выражение
  if (!effects[currentKey]) {
    return { propKey, value, css, props, config };
  }
  const effectCssKey = effects[currentKey];
  const newCss = {
    [`&${effectCssKey}, &[data-quarkly-state="${currentKey}"]`]: css,
  };
  return { propKey: otherKeys, value, css: newCss, props, config };
};
export const createMediaWrapper = ({ propKey, value, props, css, config }) => {
  if (!css) return {};
  const [currentKey] = propKey;
  const breakpoints = getBreakpoints(props);
  if (!breakpoints[currentKey]) return { propKey, value, css, props, config };
  const mediaSelector = breakpoints[currentKey];
  const newCss = {
    [mediaSelector]: css,
  };
  return { propKey: currentKey, value, css: newCss, config };
};

export const createStyleRule = flow([createCssRule, createEffectWrapper, createMediaWrapper]);

export const createOverriderStyles = overriders => props =>
  overriders.reduce((acc, ov) => merge(acc, ov(props)), {});

export const replaceKey = (key, replaced) =>
  key
    .replace(replaced, '')
    .split('-')
    .filter(a => a)
    .join('-');

const createChunks = (props, config) => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    const ruleChain = searchRule(key);
    if (!ruleChain) return acc;
    key = replaceKey(key, ruleChain);
    const effectChain = searchEffectInKey(key, config.effects || {});
    if (effectChain) {
      key = replaceKey(key, effectChain);
    }
    const breakpoints = themeGet(props, 'breakpoints', {});
    const breackpointChain = searchBreakpointInKey(key, breakpoints);
    acc.push({ chains: { ruleChain, breackpointChain, effectChain }, value });
    return acc;
  }, []);
};

export const createChainStream = chains => {
  const { ruleChain, effectChain, breackpointChain } = chains;
  const listChains = [ruleChain, effectChain, breackpointChain];
  return listChains.filter(a => a);
};

export const getSortedBreakpoints = memoize((breakpoints: unknown[]) =>
  sortBy(
    Object.entries(breakpoints),
    // @ts-ignore
    ([, [item]]) => (item.type === 'max-width' ? -1 : 1),
    // @ts-ignore
    ([, [item]]) => item.value * (item.type === 'max-width' ? -1 : 1),
  ),
);

export const sortByBreakpointsOrder = (chunks, props) => {
  const sortedBreakpoints = getSortedBreakpoints(themeGet(props, 'breakpoints'));
  return sortBy(chunks, ({ chains }) =>
    sortedBreakpoints.findIndex(([key]) => key === chains.breackpointChain),
  );
};

export default (config, defaultProps = {}) =>
  componentProps => {
    const props = { ...defaultProps, ...componentProps };

    const deps = [];
    if (config.name) {
      deps.push(themed(config.name));
    }
    if (config.variant) {
      deps.push(variants(config.variant));
    }
    if (config.mixins) {
      deps.push(mixins);
    }
    // apply styles in breakpoints order
    const overrider = createOverriderStyles(deps);
    const chunks = sortByBreakpointsOrder(createChunks(props, config), props);
    return chunks.reduce((acc, { chains, value }) => {
      const propKey = createChainStream(chains);
      const { css } = createStyleRule({ propKey, value, props, config });
      if (!css) return acc;
      return merge(acc, css);
    }, overrider(props));
  };
