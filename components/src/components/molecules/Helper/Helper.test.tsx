import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render } from '@/test'

import { Helper } from './Helper'
import { lightTheme } from '@/src'

describe('<Helper />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Helper>Test helper</Helper>
      </ThemeProvider>,
    )
  })
})
