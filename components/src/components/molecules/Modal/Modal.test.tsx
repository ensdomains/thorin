import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, waitFor } from '@/test'

import { lightTheme } from '@/src/tokens'
import { Modal } from './Modal'

window.scroll = jest.fn()

describe('<Modal />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Modal open>Modal</Modal>
      </ThemeProvider>,
    )
    waitFor(() => expect(screen.getByText('Modal')).toBeVisible(), {
      timeout: 300,
    })
  })

  it('should not be visible if not open', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Modal open={false}>Modal</Modal>
      </ThemeProvider>,
    )
    waitFor(() => expect(screen.getByText('Modal')).toBeNull(), {
      timeout: 300,
    })
  })
})
