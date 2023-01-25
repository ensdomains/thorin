import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { lightTheme } from '@/src/tokens'

import { CheckboxRow } from './CheckboxRow'

describe('<CheckboxRow />', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <CheckboxRow label="label" />
      </ThemeProvider>,
    )
    expect(screen.getByText('label')).toBeInTheDocument()
  })
})
