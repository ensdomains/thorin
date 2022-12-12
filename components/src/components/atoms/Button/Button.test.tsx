import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Button } from './Button'

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
