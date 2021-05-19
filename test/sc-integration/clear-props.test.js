import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import atomize from '../../src';

const Element = atomize('div')({
  effects: { hover: ':hover' },
  aliases: true,
});

describe('atomize filter props keys', () => {
  test('filter', () => {
    const tree = renderer.create(<Element color="red" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      .c0 {
        color: red;
      }

      <div
        className="c0"
      />
    `);
  });
  test('chains filter', () => {
    const tree = renderer.create(<Element hover-color="red" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      .c0:hover,
      .c0[data-quarkly-state="hover"] {
        color: red;
      }

      <div
        className="c0"
      />
    `);
  });
  test('pass', () => {
    const tree = renderer.create(<Element color="red" color_passed="red" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      .c0 {
        color: red;
      }

      <div
        className="c0"
        color_passed="red"
      />
    `);
  });
});
