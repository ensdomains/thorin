import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render } from '@/test'

import { lightTheme } from '@/src'

import { Helper } from './Helper'

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
