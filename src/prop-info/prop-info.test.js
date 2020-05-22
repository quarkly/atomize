import makePropInfo, { configure } from './';
import { PropInfoCollisionError } from './errors';

describe('propInfo test', () => {
  beforeAll(() => {
    configure({ useValidate: true });
  });
  it('base create with only styles', () => {
    expect(makePropInfo({ someProps: {} }, {})).toMatchInlineSnapshot(`
      Object {
        "someProps": Object {},
      }
    `);
  });
  it('if node key has collisions then error will happen', () => {
    expect(() => makePropInfo({ background: {} })).toThrowError(PropInfoCollisionError);
  });
  it('if node key has collisions with aliases then error will happen', () => {
    expect(() => makePropInfo({ bg: {} })).toThrowError(PropInfoCollisionError);
  });
  it('if node key has collisions, but config with useValidate=false then error will not be happen', () => {
    configure({ useValidate: false });
    expect(() => makePropInfo({ background: {} })).toBeDefined();
    configure({ useValidate: true });
  });
});
