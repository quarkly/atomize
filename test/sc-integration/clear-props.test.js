import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import atomize from '../../src';

const Element = atomize('div')({
  effects: { hover: ':hover' },
  aliases: true,
});

// eslint-disable-next-line react/jsx-props-no-spreading
const Child = props => <div {...props} />;

const ElementWithComponent = atomize(Child)({
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
  test('pass to fn children', () => {
    const tree = renderer.create(<ElementWithComponent color="red" color_passed="red" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      .c0 {
        color: red;
      }

      <div
        className="c0"
        color="red"
        color_passed="red"
      />
    `);
  });
  test('test props theme pass', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={{ breakpoints: { kek: [{ type: 'max-width', value: '1280' }] } }}>
          <ElementWithComponent kek-color="blue" color="red" color_passed="red" />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchInlineSnapshot(`
      .c0 {
        color: red;
      }

      @media (max-width:1280px) {
        .c0 {
          color: blue;
        }
      }

      <div
        className="c0"
        color="red"
        color_passed="red"
        kek-color="blue"
      />
    `);
  });
  test('test props theme', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={{ breakpoints: { kek: [{ type: 'max-width', value: '1280' }] } }}>
          <Element kek-color="blue" color="red" color_passed="red" />
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchInlineSnapshot(`
      .c0 {
        color: red;
      }

      @media (max-width:1280px) {
        .c0 {
          color: blue;
        }
      }

      <div
        className="c0"
        color_passed="red"
      />
    `);
  });
});
