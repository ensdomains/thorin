import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render } from '@/test'

import { lightTheme } from '@/src'

import { Slider } from './Slider'

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
