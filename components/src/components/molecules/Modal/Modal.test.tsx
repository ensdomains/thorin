import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent } from '@/test'

import { Modal } from './Modal'

describe('<Modal />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <Modal open>Modal</Modal>
      </ThemeProvider>,
    )
    expect(screen.getByText('Modal')).toBeVisible()
  })

  it('should not be visible if not open', () => {
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <Modal open={false}>Modal</Modal>
      </ThemeProvider>,
    )
    expect(screen.queryByText('Modal')).toBeNull()
  })

  it('should display close icon if callback is provided', () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <Modal open onDismiss={mockCallback}>
          Modal
        </Modal>
      </ThemeProvider>,
    )
    expect(screen.getByTestId('close-icon')).toBeVisible()
  })

  it('should call callback if close icon is clicked', () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <Modal open onDismiss={mockCallback}>
          Modal
        </Modal>
      </ThemeProvider>,
    )
    userEvent.click(screen.getByTestId('close-icon'))
    expect(mockCallback).toHaveBeenCalled()
  })
})
