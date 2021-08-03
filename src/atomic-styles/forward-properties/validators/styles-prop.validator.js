import dict, { hashPropsWithAliases } from '../../../constants/dict';

const stylesPropValidator = (prop, alias = false) =>
  Object.prototype.hasOwnProperty.call(alias ? hashPropsWithAliases : dict, prop);

export default stylesPropValidator;
