import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Banner } from './Banner'

describe('<Banner />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Banner alert="warning" title="Title">
          Message
        </Banner>
      </ThemeProvider>,
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Message')).toBeInTheDocument()
  })
})
