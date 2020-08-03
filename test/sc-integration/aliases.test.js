import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import atomize from '../../src';

const BoxEnable = atomize('div')({
  effects: { hover: ':hover' },
});

const BoxDisable = atomize('div')({
  effects: { hover: ':hover' },
  useAliases: false,
});

describe('atomize integration to SC aliases', () => {
  test('enable', () => {
    const tree = renderer.create(<BoxEnable c="red" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'red');
  });
  test('disable', () => {
    const tree = renderer.create(<BoxDisable c="red" />).toJSON();
    expect(tree).not.toHaveStyleRule('color', 'red');
  });
});
