import { writeFileSync } from 'fs';
import { dict } from '../src';
import { Dict } from '../src/constants/dict';

function typeIsArray(type: string | string[]): type is Array<string> {
  return Array.isArray(type);
}

const w = (v: string) => (/\s|-/.test(v) ? `'${v}'` : v);

const generate = (isAlias = false) =>
  (Object.keys(dict) as Array<keyof Dict>)
    .filter(k => (isAlias ? dict[k].alias : true))
    .map(k => {
      const propKey = isAlias ? dict[k].alias : k;
      if (!propKey) return;
      const types = dict[k].type;
      const typeString = typeIsArray(types) ? types.join(' | ') : types;
      return `  ${w(propKey)}?: ${typeString};`;
    })
    .join('\n');

const TPL = `export type AvailableProps = {
${generate()}
};

export type Aliases = {
${generate(true)}
};
`;

writeFileSync('./src/types/AvailableProps.ts', TPL);
