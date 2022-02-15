import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Skeleton } from '../../atoms'
import { SkeletonGroup } from './SkeletonGroup'

describe('<SkeletonGroup />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <SkeletonGroup>
        <Skeleton>foo bar baz</Skeleton>
        <Skeleton>quick brown fox</Skeleton>
      </SkeletonGroup>,
    )
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
