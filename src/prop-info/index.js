import { hashPropsWithAliases } from '../utils/dict';
import { PropInfoCollisionError } from './errors';

let configuration = { useValidate: process.env === 'development' };

export const configure = override => {
  configuration = { ...configuration, ...override };
};

const validateNodes = nodes =>
  nodes.reduce((acc, [key, nodeInfo]) => {
    validateNode(acc, nodeInfo, key);
    acc[key] = nodeInfo;
    return acc;
  }, {});

const validateNode = (tree, node, key) => {
  if (!configuration.useValidate) {
    return;
  }
  if (hashPropsWithAliases[key]) {
    throw new PropInfoCollisionError(`key ${key} in propInfo must be unque, found in style name`);
  }
};

export default propInfo => {
  return validateNodes(Object.entries(propInfo));
};
