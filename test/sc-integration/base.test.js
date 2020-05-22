import React from 'react';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import atomize from '../../src';

const Button = styled.button`
  color: red;
`;

test('sc setup works', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('color', 'red');
});

const ElButton = atomize('button')({ styles: ['color'], aliases: true });

const Box = atomize('div')({
  effects: { hover: ':hover' },
  aliases: true,
  styles: ['color'],
  omit: {},
  propTypes: true,
});

const ComposedBox = atomize('div')({
  effects: { hover: ':hover', focus: ':focus' },
  styles: ['color'],
  aliases: true,
  omit: {},
});

const NamedBox = atomize('div')({
  effects: { hover: ':hover', focus: ':focus' },
  styles: ['color'],
  aliases: true,
  name: 'NamedBox',
});

const ChainBox = atomize.div({
  effects: { hover: ':hover', focus: ':focus' },
  aliases: true,
  styles: ['color'],
});

const ExtendedSC = atomize(Button)({
  effects: { hover: ':hover' },
  aliases: true,
  styles: ['color'],
});
const ExtendedEL = atomize(Box)({
  effects: { hover: ':hover' },
  aliases: true,
  styles: ['margin'],
});
const WithIncorrectProp = atomize(Box)({
  effects: { hover: ':hover' },
  aliases: true,
  styles: ['fake'],
});

const ZeroConfig = atomize.div();
const ZeroConfigWithTemplate = atomize.div`
  color: red;
`;

const BoxWithSizeAndEffects = atomize.div({ effects: { hover: ':hover' }, aliases: true });

const BoxWithOmit = atomize.div({
  effects: { hover: ':hover' },
  omit: ['role'],
  aliases: true,
  normalize: true,
});

describe('atomize integration to SC', () => {
  test('base', () => {
    const tree = renderer.create(<ElButton c="red" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'red');
  });
  test('media rules', () => {
    const tree = renderer.create(<ElButton md-c="blue" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'blue', {
      media: '(max-width: 768px)',
    });
  });
  test('effect', () => {
    const tree = renderer.create(<Box hover-color="red" c="blue" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
    expect(tree).toHaveStyleRule('color', 'red', {
      modifier: ':hover',
    });
  });
  test('composed effect', () => {
    const tree = renderer
      .create(<ComposedBox hover-color="red" c="blue" focus-color="tomato" />)
      .toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
    expect(tree).toHaveStyleRule('color', 'red', {
      modifier: ':hover',
    });
    expect(tree).toHaveStyleRule('color', 'tomato', {
      modifier: ':focus',
    });
  });
  test('media effect', () => {
    const tree = renderer
      .create(<Box md-hover-color="green" hover-color="red" c="blue" />)
      .toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
    expect(tree).toHaveStyleRule('color', 'red', {
      modifier: ':hover',
    });
    expect(tree).toHaveStyleRule('color', 'green', {
      media: '(max-width: 768px)',
      modifier: ':hover',
    });
  });
  test('chain call from elemetary', () => {
    const tree = renderer.create(<ChainBox hover-c="red" c="blue" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
  });
  test('extend from sc component', () => {
    const tree = renderer.create(<ExtendedSC hover-c="red" c="blue" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
  });
  test('extend from el component', () => {
    const tree = renderer.create(<ExtendedEL hover-c="red" c="blue" m="100px" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
    expect(tree).toHaveStyleRule('margin', '100px');
  });
  test('with incorrect prop', () => {
    const tree = renderer.create(<WithIncorrectProp hover-c="red" c="blue" m="100px" />).toJSON();
    expect(tree).toBeDefined();
  });
  test('zero-config component', () => {
    const tree = renderer.create(<ZeroConfig color="blue" margin="100px" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
    expect(tree).toHaveStyleRule('margin', '100px');
  });
  test('zero-config component with template', () => {
    const tree = renderer.create(<ZeroConfigWithTemplate margin="100px" />).toJSON();
    expect(tree).toHaveStyleRule('color', 'red');
    expect(tree).toHaveStyleRule('margin', '100px');
  });
  test('compoosed rule', () => {
    const tree = renderer.create(<ZeroConfigWithTemplate padding-x="20px" />).toJSON();
    expect(tree).toHaveStyleRule('padding-left', '20px');
    expect(tree).toHaveStyleRule('padding-right', '20px');
  });
  test('compoosed rule with media query', () => {
    const tree = renderer.create(<ZeroConfigWithTemplate md-padding-x="30px" />).toJSON();
    expect(tree).toHaveStyleRule('padding-left', '30px', {
      media: '(max-width: 768px)',
    });
    expect(tree).toHaveStyleRule('padding-right', '30px', {
      media: '(max-width: 768px)',
    });
  });
  test('compoosed rule & effect', () => {
    const tree = renderer.create(<BoxWithSizeAndEffects hover-padding-x="22px" />).toJSON();
    expect(tree).toHaveStyleRule('padding-left', '22px', {
      modifier: ':hover',
    });
    expect(tree).toHaveStyleRule('padding-right', '22px', {
      modifier: ':hover',
    });
  });
  test('compoosed rule & effect & media', () => {
    const tree = renderer.create(<BoxWithSizeAndEffects md-hover-padding-x="30px" />).toJSON();
    expect(tree).toHaveStyleRule('padding-left', '30px', {
      media: '(max-width: 768px)',
      modifier: ':hover',
    });
    expect(tree).toHaveStyleRule('padding-right', '30px', {
      media: '(max-width: 768px)',
      modifier: ':hover',
    });
  });
  test('config name to displayName', () => {
    expect(NamedBox.displayName).toStrictEqual('NamedBox');
  });
  test('sc component with "as" bool props not thrown', () => {
    const tree = renderer
      // eslint-disable-next-line jsx-a11y/aria-role
      .create(<BoxWithOmit as />)
      .toJSON();
    expect(tree).toBeDefined();
  });
  test('transform rule without transformer', () => {
    const tree = renderer
      // eslint-disable-next-line jsx-a11y/aria-role
      .create(<BoxWithOmit fw={300} z-index={3} />)
      .toJSON();
    expect(tree).toHaveStyleRule('font-weight', '300');
    expect(tree).toHaveStyleRule('z-index', '3');
  });
});
