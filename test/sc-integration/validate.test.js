import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import atomize from '../../src';

const Validated = atomize.div();

describe('atomize integration to SC -> validate', () => {
  test('use color', () => {
    const tree = renderer.create(<Validated c="blue" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
  });
  test('use valid composed', () => {
    const tree = renderer.create(<Validated padding-x="30px" />).toJSON();
    expect(tree).toHaveStyleRule('padding-left', '30px');
    expect(tree).toHaveStyleRule('padding-right', '30px');
  });
  test('use invalid composed', () => {
    const tree = renderer.create(<Validated padding-x="calc(30px" />).toJSON();
    expect(tree).not.toHaveStyleRule('padding-left', 'calc(30px');
    expect(tree).not.toHaveStyleRule('padding-right', 'calc(30px');
  });
});
