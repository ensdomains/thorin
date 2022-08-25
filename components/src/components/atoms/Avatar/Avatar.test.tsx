import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, waitFor } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Avatar } from './Avatar'

describe('<Avatar />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Avatar
          label="Avatar"
          src="https://images.mirror-media.xyz/publication-images/H-zIoEYWk4SpFkljJiwB9.png"
        />
      </ThemeProvider>,
    )
    waitFor(() => expect(screen.getByRole(/img/i)).toBeInTheDocument())
  })
})
