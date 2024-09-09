import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Typography } from './Typography'

describe('<Typography />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Typography>foo bar baz</Typography>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
