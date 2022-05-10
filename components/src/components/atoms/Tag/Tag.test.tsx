import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { Tag } from './Tag'
import { lightTheme } from '@/src/tokens'

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
