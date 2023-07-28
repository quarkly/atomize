import { writeFileSync } from 'fs';
import { join } from 'path';
import { dict } from '../src';

const DOCS_PATH = 'docs';
const ALIASES_PATH = join(DOCS_PATH, 'aliases.md');

const TPL = `# Aliases

Atomize aliases are short names for each css rule

# Table of short names

| Css rule | Alias |
| --- | --- |`;

const genRule = (name, alias) => `\n| *${name}* | \`${alias}\` |`;

const b = () => {
  const result = Object.entries(dict).reduce((acc, [name, property]) => {
    acc += genRule(name, property['alias'] ?? 'none');
    return acc;
  }, TPL);

  writeFileSync(ALIASES_PATH, result);
};

b();
