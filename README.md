<p>
  <img src="docs/logo.png" width="200px" alt="quarkly atomize">
</p>

<h1> @quarkly/atomize </h1>

<b>Atomize is a library for creating atomic react components.
Inspired by <a href="https://tachyons.io/" target="_blank">tachyons</a> and <a href="https://github.com/styled-system/styled-system" target="_blank">styled-system</a>.</b>


![CI](https://github.com/quarkly/atomize/workflows/CI/badge.svg)
[![Coverage][coverage-badge]][coverage]
[![Version][version-badge]][npm]
![MIT License][license]

[coverage-badge]: https://flat.badgen.net/codecov/c/github/quarkly/atomize?cache=3000
[coverage]: https://codecov.io/github/quarkly/atomize
[version-badge]: https://flat.badgen.net/npm/v/@quarkly/atomize?cache=3000
[npm]: https://npmjs.com/package/@quarkly/atomize
[license]: https://flat.badgen.net/badge/license/MIT/blue

# Features

- Create components that support atomic CSS and themes
- Set styles for specific media breakpoints
- Use variables from the theme in composite CSS properties
- Support for hover and any other pseudo-classes
- Short aliases for each property

# General Resources

- [Official Site](https://atomize.quarkly.io/)

# Demo

- [Codesandbox](https://codesandbox.io/s/atomize-demo-skhjw?file=/src/Example.js)
- [Quarkly](https://quarkly.io)


# Install and Usage

Before you start working with Atomize, you need to set up dependencies:

```sh
npm i @quarkly/atomize styled-components
```

Atomize serves as a wrapper around a styled-component and has a similar API.

Just call the method using the name of the required element:

```jsx
import atomize from '@quarkly/atomize';
 
const Box = atomize.div();
```

As a result, we get the React component that can take any CSS in the form of properties.

```jsx
<Box backgroundColor="red" />
```

The React inheritance mechanism is also provided:

```jsx
const MyComponent = ({ className }) => {
    // some logic here
    return <div className={ className } />;
};

const Box = atomize(MyComponent);
```


# Advanced Usage

## Aliases

You can use the system of alias properties to make it easier to use. For example, bgc === backgroundColor.

```jsx
<Box bgc="red" />
```

To see the full list of properties and aliases, follow this [link](https://github.com/quarkly/atomize/blob/master/docs/aliases.md).

You can also disable aliases for the specific component if you need. Just pass an object with the configuration where set "useAliases: false".

```jsx
const Box = atomize.div({ useAliases: false })
```

## Themes

By default, Atomize components do not include a theme and you need to set up dependencies:

```sh
npm i @quarkly/theme
```

Quarkly themes are based on CSS variables. The key feature is that variables from themes can be reused both in props and themes. You don’t have to use additional abstractions, like template functions, and no additional editing is needed.

To use variables from a theme, just add your theme to an application with a Theme component, describe the property in the theme and call this property using the prefix "--".

You can also use it in the theme itself:

```jsx
import Theme from "@quarkly/theme";

const theme = {
    color: {
        dark: "#212121"
    },
    border: {
        dark: "1px solid --color-dark"
    }
};

export const MyBox = () => (
    <Theme theme={ theme }>
        <Box
            width="100px"
            height="100px"

            border="--border-dark"
            color="--color-dark"
        />
    </Theme>
);
```

Shorter syntax is used for colors in the JSX markup:

```jsx
<Box color="--dark" />
```

## Breakpoints

Themes have breakpoints for working with media expressions.

Any property can be prefixed with a breakpoint key name.

```jsx
import Theme from "@quarkly/theme";
 
const theme = {
    breakpoints: {
        sm: [{ type: "min-width", value: 576 }],
        md: [{ type: "min-width", value: 768 }],
        lg: [{ type: "min-width", value: 992 }]
    },
    color: {
        'dark-mobile': "#424242",
        'dark-tablet': "#212121"
    }
};

export const MyBox = () => (
    <Theme theme={ theme }>
        <Box
            width="100px"
            height="100px"

            color="--dark-mobile"
            md-color="--dark-tablet"
        />
    </Theme>
);
```

## Effects

Just pass an object with the configuration to a component when creating it:

```jsx
const Button = atomize.button({
    effects: {
        hover: ":hover",
        focus: ":focus",
        active: ":active",
        disabled: ":disabled"
    }
});
```

The key is the prefix in the name of the property, and the value is a CSS selector. This is the same way we implemented pseudo-classes.

For example, if you specify the hover prefix for any CSS property, it will be applied to a certain effect:

```jsx
<MySuperButton
    bgc="red"
    hover-bgc="yellow"
    focus-bgc="blue"
/>
```

You can also combine effects with media expressions:

```jsx
<Box
    md-hover-bgc="yellow"
    lg-hover-bgc="blue"
/>
```


# Quarkly Widgets

The second purpose of Atomize is to create widgets in Quarkly based on custom React components.

Just wrap your component in Atomize and describe its configuration so that Quarkly can understand which properties can be interactively edited.

You do not need to add a Theme to your component when you use it in Quarkly. All the variables from the project will be automatically available in your component.

The configuration fields for the component look like this:
- *effects* – defines browser pseudo-classes (hover, focus, etc.)
- *description* – component description that will appear when you mouse over its name
- *propInfo* – configuration of controls that will be displayed on the right panel

```jsx
export default atomize(Box)(
    {
        effects: {
            hover: ":hover"
        },
        description: {
            en: "Awesome box component"
        },
        propInfo: {
            someProp: {
                control: "input"
            },
        },
    },
    {
        someProp: "Hello World!"
    }
);
```

Possible control options:
- input
- select
- color
- font
- shadow
- transition
- transform
- filter
- background
- checkbox-icon
- radio-icon
- radio-group
- checkbox

### Common properties

To specify the props to be displayed on the right panel, use this template:
- *description* – tooltip text based on localization language
- *control* – control type (from the list above). It is a required property
- *category* – name for your category in the right panel; if there is no category with this name, it will be created automatically
- *weight* – control width. The range of values is from 0 to 1, which equals from 0 to 100% of the right panel width. It is possible to show several controls in one line

```jsx
someProp: {
    description: { en: "Your text" },
    control: "input",
    category: 'Main',
    weight: 1
}
```

### Radio-icon

Returns a string with the checked value.

Property "checkedValue" describes the name for the selected option:

```jsx
checkedValue: "valueName"
```

### Checkbox-icon

Returns a string with the checked value.

Property "checkedValue" describes the name for the selected option.

Property "icon" describes the system name for the icon:

```jsx
checkedValue: "valueName",
icon: "iconName"
```

### Select and radio-group

Returns a string with the selected value.

Property "variants" contains a list of available options:

```jsx
variants: ['one', 'two', 'three']
```

### Font

Returns a string with a font styles.

```css
italic normal 400 1em/1.5 --fontFamily-googleRoboto
```

### Color

Returns a string with a variable or custom value in #HEX or RGBA.

### Background

Returns a string with a variable or custom color in #HEX or RGBA and image or gradient styles if they were defined.

```css
// gradient styles
#000000 repeating-linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(0,0,0,1) 100%)

// or image styles
--color-dark url(image.png) center/contain no-repeat fixed border-box
```

### Transition, transform, shadow and filter

Returns a string with a property styles.


# API Reference

## atomize

```jsx
import atomize from '@quarkly/atomize';
```
Default export. This is a wrapper around [styled]((https://styled-components.com/docs/api#styled)) from `styled-components`.

## getTransfrom

```jsx
import { getTransform } from '@quarkly/atomize;
```

Method that returns a function by name to transform the value.

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

Default theme for using CSS variables and defining breakpoints.

```jsx
import { themeDefault } from '@quarkly/atomize;
```

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
- [Aliases](https://github.com/quarkly/atomize/blob/master/docs/aliases.md)

# TODOS

- [ ] Code refactoring to TypeScript
- [ ] Auto sync with "can i use" and "emmet"
- [ ] Comprehensive documentation

# License

Licensed under MIT.
