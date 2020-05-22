import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import atomize from '../../src';

const Div = atomize.div({ effects: { hover: ':hover' } });

describe('atomize integration to SC -> breakpoints order', () => {
  test('base', () => {
    const tree = renderer.create(<Div sm-color="blue" md-c="red" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'red', {
      media: '(max-width: 768px)',
    });
    expect(tree).toHaveStyleRule('color', 'blue', {
      media: '(max-width: 576px)',
    });
  });
  test('with effect', () => {
    const tree = renderer
      .create(<Div sm-hover-color="blue" md-hover-c="red" sm-color="yellow" />)
      .toJSON();
    expect(tree).toHaveStyleRule('color', 'red', {
      media: '(max-width: 768px)',
      modifier: ':hover',
    });
    expect(tree).toHaveStyleRule('color', 'blue', {
      media: '(max-width: 576px)',
      modifier: ':hover',
    });
    expect(tree).toHaveStyleRule('color', 'yellow', {
      media: '(max-width: 576px)',
    });
  });
  test('with default', () => {
    const tree = renderer
      .create(<Div sm-hover-color="blue" md-hover-c="red" sm-color="yellow" color="tomato" />)
      .toJSON();
    expect(tree).toHaveStyleRule('color', 'tomato');
    expect(tree).toHaveStyleRule('color', 'red', {
      media: '(max-width: 768px)',
      modifier: ':hover',
    });
    expect(tree).toHaveStyleRule('color', 'blue', {
      media: '(max-width: 576px)',
      modifier: ':hover',
    });
    expect(tree).toHaveStyleRule('color', 'yellow', {
      media: '(max-width: 576px)',
    });
  });
});
