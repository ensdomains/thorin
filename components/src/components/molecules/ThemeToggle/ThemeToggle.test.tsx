import * as React from 'react'

import { cleanup, render } from '@/test'

import { ThemeToggle } from './ThemeToggle'

describe('<ThemeToggle />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<ThemeToggle />)
  })
})
