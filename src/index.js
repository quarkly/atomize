import SC from 'styled-components';
import { wrap } from './atomic-styles';

export { default as dict, hashPropsWithAliases as aliasesDict } from './utils/dict';
export { default as themeDefault } from './utils/theme';
export { default as splitCSSRule } from './atomic-styles/split-css-rule';
export { getTransformer, transformVar } from './atomic-styles/bootstrap';

export * from './prop-info';

export default wrap(SC);
