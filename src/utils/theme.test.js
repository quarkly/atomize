import { getBreakpoints, createBreakpointRule } from './theme';

describe('Test themes methods', () => {
  it('parse breackpoint with screen', () => {
    expect(createBreakpointRule([{ type: 'screen', value: true }])).toMatchInlineSnapshot(
      `"(screen)"`,
    );
  });
  it('parse breakpoint with screen and width', () => {
    expect(
      createBreakpointRule([
        { type: 'screen', value: true },
        { type: 'min-width', value: 1200 },
      ]),
    ).toMatchInlineSnapshot(`"(screen) and (min-width: 1200px)"`);
  });
  it('create parsed breakpoints object', () => {
    expect(getBreakpoints({})).toMatchInlineSnapshot(`
      Object {
        "lg": "@media (max-width: 992px)",
        "md": "@media (max-width: 768px)",
        "sm": "@media (max-width: 576px)",
      }
    `);
  });
});
