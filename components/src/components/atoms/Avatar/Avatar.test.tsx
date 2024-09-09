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
    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument())
  })
})
