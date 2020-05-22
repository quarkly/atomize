import validate from './validate';

describe('validate', () => {
  test('without paired chars', () => {
    expect(validate('')).toBeTruthy();
    expect(validate('123px')).toBeTruthy();
    expect(validate('#fff')).toBeTruthy();
    expect(validate('white')).toBeTruthy();
    expect(validate('10px 5px')).toBeTruthy();
    expect(validate('http://bla.ru/bla')).toBeTruthy();
  });

  test('quotes', () => {
    expect(validate("''")).toBeTruthy();
    expect(validate('""')).toBeTruthy();
    expect(validate('``')).toBeTruthy();

    expect(validate("'")).toBeFalsy();
    expect(validate('"')).toBeFalsy();
    expect(validate('`')).toBeFalsy();
  });

  test('brakets', () => {
    expect(validate('()')).toBeTruthy();
    expect(validate('[]')).toBeTruthy();
    expect(validate('{}')).toBeTruthy();

    expect(validate('(')).toBeFalsy();
    expect(validate('[')).toBeFalsy();
    expect(validate('{')).toBeFalsy();

    expect(validate(')')).toBeFalsy();
    expect(validate(']')).toBeFalsy();
    expect(validate('}')).toBeFalsy();
  });

  test('comment', () => {
    expect(validate('/')).toBeTruthy();
    expect(validate('//')).toBeTruthy();

    expect(validate('/**/')).toBeTruthy();

    expect(validate('/*')).toBeFalsy();
  });

  test('nested', () => {
    expect(validate('([{}])')).toBeTruthy();
    expect(validate('"`\'\'`"')).toBeTruthy();

    expect(validate('([{])}')).toBeFalsy();
    expect(validate('"\'"\'')).toBeFalsy();
  });

  test('real examples', () => {
    expect(validate('calc(1px + 2em)')).toBeTruthy();
    expect(validate('url("http://bla.ru/bla")')).toBeTruthy();
    expect(validate('linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0) 5%)')).toBeTruthy();

    expect(validate('calc(1px + ')).toBeFalsy();
    expect(validate('url("http://bla')).toBeFalsy();
    expect(validate('linear-gradient(0deg, ')).toBeFalsy();
  });
});
