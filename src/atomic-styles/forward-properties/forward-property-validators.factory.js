import { isFunction } from 'lodash/fp';
import { stylesPropValidator } from './validators';

/**
 * @param forwardProp { undefined | Object } config for forwarding properties
 *
 * @return { Array<(prop: String) => boolean> }
 */
const createValidatorsFromConfig = forwardProp => {
  const { custom, forwardUsedProps } = forwardProp;
  const validators = [];

  if (isFunction(custom)) {
    validators.push(custom);
  }

  if (forwardUsedProps) {
    const withAlias = forwardUsedProps?.withAlias;

    validators.push(prop => stylesPropValidator(prop, withAlias));
  }
};

/**
 * @param config {  } - shouldConfig
 *
 * @returns { Boolean }
 */
const forwardPropertyValidatorsFactory = (config, ...systemValidators) => {
  const { forwardProp } = config;
  const validators = createValidatorsFromConfig(forwardProp);

  return prop =>
    [...validators, ...systemValidators].some(validator => {
      // Skip the value if it's not a function
      if (!isFunction(validator)) {
        return false;
      }

      return !validator(prop);
    });
};

export default forwardPropertyValidatorsFactory;
