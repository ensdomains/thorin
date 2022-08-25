import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Skeleton } from './Skeleton'

describe('<Skeleton />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Skeleton loading>foo bar baz</Skeleton>
      </ThemeProvider>,
    )
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
