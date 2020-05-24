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
npm i @quarkly/atomize
```

```sh
npm i styled-components
```

Let's create element:

```jsx
import React from 'react';
import ReactDom from 'react-dom';
import atomize from '@quarkly/atomize';

const Box = atomize.div();

ReactDom.render(<Box width="100px" bgc="red" height="300px" />, document.getElementById('root'));
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
  <Box width="100px" hover-bgc="blue" md-bgc="yellow" bgc="red" height="300px" />,
  document.getElementById('root'),
);
```

First argument is the configuration:

- rules - an array of css properties that we will use.
- effects - what effects can be used from jsx (hover, focus ..etc)
- variant - options for component styles from themes
- name - componentName and default styles for this component from a theme

# Docs

- [Theming](https://github.com/quarkly/theme)
- [Aliases](docs/aliases.md)

# License

Licensed under MIT.
