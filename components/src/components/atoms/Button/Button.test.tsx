import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { Button } from './Button'
import { lightTheme } from '@/src/tokens'

describe('<Button />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Button>Connect Wallet</Button>
      </ThemeProvider>,
    )
    expect(screen.getByText(/connect/i)).toBeInTheDocument()
  })
})
