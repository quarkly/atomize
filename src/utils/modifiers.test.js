import bootsrap from '../atomic-styles/bootstrap';

const fakeTheme = {
  someVariants: {
    alert: {
      color: 'red',
      margin: '300px',
    },
  },
  someName: {
    margin: '122px',
    padding: '30px',
  },
  mixins: {
    cRed: {
      color: 'red',
    },
    cBlue: {
      color: 'blue',
    },
  },
};

describe('Test modifiers', () => {
  test('variant works fine', () => {
    const rule = bootsrap({ variant: 'someVariants', mixins: true, useAliases: true });
    expect(rule({ theme: fakeTheme, variant: 'alert' })).toStrictEqual({
      margin: '300px',
      color: 'red',
    });
    expect(
      rule({
        m: 10,
        theme: fakeTheme,
        mixins: true,
        useAliases: true,
      }),
    ).toStrictEqual({
      margin: '10px',
    });
    expect(rule({ theme: fakeTheme })).toStrictEqual({});
  });
  test('themed works fine', () => {
    const rule = bootsrap({ name: 'someName', mixins: true, useAliases: true });
    expect(rule({ m: 10, theme: fakeTheme })).toStrictEqual({
      margin: '10px',
      padding: '30px',
    });
    expect(rule({ theme: fakeTheme })).toStrictEqual({
      margin: '122px',
      padding: '30px',
    });
  });
  test('mixins works fine', () => {
    const rule = bootsrap({ mixins: true, useAliases: true });
    expect(rule({ m: 10, theme: fakeTheme, cRed: true })).toStrictEqual({
      margin: '10px',
      color: 'red',
    });
    expect(rule({ m: 10, theme: fakeTheme, cBlue: true })).toStrictEqual({
      margin: '10px',
      color: 'blue',
    });
    expect(rule({ m: 10, theme: fakeTheme, cBlueFake: true })).toStrictEqual({
      margin: '10px',
    });
  });
  test('actual priority', () => {
    const rule = bootsrap({
      name: 'someName',
      variant: 'someVariants',
      mixins: true,
      useAliases: true,
    });
    expect(rule({ theme: fakeTheme, variant: 'alert' })).toStrictEqual({
      margin: '300px',
      padding: '30px',
      color: 'red',
    });
    expect(rule({ theme: fakeTheme })).toStrictEqual({
      margin: '122px',
      padding: '30px',
    });
  });
});
