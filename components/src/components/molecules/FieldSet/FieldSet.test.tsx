import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { lightTheme } from '@/src/tokens'

import { FieldSet } from './FieldSet'

describe('<FieldSet />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <FieldSet legend="Token">
          <div />
        </FieldSet>
      </ThemeProvider>,
    )
    expect(screen.getByText(/token/i)).toBeInTheDocument()
  })
})
