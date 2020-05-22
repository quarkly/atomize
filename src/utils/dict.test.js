import dict from './dict';

const getName = name => dict[name].alias || name;

const checkName = () => {
  const acc = {};
  return name => {
    if (acc[name]) {
      throw new Error(`colission with name: ${name}`);
    }
    acc[name] = true;
    return true;
  };
};

describe('Style dict', () => {
  test('type exists in all style object', () => {
    Object.values(dict).forEach(style => expect(style.type).toBeDefined());
  });
  test('aliases is unique', () => {
    const check = checkName();
    Object.keys(dict).forEach(style => expect(check(getName(style))).toBeDefined());
  });
});
