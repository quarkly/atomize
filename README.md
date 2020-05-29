<p>
  <img src="docs/logo.png" width="200px" alt="quarkly atomize">
</p>
<h1> @quarkly/atomize </h1>

<b>Atomize is a library for creating atomic react components.
Inspired by <a href="http://tachyons.io/" target="_blank">tachyons</a> and <a href="https://github.com/styled-system/styled-system" target="_blank">styled-system</a>.</b>


![.github/workflows/CI.yml](https://github.com/quarkly/atomize/workflows/.github/workflows/CI.yml/badge.svg)
[![Coverage][coverage-badge]][coverage]
[![Version][version-badge]][npm]
![MIT License][license]

[badge]: https://flat.badgen.net/travis/quarkly/atomize/master?cache=3000
[coverage-badge]: https://flat.badgen.net/codecov/c/github/quarkly/atomize?cache=3000
[coverage]: https://codecov.io/github/quarkly/atomize
[version-badge]: https://flat.badgen.net/npm/v/@quarkly/atomize?cache=3000
[npm]: https://npmjs.com/package/@quarkly/atomize
[license]: https://flat.badgen.net/badge/license/MIT/blue

# Features

- All CSS rules can be specified via props
- Support for media queries
- Short aliases for each property
- Support for hover and any other pseudo-classes via props
- Fully customizable themes

# Demo

- [Codesandbox](https://codesandbox.io/s/atomize-demo-skhjw?file=/src/Example.js)
- [Quarkly](https://quarkly.io)

# Install and Usage

```sh
npm i @quarkly/atomize styled-components
```

Create a component:

```jsx
import React from 'react';
import ReactDom from 'react-dom';
import atomize from '@quarkly/atomize';

const Box = atomize.div();

ReactDom.render(
  <Box width="100px" bgc="red" height="300px" />,
  document.getElementById('root')
);
```

# Advanced usage

```jsx
import React from 'react';
import ReactDom from 'react-dom';
import atomize from '@quarkly/atomize';

const Box = atomize.div({
  effects: {
    hover: ':hover',
  },
  variant: 'boxes',
  name: 'Box',
});

ReactDom.render(
  <Box
    width="100px"
    hover-bgc="blue"
    md-bgc="yellow"
    bgc="red"
    height="300px"
  />,
  document.getElementById('root'),
);
```
The first argument is configuration:

- effects - a hash table of effects (hover, focus, etc.)
- name - component name

The second argument is default props.

# API Reference

## atomize

```jsx
import atomize from '@quarkly/atomize';
```

This is the default export. This is a wrapping over [styled]((https://styled-components.com/docs/api#styled)) from `styled-components`.

## getTransfrom
```jsx
import { getTransform } from '@quarkly/atomize;
```
The method that returns a function by name to transform the value.

```tsx
getTransform(name: string): function
```
* `name` - method name for a transform

## transformVar
```jsx
import { transformVar } from '@quarkly/atomize;
```
Transform of CSS variables

```ts
transformVar(key: string, value: string): string;
```

## splitCSSRule
```jsx
import { splitCSSRule } from '@quarkly/atomize;
```
Breaks the CSS string into an array of rules.

```ts
splitCSSRule<T>(rule: T, separator?: string): Array<T>
```

## themeDefault
```jsx
import { themeDefault } from '@quarkly/atomize;
```
Default theme for using CSS variables and defining breakpoints.

## dict
```jsx
import { dict } from '@quarkly/atomize;
```
Dictionary for defining configuration of CSS rules 

```ts
type CSSRule = {
  alias: string;
  type: Array<string> | string;
  <key>: string;
}
```
* alias - name abbreviation
* type - CSS value type

## aliasesDict
```jsx
import { aliasesDict } from '@quarkly/atomize;
```
Dictionary of abbreviations generated from `dict`

```ts
type Alias =  Omit<CSSRule, "alias"> & {
  name: string;
  <key>: string;
}
```

# Docs

- [Theming](https://github.com/quarkly/theme)
- [Aliases](docs/aliases.md)

# TODOS

- [ ] Code refactoring to TypeScript
- [ ] Auto sync with "can i use" and "emmet"
- [ ] Comprehensive documentation

# License

Licensed under MIT.
