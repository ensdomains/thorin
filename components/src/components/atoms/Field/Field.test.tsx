import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { Field } from './Field'
import { lightTheme } from '@/src/tokens'

describe('<Field />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Field label="Foo bar baz">
          <div />
        </Field>
      </ThemeProvider>,
    )
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
