const PAIRED_CHARS = [
  { open: '"', closed: '"' },
  { open: "'", closed: "'" },
  { open: '`', closed: '`' },
  { open: '(', closed: ')' },
  { open: '[', closed: ']' },
  { open: '{', closed: '}' },
  { open: '/*', closed: '*/' },
];

const slash = string => string.replace(/(.)/g, '\\$1');

const charList = PAIRED_CHARS.map(({ open, closed }) =>
  closed ? `${slash(open)}|${slash(closed)}` : `${slash(open)}`,
).join('|');

const getChar = char => PAIRED_CHARS.filter(({ open, closed }) => open === char || closed === char);

const validate = value => {
  const regexp = new RegExp(`(${charList})`, 'g');
  const matches = value.match(regexp);

  if (!matches) return true;

  const notPaired = matches.reduce((list, match) => {
    const [{ open, closed }] = getChar(match);
    const previous = list[list.length - 1];

    if (previous && match === closed && previous === open) {
      list.pop();
      return list;
    }

    return [...list, match];
  }, []);

  return notPaired.length === 0;
};

export default validate;
