import * as React from 'react'

import { cleanup, render, screen, waitFor } from '@/test'

import { Avatar } from './Avatar'

describe('<Avatar />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(
      <Avatar
        label="Avatar"
        src="https://images.mirror-media.xyz/publication-images/H-zIoEYWk4SpFkljJiwB9.png"
      />,
    )
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument()

      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://images.mirror-media.xyz/publication-images/H-zIoEYWk4SpFkljJiwB9.png')
    })
  })
  it('should render placeholder if no src is provided', async () => {
    render(
      <Avatar label="Avatar" />,
    )
    await waitFor(() => {
      expect(screen.getByAltText('Avatar')).toBeInTheDocument()
    })
  })
})
