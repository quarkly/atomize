import { hashPropsWithAliases } from '../constants/dict';
/**
 * color -> background-color
 * @param {*} strKey
 */
export const searchInKey = (strKey, accum) => {
  const key = strKey.split('-');
  const searched = key.reduce((acc, item) => {
    if (accum[acc]) {
      return acc;
    }
    acc = acc.replace(`${item}-`, '');
    return acc;
  }, strKey);
  return accum[searched] ? searched : false;
};

export const searchRuleInKey = strKey => searchInKey(strKey, hashPropsWithAliases);

export const searchBreakpointInKey = (strKey, breakpoiints) => searchInKey(strKey, breakpoiints);

export const searchEffectInKey = (strKey, effects) => searchInKey(strKey, effects);
