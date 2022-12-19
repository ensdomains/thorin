import * as React from 'react'

import { cleanup, render } from '@/test'

import { Banner } from './Banner'

describe('<Banner />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Banner />)
  })
})
