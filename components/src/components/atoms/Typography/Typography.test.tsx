import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { Typography } from './Typography'
import { lightTheme } from '@/src/tokens'

describe('<Typography />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Typography>foo bar baz</Typography>
      </ThemeProvider>,
    )
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
