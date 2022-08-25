import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Spinner } from './Spinner'

describe('<Spinner />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Spinner accessibilityLabel="Loading…" />
      </ThemeProvider>,
    )
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})
