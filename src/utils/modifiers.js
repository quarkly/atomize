import { isUndefined } from 'lodash/fp';
import { getFromTheme, themeGet } from './theme';

export const variants = key => props => getFromTheme(props, `${key}.${props.variant}`);
export const themed = key => props => getFromTheme(props, key);
export const mixins = props => {
  const mix = themeGet(props, 'mixins', {});
  return Object.keys(mix).reduce((acc, mixin) => {
    if (isUndefined(props[mixin])) {
      return acc;
    }
    return { ...acc, ...mix[mixin] };
  }, {});
};

export default { variants, themed, mixins };
