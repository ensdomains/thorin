import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Tag } from './Tag'

describe('<Tag />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Tag>10 ETH</Tag>
      </ThemeProvider>,
    )
    expect(screen.getByText(/eth/i)).toBeInTheDocument()
  })
})
