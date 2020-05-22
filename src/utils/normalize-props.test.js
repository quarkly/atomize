import { normalizer } from './normalize-props';

describe('normalizer', () => {
  test('as', () => {
    expect(normalizer({})).toStrictEqual({});
    expect(normalizer({ some: 123 })).toStrictEqual({ some: 123 });
    expect(normalizer({ as: 1, some: 123 })).toStrictEqual({ some: 123, as: null });
    expect(normalizer({ as: undefined, some: 123 })).toStrictEqual({ some: 123, as: null });
    expect(normalizer({ as: true, some: 123 })).toStrictEqual({ some: 123, as: null });
    expect(normalizer({ as: false, some: 123 })).toStrictEqual({ some: 123, as: null });
    expect(normalizer({ as: 'p', some: 123 })).toStrictEqual({ some: 123, as: 'p' });
  });
});
