import * as React from 'react'

import { cleanup, render } from '@/test'

import { Toggle } from './Toggle'

describe('<Toggle />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Toggle />)
  })
})
