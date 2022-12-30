import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render } from '@/test'

import { lightTheme } from '@/src/tokens'

import { CurrencyToggle } from './CurrencyToggle'

describe('<CurrencyToggle />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <CurrencyToggle />
      </ThemeProvider>,
    )
  })
})
