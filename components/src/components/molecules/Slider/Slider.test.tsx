import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render } from '@/test'

import { Slider } from './Slider'
import { lightTheme } from '@/src'

describe('<Slider />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Slider label="slider" />
      </ThemeProvider>,
    )
  })
})
