import * as React from 'react'
import { useState } from 'react'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Dropdown } from './Dropdown'
import { Button } from '@/src'

const DropdownHelper = ({ mockCallback }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div>outside</div>
      <Dropdown
        items={[
          { label: 'Dashboard', onClick: mockCallback },
          { label: 'Disconnect', onClick: () => null, color: 'red' },
        ]}
        {...{ isOpen, setIsOpen }}
      >
        <Button zIndex="10" onClick={() => setIsOpen(!isOpen)}>
          Menu
        </Button>
      </Dropdown>
    </div>
  )
}

describe('<Dropdown />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<DropdownHelper />)
    expect(screen.getByTestId('dropdown')).toBeInTheDocument()
  })

  it('should show dropdown when clicked', () => {
    render(<DropdownHelper />)
    userEvent.click(screen.getByText('Menu'))
    expect(screen.queryByText('Dashboard')).toBeVisible()
  })

  it('should call dropdown item callback when clicked', async () => {
    const mockCallback = jest.fn()
    render(<DropdownHelper {...{ mockCallback }} />)
    userEvent.click(screen.getByText('Menu'))
    userEvent.click(screen.getByText('Dashboard'))
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled()
    })
  })

  // it('should close if clicking outside of dropdown', async () => {
  //   render(<DropdownHelper />)
  //   userEvent.click(screen.getByText('Menu'))
  //   actHook(() => {
  //     userEvent.click(screen.getByText('outside'))
  //   })
  //   await waitFor(() => {
  //     expect(screen.queryByText('Dashboard')).not.toBeVisible()
  //   })
  // })

  it('should close dropdown if button is clicked when open', () => {
    render(<DropdownHelper />)
    userEvent.click(screen.getByText('Menu'))
    userEvent.click(screen.getByText('Menu'))
    expect(screen.queryByText('Dashboard')).not.toBeVisible()
  })
})
