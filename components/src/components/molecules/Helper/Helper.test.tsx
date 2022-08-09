import * as React from 'react'

import { cleanup, render } from '@/test'

import { Helper } from './Helper'

describe('<Helper />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Helper>Test helper</Helper>)
  })
})
