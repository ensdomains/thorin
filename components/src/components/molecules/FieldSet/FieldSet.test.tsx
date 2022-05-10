import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { FieldSet } from './FieldSet'
import { lightTheme } from '@/src/tokens'

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
