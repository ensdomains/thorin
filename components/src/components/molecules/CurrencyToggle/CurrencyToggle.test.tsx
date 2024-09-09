import * as React from 'react'

import { cleanup, render } from '@/test'

import { CurrencyToggle } from './CurrencyToggle'

describe('<CurrencyToggle />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<CurrencyToggle />)
  })
})
