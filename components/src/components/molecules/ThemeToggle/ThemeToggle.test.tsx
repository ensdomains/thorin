import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render } from '@/test'

import { lightTheme } from '@/src/tokens'

import { ThemeToggle } from './ThemeToggle'

describe('<CurrencyToggle />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <ThemeToggle />
      </ThemeProvider>,
    )
  })
})
