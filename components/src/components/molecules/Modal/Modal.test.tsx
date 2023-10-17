import * as React from 'react'

import { cleanup, render, screen, waitFor } from '@/test'

import { Modal } from './Modal'

window.scroll = jest.fn()

describe('<Modal />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(<Modal open>Modal</Modal>)
    await waitFor(() => expect(screen.getByText('Modal')).toBeVisible(), {
      timeout: 300,
    })
  })

  it('should not be visible if not open', async () => {
    render(<Modal open={false}>Modal</Modal>)
    await waitFor(() => expect(screen.queryByText('Modal')).toBeNull(), {
      timeout: 300,
    })
  })
})
