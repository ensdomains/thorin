# ENS Design System &middot; [![NPM version](https://img.shields.io/npm/v/thorin.svg?style=for-the-badge&labelColor=161c22)](https://www.npmjs.com/package/thorin) [![License](https://img.shields.io/npm/l/thorin.svg?style=for-the-badge&labelColor=161c22)](/LICENSE)

A design system for ENS built with React and styled-components.

**NOTE: This project is in active development and is subject to change.**

## Install

To install this package using npm:

```bash
npm install @ensdomains/thorin

```

To install this package using yarn:

```bash
yarn add @ensdomains/thorin
```

Checkout the project's [playroom](https://thorin.pages.dev/playroom) to preview the components in a live online environment.

## Set Up

In your App component, wrap the root of your app in a [`ThemeProvider`](https://styled-components.com/docs/advanced) module from [styled-components](https://styled-components.com). Import `ThorinGlobalStyles` and declare it as a child of `ThemeProvider` to set global styles. Set the theme by passing a theme object to `ThemeProvider`.

```tsx
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { DefaultTheme, ThorinGlobalStyles } from '@ensdomains/thorin'

const App = () => {
  const [theme, setTheme] = useState<DefaultTheme>({ mode: 'light' })
  return (
    <ThemeProvider theme={theme}>
      <ThorinGlobalStyles />
      {children}
    </ThemeProvider>
  )
}
```

## Use Components

A list of components with examples are available on the [project website](https://thorin.pages.dev).

A simple example to get you started:

```tsx
import { Input, SearchSVG } from '@ensdomains/thorin'

const SearchInput = () => {
  return (
    <Input
      label="Search"
      placeholder="Name or wallet address"
      prefix={<SearchSVG />}
    />
  )
}
```

## Documentation

You can find the full documentation on the [project website](https://thorin.pages.dev).

The documentation is divided into two sections.

- `Guides` : Documentation and tips for working on this project.
- `Components` : Documentation and sample code for each individual component.

## Development

```bash
gh clone repo @ensdomains/thorin
yarn
yarn dev
```

Before development, it is recommended that you read the following:

- [Development Guide](https://thorin.pages.dev/guides/development) - Information and tips to help you when working on this project including:
  - [Component Groups](https://thorin.pages.dev/guides/development#component-groups) - How the components are organized.
  - [Adding Components](https://thorin.pages.dev/guides/development#adding-components) - A list of files that need to be added or modified for each component.
  - [Style Guidlines](https://thorin.pages.dev/guides/development#style-guidelines) - Rules and tips to follow to keep the project code consistent and maintainable.
  - [Common Issues](https://thorin.pages.dev/guides/development#common-issues) - A list of known issues and how to resolve them.
- [Playroom Guide](https://thorin.pages.dev/guides/playroom) - Information on how to add state and interactivity to sample code in playroom and mdx code previews.

## Contributing

Contribute to this project by sending a pull request to [this repository](https://github.com/ensdomains/thorin).

## Sources

Forked from [degen](https://github.com/mirror-xyz/degen).
