import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Toggle } from './Toggle'

describe('<Toggle />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Toggle />
      </ThemeProvider>,
    )
  })
})
