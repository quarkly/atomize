const splitCSSRule = (rule, separator = ',') => {
  const stack = [];
  if (typeof rule !== 'string') return [rule];

  try {
    return rule.split('').reduce(
      (result, char) => {
        if (char === '(') stack.push(char);
        if (char === ')') {
          if (stack[stack.length - 1] !== '(') {
            throw Error('value is not valid');
          }

          stack.pop();
        }

        if (char === separator && stack.length === 0) {
          return [...result, ''];
        }

        result[result.length - 1] += char;

        return result;
      },
      [''],
    );
  } catch (error) {
    return [rule];
  }
};

export default splitCSSRule;
