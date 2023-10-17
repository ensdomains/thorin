import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { CheckboxRow } from './CheckboxRow'

describe('<CheckboxRow />', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(<CheckboxRow label="label" />)
    expect(screen.getByText('label')).toBeInTheDocument()
  })
})
