import * as React from 'react'

import { cleanup, render, screen, userEvent } from '@/test'

import { Modal } from './Modal'

describe('<Modal />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Modal open>Modal</Modal>)
    expect(screen.getByText('Modal')).toBeVisible()
  })

  it('should not be visible if not open', () => {
    render(<Modal open={false}>Modal</Modal>)
    expect(screen.queryByText('Modal')).toBeNull()
  })

  it('should display close icon if callback is provided', () => {
    const mockCallback = jest.fn()
    render(
      <Modal open onDismiss={mockCallback}>
        Modal
      </Modal>,
    )
    expect(screen.getByTestId('close-icon')).toBeVisible()
  })

  it('should call callback if close icon is clicked', () => {
    const mockCallback = jest.fn()
    render(
      <Modal open onDismiss={mockCallback}>
        Modal
      </Modal>,
    )
    userEvent.click(screen.getByTestId('close-icon'))
    expect(mockCallback).toHaveBeenCalled()
  })
})
