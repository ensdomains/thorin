import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Banner } from './Banner'

describe('<Banner />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <Banner alert="warning" title="Title">
        Message
      </Banner>,
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Message')).toBeInTheDocument()
  })
})
