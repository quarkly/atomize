<p>
  <img src="docs/logo.png" width="200px" alt="quarkly atomize">
</p>
<h1> @quarkly/atomize </h1>

<b>Atomize is a library for creating atomic react components.
Inspired by <a href="http://tachyons.io/" target="_blank">tachyons</a> and <a href="https://github.com/styled-system/styled-system" target="_blank">styled-system</a>.</b>

# Features

- Any css properties - props
- Simple writing media queries
- Alias ​​system
- Support hover, focus ..etc as props
- Fully themed

# Demo

- [Codesandbox](https://codesandbox.io/s/atomize-demo-pom06?file=/src/Example.js:182-335)
- [Quarkly](https://quarkly.io)

# Install and Usage

```sh
npm i @quarkly/atomize styled-components
```

Let's create element:

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
First argument is the configuration:

- rules - an array of css properties that we will use.
- effects - what effects can be used from jsx (hover, focus ..etc)
- variant - options for component styles from themes
- name - componentName and default styles for this component from a theme

# API Reference

## atomize

```jsx
import atomize from '@quarkly/atomize';
```

This is default export. This is wrapper over [styled]((https://styled-components.com/docs/api#styled)) of `styled-components`.

## getTransfrom
```jsx
import { getTransform } from '@quarkly/atomize;
```
Method returned by name method of transformation by value.

```tsx
getTransform(name: string): function
```
* `name` - name of transformation

## transformVar
```jsx
import { transformVar } from '@quarkly/atomize;
```
CSS variable transformation

```ts
transformVar(key: string, value: string): string;
```

## splitCSSRule
```jsx
import { splitCSSRule } from '@quarkly/atomize;
```
Breaks a CSS string into an array of rules

```ts
splitCSSRule<T>(rule: T, separator?: string): Array<T>
```

## themeDefault
```jsx
import { themeDefault } from '@quarkly/atomize;
```
Default theme for use css variables and definition breakpoints

## dict
```jsx
import { dict } from '@quarkly/atomize;
```
Dictionary of css rules for determining their configuration

```ts
type CSSRule = {
  alias: string
  type: Array<string> | string
  <key>: string
}
```
* alias - alternate name for props
* type - css value type

## aliasesDict
```jsx
import { aliasesDict } from '@quarkly/atomize;
```
Dictionary of aliases, generated on top of dict

```ts
type Alias =  Omit<CSSRule, "alias"> & {
  name: string,
}
```

# Docs

- [Theming](https://github.com/quarkly/theme)
- [Aliases](docs/aliases.md)

# License

Licensed under MIT.
