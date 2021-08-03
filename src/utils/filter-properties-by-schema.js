import { isBoolean, isPlainObject, isFunction } from 'lodash';

/**
 * @param { Object } object
 * @param { Object } schema
 * @returns { Object } new object which contains filtering props
 */
const filterProperties = (object, schema) => {
  if (!isPlainObject(schema)) {
    throw new Error('Invalid schema type');
  }

  if (!isPlainObject(object)) {
    throw new Error('Invalid object type');
  }

  return Object.entries(object)
    .filter(([key, value]) => {
      if (!schema[key]) {
        return false;
      }

      const schemaType = schema[key];

      switch (schemaType) {
        case 'function':
          return isFunction(value);
        case isPlainObject(schemaType):
          if (!isPlainObject(value)) {
            return false;
          }

          return Object.keys(filterProperties(value, schemaType));
        case 'boolean':
          return isBoolean(value);
        default:
          return false;
      }
    })
    .reduce((acc, [key]) => {
      if ()
      acc[key] = object[key];

      return acc;
    }, {});
};

export default filterProperties;
