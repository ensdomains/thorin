import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { Spinner } from './Spinner'
import { lightTheme } from '@/src/tokens'

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
