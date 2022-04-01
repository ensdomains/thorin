import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen } from '@/test'

import { Skeleton } from '../../atoms'
import { SkeletonGroup } from './SkeletonGroup'

describe('<SkeletonGroup />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <SkeletonGroup>
          <Skeleton>foo bar baz</Skeleton>
          <Skeleton>quick brown fox</Skeleton>
        </SkeletonGroup>
      </ThemeProvider>,
    )
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
