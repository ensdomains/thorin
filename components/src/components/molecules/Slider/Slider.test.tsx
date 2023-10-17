import * as React from 'react'

import { cleanup, render } from '@/test'

import { Slider } from './Slider'

describe('<Slider />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Slider label="slider" />)
  })
})
