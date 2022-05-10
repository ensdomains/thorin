import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { Card } from './Card'
import { lightTheme } from '@/src/tokens'

describe('<Card />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Card>foo bar baz</Card>
      </ThemeProvider>,
    )
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
