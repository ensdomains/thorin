import * as React from 'react'

import { cleanup, render } from '@/test'

import { ThemeToggle } from './ThemeToggle'

describe('<CurrencyToggle />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<ThemeToggle />)
  })
})
